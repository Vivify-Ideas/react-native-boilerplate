import React, { useState, Fragment } from 'react'
import { Image, ImageSourcePropType, ImageStyle } from 'react-native'
import $t from 'i18n'
import config from 'config'
import { Spinner } from 'native-base'

const { IMAGE_BASE_URL } = config

type PictureProps = {
  source: ImageSourcePropType
  uri?: string
  style?: ImageStyle
}

const Picture = ({ source, uri, style }: PictureProps) => {
  const [loader, setLoader] = useState<boolean>(true)

  const getSourceForImage = (): ImageSourcePropType => {
    if (source) {
      return source
    }

    return uri?.match(/^https?/) ? { uri } : { uri: IMAGE_BASE_URL + uri }
  }

  const getStyle = () => {
    return style ? style : { width: 100, height: 100 }
  }

  return (
    <Fragment>
      <Image
        style={getStyle()}
        source={getSourceForImage()}
        onLoadEnd={() => setLoader(false)}
      />
      {loader && (
        <Spinner size="lg" accessibilityLabel={$t('common.loading')} />
      )}
    </Fragment>
  )
}

export default Picture
