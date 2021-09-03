import { extendTheme, themeTools } from 'native-base'
import Colors from '../constants/colors'

export const theme = extendTheme({
  // This is for the Dark theme that the user chooses
  components: {
    Button: {
      baseStyle: (props: any) => {
        return {
          _text: {
            color: themeTools.mode(Colors.darkMode, Colors.lightMode)(props)
          },
          backgroundColor: themeTools.mode(
            Colors.lightMode,
            Colors.darkMode
          )(props)
        }
      },
      defaultProps: {
        bg: 'white'
      }
    },
    Box: {
      defaultProps: {
        alignItems: 'center'
      }
    },
    Text: {
      // For all the Text components
      baseStyle: (props: any) => {
        return {
          color: themeTools.mode(Colors.darkMode, Colors.lightMode)(props)
        }
      }
    },
    View: {
      baseStyle: (props: any) => {
        return {
          flex: 1,
          bg: themeTools.mode(Colors.lightMode, Colors.darkMode)(props)
        }
      },
      defaultProps: {
        flex: 1
      }
    }
  }
})
export default {
  theme
}
