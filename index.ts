import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import cors from 'cors';
import { routeSchedule } from './routes/schedule';

dotenv.config();
const { SERVER_PORT, MONGO_URI } = process.env;
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

mongoose
  .connect(MONGO_URI ?? '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e) => console.error(e));

// ROUTERS
// app.use('/schedule', require('./routes/schedule'));
app.use('/schedule', routeSchedule);

app.listen(SERVER_PORT, () =>
  console.log(`Server listening on port ${SERVER_PORT}`),
);
