import { Router, Request, Response } from "express";

const accountsRouter = Router();

accountsRouter.route("/").get((req : Request, res: Response) => {
    res.send('Hello from GET Accounts');
});

accountsRouter.route("/:accountId(\\d+)").get((req : Request, res: Response) => {
    const { accountId } = req.params;
    res.send(`Hello from GET Account ${accountId}`);
});

accountsRouter.route("/").post((req : Request, res: Response) => {
    res.send('Hello from POST Accounts');
});

accountsRouter.route("/:accountId(\\d+)").put((req : Request, res: Response) => {
    const { accountId } = req.params;
    res.send(`Hello from PUT Account ${accountId}`);
});

accountsRouter.route("/:accountId(\\d+)").delete((req : Request, res: Response) => {
    const { accountId } = req.params;
    res.send(`Hello from DELETE Account ${accountId}`);
});

export { accountsRouter };