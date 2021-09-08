import {
  request,
  check,
  requestNotifications,
  PERMISSIONS,
  Permission
} from 'react-native-permissions'
import { Platform } from 'react-native'
import { OS_TYPES } from '../constants'
// type used in usage examples
type PermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'limited'
  | 'granted'
  | 'blocked'
  | null

export async function askForNotificationsPermission(): Promise<PermissionStatus> {
  requestNotifications(['alert', 'sound']).then(({ status, settings }) => {
    return status
  })
  return null
}

export async function askForPermission(
  permissionToGet: 'CAMERA' | 'PHOTO_LIBRARY'
): Promise<PermissionStatus> {
  let typeOfPermission: Permission | undefined = PERMISSIONS.IOS.CAMERA
  if (permissionToGet == 'CAMERA') {
    typeOfPermission =
      Platform.OS === OS_TYPES.ANDROID
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA
  } else if (permissionToGet == 'PHOTO_LIBRARY') {
    typeOfPermission =
      Platform.OS === OS_TYPES.ANDROID
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY
  }

  const permissionStatus = await check(typeOfPermission).then(result => {
    return result
  })
  if (permissionStatus !== 'denied') {
    // if it is denied that means there is still a chance that the user will confirm
    return permissionStatus
  }

  request(typeOfPermission).then(result => {
    return result
  })
  return null
}
