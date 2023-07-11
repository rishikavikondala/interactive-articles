import { Article, Block, MCQObject, MarkdownObject } from "./types";

export const defaultArticle: Article = {
  id: "",
  name: "",
  Block: [],
};

export const defaultMCQBlock: Block = {
  Type: 'MCQ',
  Object: {
    Question: '',
    CorrectOption: '',
    IncorrectOptions: [],
    FeedbackOnIncorrect: '',
  } as MCQObject,
};

export const defaultMarkdownBlock: Block = {
  Type: 'Markdown',
  Object: {
    Text: '',
  } as MarkdownObject,
};