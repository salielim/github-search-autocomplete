import React, { Component } from 'react';
import axios from 'axios';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.changeQuery = this.changeQuery.bind(this);

    this.state = {
      data: [],
      query: '',
      typing: false,
      typingTimeOut: 0
    };
  }

  changeQuery = (event) => {
    const self = this;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      query: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.sendToParent(self.state.query);
      }, 3000)
    });
  }

  sendToParent = () => {
    this.searching(this.state.query);
    console.log(this.state.query);
  }

  searching = () => {
    const url = 'https://api.github.com/search/repositories?q=' + this.state.query + '&per_page=5';

    axios
      .get(url)
      // fake server, see https://github.com/salielim/doc-fake-server
      .then(({ data }) => {
        this.setState({
          data: data.items
        });
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
        <input
          type='text'
          id='search-input'
          placeholder='Search..'
          autoComplete='off'
          onChange={this.changeQuery}
        />
        
        <div>
          {child}
        </div>
      </div>
    )
  }
}

export default SearchBox;