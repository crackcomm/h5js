var h5 = require('../lib');

require('./functions.js');

var example =
  h5.action('http.request', { url: 'http://www.imdb.com/title/tt0110912/' }).
     action('html.extract', { selectors: { title: 'h1.header > span[itemprop="name"]', year: 'h1.header > span > a' } });

example.print();

example.
  run({url: 'http://www.imdb.com/title/tt0137523/'}).
  then(function(result) {
    console.log(result);
  }, function(err) {
    console.log('Error:', err);
  });
