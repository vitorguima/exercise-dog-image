import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: '',
      loading: true,
      count: 0,
      dogName: '',
      dogs: [],
    }

    this.fetchDogs = this.fetchDogs.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlerChanges = this.handlerChanges.bind(this);
  }

  fetchDogs() {
    const Url = 'https://dog.ceo/api/breeds/image/random'
    this.setState(
      { loading: true },
      () => {fetch(Url)
      .then((response) => response.json())
      .then(({ message }) => this.setState(({ count, dogs }) => ({
        image: message,
        loading: false,
        count:  count + 1,
      })))
      .then(() => localStorage.setItem(this.state.count, this.state.image))
      }
    );
  }

  shouldComponentUpdate(_nextProps, { image }) {
    return !image.includes('terrier');
  }

  handleSearch() {
    this.fetchDogs();
    window.alert(this.state.image.split('/')[4].split('-').join(' '));
  }

  componentDidMount() {
    this.fetchDogs();
  }

  handlerChanges({ target }) {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }))
  }

  render() {
    const { image, loading, dogName, } = this.state;
    
    return (
      <div className="App">
        <h1>{ dogName }</h1>
       <div className="image-wrapper">
      { loading === true ? "Loading..." : <img src={image} /> }
      </div> 
      <button onClick={ this.handleSearch }>Search</button>
      <label for="dogName">
        Defina um nome
        <input 
          type="text"
          name="dogName"
          onChange={ this.handlerChanges }
        />
      </label>
      </div>
    );
  }
}

export default App;
