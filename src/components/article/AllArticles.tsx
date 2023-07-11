import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Navbar, Spinner, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { PencilSquare, Trash, PlusSquare, Eye } from 'react-bootstrap-icons';
import '../../styles/article/styles.css';
import { createArticle, deleteArticle, getArticleIds } from '../../services/articleService';

interface ArticleMetadata {
  id: string;
  name: string;
}

const AllArticles: React.FC = () => {
  const navigate = useNavigate();
  const [articleIds, setArticleIds] = useState<ArticleMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const ids = await getArticleIds();
      setArticleIds(ids);
    } catch (error) {
      setErrorMessage('Error fetching articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleCreateArticle = async () => {
    try {
      const id = await createArticle();
      navigate(`/editor/${id}`);
    } catch (error) {
      setErrorMessage('Error creating a new article. Please try again later.');
    }
  };

  const handleDeleteArticle = async (id: string) => {
    setLoading(true);
    try {
      await deleteArticle(id);
      const updatedArticleIds = articleIds.filter(article => article.id !== id);
      setArticleIds(updatedArticleIds);
    } catch (error) {
      setErrorMessage('Error deleting article. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const readArticle = (id: string) => {
    navigate(`/viewer/${id}`);
  }

  const editArticle = (id: string) => {
    navigate(`/editor/${id}`);
  }

  return (
    <div>
      <Navbar className="nav-bar" bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand className="navbar-title">Your Articles</Navbar.Brand>
        <div className="spacer" />
        <Button className="new-article-button" onClick={handleCreateArticle}>
          <PlusSquare className="right-indent" /> New Article
        </Button>
      </Navbar>

      <div className='article-container'>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {loading ? (
          <div className="spinner-container">
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          articleIds.map(({ id, name }) => (
            <div key={id} className="article-entry">
              <h3>{name}</h3>
              <div className="article-buttons">
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit Article</Tooltip>}>
                  <Button variant="link" onClick={() => editArticle(id)} className="article-action-button">
                    <PencilSquare />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Preview Article</Tooltip>}>
                  <Button variant="link" onClick={() => readArticle(id)} className="article-action-button">
                    <Eye />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete Article</Tooltip>}>
                  <Button variant="link" onClick={() => handleDeleteArticle(id)} className="article-action-button">
                    <Trash />
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllArticles;
