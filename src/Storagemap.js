import React, { Component } from 'react'

export default class Storagemap extends Component {

  
  render() {
    const { savedDogs, storage } = this.props;

    return (
      <>
        <h2>Cachorros salvos</h2>
        <div className="saved-list-wrapper">

          { savedDogs(storage) }
        </div>
      </>
    )
  }
}
