import defaultAvatar from 'assets/images/robot-dev.png'
import { UpdateProfileForm } from 'components/profile/UpdateProfileForm'
import ImagePickerModal from 'components/shared/modal/ImagePickerModal'
import NoPermissionsForCameraModal from 'components/shared/modal/NoPermissionsForCameraModal'
import { UserContext } from 'contexts/UserContext'
// @ts-expect-error Module '"expo-image-picker"' has no exported member 'ImagePicker'
import { ImagePicker } from 'expo-image-picker'
import { ExpandImagePickerResult } from 'expo-image-picker/build/ImagePicker.types'
import { Button, Image, View } from 'native-base'
import { useUpdateUserMutation } from 'queries/user'
import React, { useContext, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { askForPermission } from '../../../services/PermissionServiceNative'

type ImageResult = ExpandImagePickerResult<{ allowsMultipleSelection: false }>

type updateUserData = {
  lastName: string
  firstName: string
  avatar: {
    uri: string
  }
}

const EditProfile = () => {
  const { mutate: handleUserUpdate } = useUpdateUserMutation()
  const { user } = useContext(UserContext)

  const [image, setImage] = useState<{ uri: string }>()
  const [imagePickerModalVisible, toggleImagePicker] = useState<boolean>(false)
  const [permissionsModalVisible, togglePermissionsModal] =
    useState<boolean>(false)

  const handleSubmit = (updateUserData: updateUserData): void => {
    image && handleUserUpdate({ ...updateUserData, avatar: image })
  }

  const openImagePickerModal = async (): Promise<void> => {
    const cameraPermissions = await askForPermission('CAMERA')
    const photoLibraryPermissions = await askForPermission('PHOTO_LIBRARY')

    const imagePicker =
      photoLibraryPermissions === 'granted' ||
      photoLibraryPermissions === 'limited'
    const cameraPermissionsRes = cameraPermissions === 'granted'
    togglePermissionsModal(!(imagePicker && cameraPermissionsRes))
    toggleImagePicker(imagePicker)
  }

  const openCamera = async (): Promise<void> => {
    const result: ImageResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4]
    })

    setSelectedImage(result)
  }

  const openImagePicker = async (): Promise<void> => {
    const result: ImageResult = await ImagePicker.launchImageLibraryAsync<{
      allowsMultipleSelection: false
    }>({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4]
    })

    setSelectedImage(result)
  }

  const setSelectedImage = (selectedImage: ImageResult): void => {
    if (!selectedImage.cancelled) {
      setImage({ uri: selectedImage.uri })
      toggleImagePicker(false)
    }
  }

  return (
    <View>
      <Button variant="link" onPress={openImagePickerModal}>
        {image && !!user?.avatar ? (
          <Image source={image} alt="user_avatar" />
        ) : (
          <Image source={defaultAvatar} alt="user_avatar" />
        )}
      </Button>
      <KeyboardAwareScrollView enableOnAndroid>
        <UpdateProfileForm onSubmit={() => handleSubmit} user={user} />
      </KeyboardAwareScrollView>
      <NoPermissionsForCameraModal
        isVisible={permissionsModalVisible}
        closeModal={() => togglePermissionsModal(false)}
      />
      <ImagePickerModal
        isVisible={imagePickerModalVisible}
        closeModal={() => toggleImagePicker(false)}
        galleryImport={openImagePicker}
        openCamera={openCamera}
      />
    </View>
  )
}

export default EditProfile
