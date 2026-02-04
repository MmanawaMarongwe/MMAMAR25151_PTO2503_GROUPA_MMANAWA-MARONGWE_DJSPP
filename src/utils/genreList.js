/**
 * Get genre titles from a list of genre IDs.
 *
 * @param {Array<string|number>} genreIds - Selected genre IDs.
 * @param {Array<{id: string|number, title: string}>} [allGenres=[]] - All available genres.
 * @returns {string[]} Matched genre titles.
 */
export function genreList(genreIds, allGenres = []) {
  if (!Array.isArray(genreIds)) return [];

  return genreIds
    .map((id) => allGenres.find((g) => g.id === id)?.title)
    .filter(Boolean);
}
