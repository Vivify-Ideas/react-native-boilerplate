import ApiService from './ApiService'
import asyncStorageService from '../AsyncStorageService'
import ENDPOINTS from '../../constants/endpoints'

class NotificationService extends ApiService {
  sendExpoTokenToServer = (expoPushToken: string): Promise<unknown> =>
    this.apiClient.post(ENDPOINTS.SEND_EXPO_TOKEN, {
      expo_token: expoPushToken
    })

  removeExpoTokenFromServer = async (): Promise<void> => {
    try {
      const expoPushToken = await asyncStorageService.getItem('expoPushToken')
      this.apiClient.post(ENDPOINTS.REMOVE_EXPO_TOKEN, {
        secret: expoPushToken
      })
    } catch {
      return
    }
  }
}

const notificationService = new NotificationService()

export default notificationService
