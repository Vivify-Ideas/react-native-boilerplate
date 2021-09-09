import { extendTheme, themeTools } from 'native-base'
import Colors from '../constants/colors'

export const theme = extendTheme({
  // This is for the Dark theme that the user chooses
  components: {
    Button: {
      baseStyle: ({ colorMode }) => {
        return {
          _pressed: {
            _text: {
              color: Colors.white
            }
          },
          _text: {
            color: colorMode === 'light' ? Colors.darkMode : Colors.lightMode
          },
          backgroundColor:
            colorMode === 'light' ? Colors.lightMode : Colors.darkMode
        }
      },
      defaultProps: {
        _pressed: {
          bgColor: Colors.buttonPress
        },
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
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'light' ? Colors.darkMode : Colors.lightMode
        }
      }
    },
    View: {
      baseStyle: ({ colorMode }: { colorMode: string }) => {
        return {
          flex: 1,
          bg: colorMode === 'light' ? Colors.lightMode : Colors.darkMode
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
