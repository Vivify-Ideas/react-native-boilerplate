export default {
  updateProfile: {
    name: "required|string|min:2",
    email: "required|email"
  },
  updatePassword: {
    oldPassword: "required|string|min:7",
    newPassword: "required|string|min:7"
  },
  resetPassword: {
    new_password: "required|string|min:8|confirmed",
    new_password_confirmation: "required|string|min:8"
  }
};
