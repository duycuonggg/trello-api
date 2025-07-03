import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createColumn.insertedId)

    if (getNewColumn) {
      // xử lý cấu trúc data ở đây trước khi trả dữ liệu về
      getNewColumn.cards = []

      // cập nhật mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error }
}

const update = async (columnId, reqBody) => {
  try {
    const updateDate = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateDate)

    return updatedColumn
  } catch (error) { throw error }
}

const deleteItem = async (columnId) => {
  try {
    // xóa column
    await columnModel.deleteOneById(columnId)

    // xóa cards trong column trên
    await cardModel.deleteManyByColumnId(columnId)

    return { deleteResult: 'Column and its Cards deleted successfully!' }
  } catch (error) { throw error }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}