import React, { useState , useEffect } from 'react';
import { userStore } from '../../Stores/UserStore'
import AuthService from '../../Components/Service/AuthService'
import './ScrumBoard.css';

const ScrumBoard = (props) => {

  const token = userStore((state) => state.token);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);


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
    
  }

  return (
    <main>
      {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
          <section className="scrum_section">
                    <div className="column column1">
                    <div className="title">To Do</div>
                    <section className="task_list list1"></section>
                        <button>&nbsp;+ New Task</button>
                    </div>

                    <div className="column column2">
                    <div className="title">Doing</div>
                    <section className="task_list list2"></section>
                    </div>

                    <div className="column column3">
                    <div className="title">Done</div>
                    <section className="task_list list3"></section>
                    </div>
            </section>
            </>
         )}
    </main>
  );
}

export default ScrumBoard;