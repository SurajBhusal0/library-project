import { useState } from 'react';
import BookGallery from './components/BookGallery';
import BookSubmission from './components/BookSubmission';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [refreshKey, setRefreshKey] = useState(0);

  function handleBookCreated() {
    setRefreshKey((k) => k + 1);
    setActiveTab('gallery');
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Library Book Registry</h1>
        <nav className="app-nav">
          <button
            className={`nav-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Browse Books
          </button>
          <button
            className={`nav-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add Book
          </button>
        </nav>
      </header>

      <div className="app-content">
        {activeTab === 'gallery' && <BookGallery refreshKey={refreshKey} />}
        {activeTab === 'add' && <BookSubmission onBookCreated={handleBookCreated} />}
      </div>
    </div>
  );
}

export default App;
