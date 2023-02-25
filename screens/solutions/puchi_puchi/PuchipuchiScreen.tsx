import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../../../components/Themed';
import React from 'react';
import { Button } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as NativeStack from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { useState } from 'react';
import PuchiPuchione from '../../../components/PuchiPuchione'
import { HStack } from 'react-native-stacks';
import FastImage from 'react-native-fast-image'

export default function PuchiPuchi({ navigation }: NativeStack.NativeStackScreenProps<RootStackParamList, 'PuchiPuchi'>) {
  
  const items = [];

  for(let v = 0; v < 6; v++) {
    items.push(hPuchiPuchi(v));
  }

  return (
    <View style={styles.container}>
      {items}
      <Button color = "green" title='ホーム画面へ' onPress={() => navigation.goBack()} />
    </View>
  );
}

function hPuchiPuchi(vKey: number) {
  const hItems = [];

  for (let h = 0; h < 5; h++) {
    hItems.push(PuchiPuchione(vKey + h))
  }

  return (
    <HStack>
      {hItems}
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
