import { NextApiResponse, NextApiRequest } from "next";
import fs from "fs";
import path from "path";

import serverAuth from "@/lib/serverAuth";
import { generateMovieId } from "@/lib/movieIdGenerator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }
    await serverAuth(req, res);

    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }

    if (!movieId) {
      throw new Error("Invalid ID");
    }

    // Read movies.json dynamically for live updates
    const moviesPath = path.join(process.cwd(), "movies.json");
    const moviesData = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(moviesData);
    
    // Find movie by matching generated ID
    const movie = movies.find((m: any) => generateMovieId(m.title) === movieId);
    
    if (!movie) {
      throw new Error("Invalid ID");
    }

    // Add id to the response
    const movieWithId = {
      ...movie,
      id: movieId,
    };

    return res.status(200).json(movieWithId);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
