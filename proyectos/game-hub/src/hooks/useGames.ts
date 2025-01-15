import { Game } from '@/types/games';
import gamesService from '@/services/games-service';
import useData from './useData';
import { Platform } from '@/types/platform';
import { Genre } from '@/types/genre';

const useGames = (
  selectedGenre: Genre | null,
  selectedPlatform: Platform | null,
) => {
  const urlParams = new URLSearchParams();
  if (selectedGenre) urlParams.append('genres', selectedGenre.id.toString());
  if (selectedPlatform)
    urlParams.append('platforms', selectedPlatform.id.toString());

  return useData<Game>(gamesService(urlParams), [
    selectedGenre?.id,
    selectedPlatform?.id,
  ]);
};

export default useGames;
