/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import cors from 'cors'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))
  // enable req.body json data
  app.use(express.json())

  app.use('/v1', APIs_V1)

  // midleware xử lý lỗi tập chung
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Production Hello ${env.AUTHOR}, Back-end sever is running successfully at Port ${process.env.PORT}`)
    })
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`Local Dev Hello ${env.AUTHOR}, Back-end sever is running successfully at Host ${env.LOCAL_DEV_APP_HOST} and Port: ${env.LOCAL_DEV_APP_PORT}`)
    })
  }

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

