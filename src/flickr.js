const React = require('react')
const createReactClass = require('create-react-class');

module.exports = createReactClass({
  displayName: 'Flickr',

  getInitialState() { return {term: "", images: []} },

  termChanged({currentTarget: t}) { this.setState({term: t.value}) },

  apiCall(term) {
    let u = new URLSearchParams();
    u.append('method', 'flickr.photos.search');
    u.append('api_key', 'c45ce720ddd5058e972b9221a79cbd01');
    u.append('format', 'json');
    u.append('nojsoncallback', '1');
    u.append('tags', term);
    u.append('extras', 'url_s');
    return fetch('https://api.flickr.com/services/rest?' + u);
  },

  searchClicked(_) {
    this.apiCall(this.state.term).then((response)=> { return response.json() })
      .then((data) => { return data.photos.photo.map((photo)=> photo.url_s) })
      .then((urls) => this.setState({images:  urls.map(url => `<img src='${url}'></img>`) }))
      .catch(e => {console.log('oh poop...:'+e) })
  },

  render() {
    return (
      <div id="flickr">
        <input onChange={this.termChanged} />
        <button onClick={this.searchClicked}>Search</button>
        <div dangerouslySetInnerHTML={{ __html: this.state.images }} />
      </div>
    );
  }

});
