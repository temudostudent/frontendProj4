import React from 'react';
import './ScrumBoard.css';

const ScrumBoard = () => {
  return (
    <main>
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
    </main>
  );
}

export default ScrumBoard;