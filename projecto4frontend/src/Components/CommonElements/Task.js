import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdEdit, MdDelete } from "react-icons/md";

const Task = ({ task, index }) => {

  const handleTaskPriority = (priority) => {
    if (priority === 100) {
      return <span className='priority-color low'></span>;
    } else if (priority === 200) {
      return <span className='priority-color medium'></span>;
    } else {
      return <span className='priority-color high'></span>;
    }
  }

  return (
    <Draggable draggableId={task.id}>

      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
          onClick={() => console.log(task)}
          onDragStart={() => console.log("Arrastando tarefa com ID:", task.id)}
        >
          {handleTaskPriority(task.priority)}
          <div className='container-task'>
            <p>{task.title}</p>
            <div className='buttons-container'>
              <span ><MdEdit /></span>
              <span ><MdDelete /></span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Task;