import { Router, Request, Response } from "express";

const gamesRouter = Router();

gamesRouter.route("/").get((req : Request, res: Response) => {
    res.send('Hello from GET Games');
});

gamesRouter.route("/:gameId(\\d+)").get((req : Request, res: Response) => {
    const { gameId } = req.params;
    res.send(`Hello from GET Game ${gameId}`);
});

gamesRouter.route("/").post((req : Request, res: Response) => {
    res.send('Hello from POST Games');
});

gamesRouter.route("/:gameId(\\d+)").put((req : Request, res: Response) => {
    const { gameId } = req.params;
    res.send(`Hello from PUT Game ${gameId}`);
});

//Maybe don't need explicit delete game endpoint if we just run a scheduled job to clean up inactive sessions/games
gamesRouter.route("/:gameId(\\d+)").delete((req : Request, res: Response) => {
    const { gameId } = req.params;
    res.send(`Hello from DELETE Game ${gameId}`);
});

export { gamesRouter };