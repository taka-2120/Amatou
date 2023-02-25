import React from 'react';
import { Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, View, Text } from 'react-native';
import { RootStackParamList, RootTabScreenProps } from '../../types';
import { ZStack, HStack, VStack, Spacer } from 'react-native-stacks';
import DefaultStyle from '../../constants/DefaultStyles';
import * as NativeStack from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Timer } from "../solutions/jogging/Timer"
import stressListController from '../../hooks/stressList';


const HomeScreen = ({ navigation }: NativeStack.NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const { stressList, setStressList } = stressListController();

  const getStoneImagePath = (count: number) => {
    const basePath = "../../assets/images/home_stones/";
    switch (count) {
      case 0: return require(basePath + "00.jpeg");
      case 1: return require(basePath + "01.jpg");
      case 2: return require(basePath + "02.jpg");
      case 3: return require(basePath + "03.jpg");
      case 4: return require(basePath + "04.jpg");
      case 5: return require(basePath + "05.jpg");
      case 6: return require(basePath + "06.png");
      case 7: return require(basePath + "07.jpg");
      default: return require(basePath + "many.png");
    }
  }

  return (
    <SafeAreaView style={DefaultStyle.safeAreaBackground}>
      <VStack spacing={15} style={DefaultStyle.fullHeight}>
        <Text style={DefaultStyle.title}>抱えているストレス</Text>
        <Timer></Timer>
        <Text style={DefaultStyle.title2}>{stressList.length}こ</Text>

        <Spacer />

        <Image source={getStoneImagePath(stressList.length)} style={DefaultStyle.homeImage} />

        <Spacer />

        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.push('StressSelect')} style={DefaultStyle.largeButton}>
          <ZStack style={DefaultStyle.fill}>
            <Text style={[DefaultStyle.title2, {color: "#fff"}]}>ストレス一覧</Text>
          </ZStack>
        </TouchableOpacity>

        <HStack>
          <Spacer />

          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.push('History')} style={[DefaultStyle.smallButton, { backgroundColor: '#9BCDA0' }]}>
            <Text>りれき</Text>
          </TouchableOpacity>

          <Spacer />

          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.push('AddStress')}  style={[DefaultStyle.smallButton, { backgroundColor: '#C09BCD' }]}>
            <Text>ついか</Text>
          </TouchableOpacity>

          <Spacer />
        </HStack>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  button: {
    opacity: 0.5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default HomeScreen;
