/**
 * Fetch a single genre by ID.
 *
 * @param {number|string} id
 * @returns {Promise<{ id: number, title: string }>}
 */
export async function fetchGenreById(id) {
  const res = await fetch(`https://podcast-api.netlify.app/genre/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch genre (${res.status})`);
  }

  return res.json();
}

/**
 * Fetch genre titles for a list of genre IDs.
 *
 * @param {(number|string)[]} ids
 * @returns {Promise<string[]>}
 */
export async function fetchGenreTitles(ids = []) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return [];
  }

  // Avoid duplicate requests
  const uniqueIds = [...new Set(ids)];

  const genres = await Promise.all(
    uniqueIds.map((id) => fetchGenreById(id))
  );

  return genres.map((genre) => genre.title);
}