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

Example action in JSON form:

```JSON
{
  "id": "4627ca64-a168-40f6-9389-cf4fa75b6da2",
  "function": {
    "name": "http.request",
    "args": {
      "url": "http://www.imdb.com/title/tt0110912/"
    }
  },
  "next": {
    "id": "875d846a-635f-4567-adc9-46ca61b4ef12",
    "function": {
      "name": "html.extract",
      "args": {
        "selectors": {
          "title": "h1.header > span[itemprop=\"name\"]",
          "year": "h1.header > span > a"
        }
      }
    }
  }
}
```

Saving action and running in [cloud](https://github.com/crackcomm/h5jserver)

```JavaScript
h5.cloud.set('https://radiant-harbor-8309.herokuapp.com/');

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

```
