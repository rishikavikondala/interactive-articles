import React from 'react';
import { Form } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, MultiValue } from 'react-select';
import { Block, MCQObject } from '../../../utils/types';
import BlockForm from '../BlockForm';
import '../../../styles/block/mcq/styles.css'

interface MCQFormProps {
  mcq: MCQObject;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onChange: (updatedBlock: Block) => void;
}

interface SelectOption {
  label: string;
  value: string;
}

const MCQForm: React.FC<MCQFormProps> = ({ mcq, onDelete, onMoveUp, onMoveDown, onChange }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ Type: 'MCQ', Object: { ...mcq, [e.target.name]: e.target.value } });
  };

  const handleIncorrectOptionsChange = (options: MultiValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => {
    onChange({ Type: 'MCQ', Object: { ...mcq, IncorrectOptions: options.map(option => option.value) } });
  };

  const incorrectOptionsValues = mcq.IncorrectOptions.map(option => ({
    label: option,
    value: option,
  }));

  return (
    <BlockForm onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown}>
      <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control
          type="text"
          name="Question"
          value={mcq.Question}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Correct Option</Form.Label>
        <Form.Control
          type="text"
          name="CorrectOption"
          value={mcq.CorrectOption}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Incorrect Options</Form.Label>
        <CreatableSelect
          isMulti
          name="IncorrectOptions"
          value={incorrectOptionsValues}
          onChange={handleIncorrectOptionsChange}
          options={incorrectOptionsValues}
          className="basic-multi-select"
          classNamePrefix="select"
          noOptionsMessage={() => null}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Feedback on Incorrect Answer</Form.Label>
        <Form.Control
          type="text"
          name="FeedbackOnIncorrect"
          value={mcq.FeedbackOnIncorrect}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </BlockForm>
  );
};

export default MCQForm;