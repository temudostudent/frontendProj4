import React from "react";
import { grid, borderRadius } from "../styles/constants";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "../styles/list";
import Title from "../styles/title";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;

const Task = (props) => {
  const title = props.title;
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
         
        </Container>
      )}
    </Draggable>
  );
};

export default Column;