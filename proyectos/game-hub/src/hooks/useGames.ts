import gamesService from "@/services/games-service";
import { ApiResponse } from "@/types/api";
import { Game } from "@/types/games";
import { useEffect, useState } from "react";

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { response, cancel } = gamesService.getAll<ApiResponse<Game>>();

    response
      .then(({ results: data }) => {
        setGames(data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setError(error.message);
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

  return { games, error, isLoading, setGames, setError };
};

export default useGames;
