import useGenres from './useGenres';

export default function (id?: number) {
  const { data: genres } = useGenres();
  return genres?.results.find((g) => g.id === id);
}
