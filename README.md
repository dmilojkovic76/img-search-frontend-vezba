# **img-search-frontend-vezba using unsplash APIs**

The project was started as an excercize to build an simple image search app with: Vanilla JS, React.js, Angular and Vue.js using the Unsplash engine, in order to gain a better perspective of the differences and bennefits of these framework liraries.

A research for Unsplash API and usage was also done in the process.


## **I Basic single image search API**

Search for keywords:
```url
https://source.unsplash.com/featured/?{KEYWORD},{KEYWORD}
```

Search for keywords wits specific size:
```url
https://source.unsplash.com/1600x900/?{KEYWORD},{KEYWORD}
```


## **II Full Developer API for searching and app integration**

unsplash API URL:
https://unsplash.com/oauth/applications/39660


## My API KEYS for img-search-frontend app:
Access key:
>4ed859e100f487b468f969258ab8719cf86608077837e3a783acd3cfc00c3e6a

Secret key:
>d6d721e687d218a9cb81ae99764e0cfe9e5c3b00b54484a7c1d69e8f19743150


## Basic image search API usage with no oauth

unsplash search API url for public access is constructed from 3 parts:

* part1: ``` https://api.unsplash.com/search/photos/?query=```
* part2: ``` { the search term }```
* part3: ``` &client_id={ developers acces key for the app }```

This combines to the full url in the form of:
```
https://api.unsplash.com/search/photos/?query={searchTerm}&client_id={accesKey}
```

which returns a JSON object.


## Full API usage for oauth

Using a JS wrapper:
https://github.com/unsplash/unsplash-js

// ES Modules syntax:
```javascript
import Unsplash from 'unsplash-js';
```

// require syntax:
```javascript
const Unsplash = require('unsplash-js').default;
```
```javascript
const unsplash = new Unsplash({
  applicationId: "{APP_ACCESS_KEY}",
  secret: "{APP_SECRET}",
  callbackUrl: "{CALLBACK_URL}"
});```
