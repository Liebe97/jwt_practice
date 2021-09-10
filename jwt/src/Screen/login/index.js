import React, {useState} from "react";
import { StyleSheet, SafeAreaView, View, Button, Text, Pressable, Dimensions, TextInput } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const [login, setLogin] = useState({ id: 'admin', pw: '123' });
  const [jwtverify, setJwtVerify] = useState('');

  const handleIdInput = (e) => {
    setLogin({ ...login, id: e })
  }
  const handlePwInput = (e) => {
    setLogin({ ...login, pw: e })
  }

  const handleLogin = async () => {
    if (login.id !== '' && login.pw !== '') {
      axios
        .post('http://10.0.2.2:3000/login', login)
        // .post('http://localhost:3000/login', login)
        .then(res => {
          if (res.data.state === 'success') {
            alert('로그인 성공');
            AsyncStorage.setItem('jwt', res.headers.token)
          } 
          else alert('로그인 실패')
        })
        .catch(err => console.log(err))
    } else alert('아이디, 비밀번호를 모두 입력해주세요')
	};

  const handleUserCheck = async () => {
    const jwt = await AsyncStorage.getItem('jwt')
    const config = { headers: { Authorization: jwt }}
    const verify = await axios.get('http://10.0.2.2:3000/verify', config);
    if (verify.data) setJwtVerify(verify.data)
    else alert('토큰 만료')
	};

	return (
		<SafeAreaView style={LoginContain.contain}>
      {jwtverify === 'success'
      ? <View style={LoginContain.box}>
          <Text style={LoginContain.title}>로그인완료</Text>
          <Pressable onPress={() => setJwtVerify('')}>
            <Text style={LoginContain.btn}>로그인 화면으로</Text>
          </Pressable>
        </View>
      : <View style={LoginContain.box}>
          <Text style={LoginContain.title}>로그인</Text>
          <View>
            <TextInput onChangeText={handleIdInput} value={login.id} style={LoginContain.input} placeholder="id" />
            <TextInput onChangeText={handlePwInput} value={login.pw} style={LoginContain.input} placeholder="password" />
            <Pressable onPress={() => handleLogin()}>
              <Text style={LoginContain.btn}>로그인</Text>
            </Pressable>
            <Pressable onPress={() => handleUserCheck()}>
              <Text style={LoginContain.checkbtn}>사용자확인</Text>
            </Pressable>
          </View>
          <Text>{jwtverify}</Text>
        </View>
      }
    </SafeAreaView>
	)
}

const LoginContain = StyleSheet.create({
  contain: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc' },
  box: { width: '80%', height: '40%', minHeight: 230, backgroundColor: '#fff', borderRadius: 20 },
  title: { fontSize: 20, textAlign: 'center', marginVertical: 15 },
  input: { marginHorizontal: '10%', marginVertical: 5, padding: 5, paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: '#9c9c9c' },
  btn: { width: '80%', marginVertical: 15, marginHorizontal: '10%', padding: 5, paddingVertical: 8, backgroundColor: '#2f77d4', textAlign: 'center', color: '#fff' },
  checkbtn: { backgroundColor: '#fff', textAlign: 'center' }
})

export default Main