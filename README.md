# h5js

Checkout example.js for example

```JavaScript
var h5 = require('h5');

require('./functions.js');

var example =
  h5.action('http.request', { url: 'http://www.imdb.com/title/tt0110912/' })
    .action('html.extract', { selectors: { title: 'h1.header > span[itemprop="name"]', year: 'h1.header > span > a' } })
    .save();

example.print();

example
  .run()
  .then(function(result) {
    console.log(result);
  }, function(err) {
    console.log('Error:', err);
  });
```
