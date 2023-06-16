import { Router } from "express";
import { body } from "express-validator";
import { AccountController } from "../controllers";
import { Validation } from "../utils";

const AccountsRouter = Router();

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
AccountsRouter.route("/").get(AccountController.getAccounts);

AccountsRouter.route("/:accountId(\\d+)").get(AccountController.getAccount);

AccountsRouter.route("/").post(
  [
    body("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 3")
      .isEmail()
      .withMessage("the email must be in a valid email format")
      .trim(),
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("the firstName must have minimum length of 3")
      .trim(),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("the lastName must have minimum length of 3")
      .trim(),
    body("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("the password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("the password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("the password should have at least one special character"),
  ],
  Validation.validate,
  AccountController.createAccount
);

AccountsRouter.route("/:accountId(\\d+)").put(AccountController.updateAccount);

AccountsRouter.route("/:accountId(\\d+)").delete(
  AccountController.deleteAccount
);

export { AccountsRouter };
