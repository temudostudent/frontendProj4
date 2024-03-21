import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { MdEdit, MdDelete, MdOutlineRestore } from "react-icons/md";
import { useTaskStore } from '../../Stores/TaskStore'
import { useActionsStore } from '../../Stores/ActionStore'


const Task = ({ task , index , onEraseStatusChange, onTaskDoubleClick }) => {

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
    onEraseStatusChange(task.id);
  }

  const handleRestoreClick = async () => {
    onEraseStatusChange(task.id);
  }

  const handleEditClick = () => {
    setSelectedTask(task);
    updateIsEditing(true);
    updateShowSidebar(false);
    console.log(task);
  };

  const handleDoubleClick = () => {
    onTaskDoubleClick(task);
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
          onDoubleClick={handleDoubleClick}
        >
          <div className='top-container'>
            <span>{task.owner.username}</span>
            {handleTaskPriority(task.priority)}
          </div>
          <div className='container-task'>
            <div className='text-container'>
              <p>{task.title}</p>
              <p style={{ fontSize: '8px' }}>{task.category.name}</p>
            </div>
            <div className='buttons-container'>
              <span onClick={handleEditClick}><MdEdit /></span>

              {task.erased && (
                <span onClick={handleRestoreClick}><MdOutlineRestore /></span>
              )}

              {!task.erased && (
                <span onClick={handleDeleteClick}><MdDelete /></span>
              )}
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