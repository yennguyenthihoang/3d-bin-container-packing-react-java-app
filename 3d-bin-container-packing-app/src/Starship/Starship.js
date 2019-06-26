import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Starship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starship: null,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`https://swapi.co/api/starships/${params.id}/`).then(res => {
      const starship = res.data;
      console.log("Starship: " + starship);
      this.setState({
        starship,
      });
    })
  }

  render() {
    const {starship} = this.state;
    if (starship === null) return <p>Loading ...</p>;
    return (
      <div className="container">
          <div className="jumbotron col-12">
            <h4 className="display-5 font-weight-bold offset-md-4">Starship Information - {starship.name}</h4>
            <hr className="my-4" />
            <div className="row col-sm-12 col-md-12 col-lg-12">
              <div className="col-sm-12 col-md-4 col-lg-4">
                <p className="lead"><b>Model: </b>{starship.model}</p>
                <p className="lead"><b>Manufacturer: </b>{starship.manufacturer}</p>
                <p className="lead"><b>Const in Credits: </b>{starship.cost_in_credits}</p>
                <p className="lead"><b>Length: </b>{starship.length}</p>
                <p className="lead"><b>Max aatmosphering speed: </b>{starship.max_atmosphering_speed}</p>
              </div> 
              <div className="col-sm-12 col-md-4 col-lg-4">
                <p className="lead"><b>Crew: </b>{starship.crew}</p>
                <p className="lead"><b>Passengers: </b>{starship.passengers}</p>
                <p className="lead"><b>Cargo capacity: </b>{starship.cargo_capacity}</p>
                <p className="lead"><b>Consumables: </b>{starship.consumables}</p>
                <p className="lead"><b>Hyperdrive rating: </b>{starship.hyperdrive_rating}</p>
              </div> 
              <div className="col-sm-12 col-md-4 col-lg-4">
                <p className="lead"><b>MGLT: </b>{starship.MGLT}</p>
                <p className="lead"><b>Starship class: </b>{starship.starship_class}</p>
                <p className="lead"><b>Cargo capacity: </b>{starship.cargo_capacity}</p>
                <p className="lead"><b>Created date: </b>{starship.created}</p>
                <p className="lead"><b>Edited date: </b>{starship.edit}</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="row col-sm-12 col-md-12 col-lg-12">
              <div className="col-sm-12 col-md-6 col-lg-6">
                <p className="font-weight-bold"><b>Pilots:</b></p>
                {this.state.starship === null && <p>Loading Starship...</p>}
                  {
                    this.state.starship.pilots && this.state.starship.pilots.map(pilot => (
                      <div key={pilot} className="col-sm-12 col-md-12 col-lg-12">
                        <Link to={`/person/${pilot.split('/')[5]}`}>
                          <p className="card-text">{pilot}</p>
                        </Link>
                      </div>
                    ))
                  }
              </div> 
              <div className="col-sm-12 col-md-6 col-lg-6">
                <p className=""><b>Films:</b></p>
                {this.state.starship === null && <p>Loading Starship...</p>}
                  {
                    this.state.starship.films && this.state.starship.films.map(film => (
                      <div key={film} className="col-sm-12 col-md-12 col-lg-12">
                        <Link to={`/film/${film.split('/')[5]}`}>
                          <p className="card-text">{film}</p>
                        </Link>
                      </div>
                    ))
                  }
              </div> 
            </div>
        </div>
      </div>
    )
  }
}

export default Starship;