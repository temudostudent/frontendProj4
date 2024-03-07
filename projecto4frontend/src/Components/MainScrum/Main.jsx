import React from 'react';
import './Main.css';

function Main() {
  return (
    <main>
      <div className="titulo-main">
        <h2 className="main-home">To do</h2>
        <div className="panel" id="todo">
        </div>
      </div>
      <div className="titulo-main">
        <h2 className="main-home">Doing</h2>
        <div className="panel" id="doing">
        </div>
      </div>
      <div className="titulo-main">
        <h2 className="main-home">Done</h2>
        <div className="panel" id="done">
        </div>
      </div>
      <div id="delete-modal" className="modal">
        <div className="modal-content">
          <p>Are you sure you want to delete this task?</p>
          <button id="delete-button">Delete</button>
          <button id="cancel-delete-button">Cancel</button>
        </div>
      </div>
      <div id="restore-modal" className="modal">
        <div className="modal-content">
          <p>Are you sure you want to restore this task?</p>
          <button id="restore-button">Restore</button>
          <button id="cancel-restore-button">Cancel</button>
        </div>
      </div>
    </main>
  );
}

export default Main;