import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { MdEdit, MdDelete } from "react-icons/md";

const Task = ({ task , index , onDelete}) => {

  const handleTaskPriority = (priority) => {
    let priorityClass = 'priority-color ';
    if (priority === 100) {
      priorityClass += 'low';
    } else if (priority === 200) {
      priorityClass += 'medium';
    } else {
      priorityClass += 'high';
    }
    return <span className={priorityClass}></span>;
  }

  const handleDeleteClick = () => {
    onDelete(task.id);
    console.log(task);
  }


  return (
    <Draggable draggableId={task.id} index={index}>

      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
        >
          {handleTaskPriority(task.priority)}
          <div className='container-task'>
            <p>{task.title}</p>
            <div className='buttons-container'>
              <span ><MdEdit /></span>
              <span onClick={handleDeleteClick}><MdDelete /></span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task;