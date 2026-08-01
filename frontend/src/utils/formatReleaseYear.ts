export function formatReleaseYear(releaseDate?: string): number | null {
  if (!releaseDate) return null;
  
  // Try parsing first 4 characters if it looks like ISO (e.g. 2024-01-01)
  const yearMatch = releaseDate.match(/^(\d{4})/);
  if (yearMatch) {
    return parseInt(yearMatch[1], 10);
  }

  // Fallback to Date parsing
  const date = new Date(releaseDate);
  if (!isNaN(date.getTime())) {
    return date.getFullYear();
  }

  return null;
}
