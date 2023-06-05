import { Router, Request, Response } from "express";

const sessionsRouter = Router();

sessionsRouter.route("/").get((req : Request, res: Response) => {
    res.send('Hello from GET Sessions');
});

sessionsRouter.route("/:sessionId(\\d+)").get((req : Request, res: Response) => {
    const { sessionId } = req.params;
    res.send(`Hello from GET Session ${sessionId}`);
});

sessionsRouter.route("/").post((req : Request, res: Response) => {
    res.send('Hello from POST Sessions');
});

sessionsRouter.route("/:sessionId(\\d+)").put((req : Request, res: Response) => {
    const { sessionId } = req.params;
    res.send(`Hello from PUT Session ${sessionId}`);
});


sessionsRouter.route("/:sessionId(\\d+)").delete((req : Request, res: Response) => {
    const { sessionId } = req.params;
    res.send(`Hello from DELETE Account ${sessionId}`);
});

export { sessionsRouter };