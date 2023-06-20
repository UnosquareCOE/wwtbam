import { Router } from 'express'
import { AuthenticationController } from '../controllers'
import { body } from 'express-validator'
import { AccountController } from '../controllers'
import { Validation } from '../utils'

const AuthenticationRouter = Router()

/**
 * @swagger
 * /auth:
 *   post:
 *     tags: [
 *       authentication
 *     ]
 *     summary: Allows user to authenicate by providing email and password
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
AuthenticationRouter.route('/').post(AuthenticationController.authenticate)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [
 *       authentication,
 *       register
 *     ]
 *     summary: Allows user to register by providing
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
AuthenticationRouter.route('/register').post(
  AuthenticationController.register,
  [
    body('email')
      .isLength({ min: 3 })
      .withMessage('the email must have minimum length of 3')
      .isEmail()
      .withMessage('the email must be in a valid email format')
      .trim(),
    body('firstName')
      .isLength({ min: 3 })
      .withMessage('the firstName must have minimum length of 3')
      .trim(),
    body('lastName')
      .isLength({ min: 3 })
      .withMessage('the lastName must have minimum length of 3')
      .trim(),
    body('password')
      .isLength({ min: 8, max: 15 })
      .withMessage('the password should have min and max length between 8-15')
      .matches(/\d/)
      .withMessage('the password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('the password should have at least one special character'),
  ],
  Validation.validate,
  AccountController.createAccount
)

export { AuthenticationRouter }
