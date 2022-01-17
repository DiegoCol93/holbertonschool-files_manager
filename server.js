import express from 'express';
import env from 'process';
import router from './routes/index';

const app = express();
const port = (env.PORT !== undefined) ? env.PORT : 5000;

app.use('/', router);

app.listen(port, () => { console.log(`listening at http://localhost:${port}`); });
