import axios from 'axios'
const baseUrl = 'https://bloglist-backend-jbza.onrender.com'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }