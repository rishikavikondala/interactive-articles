export type BlockType = "MCQ" | "Markdown";

export interface MCQObject {
  Question: string;
  CorrectOption: string;
  IncorrectOptions: string[];
  FeedbackOnIncorrect: string;
}

export interface MarkdownObject {
  Text: string;
}

export interface Block {
  Type: BlockType;
  Object: MCQObject | MarkdownObject;
}

export interface Article {
  id: string;
  name: string;
  Block: Block[];
}

export interface ArticleParams extends Record<string, string> {
  articleId: string;
}