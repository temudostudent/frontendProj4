import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { MdEdit, MdDelete } from "react-icons/md";
import { useTaskStore } from '../../Stores/TaskStore'
import { useActionsStore } from '../../Stores/ActionStore'

const Task = ({ task , index , onDelete}) => {

  const { setSelectedTask } = useTaskStore();
  const { updateShowSidebar, updateIsEditing } = useActionsStore();

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

  const handleDeleteClick = async () => {
    onDelete(task.id);
  }

  const handleEditClick = () => {
    setSelectedTask(task);
    updateIsEditing(true);
    updateShowSidebar(false);
    console.log(task);
  };


  return (
    <Draggable draggableId={task.id} index={index}>

      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task ${snapshot.isDragging ? 'dragging' : ''} ${task.erased ? 'erased' : ''}`}
        >
          <div className='top-container'>
            <span>{task.owner.username}</span>
            {handleTaskPriority(task.priority)}
          </div>
          <div className='container-task'>
            <p>{task.title}</p>
            <div className='buttons-container'>
              <span onClick={handleEditClick}><MdEdit /></span>
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