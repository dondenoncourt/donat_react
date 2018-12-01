//const { flickr } = require("./model")
const React = require('react')
const createReactClass = require('create-react-class');

module.exports = createReactClass({
  displayName: 'Flickr',

  getInitialState() { return {term: "", images: []} },

  termChanged({currentTarget: t}) { this.setState({term: t.value}) },

  updateResults(xs) { console.log(xs); this.setState({results: xs}) },

  //searchClicked(_) { flickr(this.state.term).fork(this.props.showError, this.updateResults) },
  //searchClicked(_) { console.log('searchClicke(): '+flickr(this.state.term)) },
  searchClicked(_) {
    let u = new URLSearchParams();
    u.append('method', 'flickr.photos.search');
    u.append('api_key', 'c45ce720ddd5058e972b9221a79cbd01');
    u.append('format', 'json');
    u.append('nojsoncallback', '1');
    u.append('tags', this.state.term);
    u.append('extras', 'url_s');
    const apiCall = fetch('https://api.flickr.com/services/rest?' + u);
    apiCall.then((response)=> { return response.json() })
    .then((data) => { return data.photos.photo.map((photo)=> photo.url_s) })
    .then((urls) => {
      let imgs = []
      let url_s = urls.map(url => `<img src='${url}'></img>`)
      url_s.forEach((url) => imgs.push(url))
      this.setState({images:  imgs })
    })
    .catch(e => {console.log('oh poop...:'+e) })
  },

  render() {
    //const images = this.state.images.map(src => <img src={src} key={src} ></img>)
    return (
      <div id="flickr">
        <input onChange={this.termChanged} />
        <button onClick={this.searchClicked}>Search</button>
        <div dangerouslySetInnerHTML={{ __html: this.state.images }} />
      </div>
    );
  }

});
