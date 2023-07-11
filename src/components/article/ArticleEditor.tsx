import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Spinner, Alert, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Save, House, Eye } from 'react-bootstrap-icons';
import MCQForm from '../../components/block/mcq/MCQForm';
import MarkdownForm from '../../components/block/markdown/MarkdownForm';
import { Article, Block, MCQObject, MarkdownObject, ArticleParams } from '../../utils/types';
import { getArticle, updateArticle } from '../../services/articleService';
import { defaultArticle, defaultMCQBlock, defaultMarkdownBlock } from '../../utils/constants';
import '../../styles/article/styles.css';

const ArticleEditor: React.FC = () => {
  const params = useParams<ArticleParams>();
  const navigate = useNavigate();
  const articleId = params.articleId;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [articleNotFound, setArticleNotFound] = useState(false);
  const [article, setArticle] = useState<Article>(defaultArticle);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedArticle = { ...article, [e.target.name]: e.target.value };
    setArticle(updatedArticle);
    setHasUnsavedChanges(true);
  };

  const saveArticle = useCallback(async () => {
    setSaving(true);
    if (articleId) {
      await updateArticle(articleId, article);
    }
    setHasUnsavedChanges(false);
    setSaving(false);
  }, [articleId, article]);

  const handleBlockChange = useCallback((index: number, block: Block) => {
    const updatedArticle = { ...article, Block: article.Block.map((b, i) => i === index ? block : b) };
    setArticle(updatedArticle);
    setHasUnsavedChanges(true);
  }, [article]);

  const addBlock = useCallback((block: Block) => {
    const updatedArticle = { ...article, Block: [...article.Block, block] };
    setArticle(updatedArticle);
    setHasUnsavedChanges(true);
  }, [article]);

  const removeBlock = useCallback((index: number) => {
    const newBlocks = [...article.Block];
    newBlocks.splice(index, 1);
    const updatedArticle = { ...article, Block: newBlocks };
    setArticle(updatedArticle);
    setHasUnsavedChanges(true);
  }, [article]);

  const moveBlock = useCallback((index: number, direction: number) => {
    const newBlocks = [...article.Block];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex === newBlocks.length) return;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    const updatedArticle = { ...article, Block: newBlocks };
    setArticle(updatedArticle);
    setHasUnsavedChanges(true);
  }, [article]);

  const navigateHome = () => {
    navigate('/');
  }

  const navigatePreview = () => {
    navigate(`/viewer/${articleId}`);
  }

  return (
    <div>
      <Navbar className="nav-bar" bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand className="navbar-title">Article Editor</Navbar.Brand>
        <div className="editor-buttons">
          {hasUnsavedChanges && !saving && (
            <span className="text-warning align-middle">You have unsaved changes</span>
          )}
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Home</Tooltip>}
          >
            <Button variant="primary" onClick={navigateHome}>
              <House />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Save</Tooltip>}>
            <Button variant="primary" onClick={saveArticle}>
              {saving ? <Spinner animation="border" role="status" size='sm' /> : <Save />}
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Preview</Tooltip>}>
            <Button variant="primary" onClick={navigatePreview}>
              <Eye />
            </Button>
          </OverlayTrigger>
        </div>
      </Navbar>

      <div className='pt-5'>
        {loading ? (
          <div className="spinner-container">
            <Spinner animation="border" role="status" />
          </div>
        ) : articleNotFound ? (
          <Alert variant="danger">No such document!</Alert>
        ) : (
          <>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={article.name} onChange={handleNameChange} required />
              </Form.Group>
            </Form>
            <br />
            {article.Block.map((block, index) => {
              if (block.Type === 'MCQ') {
                return (
                  <div key={index} className='mb-3'>
                    <MCQForm
                      mcq={block.Object as MCQObject}
                      onDelete={() => removeBlock(index)}
                      onMoveUp={() => moveBlock(index, -1)}
                      onMoveDown={() => moveBlock(index, 1)}
                      onChange={(updatedBlock: Block) => handleBlockChange(index, updatedBlock)}
                    />
                  </div>
                );
              }
              else if (block.Type === 'Markdown') {
                return (
                  <div key={index} className='mb-3'>
                    <MarkdownForm
                      markdown={block.Object as MarkdownObject}
                      onDelete={() => removeBlock(index)}
                      onMoveUp={() => moveBlock(index, -1)}
                      onMoveDown={() => moveBlock(index, 1)}
                      onChange={(updatedBlock: Block) => handleBlockChange(index, updatedBlock)}
                    />
                  </div>
                );
              }
              return null;
            })}
            <div className="d-flex justify-content-center mb-3">
              <Button className="right-indent" onClick={() => addBlock(defaultMCQBlock)}>Create MCQ Block</Button>
              <Button className="left-indent" onClick={() => addBlock(defaultMarkdownBlock)}>Create Markdown Block</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleEditor;
