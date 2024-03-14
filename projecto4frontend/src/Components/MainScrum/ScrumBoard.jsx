import React, { useState , useEffect } from 'react'
import { userStore } from '../../Stores/UserStore'
import { actionStore } from '../../Stores/ActionStore'
import { taskStore } from '../../Stores/TaskStore'
import AuthService from '../../Components/Service/AuthService'
import { MdEdit, MdDelete } from "react-icons/md"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './ScrumBoard.css';

const ScrumBoard = (props) => {

  const token = userStore((state) => state.token);
  const updateShowModal = actionStore((state) => state.updateShowModal);
  const taskStored = taskStore((state) => state.taskStored);
  const updateTaskStore = taskStore((state) => state.updateTaskStore);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchUserTasks();
  }, [token]);


  const fetchUserTasks = async () => {
    try {
      const username = await AuthService.getUsername(token);
      const userTasks = await AuthService.getAllTasksFromUser(token, username);
      setTaskData(userTasks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangeAddTaskButton = () => {
    updateShowModal(true);
  }

  const handleTaskPriority = (priority) => {
    if (priority === 100) {
      return <span className='priority-color low'></span>;
    } else if (priority === 200) {
      return <span className='priority-color medium'></span>;
    } else {
      return <span className='priority-color high'></span>;
    }
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(taskData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTaskData(items.map((task, index) => ({
      ...task,
      stateId: index === result.destination.index ? result.destination.droppableId : task.stateId
    })));
    
  }


  const renderTasksByStatus = (status) => {
    return (
      <Droppable droppableId={status.toString()} key={status}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`task_list list${status}`}
          >
            {taskData && taskData
              .filter(task => task.stateId === status)
              .map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="task"
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
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }


  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <section className="scrum_section">
            <div className="column column1">
              <div className="title">To Do</div>
              {renderTasksByStatus(100)}
              <button onClick={handleChangeAddTaskButton}>&nbsp;+ New Task</button>
            </div>

            <div className="column column2">
              <div className="title">Doing</div>
              {renderTasksByStatus(200)}
            </div>

            <div className="column column3">
              <div className="title">Done</div>
              {renderTasksByStatus(300)}
            </div>
          </section>
        </DragDropContext>
      )}
    </main>
  );
}

export default ScrumBoard;