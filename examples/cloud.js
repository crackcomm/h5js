var h5 = require('../lib');

h5.cloud.set('https://radiant-harbor-8309.herokuapp.com/');

require('./functions.js');

var example =
  h5.action('http.request', { url: 'http://www.imdb.com/title/tt0110912/' }).
     action('html.extract', { selectors: { title: 'h1.header > span[itemprop="name"]', year: 'h1.header > span > a' } });

example.
  save().
  then(function() {
    return example.run({url: 'http://www.imdb.com/title/tt0137523/'}, true);
  }).
  then(function(result) {
    console.log('result:', result);
  }).
  catch(function(err) {
    console.log('Cloud error:', err);
  });
