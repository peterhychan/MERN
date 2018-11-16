import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Launches from './components/Launches';
import Launch from './components/Launch';

const client = new ApolloClient({
  uri: '/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <Link to="/"><img
              src="https://www.logolynx.com/images/logolynx/a0/a00e3eb75cc0e96e7090ded2f487374f.jpeg"
              alt="SpaceX"
              style={{ width: 400, height: 250, display: 'block', margin: 'auto' }}
            /></Link>
            <Route exact path="/" component={Launches} />
            <Route exact path="/launch/:flight_number" component={Launch} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;