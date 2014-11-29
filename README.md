# h5js

Checkout example.js for example

```JavaScript
var h5 = require('./lib/index.js');

require('./functions.js');

var googleTest =
  h5.action('http.request', { url: 'http://www.imdb.com/title/tt0110912/' })
    .action('html.extract', { selectors: { title: 'h1.header > span[itemprop="name"]', year: 'h1.header > span > a' } })
    .save();

googleTest.print();

googleTest
  .run()
  .then(function(result) {
    console.log(result);
  }, function(err) {
    console.log('Error:', err);
  });
```
