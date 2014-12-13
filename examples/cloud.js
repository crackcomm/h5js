var h5 = require('../lib');

h5.debug(true);
h5.cloud.set('http://127.0.0.1:6090/');

require('./functions.js');

var example =
  h5.action('http.request', { url: 'http://www.imdb.com/title/tt0110912/' }).
     action('html.extract', { selectors: { title: 'h1.header > span[itemprop="name"]', year: 'h1.header > span > a' } });

example.
  save().
  then(function() {
    console.log('Saved!');
    example.
      run({url: 'http://www.imdb.com/title/tt0137523/'}, true).
      then(function(result) {
        console.log(result);
      }, function(err) {
        console.log('Cloud error:', err);
      });
  }, function(err) {
    console.error('Save error:', err);
  });
