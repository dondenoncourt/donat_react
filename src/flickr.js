//const { flickrSearch } = require("./flickr")
const { flickr } = require("./model")
const React = require('react')
const createReactClass = require('create-react-class');

module.exports = createReactClass({
  displayName: 'Flickr',

  getInitialState() { return {term: ""} },

  termChanged({currentTarget: t}) { this.setState({term: t.value}) },

  //searchClicked(_) { flickrSearch(this.state.term).fork(this.props.showError, (x) => console.log(x) ) },
  //searchClicked(_) { flickrSearch(this.state.term).fork((x) => console.log(x), (x) => console.log(x) ) },
  searchClicked(_) { flickr(this.state.term) },
  //searchClicked(_) { console.log(flickr) },

  render() {
    return (
      <div id="flickr">
        <input onChange={this.termChanged} />
        <button onClick={this.searchClicked}>Search</button>
        <div id="results"></div>
      </div>
    );
  }

});
