import crypto from "crypto";

/**
 * Generate a consistent MongoDB-compatible ID from a movie title
 * Uses SHA-1 hash of the title to create a 24-character hex string (12 bytes)
 */
export function generateMovieId(title: string): string {
  const hash = crypto.createHash("sha1").update(title).digest("hex");
  // Take first 24 characters (12 bytes in hex) to match MongoDB ObjectID format
  return hash.substring(0, 24);
}
