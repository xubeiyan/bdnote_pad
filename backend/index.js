import express from 'express';

import router from './router/router.js';

const app = express()
const port = 7070;

const scriptName = 'index.js';

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`[${scriptName}] Example app listening on port ${port}`)
})