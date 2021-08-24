import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import { ImagePicker } from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UpdateProfileForm } from 'components/profile/UpdateProfileForm';
import ImagePickerModal from 'components/shared/modal/ImagePickerModal';
import NoPermissionsForCameraModal from 'components/shared/modal/NoPermissionsForCameraModal';
import Picture from 'components/shared/Picture';
import { PERMISSIONS_STATUS } from '../../../constants';
import { UserContext } from 'contexts/UserContext';
import { useUpdateUserMutation } from 'queries/user';
import defaultAvatar from 'assets/images/robot-dev.png';

const EditProfile = () => {
  const { mutate: handleUserUpdate } = useUpdateUserMutation();
  const { user } = useContext(UserContext);

  const [image, setImage] = useState<any>(null);
  const [imagePickerModalVisible, toggleImagePicker] = useState<boolean>(false);
  const [permissionsModalVisible, togglePermissionsModal] = useState<boolean>(false);

  const handleSubmit = (updateUserData: any): void => {
    handleUserUpdate({ ...updateUserData, avatar: image });
  };

  const openImagePickerModal = async (): Promise<void> => {
    const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const hasCameraRollPermission = cameraRollPermissions.status === PERMISSIONS_STATUS.GRANTED;
    const cameraPermissions = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = cameraPermissions.status === PERMISSIONS_STATUS.GRANTED;

    toggleImagePicker(hasCameraPermission && hasCameraRollPermission);
    togglePermissionsModal(!(hasCameraPermission && hasCameraRollPermission));
  };

  const openCamera = async (): Promise<void> => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    });

    setSelectedImage(result);
  };

  const openImagePicker = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    });

    setSelectedImage(result);
  };

  const setSelectedImage = (selectedImage: any): void => {
    if (!selectedImage.cancelled) {
      setImage(selectedImage);
      toggleImagePicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openImagePickerModal}>
        {image !== '' || !!user?.avatar ? (
          <Picture source={image} uri={user?.avatar} />
        ) : (
          <Picture source={defaultAvatar} />
        )}
      </TouchableOpacity>
      <KeyboardAwareScrollView enableOnAndroid>
        <UpdateProfileForm onSubmit={handleSubmit} user={user} />
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
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
