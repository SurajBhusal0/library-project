import { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import BookList from './BookList';
import { fetchBooks } from '../services/bookService';

const BOOKS_PER_PAGE = 4;

function BookGallery({ refreshKey }) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAuthors = useCallback(async () => {
    try {
      const allBooks = await fetchBooks();
      const uniqueAuthors = [...new Set(allBooks.map((b) => b.author))].sort();
      setAuthors(uniqueAuthors);
    } catch {
      setAuthors([]);
    }
  }, []);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = {};
      if (selectedGenre) filters.genre = selectedGenre;
      if (selectedAuthor) filters.author = selectedAuthor;
      const data = await fetchBooks(filters);
      setBooks(data);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to load books. Make sure the backend is running.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [selectedGenre, selectedAuthor]);

  useEffect(() => {
    loadAuthors();
  }, [loadAuthors, refreshKey]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks, refreshKey]);

  const totalPages = Math.max(1, Math.ceil(books.length / BOOKS_PER_PAGE));
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const paginatedBooks = books.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  const activeFilterLabel = [
    selectedGenre && `Genre: ${selectedGenre}`,
    selectedAuthor && `Author: ${selectedAuthor}`,
  ]
    .filter(Boolean)
    .join(' & ');

  return (
    <div className="gallery-layout">
      <Sidebar
        authors={authors}
        selectedGenre={selectedGenre}
        selectedAuthor={selectedAuthor}
        onGenreChange={setSelectedGenre}
        onAuthorChange={setSelectedAuthor}
      />

      <main className="gallery-main">
        {activeFilterLabel && (
          <div className="active-filters">
            Filtering by: <strong>{activeFilterLabel}</strong>
          </div>
        )}

        {loading && <div className="loading-indicator">Loading books...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && <BookList books={paginatedBooks} />}

        {!loading && !error && books.length > BOOKS_PER_PAGE && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default BookGallery;
