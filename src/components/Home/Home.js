import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Employee management DEMO</h1>
      <nav>
        <ul>
          <li><Link to="/add-employee">Dodaj pracownika</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
