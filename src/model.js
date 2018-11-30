//const { getJSON } = require('jquery')
const { compose } = require('rambda')
//const fetch = require('whatwg-fetch').fetch

let urls = data => {
  const url_s = data.photos.photo.map((photo)=> photo.url_s)
  return url_s
}
let images = (urls)=> {
  //console.log("urls:"+urls)
  return urls.map((url) => ('<img />', { src: url })[0] )
}
let responseToImages = compose(images, urls)

let img = url => $('<img />', { src: url }

let flickr = (tags)=> {
  //let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c45ce720ddd5058e972b9221a79cbd01&tags='+tags+'&extras=url_s&format=json&jsoncallback=?'
  //see: https://hacks.mozilla.org/2015/03/this-api-is-so-fetching/
  // test API at https://www.flickr.com/services/api/explore/flickr.photos.search
  // https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=338af50560c37293e53adcee58fa5d84&tags=elephant&extras=url_s&format=rest&api_sig=fe60306659c77c3876181cdd6f494619
  let u = new URLSearchParams();
  //u.append('method', 'flickr.interestingness.getList');
  u.append('method', 'flickr.photos.search');
  u.append('api_key', 'c45ce720ddd5058e972b9221a79cbd01');
  u.append('format', 'json');
  u.append('nojsoncallback', '1');
  debugger
  u.append('tags', tags);
  u.append('extras', 'url_s');
  const apiCall = fetch('https://api.flickr.com/services/rest?' + u);
  //return fetch(url)
  apiCall.then((response)=> {
    const json = response.json()
    //console.log(json)
    return json
  })
  .then(responseToImages).catch(e => {console.log('on poop...:'+e) })
}

//export default {
  //_responseToImages: responseToImages,
  //flickr: flickr,
//}

module.exports = { flickr, responseToImages }
