import React, { Component } from 'react'

export default class NearbyPlace extends Component {
  render() {
    let photo = this.props.placeData.photos?.length &&
    (<img src={this.props.placeData.photos[0].getUrl()} className="card-img-top w-25" alt="..." />)

    return (
      <div className="col mb-4">
        <div className="card">
            <h5 className="card-title text-center mb-0">
              { this.props.placeData.name }
            </h5>
            <div className="card-body  text-center pt-1 pb-1">
              {photo}
            </div>
            <div className="card-footer  text-center">
            <a href="#" onClick={(e) => this.props.chooseDestination(this.props.placeData.name)} 
              className="btn btn-primary">Escoger como destino</a>
            </div>
        </div>
      </div>
    )
  }
}

