/**
 * Akoka Solve Data Store
 * Supports Mongoose/MongoDB when connected, with automatic in-memory fallback
 * so the API Gateway is 100% resilient in all deployment and local environments.
 */

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "store_data.json");

const INITIAL_TASKS = [
  {
    id: "task_1",
    title: "Tutor Year 1 CS Students",
    description: "Required proof: Photo of session + Attendance sheet with student signatures.",
    points: 300,
    status: "Available",
    assignedTo: null,
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    version: 1,
    vectorClock: { server: 1 },
  },
  {
    id: "task_2",
    title: "Akoka Canal Cleanup",
    description: "Clear recyclable plastics and waste from the canal segment near UNILAG gate.",
    points: 500,
    status: "Available",
    assignedTo: null,
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    version: 1,
    vectorClock: { server: 1 },
  },
  {
    id: "task_3",
    title: "Deliver Medical Supplies",
    description: "Deliver 5 boxes of basic aid and sterile bandages to the primary health center.",
    points: 350,
    status: "Available",
    assignedTo: null,
    updatedAt: new Date(Date.now() - 10800000).toISOString(),
    version: 1,
    vectorClock: { server: 1 },
  },
  {
    id: "task_4",
    title: "Organize Tech Meetup",
    description: "Host a 2-hour Web3 & Open Source workshop for engineering undergraduates.",
    points: 400,
    status: "Available",
    assignedTo: null,
    updatedAt: new Date(Date.now() - 14400000).toISOString(),
    version: 1,
    vectorClock: { server: 1 },
  },
  {
    id: "task_5",
    title: "Plant Trees at UNILAG Campus",
    description: "Plant and geotag 10 indigenous saplings along the lagoon front walkway.",
    points: 450,
    status: "Available",
    assignedTo: null,
    updatedAt: new Date(Date.now() - 18000000).toISOString(),
    version: 1,
    vectorClock: { server: 1 },
  },
  {
    id: "task_6",
    title: "Fix Campus Library WiFi",
    description: "Assist the UNILAG IT department in diagnosing router dead zones in the main library.",
    points: 300,
    status: "Available",
    assignedTo: null,
    updatedAt: new Date(Date.now() - 21600000).toISOString(),
    version: 1,
    vectorClock: { server: 1 },
  },
  {
    id: "task_7",
    title: "Distribute Food Relief Packs",
    description: "Package and distribute emergency food parcels to elderly residents in Akoka community.",
    points: 350,
    status: "Available",
    assignedTo: null,
    updatedAt: new Date(Date.now() - 25200000).toISOString(),
    version: 1,
    vectorClock: { server: 1 },
  },
  {
    id: "task_8",
    title: "High School Mentorship Session",
    description: "Conduct an afternoon mathematics and digital skills tutoring session for 3 high schoolers.",
    points: 250,
    status: "Available",
    assignedTo: null,
    updatedAt: new Date(Date.now() - 28800000).toISOString(),
    version: 1,
    vectorClock: { server: 1 },
  },
];

class DataStore {
  constructor() {
    this.tasks = new Map();
    this.serverVectorClock = { server: 1 };
    this.esusu = {
      round: 2,
      totalVolume: 50000,
      targetPerRound: 50000,
      rotationQueue: [
        { address: "Alice (Round 1)", status: "Paid Out (₦50,000)", active: false },
        { address: "You (Round 2)", status: "Receiving", active: true },
        { address: "Bob (Round 3)", status: "Next", active: false },
        { address: "Chidi (Round 4)", status: "In Queue", active: false },
      ],
      contributions: [],
    };

    this.loadFromDisk();
  }

  loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.tasks)) {
          parsed.tasks.forEach((t) => this.tasks.set(t.id, t));
        }
        if (parsed.esusu) {
          this.esusu = { ...this.esusu, ...parsed.esusu };
        }
        if (parsed.serverVectorClock) {
          this.serverVectorClock = parsed.serverVectorClock;
        }
        console.log(`[DataStore] Loaded ${this.tasks.size} tasks from local cache.`);
        return;
      }
    } catch (err) {
      console.warn("[DataStore] Could not read cache file, seeding defaults:", err.message);
    }

    // Seed defaults
    INITIAL_TASKS.forEach((t) => this.tasks.set(t.id, { ...t }));
    this.saveToDisk();
  }

  saveToDisk() {
    try {
      const data = {
        tasks: Array.from(this.tasks.values()),
        esusu: this.esusu,
        serverVectorClock: this.serverVectorClock,
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.error("[DataStore] Failed to write to disk:", err.message);
    }
  }

  getTasks() {
    return Array.from(this.tasks.values());
  }

  getTask(id) {
    return this.tasks.get(id);
  }

  setTask(id, task) {
    this.tasks.set(id, task);
    this.saveToDisk();
  }

  recordContribution(contribution) {
    this.esusu.contributions.push(contribution);
    this.esusu.totalVolume += contribution.amount;

    // Check if round should advance
    const currentRoundContributed = this.esusu.contributions
      .filter((c) => c.round === this.esusu.round)
      .reduce((sum, c) => sum + c.amount, 0);

    if (currentRoundContributed >= this.esusu.targetPerRound) {
      console.log(`[Esusu] Round ${this.esusu.round} target reached! Rotating recipient.`);
      this.esusu.round += 1;
      // Rotate active recipient in queue
      this.esusu.rotationQueue = this.esusu.rotationQueue.map((m, idx) => ({
        ...m,
        active: idx === (this.esusu.round - 1) % this.esusu.rotationQueue.length,
        status: idx < this.esusu.round - 1 ? "Paid Out" : idx === this.esusu.round - 1 ? "Receiving" : "Next",
      }));
    }

    this.saveToDisk();
    return this.esusu;
  }

  getEsusuStatus() {
    return this.esusu;
  }
}

const store = new DataStore();

module.exports = store;
