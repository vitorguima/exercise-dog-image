import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: '',
      loading: true,
      count: 0,
    }

    this.fetchDogs = this.fetchDogs.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  fetchDogs() {
    const Url = 'https://dog.ceo/api/breeds/image/random'
    this.setState(
      { loading: true },
      () => {fetch(Url)
      .then((response) => response.json())
      .then(({ message }) => this.setState((state) => ({
        image: message,
        loading: false,
        count:  state.count + 1,
      })))
      .then(() => localStorage.setItem(this.state.count, this.state.image))
      }
    )
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

  render() {
    const { image, loading } = this.state;
    
    return (
      <div className="App">
       <div className="image-wrapper">
      { loading === true ? "Loading..." : <img src={image} /> }
      </div> 
      <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default App;
