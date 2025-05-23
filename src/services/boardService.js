import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // gọi tới tâng Model để xử lý lưu bản ghi newBoard vào trong database
    const createBoard = await boardModel.createNew(newBoard)
    // eslint-disable-next-line no-console
    console.log(createBoard)

    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)

    // làm thêm các xử lý logic khác với các collection khác tùy đặc thù dự án
    // bắn email, notification về các admin khi có 1 cái board mới được tạo

    // trả kết quả về trong service luôn phải có return
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    return board
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}