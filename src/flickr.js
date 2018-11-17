const React = require('react')
const createReactClass = require('create-react-class');
const { flickrSearch } = require('./model')

module.exports = createReactClass({
  displayName: 'Flickr',

  getInitialState() { return {term: ""} },

  termChanged({currentTarget: t}) { this.setState({term: t.value}) },

  //searchClicked(_) {console.log(this.state.term) },
  //searchClicked(_) { flickrSearch(this.state.term).fork(this.props.showError, (x) => console.log(x) ) },
  //searchClicked(_) { flickrSearch(this.state.term).fork((x) => console.log(x), (x) => console.log(x) ) },
  searchClicked(_) { flickrSearch(this.state.term) },

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
