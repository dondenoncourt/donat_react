const { getJSON } = require('jquery')
const { compose } = require('rambda')

let urls = (data)=> {
  return data.items.map((item)=> item.media.m)
}
let images = (urls)=> {
  return urls.map((url) => ('<img />', { src: url })[0] )
}
let responseToImages = compose(images, urls)

let flickr = (tags)=> {
  let url = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${tags}&format=json&jsoncallback=?`
  return fetch(url)
  .then((response)=> response.json())
  .then(responseToImages)
}

//export default {
  //_responseToImages: responseToImages,
  //flickr: flickr,
//}

module.exports = { flickr, responseToImages }
