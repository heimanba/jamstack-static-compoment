import { http } from '../../src/index';

// const express = require('express');
// const app = express();

// app.get('/', (req, res) => res.send("hello world"));
// http.onRequest(app);

// app.listen(9090, () => {
//   console.log('Example app listening at http://localhost:9090')
// })

console.log(http.getPathMatches("/foo/:bar/:name", {path:"/foo/123/wewe"}))
