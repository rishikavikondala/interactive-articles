import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleViewer from './components/article/ArticleViewer';
import ArticleEditor from './components/article/ArticleEditor';
import AllArticles from './components/article/AllArticles';
import './styles/App.css';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/viewer/:articleId" element={<ArticleViewer />} />
          <Route path="/editor/:articleId" element={<ArticleEditor />} />
          <Route path="/" element={<AllArticles />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
