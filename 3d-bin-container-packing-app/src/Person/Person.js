import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: null,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`https://swapi.co/api/people/${params.id}/`).then(res => {
      const person = res.data;
      console.log("Person: " + person);
      this.setState({
        person,
      });
    })
  }

  render() {
    const {person} = this.state;
    if (person === null) return <p>Loading ...</p>;
    return (
      <div className="container">
         <div className="jumbotron col-12">
            <h4 className="display-5 font-weight-bold offset-md-4">Person Information - {person.name}</h4>
            <hr className="my-4" />
            <div className="row col-sm-12 col-md-12 col-lg-12">
              <div className="col-sm-6 col-md-4 col-lg-4">
                <p className="card-text"><b>Gender: </b>{person.gender}</p>
                <p className="card-text"><b>Birth Year: </b>{person.birth_year}</p>
                <p className="card-text"><b>Height: </b>{person.height} cm</p>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4">
                <p className="card-text"><b>Mass: </b>{person.mass}</p>
                <p className="card-text"><b>Hair Color: </b>{person.hair_color}</p>
                <p className="card-text"><b>Skin Color: </b>{person.skin_color}</p>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4">
                <p className="card-text"><b>Eye color: </b>{person.eye_color}</p>
                <p className="card-text"><b>Created Date: </b>{person.created}</p>
                <p className="card-text"><b>Edited Date: </b>{person.edited}</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="row col-sm-12 col-md-12 col-lg-12">
              <div className="col-sm-6 col-md-3 col-lg-3">
                <p className="font-weight-bold"><b>Starships:</b></p>
                {this.state.person.starships === null && <p>Loading Starship...</p>}
                {
                  this.state.person.starships && this.state.person.starships.map(starship => (
                    <div key={starship} className="col-sm-12 col-md-12 col-lg-12">
                      <Link to={`/starship/${starship.split('/')[5]}`}>
                        <p className="card-text">{starship}</p>
                      </Link>
                    </div>
                  ))
                }
              </div>
              <div className="col-sm-6 col-md-3 col-lg-3">
                <p className="font-weight-bold"><b>Films:</b></p>
                {this.state.person.films === null && <p>Loading Starship...</p>}
                {
                  this.state.person.films && this.state.person.films.map(film => (
                    <div key={film} className="col-sm-12 col-md-12 col-lg-12">
                      <Link to={`/film/${film.split('/')[5]}`}>
                        <p className="card-text">{film}</p>
                      </Link>
                    </div>
                  ))
                }
              </div>
              <div className="col-sm-6 col-md-3 col-lg-3">
                <p className="font-weight-bold"><b>Species:</b></p>
                {this.state.person.species === null && <p>Loading species...</p>}
                {
                  this.state.person.species && this.state.person.species.map(specie => (
                    <div key={specie} className="col-sm-12 col-md-12 col-lg-12">
                      <Link to={`/specie/${specie.split('/')[5]}`}>
                        <p className="card-text">{specie}</p>
                      </Link>
                    </div>
                  ))
                }
              </div>
              <div className="col-sm-6 col-md-3 col-lg-3">
                <p className="font-weight-bold"><b>Vehicles:</b></p>
                {this.state.person.vehicles === null && <p>Loading vehicles...</p>}
                {
                  this.state.person.vehicles && this.state.person.vehicles.map(vehicle => (
                    <div key={vehicle} className="col-sm-12 col-md-12 col-lg-12">
                      <Link to={`/vehicle/${vehicle.split('/')[5]}`}>
                        <p className="card-text">{vehicle}</p>
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

export default Person;