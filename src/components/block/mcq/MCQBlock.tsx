import React, { useState, useEffect, useCallback, memo } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { MCQObject } from '../../../utils/types';
import _ from 'lodash';
import '../../../styles/block/mcq/styles.css'

interface MCQBlockProps {
  mcq: MCQObject;
}

const CORRECT_ANSWER_MESSAGE = 'Correct!';
const ALERT_SUCCESS = 'success';
const ALERT_DANGER = 'danger';

const MCQBlock: React.FC<MCQBlockProps> = memo(({ mcq }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(_.shuffle([mcq.CorrectOption, ...mcq.IncorrectOptions]));
  }, [mcq]);

  const handleOptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(null);
    setSelectedOption(event.target.value);
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    if (selectedOption === mcq.CorrectOption) {
      setFeedback(CORRECT_ANSWER_MESSAGE);
    } else {
      setFeedback(mcq.FeedbackOnIncorrect);
    }
  }, [selectedOption, mcq]);

  return (
    <Card className="card-container">
      <Card.Body>
        <Card.Title>{mcq.Question}</Card.Title>
        <Form onSubmit={handleSubmit}>
          {options.map((option, index) => (
            <Form.Check
              key={`${option}-${index}`}
              type="radio"
              label={option}
              name={mcq.Question}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
          ))}
          <Button variant="primary" type="submit" disabled={selectedOption === null} className="submit-button">
            Submit
          </Button>
          {feedback && (
            <Alert variant={feedback === CORRECT_ANSWER_MESSAGE ? ALERT_SUCCESS : ALERT_DANGER} >{feedback}</Alert>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
});

export default MCQBlock;
