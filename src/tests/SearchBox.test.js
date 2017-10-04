import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SearchBox from '../SearchBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBox />, div);
});

// Test API Call for GitHub repo data
var mock = new MockAdapter(axios);
mock.onGet('https://api.github.com/search/repositories?q=react').reply(200, {
  items: [
    { id: 10270250, name: 'react' }
  ]
});

axios.get('https://api.github.com/search/repositories?q=react')
  .then(function (response) {
    console.log(response.data);
  });