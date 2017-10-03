import React, { Component } from 'react';
import axios from 'axios';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const url = 'https://api.github.com/search/repositories?q=react';

    axios
      .get(url)
      // fake server, see https://github.com/salielim/doc-fake-server
      .then(({ data }) => {
        this.setState({
          data: data.items
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(
          'Unable to access data. \n' + err
        );
      });
  }

  render() {
    const child = this.state.data.map((el, index) => {
      return (
        <div key={index}>
          <p>
            {el.full_name}
          </p>
        </div>
      )
    });

    return (
      <div>
        <input type="text" name="search" placeholder="Search.." />

        <div className="cards-container">
          {child}
        </div>
      </div>
    )
  }
}

export default SearchBox;