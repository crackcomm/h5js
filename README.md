# h5js

Distributed computing with JSON.

Checkout `example.js` and `cloud.js` in examples directory.

```JavaScript
var h5 = require('h5');

require('./functions.js');

var example =
  h5.action('http.request', { url: 'http://www.imdb.com/title/tt0110912/' }).
     action('html.extract', { selectors: { title: 'h1.header > span[itemprop="name"]', year: 'h1.header > span > a' } });

example.
  run().
  then(function(result) {
    console.log(result);
  }, function(err) {
    console.log('Error:', err);
  });
```

Saving action and running in [cloud](https://github.com/crackcomm/h5jserver)

```JavaScript
h5.cloud.set('https://radiant-harbor-8309.herokuapp.com/');

example.
  save().
  then(function() {
    example.
      run({url: 'http://www.imdb.com/title/tt0137523/'}, true).
      then(function(result) {
        console.log(result);
      }, function(err) {
        console.log('Error:', err);
      });
  });
```
