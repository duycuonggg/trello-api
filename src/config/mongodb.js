import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// khởi tạo 1 đối tượng ban đầu là null vì chưa connect
let trelloDatabaseInstance = null

// khởi tạo 1 đối tượng mongoClientInstance để connect đối tượng
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // sever api từ version 5 trở lên không cần dùng nếu dùng là chỉ định 1 cái Stable api version của mongodb
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// kết nối tói database
export const CONNECT_DB = async () => {
  // gọi kết nối tới mongodb atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  // kết nối thành công thì lấy ra DataBase theo tên và gán ngược nó lại vào biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// đóng kết nối tới database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// function GET_DB (không async) này có nghiệm vụ export ra cái trello database instance sau khi đã kết nối thành công tới mongodb để sử dụng nhiều nơi
// đảm bảo luôn gọi GET_DB này khi đã kết nối thành công mongodb
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error ('Must connect to Database fisrt')
  return trelloDatabaseInstance
}
