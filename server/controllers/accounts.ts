import { Response, Request } from 'express';
import { AccountService } from '../services';

async function getAccounts(req: Request, res: Response) {
  const accounts = await AccountService.getAccounts();
  if (accounts && accounts.length > 0) {
    res.status(200).json(accounts);
  } else {
    res.sendStatus(204);
  }
}

async function getAccount(req: Request, res: Response) {
    // const { accountId } = req.params;
    // const account = await accountService.getAccount(parseInt(accountId));
    // if (account) {
    //   res.status(200).json(account);
    // } else {
    //   res.sendStatus(404);
    // }
}


async function createAccount(req: Request, res: Response) {
  const { email, firstName, lastName, password } = req.body;
  await AccountService.createAccount(email, firstName, lastName, password);
  res.sendStatus(201);
}

async function updateAccount(req: Request, res: Response) {
  // const { accountId } = req.params;
  // const {  emailAdress, firstName, lastName, password } = req.body;
  // await accountService.updateAccount(parseInt(accountId), emailAdress, firstName, lastName, password);
  // res.sendStatus(204);
}

async function deleteAccount(req: Request, res: Response) {
  // const { accountId } = req.params;
  // await accountService.deleteAccount(parseInt(accountId));
  // res.sendStatus(204);
}

const AccountController = {
    getAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
}

export { AccountController };