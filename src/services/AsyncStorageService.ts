import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  async getItem(key: string): Promise<any> {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = JSON.parse(jsonValue as string);
    if (value) {
      return value;
    }

    return null;
  }

  async setItem(key: string, value: any): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
}

const asyncStorageService = new AsyncStorageService();

export default asyncStorageService;
