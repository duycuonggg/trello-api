import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  /*
  mặc định không cần phải custom massege ở phí BE để cho FE tự validate và custom massege phía FE cho đẹp
  BE chỉ cần validate đảm bảo dữ liệu chuẩn xác, trả về massege mặc định từ thư viện là được
  Việc validate dự liệu phía BE phải có vì đây là điểm cuối để lưu trữ dữ liệu vào database
  Thông thường trong thực tế, điều tốt nhất cho hệ thống hãy luôn validate dữ liệu ở cả BE và FE
  */
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title length must be at 3 character long',
      'string.max': 'Title length must be less than or equal to 5 character long',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // console.log(req.body)

    // chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // validate dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew
}
