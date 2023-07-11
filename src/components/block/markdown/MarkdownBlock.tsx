import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MarkdownObject } from '../../../utils/types';

interface MarkdownBlockProps {
  markdown: MarkdownObject;
}

const MarkdownBlock: React.FC<MarkdownBlockProps> = ({ markdown }) => {
  return <ReactMarkdown>{markdown.Text}</ReactMarkdown>;
};

export default MarkdownBlock;
