import React from 'react';
import { Image } from 'react-native';

export default function CustomNavigationBar() {
    return (
      <Image
        source={require('./spiro.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
  