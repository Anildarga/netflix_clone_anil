import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import fs from "fs";
import path from "path";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { generateMovieId } from "@/lib/movieIdGenerator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Read movies.json for validation
    const moviesPath = path.join(process.cwd(), "movies.json");
    const moviesData = fs.readFileSync(moviesPath, "utf-8");
    const allMovies = JSON.parse(moviesData);

    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      // Validate movie exists in movies.json
      const existingMovie = allMovies.find(
        (m: any) => generateMovieId(m.title) === movieId
      );

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.query as { movieId: string };

      // Validate movie exists in movies.json
      const existingMovie = allMovies.find(
        (m: any) => generateMovieId(m.title) === movieId
      );

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }
    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
