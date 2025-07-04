// những domain được phép truy cập tài nguyển của sever
export const WHITELIST_DOMAINS = [
  // 'http://localhost:5173'
  // không cần local host nữa vì ở file config/cors đã luôn luôn cho phép môi trường dev (env.BUILD_MODE === 'dev')
  'https://trello-web-tawny.vercel.app/'
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}