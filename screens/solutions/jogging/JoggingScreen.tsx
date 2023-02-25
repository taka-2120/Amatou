import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../../../components/Themed';
import React, { useState } from 'react';
import { Text } from 'react-native';
import * as NativeStack from '@react-navigation/native-stack';
import { ActionType, RootStackParamList } from '../../../types';
import { VStack } from 'react-native-stacks';
import { Pedometer } from 'expo-sensors';
import RNPickerSelect from 'react-native-picker-select';

export default function Jogging({ route, navigation }: NativeStack.NativeStackScreenProps<RootStackParamList, 'Jogging'>) {

  let time: number = 20;

  let end: Date;
  const [stepCount, setStepCount] = useState(0);
  const [pastCount, setPastCount] = useState(0);

  const [count, setCount] = useState(time);
  const [text, setText] = useState("開始");
  const [mode, setMode] = useState(0);  //0:初期、1:動作中、2:停止中 3:終了後

  const [start, setStart] = useState(new Date());


  const switchMode = () => {
    switch (mode) {
      case 0:
        //スタートボタン押されたとき
        setMode(1);
        setStart(new Date());
        setText("停止");
        break;
      case 1:
        //中断ボタン押されたとき
        setMode(2);
        setText("再開");
        break;
      case 2:
        //再開ボタン押されたとき
        setPastCount(pastCount + stepCount);
        setStepCount(0);
        setMode(1);
        setStart(new Date());
        setCount(count);
        setText("停止");
        break;
      case 3:
        //結果画面ボタン押されたとき
        navigation.push('Result', { stress: route.params.stress, type: ActionType.Joggnig })
        break;
    }
  }

  const getcount = async () => {
    const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
    setStepCount(pastStepCountResult.steps);
  }

  const reset = () => {
    setMode(0);
    setStepCount(0);
    setPastCount(0);
    setCount(time);
    setText("開始");
  }

  const countdown = setTimeout(() => {
    if (mode == 1) {
      //タイマー動作中は
      const next = Number((count - 0.1).toFixed(1));

      if (next < 0) {
        //タイマー切れた瞬間
        setCount(0);
        end = new Date();
        getcount();
        setMode(3);
        setText("結果画面へ");
      }
      else {
        //タイマー絶賛動作中は
        setCount(next);
      }

      end = new Date();
      getcount();
    }
  }, 1 * 100);

  return (
    <View style={styles.container}>
      
      <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
      />

      <VStack spacing={10} style={styles.stack}>
        <Text style={styles.time}>{count}</Text>
        <Text style={styles.count}>{pastCount + stepCount}</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={switchMode} style={styles.button}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={reset}>
          <Text>reset</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  count: {
    width: '100%',
    textAlign: 'center',
    fontSize: 70,
    paddingTop: 10,
    paddingBottom: 10,
    // backgroundColor: 'black',
    color: '#74b9ff',
  },
  stack: {
    width: `80%`,
  },
  time: {
    width: '100%',
    textAlign: 'center',
    fontSize: 100,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'black',
    color: 'white',
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 20,
    paddingRight: 40,
    paddingBottom: 20,
    paddingLeft: 40,
  },
  text: {
    fontSize: 30
  }
});