# **_VivifyIdeas React Native boilerplate_**

## **Built in functions**

- React query
- Formik & Yup
- Sign in
- Sign up
- Facebook sign in
- Google sign in
- Forgot & reset password
- Internationalization
- Deeplinking
- Global Error Modal ( Something went wrong )
- Edit profile
- Change password
- Push and inapp notifications

## **TBD**

- Sockets
- Chat

## **Code structure and technologies**

For our forms we use [Formik](https://github.com/jaredpalmer/formik), and for validation we use [Yup](https://github.com/jquense/yup).

In components folder there are some examples of our forms, they all use custom text inputs which are located in `FormFields.js`, and in validation folder you will find some `Yup` validation examples.

    ├── components
    ├──── auth
    ├──── shared
    ├─────── FormFields.js
    └── validation

For localization we have `$t` wrapper around [I18n-js](https://github.com/fnando/i18n-js) library.

To use it all you need to do is:

```
import $t from 'i18n';

$t('common.ok');
```

For notifications we use expo notifications. Their setup is located in `NetworkInterceptor.js`. Since the **_iOS_** doesnt support inapp notifications, we use [React Native In App Notifications](https://github.com/AlexSensei/react-native-in-app-notification).

All handling of notifications is done in `NotificationHandleService.js`. It has two main methods, `showInApp` which will trigger the `In App Notification` to be shown, and `handleOnClick` which handles the logic when you click on notification.

The whole application is wrapped in `InAppNotificationProvider` which, as props takes styles for `In APp notifications` you can see them all [here](https://github.com/AlexSensei/react-native-in-app-notification).

## **Going to production**

...
