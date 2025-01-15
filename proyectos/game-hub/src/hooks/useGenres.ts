import genresService from "@/services/genres-service";
import { ApiResponse } from "@/types/api";
import { Genre } from "@/types/genre";
import { useEffect, useState } from "react";

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { response, cancel } = genresService.getAll<ApiResponse<Genre>>();

    response
      .then(({ results: data }) => {
        setGenres(data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setError(error.message);
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

  return { genres, error, isLoading, setGenres, setError };
};

export default useGenres;
