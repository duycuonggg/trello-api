/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  // enable req.body json data
  app.use(express.json())

  app.use('/v1', APIs_V1)

  // midleware xử lý lỗi tập chung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })

  // thực hiện tác vụ cleanup trước khi dừng server lại
  exitHook(() => {
    console.log('disconnecting')
    CLOSE_DB()
    console.log('disconnected')

  })
}

// chỉ khi kết nối Database thành công mới start server backend lên
// immediately-invoked / anonymous async function (IIFF)
(async () => {
  try {
    console.log('Connecting to MongoDB Clould Atlas!')
    await CONNECT_DB()
    console.log('Connected to MongoDB Clould Atlas!')

    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()

