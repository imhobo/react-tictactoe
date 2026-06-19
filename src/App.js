
import React from 'react';
import Game from './component/Game'

function App() {
  return (
    <div className="layout">
      <Game />
      <p style={{textAlign: 'center', marginTop: '20px', color: '#666'}}>
        Deployed via CI/CD pipeline 🚀
      </p>
    </div>
  );
}

export default App;
