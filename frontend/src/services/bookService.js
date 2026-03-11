const BASE_URL = '/books';

export async function fetchBooks(filters = {}) {
  const params = new URLSearchParams();

  if (filters.author) {
    params.append('author', filters.author);
  }
  if (filters.genre) {
    params.append('genre', filters.genre);
  }

  const query = params.toString();
  const url = query ? `${BASE_URL}?${query}` : BASE_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.statusText}`);
  }
  return response.json();
}

export async function createBook(bookData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw { status: response.status, errors: errorBody };
  }
  return response.json();
}
