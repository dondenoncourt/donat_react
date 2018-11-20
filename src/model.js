const { compose, replace, map, prop, log, pipe } = require('rambda')
const { getJSON } = require('jquery')
const Task = require('data.task') // see https://www.npmjs.com/package/data.task

const Http = {
  get: (url) => new Task((rej, res) => getJSON(url).error(rej).done(res))
  //get: (url) => new Task((rej, res) => console.log(url))
}

const Url = String

const baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c45ce720ddd5058e972b9221a79cbd01&tags={TAGS}&extras=url_s&format=json&jsoncallback=?'

const makeUrl = (t) => {
  const tags = replace("{TAGS}", t, baseUrl)
  console.log(t+' stuffed in '+tags)
  //debugger
  //console.log(Http.get(tags))
  return tags
}

//const extractUrls = console.log // pipe( prop('photos'), map(log))
const extractUrls = compose( map(prop('url_s')), prop('photos'))
//const extractUrls = compose( map(prop('url_s')), prop('photo'), prop('photos'))
//const extractUrls = compose( log, prop('photos'), prop('photos'))
//const extractUrls = compose( console.log)

/*
const extractUrls = pipe(
  prop('photos'),
  map(console.log),
  prop('photo'),
  map(console.log),
  map(prop('url_s'))
)
*/

/*
const extractUrls = (response) => {
  console.log(prop('photos'))
  debugger
  console.log("extractUrls:")
  console.log(response)
  console.log(prop('photos', response))
}
*/

// see 13;12 of https://www.youtube.com/watch?v=h_tkIpwbsxY
/*
const flickrSearch = (searchFor) => {
  console.log('searchFor:'+searchFor)
  const url = makeUrl(searchFor)
  const got = Http.get(url)
  console.log(url+' got '+got)
  debugger
}
*/
const flickrSearch = compose( map(extractUrls), Http.get, makeUrl )
//const flickrSearch = compose( (x) => console.log(x), Http.get, makeUrl )
//const flickrSearch = compose(Http.get, makeUrl )

module.exports = { flickrSearch }
