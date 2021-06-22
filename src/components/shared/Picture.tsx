import React, { useState, Fragment } from 'react';
import { Image, ActivityIndicator, StyleSheet, ImageSourcePropType } from 'react-native';

import config from 'config';

const { IMAGE_BASE_URL } = config;

type PictureProps = {
  source: ImageSourcePropType;
  uri?: string;
  style?: any;
};

const Picture = ({ source, uri, style }: PictureProps) => {
  const [loader, setLoader] = useState<boolean>(true);

  const getSourceForImage = (): ImageSourcePropType => {
    if (source) {
      return source;
    }

    return uri?.match(/^https?/) ? { uri } : { uri: IMAGE_BASE_URL + uri };
  };

  const getStyle = () => {
    return style ? style : { width: 100, height: 100 };
  };

  return (
    <Fragment>
      <Image style={getStyle()} source={getSourceForImage()} onLoadEnd={() => setLoader(false)} />
      {loader && <ActivityIndicator style={styles.loading} animating={loader} size="large" />}
    </Fragment>
  );
};

export default Picture;

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
