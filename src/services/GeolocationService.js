import { Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import I18n from '../i18n';

class GeolocationService {
  getGeolocation = async () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      return I18n.t('location.androidEmulatorTryDevice');
    }
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return I18n.t('location.permissionDenied');
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  };
}
const geolocationService = new GeolocationService();
export default geolocationService;
