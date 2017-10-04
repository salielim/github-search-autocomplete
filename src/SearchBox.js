import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import onClickOutside from 'react-onclickoutside'

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

    this.setState({
      hideList: false
    });

    this.setState({
      query: event.target.value,
      typing: false,
      typingTimeout: setTimeout(() => {
        self.sendToParent(self.state.query);
      }, 100)
    });
  }

  sendToParent = () => {
    this.searching(this.state.query);
  }

  searching = () => {
    const url = 'https://api.github.com/search/repositories?q=' + this.state.query + '&per_page=6';

    axios
      .get(url)
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
        <a key={index} href={el.owner.html_url} target='_blank'>
          <li>
            {el.full_name}
          </li>
        </a>
      )
    });

    if (this.state.hideList) {
      return (
        <div>
          <input
            type='text'
            id='search-input'
            placeholder='Search GitHub repositories'
            autoComplete='off'
            onChange={this.changeQuery}
          />
        </div>
      )
    } else {
      return (
        <div>
          <input
            type='text'
            id='search-input'
            placeholder='Search GitHub repositories...'
            autoComplete='off'
            onChange={this.changeQuery}
          />

          <div className='autocomplete-container'>
            {child}
          </div>
        </div>
      )
    }
  }

  handleClickOutside = (evt) => {
    this.setState({
      hideList: true
    });
  }
}

export default onClickOutside(SearchBox);