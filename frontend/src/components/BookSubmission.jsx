import { useState } from 'react';
import { createBook } from '../services/bookService';

const INITIAL_FORM = {
  title: '',
  author: '',
  genre: '',
  pages: '',
  publishedYear: '',
};

function BookSubmission({ onBookCreated }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre.trim(),
      pages: form.pages ? parseInt(form.pages, 10) : null,
      publishedYear: form.publishedYear ? parseInt(form.publishedYear, 10) : null,
    };

    try {
      const created = await createBook(payload);
      setSuccessMessage(`"${created.title}" has been added successfully.`);
      setForm(INITIAL_FORM);
      if (onBookCreated) onBookCreated();
    } catch (err) {
      if (err.errors && typeof err.errors === 'object') {
        setErrors(err.errors);
      } else {
        setErrors({ _general: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="submission-container">
      <h2 className="submission-heading">Add a New Book</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errors._general && <div className="error-message">{errors._general}</div>}

      <form className="submission-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
          {errors.author && <span className="field-error">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            name="genre"
            type="text"
            value={form.genre}
            onChange={handleChange}
            placeholder="e.g. Fiction, Dystopian, Fantasy"
          />
          {errors.genre && <span className="field-error">{errors.genre}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pages">Pages</label>
            <input
              id="pages"
              name="pages"
              type="number"
              min="1"
              value={form.pages}
              onChange={handleChange}
              placeholder="Number of pages"
            />
            {errors.pages && <span className="field-error">{errors.pages}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="publishedYear">Published Year</label>
            <input
              id="publishedYear"
              name="publishedYear"
              type="number"
              min="1"
              max="2026"
              value={form.publishedYear}
              onChange={handleChange}
              placeholder="e.g. 1984"
            />
            {errors.publishedYear && (
              <span className="field-error">{errors.publishedYear}</span>
            )}
          </div>
        </div>

        <button className="submit-btn" type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}

export default BookSubmission;
