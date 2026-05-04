import { NextApiResponse, NextApiRequest } from "next";
import fs from "fs";
import path from "path";

import serverAuth from "@/lib/serverAuth";
import { generateMovieId } from "@/lib/movieIdGenerator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req,res);

    // Read movies.json dynamically for live updates
    const moviesPath = path.join(process.cwd(), "movies.json");
    const moviesData = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(moviesData);
    
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    
    // Add id to the response
    const movieWithId = {
      ...randomMovie,
      id: generateMovieId(randomMovie.title),
    };
    
    return res.status(200).json(movieWithId);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
