import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import 'semantic-ui-css/semantic.min.css'
import Grids from'./grid'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {fields: {}}
  }
  onSubmit = (fields) => {
    this.setState({fields})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to shopping mart</h1>
        </header>
        <Grids />
      </div>
    );
  }
}

export default App;
