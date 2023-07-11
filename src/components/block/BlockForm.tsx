import React from 'react';
import { Button, ButtonGroup, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ArrowUpCircle, ArrowDownCircle, Trash } from 'react-bootstrap-icons';
import '../../styles/block/styles.css'

interface BlockFormProps {
  children: React.ReactNode;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const BlockForm: React.FC<BlockFormProps> = ({ children, onDelete, onMoveUp, onMoveDown }) => {
  return (
    <Card className="block-form">
      <Card.Body>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Delete Block</Tooltip>}
        >
          <Button variant="link" className="delete-button" onClick={onDelete}>
            <Trash />
          </Button>
        </OverlayTrigger>

        {children}

        <ButtonGroup className="move-buttons">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Move Block Up</Tooltip>}
          >
            <Button variant="link" onClick={onMoveUp}>
              <ArrowUpCircle />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Move Block Down</Tooltip>}
          >
            <Button variant="link" onClick={onMoveDown}>
              <ArrowDownCircle />
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default BlockForm;
