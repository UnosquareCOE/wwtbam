import bcrypt from 'bcrypt';
import { Router, Request, Response } from "express";
import prisma from "../../prisma";

const accountsRouter = Router();

accountsRouter.route("/").get(async (req : Request, res: Response) => {
    try {
        const accounts = await prisma.accounts.findMany()
        res.json(accounts)
      } catch (error: any) {
        console.log(error.message);
        res.status(500).json({
          message: "Something went wrong",
        })
      }
});

accountsRouter.route("/:accountId(\\d+)").get(async (req : Request, res: Response) => {
    try {
        const { accountId } = req.params;
        const accounts = await prisma.accounts.findFirst({
            where: {
               id: Number(accountId) 
            }
        })
        res.json(accounts)
      } catch (error: any) {
        console.log(error.message);
        res.status(500).json({
          message: "Something went wrong",
        })
      }
});

accountsRouter.route("/").post(async (req : Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const newAccount = await prisma.accounts.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                created_date: new Date(),
                modified_date: new Date(),
                password: await bcrypt.hash(password, 10),
            }
        })
        res.status(201).json(newAccount);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error."
        })
    }

});

accountsRouter.route("/:accountId(\\d+)").put(async (req : Request, res: Response) => {
    try {
        const { accountId } = req.params;
        const { firstName, lastName, email, password } = req.body;
        const account = await prisma.accounts.update({
            where: { id: Number(accountId) },
            data: { 
                first_name: firstName || undefined,
                last_name: lastName || undefined,
                email: email || undefined,
                password: password || undefined
            }
        })
        res.status(200).json(account);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error."
        })
    }
});


accountsRouter.route("/:accountId(\\d+)").delete(async (req : Request, res: Response) => {
    try {
        const { accountId } = req.params;
        await prisma.accounts.delete({
            where: {
                id: Number(accountId)
            }
        })
        res.sendStatus(202)
    } catch(error: any) {
            console.log(error.message);
            res.status(500).json({
                message: "Internal server error."
            })
        }
    }
);

export { accountsRouter };