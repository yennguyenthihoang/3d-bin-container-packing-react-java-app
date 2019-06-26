import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';


class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredPeople: [],
      people: []
    };
    this.searchPeopleByName = this.searchPeopleByName.bind(this);
  }

  componentDidMount() {
    //Get People from backend
    axios.get('https://swapi.co/api/people/').then(res => {
      const people = res.data.results;
      console.log("People " + people);
      const filteredPeople = people;
      this.setState({
        people, 
        filteredPeople,
      });
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredPeople: nextProps.items
    });
  }

  searchPeopleByName(e){
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.people;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        // change current item to lowercase
        const lc = item.name.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.people;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filteredPeople: newList
    });
  }

  render() {
    return (
      <div className="container">
        <div className="topnav">
          <div className="search-container">
            <form action="/action_page.php">
              <input type="text" onChange={this.searchPeopleByName} placeholder="Search by name..." name="search"/>
              <button type="submit"><FontAwesomeIcon icon="search" /></button>
            </form>
          </div>
        </div>

        <div className="row">
          {this.state.filteredPeople === null && <p>Loading People...</p>}
          {
            this.state.filteredPeople && this.state.filteredPeople.map(person => (
              <div key={person.url.split('/')[5]} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/person/${person.url.split('/')[5]}`}>
                  <div className="card text-info text-white bg-white mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{person.name}</h5>
                      <p className="card-text"><b>Gender: </b>{person.gender}</p>
                      <p className="card-text"><b>Birth Year: </b>{person.birth_year}</p>
                      <p className="card-text"><b>Height: </b>{person.height} cm</p>
                      <p className="card-text"><b>Mass: </b>{person.mass}</p>
                      <p className="card-text"><b>Hair Color: </b>{person.hair_color}</p>
                      <p className="card-text"><b>Skin Color: </b>{person.skin_color}</p>
                      <p className="card-text"><b>Eye color: </b>{person.eye_color}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default People;