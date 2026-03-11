function BookList({ books }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>No books found matching these filters.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-card-header">
            <h3 className="book-title">{book.title}</h3>
            <span className="book-genre-badge">{book.genre}</span>
          </div>
          <p className="book-author">by {book.author}</p>
          <div className="book-meta">
            <span>{book.pages} pages</span>
            <span>Published {book.publishedYear}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
