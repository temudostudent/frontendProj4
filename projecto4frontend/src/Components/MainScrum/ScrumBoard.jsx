import React, { useState , useEffect } from 'react'
import { useTaskStore } from '../../Stores/TaskStore'
import { useActionsStore } from '../../Stores/ActionStore'
import AuthService from '../../Components/Service/AuthService'
import Task from '../../Components/CommonElements/Task'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import './ScrumBoard.css';

const ScrumBoard = (props) => {

  const {token , userData , taskData} = props
  const { selectedTask, updateTasks, setSelectedTask } = useTaskStore();
  const { updateShowSidebar, updateIsEditing } = useActionsStore();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchUserTasks();
  }, [token, userData, taskData]);


  const fetchUserTasks = async () => {
    try {
      const userTasks = await AuthService.getAllTasksFromUser(token, userData.username);
      updateTasks(userTasks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {

      if(taskId){

        setLoading(true);
        await AuthService.deleteTask(token, taskId);
  
        await fetchUserTasks();
        setLoading(false);
      }
      
    } catch (error) {
        console.error('Error deleting task:', error);
        setLoading(false);
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
      await AuthService.updateTaskStatus(token, taskId, newStateId);

      fetchUserTasks();

    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleNewTaskButton = () => {
    updateShowSidebar(false);
    updateIsEditing(false);
    setSelectedTask(null);
    console.log(selectedTask);
  }


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
              <button onClick={handleNewTaskButton}>&nbsp;+ New Task</button>
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