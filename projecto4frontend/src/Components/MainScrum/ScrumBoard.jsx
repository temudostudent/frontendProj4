import React, { useState , useEffect } from 'react'
import { actionStore } from '../../Stores/ActionStore'
import { useTaskStore } from '../../Stores/TaskStore'
import AuthService from '../../Components/Service/AuthService'
import Task from '../../Components/CommonElements/Task'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import './ScrumBoard.css';

const ScrumBoard = (props) => {

  const {token , userData , taskData} = props
  const updateShowModal = actionStore((state) => state.updateShowModal);
  const updateUserTasks = useTaskStore((state) => state.updateTasks);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchUserTasks();
  }, [token, userData]);


  const fetchUserTasks = async () => {
    try {
      const userTasks = await AuthService.getAllTasksFromUser(token, userData.username);
      updateUserTasks(userTasks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangeAddTaskButton = () => {
    updateShowModal(true);
  }

  const handleTaskDelete = async (taskId) => {
    try {
      
      setLoading(true);
      await AuthService.deleteTask(token, taskId);

      fetchUserTasks();
      setLoading(false);
      
    } catch (error) {
        console.error('Error deleting task:', error);
    }
  }


  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    try {
      const taskId = result.draggableId;
      const newStateId = parseInt(result.destination.droppableId);

      if (newStateId === parseInt(result.source.droppableId)) {
        return;
      }

      console.log(result);
      await AuthService.updateTaskStatus(token, taskId, newStateId);

      fetchUserTasks();

    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };


  const renderTasksByStatus = (status) => {

    return (
      
        <Droppable droppableId={status} >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`task_list ${status}`}
            >
              {taskData && taskData
                .filter((task) => task.stateId === parseInt(status))
                .map((task, index) => (
                  <Task key={task.id} task={task} index={index} onDelete={handleTaskDelete}/>
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
              {renderTasksByStatus("100")}
              <button onClick={handleChangeAddTaskButton}>&nbsp;+ New Task</button>
            </div>

            <div className="column column2">
              <div className="title">Doing</div>
              {renderTasksByStatus("200")}
            </div>

            <div className="column column3">
              <div className="title">Done</div>
              {renderTasksByStatus("300")}
            </div>
          </section>
        </DragDropContext>
        
      )}
    </main>
  );
}

export default ScrumBoard;