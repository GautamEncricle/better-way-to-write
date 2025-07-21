import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import connect from './src/db/connection.js';
import userRouts from './src/routes/index.js';
import globalErrorHandler from './src/utils/globalErrorHandler.js';
import { initRedis } from './src/lib/redis.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', userRouts);

const PORT = process.env.PORT || 3000;

app.use(globalErrorHandler);
await initRedis().then(() => {
    connect().then(() => {
        app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
    }).catch((error) => {
        console.log(error);
    })
});
