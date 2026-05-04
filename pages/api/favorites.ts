import { NextApiResponse, NextApiRequest } from "next";
import fs from "fs";
import path from "path";

import prismadb from "@/lib/prismadb";
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
    const { currentUser } = await serverAuth(req, res);

    // Read movies.json dynamically for live updates
    const moviesPath = path.join(process.cwd(), "movies.json");
    const moviesData = fs.readFileSync(moviesPath, "utf-8");
    const allMovies = JSON.parse(moviesData);

    // Filter favorite movies by matching generated IDs
    const favoriteMovies = allMovies
      .filter((movie: any) => {
        const movieId = generateMovieId(movie.title);
        return currentUser?.favoriteIds?.includes(movieId);
      })
      .map((movie: any) => ({
        ...movie,
        id: generateMovieId(movie.title),
      }));

    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
