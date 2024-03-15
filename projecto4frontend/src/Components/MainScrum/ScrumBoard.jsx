import React, { useState , useEffect } from 'react'
import { userStore } from '../../Stores/UserStore'
import { actionStore } from '../../Stores/ActionStore'
import { useTaskStore } from '../../Stores/TaskStore'
import AuthService from '../../Components/Service/AuthService'
import Task from '../../Components/CommonElements/Task'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { toast } from 'react-toastify'
import './ScrumBoard.css';

const ScrumBoard = (props) => {

  const token = userStore((state) => state.token);
  const updateShowModal = actionStore((state) => state.updateShowModal);
  const taskStore = useTaskStore((state) => state);
  const { taskData, updateTasks } = taskStore;
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchUserTasks();
  }, [token]);


  const fetchUserTasks = async () => {
    try {
      const username = await AuthService.getUsername(token);
      const userTasks = await AuthService.getAllTasksFromUser(token, username);
      updateTasks(userTasks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangeAddTaskButton = () => {
    updateShowModal(true);
  }

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    try {
      const taskId = result.draggableId;
      const newStateId = parseInt(result.destination.droppableId);
      console.log(result);
      await AuthService.updateTaskStatus(token, taskId, newStateId);

      fetchUserTasks();

    } catch (error) {
      console.error('Error updating task status:', error);
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          toast.warning('Invalid credentials');
        } else if (status === 404) {
          toast.warning('Task not found or invalid status');
        } else {
          toast.error('An unexpected error occurred');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };


  const renderTasksByStatus = (status) => {
    let droppableId;
    switch (status) {
      case 100:
        droppableId = "100";
        break;
      case 200:
        droppableId = "200";
        break;
      case 300:
        droppableId = "300";
        break;
      default:
        droppableId = status.toString();
    }

    return (
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`task_list ${status}`}
          >
            {taskData && taskData
              .filter(task => task.stateId === status)
              .map((task) => (
                <Task key={task.id} task={task} />
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