import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  async getItem(key) {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = JSON.parse(jsonValue);
    if (value) {
      return value;
    }

    return null;
  }

  async setItem(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async removeItem(key) {
    await AsyncStorage.removeItem(key);
  }

  async clear() {
    await AsyncStorage.clear();
  }
}

const asyncStorageService = new AsyncStorageService();

export default asyncStorageService;
