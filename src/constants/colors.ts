import { theme } from 'native-base'

const tintColor = theme.colors.blue['600']
const white = theme.colors.white

export default {
  buttonPress: theme.colors.lightBlue['200'],
  darkMode: theme.colors.dark['100'],
  tabIconDefault: theme.colors.trueGray['600'],
  tabBar: theme.colors.trueGray['50'],
  errorBackground: theme.colors.red['600'],
  warningBackground: theme.colors.yellow['300'],
  warningText: theme.colors.lime['900'],
  tintColor: tintColor,
  tabIconSelected: tintColor,
  noticeBackground: tintColor,
  errorText: white,
  noticeText: white,
  lightMode: white,
  white: white,
  activeIcon: theme.colors.blue['700'],
  inactiveIcon: theme.colors.warmGray['300']
}
