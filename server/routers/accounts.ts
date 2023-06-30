import { Router } from 'express'
import { body } from 'express-validator'
import { AccountController } from '../controllers'

const AccountsRouter = Router()

/**
 * @swagger
 * /accounts:
 *   get:
 *     tags: [
 *       accounts
 *     ]
 *     summary: Returns an array of account items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "email": "email@test.com", "firstName": "user", "lastName": "last" },
 *                        { "id": 2, "email": "email2@test.com", "firstName": "first", "lastName": "last" } ]'
 *       204:
 *         description: No content
 */
AccountsRouter.route('/').get(AccountController.getAccounts)

AccountsRouter.route('/:accountId(\\d+)').get(AccountController.getAccount)

AccountsRouter.route('/:emailAddress').get(AccountController.getAccountByEmail)

AccountsRouter.route('/:accountId(\\d+)').put(AccountController.updateAccount)

AccountsRouter.route('/:accountId(\\d+)').delete(
  AccountController.deleteAccount
)

export { AccountsRouter }
