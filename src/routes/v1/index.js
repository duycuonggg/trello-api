import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRouter } from './boardRoute'
import { columnRouter } from './columnRouter'
import { cardRouter } from './cardRouter'


const Router = express.Router()

// check api
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })
})

// boads api
Router.use('/boards', boardRouter )

// boads api
Router.use('/columns', columnRouter )

// boads api
Router.use('/cards', cardRouter )


export const APIs_V1 = Router
