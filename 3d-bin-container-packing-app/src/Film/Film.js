import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Film extends Component {
  constructor(props) {
    super(props);
    this.state = {
        film: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`https://swapi.co/api/films/${params.id}/`).then(res => {
      const film = res.data;
      console.log("Film: " + film);
      this.setState({
        film,
      });
    })
  }

  render() {
    const {film} = this.state;
    if (film === null) return <p>Loading ...</p>;
    return (
      <div className="container">
          <div className="jumbotron col-12">
            <h4 className="display-5 font-weight-bold offset-md-4">Film Information - {film.title}</h4>
            <hr className="my-4" />
            <div className="row col-sm-12 col-md-12 col-lg-12">
              <div className="col-sm-12 col-md-6 col-lg-6">
                <p className="lead"><b>Episode id: </b>{film.episode_id}</p>
                <p className="lead"><b>Director: </b>{film.director}</p>
                <p className="lead"><b>Producer: </b>{film.producer}</p>
                <p className="lead"><b>Released date: </b>{film.release_date}</p>
                <p className="lead"><b>Created date: </b>{film.created}</p>
                <p className="lead"><b>Edited date: </b>{film.edit}</p>
              </div> 
              <div className="col-sm-12 col-md-6 col-lg-6">
                <p className="lead"><b>Opening crawl: </b>{film.opening_crawl}</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="row col-sm-12 col-md-12 col-lg-12">
              <div className="col-sm-12 col-md-4 col-lg-4">
                <p className="font-weight-bold"><b>Characters:</b></p>
                {this.state.film === null && <p>Loading ...</p>}
                  {
                    this.state.film.characters && this.state.film.characters.map(character => (
                      <div key={character} className="col-sm-12 col-md-12 col-lg-12">
                        <Link to={`/people/${character.split('/')[5]}`}>
                          <p className="card-text">{character}</p>
                        </Link>
                      </div>
                    ))
                  }
              </div> 
              <div className="col-sm-12 col-md-4 col-lg-4">
                <p className=""><b>Planets:</b></p>
                {this.state.film.planets === null && <p>Loading ...</p>}
                  {
                    this.state.film.planets && this.state.film.planets.map(planet => (
                      <div key={film} className="col-sm-12 col-md-12 col-lg-12">
                        <Link to={`/planet/${planet.split('/')[5]}`}>
                          <p className="card-text">{planet}</p>
                        </Link>
                      </div>
                    ))
                  }
              </div> 
              <div className="col-sm-12 col-md-4 col-lg-4">
                <p className="font-weight-bold"><b>Starships:</b></p>
                {this.state.film.starships === null && <p>Loading Starship...</p>}
                {
                  this.state.film.starships && this.state.film.starships.map(starship => (
                    <div key={starship} className="col-sm-12 col-md-12 col-lg-12">
                      <Link to={`/starship/${starship.split('/')[5]}`}>
                        <p className="card-text">{starship}</p>
                      </Link>
                    </div>
                  ))
                }
              </div> 
            </div>
            <div className="row col-sm-12 col-md-12 col-lg-12">
              <div className="col-sm-12 col-md-4 col-lg-4">
                <p className="font-weight-bold"><b>Vehicles:</b></p>
                {this.state.film.vehicles === null && <p>Loading vehicles...</p>}
                {
                  this.state.film.vehicles && this.state.film.vehicles.map(vehicle => (
                    <div key={vehicle} className="col-sm-12 col-md-12 col-lg-12">
                      <Link to={`/vehicle/${vehicle.split('/')[5]}`}>
                        <p className="card-text">{vehicle}</p>
                      </Link>
                    </div>
                  ))
                }
              </div> 
              <div className="col-sm-12 col-md-6 col-lg-6">
                <p className="font-weight-bold"><b>Species:</b></p>
                {this.state.film.species === null && <p>Loading species...</p>}
                {
                  this.state.film.species && this.state.film.species.map(specie => (
                    <div key={specie} className="col-sm-12 col-md-12 col-lg-12">
                      <Link to={`/specie/${specie.split('/')[5]}`}>
                        <p className="card-text">{specie}</p>
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

export default Film;