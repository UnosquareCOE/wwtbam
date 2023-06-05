import express from 'express';
import { accountsRouter } from './routers/accounts';
import { gamesRouter } from './routers/games';
import { sessionsRouter } from './routers/sessions';
import { participantsRouter } from './routers/participants';

const app = express();

app.use(express.json())
app.use("/accounts", accountsRouter);
app.use("/sessions", sessionsRouter);
app.use("/participants", participantsRouter);
app.use("/games", gamesRouter);

app.listen(3000, () => console.log("Application running on port 3000"));
