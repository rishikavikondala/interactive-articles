import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, Spinner, Alert } from 'react-bootstrap';
import { Article, MCQObject, MarkdownObject, ArticleParams, Block } from '../../utils/types';
import { getArticle } from '../../services/articleService';
import MarkdownBlock from '../../components/block/markdown/MarkdownBlock';
import MCQBlock from '../../components/block/mcq/MCQBlock';
import { defaultArticle } from '../../utils/constants';
import '../../styles/article/styles.css';

const ArticleViewer: React.FC = () => {
  const { articleId } = useParams<ArticleParams>();
  const [article, setArticle] = useState<Article>(defaultArticle);
  const [loading, setLoading] = useState(true);
  const [articleNotFound, setArticleNotFound] = useState(false);

  const fetchArticle = useCallback(async () => {
    if (articleId) {
      const articleFromFirebase = await getArticle(articleId);
      if (articleFromFirebase) {
        setArticle(articleFromFirebase);
      } else {
        setArticleNotFound(true);
      }
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const renderBlock = (block: Block, index: number) => {
    if (block.Type === 'MCQ') {
      return (
        <div key={index} className="block-viewer">
          <MCQBlock mcq={block.Object as MCQObject} />
        </div>
      );
    } else if (block.Type === 'Markdown') {
      return (
        <div key={index} className="block-viewer">
          <MarkdownBlock markdown={block.Object as MarkdownObject} />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {articleNotFound ? (
        <Alert variant="danger">Article with ${articleId} not found.</Alert>
      ) : loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          <Navbar className="nav-bar" bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand className="navbar-title">{article.name}</Navbar.Brand>
          </Navbar>
          <div className='pt-5'>
            {article.Block.map(renderBlock)}
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleViewer;
