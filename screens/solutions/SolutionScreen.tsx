import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Image, Text } from 'react-native';
import { RootStackScreenProps } from '../../types';
import { VStack, HStack, Spacer } from 'react-native-stacks';
import BackButton from '../../components/BackButton';
import DefaultStyle from '../../constants/DefaultStyles';
import { getIntensityStyle, getIntensityLabel } from '../../hooks/intensityConverter';
import { DeviceMotion } from 'expo-sensors';
import { useFocusEffect } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { battingSoundState } from '../../atoms/battingSoundState';
import { globalSoundState } from '../../atoms/globalSoundState';
import { Audio } from 'expo-av';

export default function SolutionSelect({ route, navigation }: RootStackScreenProps<'SolutionSelect'>) {
  const [globalSound, setGlobalSound] = useRecoilState(globalSoundState);
  const [battingSound, setBattingSound] = useRecoilState(battingSoundState);

  async function setAudio() {
    const sound = new Audio.Sound();
    await sound.loadAsync(require('../../assets/Audio/orokanarumono.mp3'));
    await sound.setIsLoopingAsync(true);
    setGlobalSound(sound);
  }

  useFocusEffect(() => {
    if (battingSound != undefined) {
      battingSound.unloadAsync();
    }
    if (globalSound == undefined) {
      setAudio();
    }
    DeviceMotion.removeAllListeners();
  });

  useEffect(() => {
    if (globalSound != undefined) {
      globalSound.playAsync();
    }
  }, [globalSound]);

  return (
    <VStack style={DefaultStyle.fullHeight}>

      <HStack spacing={15} style={styles.header}>
        <Spacer />
        <Text style={[DefaultStyle.title, styles.headertext]} numberOfLines={1} ellipsizeMode="tail">{route.params?.stress.title}</Text>
        <Spacer />
        <Text style={[getIntensityStyle(route.params?.stress.intensity)]}>{getIntensityLabel(route.params?.stress.intensity)}</Text>
        <Text style={styles.dueDate}>
          期限: {route.params?.stress.dueDate.toLocaleDateString()}
        </Text>
      </HStack>

      <TouchableOpacity key={1} activeOpacity={0.5} onPress={() => navigation.push("CutAction", { stress: route.params?.stress })} style={styles.imageOuter}>
        <HStack>
          <Spacer />
          <Text style={styles.text}>斬る</Text>
          <Spacer />
          <Image source={require("../../assets/images/cut/kiruyatu.webp")} style={styles.imagesize} />
          <Spacer />
        </HStack>
      </TouchableOpacity>

      <TouchableOpacity key={2} activeOpacity={0.5} onPress={() => navigation.push("Jogging", { stress: route.params.stress })} style={styles.imageOuter}>
        <HStack>
          <Spacer />
          <Text style={styles.text}>走る</Text>
          <Spacer />
          <Image source={require("../../assets/images/jogging/sport_jogging_woman.webp")} style={styles.imagesize} />
          <Spacer />
        </HStack>
      </TouchableOpacity>

      <TouchableOpacity key={3} activeOpacity={0.5} onPress={() => navigation.push("PuchiPuchi", { stress: route.params?.stress })} style={styles.imageOuter}>
        <HStack>
          <Spacer />
          <Text style={styles.text}>潰す</Text>
          <Spacer />
          <Image source={require("../../assets/images/puchipuchi/bakuhatsu.webp")} style={styles.imagesize} />
          <Spacer />
        </HStack>
      </TouchableOpacity>

      <TouchableOpacity key={4} activeOpacity={0.5} onPress={() => navigation.push("Batting", { stress: route.params.stress })} style={styles.imageOuter}>
        <HStack>
          <Spacer />
          <Text style={styles.text}>打つ</Text>
          <Spacer />
          <Image source={require("../../assets/images/batting/baseball.png")} style={styles.imagesize} />
          <Spacer />
        </HStack>
      </TouchableOpacity>

      <Spacer />

      <HStack style={styles.footer}>
        {BackButton(navigation)}
        <Spacer />
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingVertical: 20,

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  imageOuter: {
    width: '90%',
    height: 100,
    borderRadius: 20,
    backgroundColor: "#4AE2EF",
    margin: 10,
  },
  imagesize: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  footer: {
    padding: 40,
    marginBottom: 10,
  },
  text: {
    fontSize: 40,
    alignItems: "center",
    padding: 30
  },
  dueDate: {
    fontSize: 14,
    color: "#777777",
  },
  headertext: {
    maxWidth: '50%'
  }
});
