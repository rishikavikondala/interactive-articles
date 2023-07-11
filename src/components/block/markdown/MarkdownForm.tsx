import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Card, Col, Container, Form, Row, FormCheck } from 'react-bootstrap';
import { Block, MarkdownObject } from '../../../utils/types';
import BlockForm from '../BlockForm';
import Markdown from 'react-markdown';
import '../../../styles/block/markdown/styles.css';

interface MarkdownFormProps {
  markdown: MarkdownObject;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onChange: (updatedBlock: Block) => void;
}

const MarkdownForm: React.FC<MarkdownFormProps> = memo(({ markdown, onDelete, onMoveUp, onMoveDown, onChange }) => {
  const [currentMarkdown, setCurrentMarkdown] = useState(markdown);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setCurrentMarkdown(markdown);
  }, [markdown]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedMarkdown = { ...currentMarkdown, [e.target.name]: e.target.value };
    setCurrentMarkdown(updatedMarkdown);
    onChange({ Type: 'Markdown', Object: updatedMarkdown });
  }, [currentMarkdown, onChange]);

  const handlePreviewChange = useCallback(() => {
    setIsPreview(prev => !prev);
  }, []);

  const previewContent = useMemo(() => {
    if (!isPreview) return null;
    return (
      <Col sm={6}>
        <Card>
          <Card.Body>
            <Markdown>{currentMarkdown.Text}</Markdown>
          </Card.Body>
        </Card>
      </Col>
    );
  }, [isPreview, currentMarkdown]);

  return (
    <BlockForm onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown}>
      <Form.Group>
        <FormCheck
          type="switch"
          id="custom-switch"
          label="Preview Markdown"
          checked={isPreview}
          onChange={handlePreviewChange}
        />
        <Container>
          <Row>
            <Col sm={isPreview ? 6 : 12}>
              <Form.Control as="textarea" rows={3} name="Text" value={currentMarkdown.Text} onChange={handleChange} className="markdown-textarea" />
            </Col>
            {previewContent}
          </Row>
        </Container>
      </Form.Group>
    </BlockForm >
  );
});

export default MarkdownForm;
