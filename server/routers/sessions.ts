import { Router, Request, Response } from "express";

const SessionsRouter = Router();

SessionsRouter.route("/:sessionsId").get((req : Request, res: Response) => {
    const { accountId } = req.params;
    res.send(`Hello from GET Session ${accountId}`);
});

SessionsRouter.route("/").post((req : Request, res: Response) => {
    res.send('Hello from POST Sessions');
});

SessionsRouter.route("/:sessionId").delete((req : Request, res: Response) => {
    const { accountId } = req.params;
    res.send(`Hello from DELETE Session ${accountId}`);
});

SessionsRouter.route("/:sessionId/participants").get((req : Request, res: Response) => {
    const { accountId } = req.params;
    res.send(`Hello from GET Session Participants ${accountId}`);
});

export { SessionsRouter };