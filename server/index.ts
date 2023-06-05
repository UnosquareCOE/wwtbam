import express from 'express';
import { accountsRouter } from './routers';

const app = express();

app.use("/accounts", accountsRouter);

app.listen(3000, () => console.log("Application running on port 3000"));
