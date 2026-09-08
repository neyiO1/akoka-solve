/**
 * CRDT Synchronization Engine (Last-Writer-Wins + Vector Clocks)
 * Implements Conflict-Free Replicated Data Type resolution for decentralized offline tasks.
 */

const STATUS_PRIORITY = {
  "Verified": 4,
  "Pending Review": 3,
  "Active": 2,
  "Available": 1,
};

/**
 * Compare two tasks and return the winning state according to LWW-CRDT rules.
 */
function resolveTaskConflict(serverTask, clientTask, clientTimestamp) {
  const serverTime = new Date(serverTask.updatedAt || 0).getTime();
  const clientTime = new Date(clientTimestamp || clientTask.updatedAt || 0).getTime();

  // 1. Strict Last-Writer-Wins (LWW) if timestamps differ significantly
  if (clientTime > serverTime) {
    return {
      winner: {
        ...serverTask,
        ...clientTask,
        updatedAt: new Date(clientTime).toISOString(),
        version: (serverTask.version || 1) + 1,
      },
      conflict: false,
    };
  } else if (serverTime > clientTime) {
    return {
      winner: serverTask,
      conflict: true, // Client was outdated
    };
  }

  // 2. Deterministic Tie-breaking using State Precedence Hierarchy
  const clientPriority = STATUS_PRIORITY[clientTask.status] || 0;
  const serverPriority = STATUS_PRIORITY[serverTask.status] || 0;

  if (clientPriority >= serverPriority) {
    return {
      winner: {
        ...serverTask,
        ...clientTask,
        updatedAt: new Date().toISOString(),
        version: (serverTask.version || 1) + 1,
      },
      conflict: true,
    };
  }

  return {
    winner: serverTask,
    conflict: true,
  };
}

/**
 * Reconcile a batch of offline queue operations and/or full client task snapshot.
 *
 * @param {Map<string, object>} taskStore - Map of taskId -> Task
 * @param {Array} offlineQueue - Array of { action, taskId, payload, timestamp, clientId, vectorClock }
 * @param {Array} clientTasks - Array of full task objects from client
 * @param {string} clientId - Unique identifier of the client device
 * @param {object} serverVectorClock - Server vector clock tracking all clients
 */
function processCRDTSync(taskStore, offlineQueue = [], clientTasks = [], clientId = "unknown_client", serverVectorClock = {}) {
  let conflictsResolved = 0;
  const now = new Date().toISOString();

  // Update server vector clock for this client
  serverVectorClock[clientId] = (serverVectorClock[clientId] || 0) + 1;

  // 1. Process queued offline actions
  for (const item of offlineQueue) {
    const { action, taskId, payload = {}, timestamp = now } = item;
    let existingTask = taskStore.get(taskId);

    if (!existingTask) {
      // Task does not exist on server; create if payload has task data
      if (action === "CREATE_TASK" && payload.title) {
        const newTask = {
          id: taskId,
          title: payload.title,
          description: payload.description || "",
          status: payload.status || "Available",
          assignedTo: payload.assignedTo || null,
          points: payload.points || 200,
          updatedAt: timestamp,
          version: 1,
          vectorClock: { [clientId]: 1 },
        };
        taskStore.set(taskId, newTask);
      }
      continue;
    }

    // Merge vector clock
    existingTask.vectorClock = existingTask.vectorClock || {};
    existingTask.vectorClock[clientId] = Math.max(
      existingTask.vectorClock[clientId] || 0,
      (item.vectorClock && item.vectorClock[clientId]) || 0
    ) + 1;

    if (action === "CLAIM_TASK") {
      const prospectiveTask = {
        ...existingTask,
        status: "Active",
        assignedTo: payload.assignedTo || payload.userId,
      };
      const { winner, conflict } = resolveTaskConflict(existingTask, prospectiveTask, timestamp);
      taskStore.set(taskId, winner);
      if (conflict) conflictsResolved++;
    } else if (action === "SUBMIT_PROOF") {
      const prospectiveTask = {
        ...existingTask,
        status: "Pending Review",
        proofDetails: payload.proofDetails || payload.description || "Offline proof submitted",
      };
      const { winner, conflict } = resolveTaskConflict(existingTask, prospectiveTask, timestamp);
      taskStore.set(taskId, winner);
      if (conflict) conflictsResolved++;
    } else if (action === "VERIFY_TASK") {
      const prospectiveTask = {
        ...existingTask,
        status: "Verified",
      };
      const { winner, conflict } = resolveTaskConflict(existingTask, prospectiveTask, timestamp);
      taskStore.set(taskId, winner);
      if (conflict) conflictsResolved++;
    }
  }

  // 2. Reconcile client task snapshot if provided
  if (Array.isArray(clientTasks) && clientTasks.length > 0) {
    for (const clientTask of clientTasks) {
      if (!clientTask || !clientTask.id) continue;
      const existingTask = taskStore.get(clientTask.id);

      if (!existingTask) {
        taskStore.set(clientTask.id, {
          ...clientTask,
          updatedAt: clientTask.updatedAt || now,
          version: clientTask.version || 1,
          vectorClock: clientTask.vectorClock || { [clientId]: 1 },
        });
      } else {
        const { winner, conflict } = resolveTaskConflict(existingTask, clientTask, clientTask.updatedAt);
        taskStore.set(clientTask.id, winner);
        if (conflict) conflictsResolved++;
      }
    }
  }

  return {
    syncedTasks: Array.from(taskStore.values()),
    conflictsResolved,
    serverTimestamp: now,
    serverVectorClock,
  };
}

module.exports = {
  STATUS_PRIORITY,
  resolveTaskConflict,
  processCRDTSync,
};
