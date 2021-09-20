import { ChangePasswordProps } from 'types/auth'
import { User } from 'types/backend'
import ENDPOINTS from '../../constants/endpoints'
import ApiService from './ApiService'

type EditProfileProp = {
  id: string
  avatar?: { uri: string }
  first_name: string
  last_name: string
}

class UserService extends ApiService {
  me = async (): Promise<User> => {
    const { data } = await this.apiClient.get(ENDPOINTS.ME)
    return data
  }

  edit = async (data: EditProfileProp): Promise<User> => {
    const formData = new FormData()
    if (data.avatar) {
      const { uri } = data.avatar
      const name = uri.split('/').pop()
      const type = 'image/jpeg'
      formData.append('profile_picture', { uri, name, type })
    }

    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)

    const { data: responseData } = await this.apiClient.put(
      ENDPOINTS.EDIT_USER.replace(':id', `${data.id}`),
      formData
    )

    return responseData
  }

  changePassword = async (data: ChangePasswordProps): Promise<void> => {
    this.apiClient.post(ENDPOINTS.CHANGE_PASSWORD, data)
  }
}

const userService = new UserService()
export default userService
