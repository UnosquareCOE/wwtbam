import { Router, Request, Response } from "express";

const participantsRouter = Router();

participantsRouter.route("/").get((req : Request, res: Response) => {
    res.send('Hello from GET Participants');
});

participantsRouter.route("/:participantId(\\d+)").get((req : Request, res: Response) => {
    const { participantId } = req.params;
    res.send(`Hello from GET Participant ${participantId}`);
});

participantsRouter.route("/").post((req : Request, res: Response) => {
    res.send('Hello from POST Participants');
});

participantsRouter.route("/:participantId(\\d+)").put((req : Request, res: Response) => {
    const { participantId } = req.params;
    res.send(`Hello from PUT Participant ${participantId}`);
});


participantsRouter.route("/:participantId(\\d+)").delete((req : Request, res: Response) => {
    const { participantId } = req.params;
    res.send(`Hello from DELETE Participant ${participantId}`);
});

export { participantsRouter };