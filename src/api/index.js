import request from '../utils/request'

const api = {
  getalist: (r) => request.get('/list'),
  getCommunity: (r) => request.get('/community')
}

export default api
