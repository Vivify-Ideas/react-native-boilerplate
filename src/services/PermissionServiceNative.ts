import {
  request,
  check,
  requestNotifications,
  PERMISSIONS,
  RESULTS,
  Permission
} from 'react-native-permissions'
import { Platform } from 'react-native'
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
  permissionToGet: any
): Promise<object | boolean> {
  const permissionsArray = ['CAMERA', 'PHOTO_LIBRARY']

  if (permissionsArray.indexOf(permissionToGet) == -1) {
    return false
  }

  const theOS = Platform.OS.toUpperCase()

  let typeOfPermission: Permission
  if (permissionToGet == 'CAMERA') {
    typeOfPermission =
      theOS == 'ANDROID' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA
  } else if (permissionToGet == 'PHOTO_LIBRARY') {
    typeOfPermission =
      theOS == 'ANDROID'
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY
  }

  // @ts-expect-error waiting for this to be assigned
  check(typeOfPermission)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)'
          )
          break
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable'
          )
          break
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible')
          break
        case RESULTS.GRANTED:
          console.log('The permission is granted')
          return true
          break
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore')
          break
      }
    })
    .catch(error => {
      console.log(error)
    })

  // @ts-expect-error waiting for this to be assigned
  request(typeOfPermission).then(result => {
    return result
  })
  return false
}
