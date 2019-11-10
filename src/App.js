import React from 'react';

import {
  saveStateInSession,
  fetchStateFromSession,
} from './utils/persistentState';
import Board from './components/Board';
import './App.css';

const keySession = 'tickets';
const allTickets = fetchStateFromSession(keySession) || {};

const handleTicketsChange = (status, tickets) => { 
  allTickets[status] = tickets;
  saveStateInSession(keySession, allTickets);
}

const statuses = {
  todo: 'To-Do',
  ongoing: 'In progress',
  done: 'Done',
};

function App() {
  return (
    <div className="App">
      <Board
        columns={statuses}
        tickets={allTickets}
        onChange={handleTicketsChange}
      />
    </div>
  );
}

export default App;
