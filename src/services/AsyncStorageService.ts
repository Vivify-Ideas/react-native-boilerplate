import AsyncStorage from '@react-native-async-storage/async-storage'
import { OS_TYPES } from '../constants'
import { Platform } from 'react-native'

class AsyncStorageService {
  async getItem(key: string): Promise<unknown> {
    const jsonValue = await AsyncStorage.getItem(key)
    const value = JSON.parse(jsonValue as string)
    if (value) {
      return value
    }

    return null
  }

  async setItem(key: string, value: unknown): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key)
  }

  async clear(): Promise<void> {
    if (Platform.OS === OS_TYPES.ANDROID) {
      await AsyncStorage.clear()
    } else {
      await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    }
  }
}

const asyncStorageService = new AsyncStorageService()

export default asyncStorageService
