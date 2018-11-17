const React = require('react')
const createReactClass = require('create-react-class');
const Flickr = require('./flickr')

module.exports = createReactClass({
  displayName: 'App',

  getInitialState() { return {error: ""} },

  showError(s) { this.setState({error: s}); },

  render() {
    return (
      <div id="app">
        { this.state.error ? <p>{this.state.error}</p> : null }
        <Flickr showError={this.showError} />
      </div>
    );
  }
});
