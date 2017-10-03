import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <div>
        <input type="text" name="search" placeholder="Search.." />
      </div>
    );
  }
}

export default SearchBox;