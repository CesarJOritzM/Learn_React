import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import Place from './Components/Place/Place';
import NearbyPlace from './Components/Cercanos/NearbyPlace'
import Rating from './Components/Rating/Rating'
import Horario from './Components/Horario/Horario'
import Reviews from './Components/Comentarios/Reviews';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      showAllNearbyPlaces: false
    }

    this.callback = this.callback.bind(this)
  }

  map = ''

  componentDidMount() {
    const googlePlaceAPILoad = setInterval(() => {
      if (window.google) {
        this.google = window.google;
        clearInterval(googlePlaceAPILoad);
        console.log('Load Place API');  
        this.directionsService = new this.google.maps.DirectionsService();
        this.directionsRenderer = new this.google.maps.DirectionsRenderer();
        this.map = new this.google.maps.Map(document.getElementById('map'), {
          center: { lat: 11.243526 , lng: -74.215305 },
          zoom: 15
        });
        var request = {
          location: this.map.getCenter(),
          radius: '500',
          query: 'Santa Marta, Magdalena, Colombia'
        };
        var service = new this.google.maps.places.PlacesService(this.map);
        service.textSearch(request, this.callback);
      };
    }, 100);
  }

  callback(results, status) {
    if (status == this.google.maps.places.PlacesServiceStatus.OK) {
      var marker = new this.google.maps.Marker({
        map: this.map,
        place: {
          placeId: results[0].place_id,
          location: results[0].geometry.location
        }
      });
    }
  }

  showMap(mapCenter) {
    var map = new window.google.maps.Map(
      document.getElementById('map'), { zoom: 15, center: mapCenter });
    this.directionsRenderer.setMap(map);
    var marker = new window.google.maps.Marker({ position: mapCenter, map: map });
  }

  changeDestination = (destino) => {
    console.log(destino)
    document.getElementById('destino').value = destino;
    document.getElementById('btnBuscar').click();
  }

  manejoOnClick = (e) => {
    const request = {
      query: document.getElementById('destino').value,
      fields: ['photos', 'formatted_address', 'name', 'place_id'],
    };
    this.service = new this.google.maps.places.PlacesService(this.map);
    this.service.findPlaceFromQuery(request, this.findPlaceResult);
  }

  getNearbyPlacesOnClick = (e) => {
    let request = {
      location: this.state.placeLocation,
      radius: '10000',
    };

    this.service = new this.google.maps.places.PlacesService(this.map);
    this.service.nearbySearch(request, this.callbackSearchNearby)
  }

  callbackSearchNearby = (results, status) => {
    if (status == this.google.maps.places.PlacesServiceStatus.OK) {
      console.log("callback received " + results.length + " results");
      window.lugaresCercanos = results
      if (results.length) {
        let nearbyPlaces = results.map((place, index) =>
          <NearbyPlace key={index} placeData={place}
            chooseDestination={this.changeDestination}></NearbyPlace>)

        this.setState({
          nearbyPlaces: nearbyPlaces
        })
      }
    } else console.log("callback.status=" + status);
  }

  findPlaceResult = (results, status) => {
    var placesTemp = []
    var placeId = ''
    if (status === 'OK') {
      results.map((place) => {
        var placePhotos = ['']
        const placeTemp = {
          id: place.place_id, name: place.name,
          address: place.formatted_address, photos: placePhotos
        }
        placeId = place.place_id;
        placesTemp.push(<Place placeData={placeTemp} />);
      })
    }
    if (placesTemp.length > 0)
      this.findPlaceDetail(placeId);
    else {
      const placeTemp = {
        id: 'N/A', name: <div className='mt-5'><strong className='text-center'>
          No hay resultados</strong></div>,
        address: '', photos: ['']
      }
      placesTemp.push(<Place placeData={placeTemp} />);
      this.setState({ places: placesTemp, showAllNearbyPlaces: false })
    }
  }

  findPlaceDetail = (placeIdFound) => {
    var request = {
      placeId: placeIdFound,
      fields: ['address_component', 'adr_address', 'alt_id', 'formatted_address','opening_hours',
       'icon', 'id', 'name', 'permanently_closed', 'photo', 'place_id', 'plus_code', 'scope',
       'type', 'url', 'utc_offset', 'vicinity','geometry','rating','reviews']
    };
    this.service.getDetails(request, this.foundPlaceDatail);
  }

  foundPlaceDatail = (place, status) => {
    if (status === 'OK') {
      window.lugar = place
      var placePhotos = ['']
      if (place.photos) {
        place.photos.map((placePhoto, index) => {
          placePhotos[index] = placePhoto.getUrl({ 'maxWidth': 160, 'maxHeight': 120 })
          if (index === 2) return;
        })
      }
      const placeTemp = {
        id: place.place_id, name: place.name,
        address: place.formatted_address, photos: placePhotos
      }
      const placesTemp = <Place placeData={placeTemp} />;
      const placeHorarios = <Horario horarios={place.opening_hours}/>
      var rating=''
      if (place.rating){
        rating = <Rating placeRating={place.rating} placeReviews={place.reviews}/>
      }
      const reviews = <Reviews comentarios={place.reviews}/>
      console.log('address_component: ' + place.address_component,
        'adr_address: ' + place.adr_address, 'alt_id', 'formatted_address', 'geometry: ' + place.geometry,
        'icon: ' + place.icon, 'permanently_closed', 'photo', ' + rating: ' + place.rating,
        'type: ' + place.type, 'url: ' + place.url, 'utc_offset', 'vicinity')
      this.setState({
        places: placesTemp,
        placeRating:rating,
        placeHorarios:placeHorarios,
        nearbyPlaces: [],
        placeLocation: place.geometry.location,
        placeReviews: reviews
      })
      this.showMap(place.geometry.location);
    }
  }

  calcRoute = (e) => {
    var start = document.getElementById('origen').value;
    var end = document.getElementById('destino').value;
    var travelMode = document.getElementById('mode').value;
    var request = {
      origin: start,
      destination: end,
      travelMode: travelMode
    };

    var that = this;
    this.directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        that.directionsRenderer.setDirections(result);
      }
    });
  }

  render() {
    return (
      <div className="App" >

        <div className='container border rounded p-3 mt-4' style={{ width: '50%' }}>
          <div className='row'>
            <div className='col text-center'>
              <label><strong>Indica el lugar</strong></label>
            </div>
          </div>
          <div className='row'>
          <div className='col text-center'><input id='destino' type='text' /></div>
          </div>
          <div className='row'>
            <div className='col mt-3 text-center'>
              <div id="btnBuscar" className='btn btn-primary text-center' onClick={this.manejoOnClick}>Buscar Lugar</div>
            </div>
          </div>
          {this.state.places}
          {this.state.placeHorarios}
          {this.state.placeRating}
          {this.state.placeReviews}
          {this.state.places &&
           <div className="container">  
              <div className='row'>
                <div className="col-12">
                  <button className="btn btn-primary text-center"
                  onClick={this.getNearbyPlacesOnClick}>
                    Buscar lugares cercanos
                  </button>
                </div>
              </div>
           </div>
          }
          <div className="row row-cols-1 row-cols-md-1 mt-2">
            {this.state.showAllNearbyPlaces ?
              this.state.nearbyPlaces :
              this.state.nearbyPlaces?.slice(0, 9)
            }
          </div>
          {this.state.nearbyPlaces &&
            <div className="container">
              <div className="mb-3">
                <a href='#' onClick={(e) => {
                  e.preventDefault();
                  this.setState({ showAllNearbyPlaces: true });
                }}>
                  Mostrar más lugares cercanos
                </a>
              </div>
              <div className="row">
                <div className="col">
                  <input id='origen' className="form-control" type='text' placeholder="Origen" />
                </div>
                <div className="col">
                  <select id="mode" className="form-control">
                    <option value="DRIVING">Conducción</option>
                    <option value="WALKING">Caminando</option>
                    <option value="BICYCLING">Bicicleta</option>
                    <option value="TRANSIT">Trancito</option>
                  </select>
                </div>
                <div className="col">
                  <button className="btn btn-primary" onClick={this.calcRoute}>Ir al destino indicado</button>
                </div>
              </div>
            </div>}
          <div id="map" className="mt-2" style={{ height: "500px" }}></div>
        </div>

      </div>
    );
  }
}

export default App;
