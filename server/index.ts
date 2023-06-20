import express, { json, urlencoded, Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import cors from 'cors'
import {
  AccountsRouter,
  AuthenticationRouter,
  GamesRouter,
  SessionsRouter,
} from './routers'
import { verifyAuth } from './middleware/verifyAuth'

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'WWTBAM',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
  ],
}

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./routers/*.ts'],
})

app.use('/swagger.json', (req: Request, res: Response) =>
  res.json(openapiSpecification).status(200)
)
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
)

app.use('/auth', AuthenticationRouter)
app.use(verifyAuth)
app.use('/accounts', AccountsRouter)
app.use('/sessions', SessionsRouter)
app.use('/games', GamesRouter)

app.listen(3000, () => console.log('Application running on port 3000'))
