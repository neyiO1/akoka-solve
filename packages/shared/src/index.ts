/**
 * Shared Types and Utilities for Akoka Solve
 * 
 * Centralizing types ensures consistency between frontend and backend services.
 */

// --- Types ---

/**
 * Standard API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: Record<string, unknown>;
}

/**
 * Paginated Response wrapper for collections
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

/**
 * RFC 7807 compliant Error Response
 * Problem Details for HTTP APIs
 */
export interface ErrorResponse {
  type: string;     // A URI reference that identifies the problem type
  title: string;    // A short, human-readable summary of the problem type
  status: number;   // The HTTP status code
  detail?: string;  // A human-readable explanation specific to this occurrence of the problem
  instance?: string;// A URI reference that identifies the specific occurrence of the problem
}


// --- Utilities ---

/**
 * Formats a successful response
 */
export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(message && { message })
  };
}

/**
 * Formats an error response matching RFC 7807
 */
export function formatError(
  status: number,
  title: string,
  detail?: string,
  type = "about:blank"
): ErrorResponse {
  return {
    type,
    title,
    status,
    detail
  };
}
