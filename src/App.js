import React from 'react';
import Home from './Components/Home';
import './App.css';
import { Provider } from "react-redux";
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Welcome To Product Application</h1>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
