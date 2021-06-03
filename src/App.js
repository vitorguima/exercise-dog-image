import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: '',
      loading: true,
      dogName: '',
      dogs: [],
      localStorage: JSON.parse(localStorage.getItem('dogs')),
    }

    this.fetchDogs = this.fetchDogs.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlerChanges = this.handlerChanges.bind(this);
    this.saveDogToList = this.saveDogToList.bind(this);
  }

  fetchDogs() {
    const Url = 'https://dog.ceo/api/breeds/image/random'
    this.setState(
      { loading: true },
      () => {fetch(Url)
      .then((response) => response.json())
      .then(({ message }) => this.setState(({ count }) => ({
        image: message,
        loading: false,
      })))
      }
    );
  }

  shouldComponentUpdate(_nextProps, { image }) {
    return !image.includes('terrier');
  }

  handleSearch() {
    this.fetchDogs();
  }

  componentDidMount() {
    this.fetchDogs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.image !== this.state.image) {
      window.alert(this.state.image.split('/')[4].split('-').join(' '));
    }
  }

  handlerChanges({ target }) {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }))
  }

  saveDogToList() {
    const { dogName, image } = this.state;

    this.setState((state) => ({
      dogs: [...state.dogs, ({ dogName, image })]
    }), () => {
      localStorage.setItem('dogs', JSON.stringify(this.state.dogs));
    })
  }

  render() {
    const { image, loading, dogName, } = this.state;
    
    return (
      <div className="App">
        <h1>{ dogName }</h1>
       <div className="image-wrapper">
      { loading === true ? "Loading..." : <img src={image} alt="random dog"/> }
      </div> 
      <button 
        onClick={ this.handleSearch }
      > 
        Change Dog
      </button>
      <button 
        type="button" 
        onClick={ this.saveDogToList }
      >
        Save dog
      </button>
      <form>
        <label htmlFor="dogName">
          Defina um nome
          <input 
            type="text"
            name="dogName"
            onChange={ this.handlerChanges }
          />
        </label>
        <label for="submit">
        </label>
      </form>
      </div>
    );
  }
}

export default App;
