const GENRES = ['Fiction', 'Dystopian', 'Fantasy', 'Classic', 'Science'];

function Sidebar({ authors, selectedGenre, selectedAuthor, onGenreChange, onAuthorChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-heading">Genre</h3>
        <ul className="filter-list">
          {GENRES.map((genre) => (
            <li key={genre}>
              <button
                className={`filter-btn ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => onGenreChange(selectedGenre === genre ? null : genre)}
              >
                {genre}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">Author</h3>
        <ul className="filter-list">
          {authors.map((author) => (
            <li key={author}>
              <button
                className={`filter-btn ${selectedAuthor === author ? 'active' : ''}`}
                onClick={() => onAuthorChange(selectedAuthor === author ? null : author)}
              >
                {author}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {(selectedGenre || selectedAuthor) && (
        <button
          className="clear-filters-btn"
          onClick={() => {
            onGenreChange(null);
            onAuthorChange(null);
          }}
        >
          Clear All Filters
        </button>
      )}
    </aside>
  );
}

export default Sidebar;
