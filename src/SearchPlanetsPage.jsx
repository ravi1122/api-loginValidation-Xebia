import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { PLANET_SEARCH_URL } from './constants';
import { debounce, shuffleArray } from './utils';

const COLORS = [
  '#800000', '#00FF00', '#FF0000', '#FFFF00', '#008000',
  '#00FFFF', '#0000FF', '#808080', '#000080', '#00FF00',
];

class SearchPlanetsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planets: []
    };
  }

  onSearch = (e) => {
    this.onSearchDebounced(e.currentTarget.value);
  }

  onSearchDebounced = debounce(searchTerm => {
    axios.get(`${PLANET_SEARCH_URL}${encodeURI(searchTerm)}`).then(
      resp => {
        if (resp.status === 200 && resp.data.results) {    
          this.setState({ planets: resp.data.results.filter(n => !isNaN(n.population)) || [] });
        }
      },
      error => {
        this.setState({ error: error.message });
      }       
    );
  }, 700)

  render() {
    const { planets } = this.state;
    const colors = shuffleArray(COLORS);
    const buckets = planets.length;
    const availablePix = window.innerWidth / buckets;

    return (
      <div>
        <div><button className="btn btn-logout" onClick={this.props.onLogOut}>Log Out</button></div>
        <h1>Please enter the planet name</h1>
        <input type="text" placeholder="Enter planet name" name = "planet" onChange={this.onSearch}/>         

        {planets.length > 0 && (
          <Fragment>
            <h1>List of planets</h1>
            <ul>
              {planets.map((planet, indx) => {
                const dim = (planet.population.length * availablePix) / buckets;

                return (
                  <li
                    className="planet tooltip"
                    key={planet.name} 
                    style={{ 
                      backgroundColor: colors[indx],
                      width: `${dim}px`,
                      height: `${dim}px`,
                      lineHeight: `${dim}px`,
                    }}
                    data-name={planet.name}
                  >{planet.population} <span className="tooltiptext">{planet.name}</span></li>
                );
              })}
            </ul>
          </Fragment>
        )}
      </div>
    );
  }
}

export default SearchPlanetsPage;