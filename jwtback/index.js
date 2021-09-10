import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { verifyToken } from './middleware/verifyToken.js';

import UserInfo from './model/userInfoModel.js';

const app = express()
app.use(express.json());

dotenv.config({ path: path.join(path.resolve(), '/config.env') })

mongoose.connect( process.env.MONGO_URL, {
  dbName: 'test',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() =>  console.log('MongoDB connected'))
.catch((err) =>  console.log(err))

// TODO 1. userinfo 스키마 만들기 v
// TODO 2. 로그인 화면 만들기 v
// TODO 3. DB에 로그인 정보 비교 v
// TODO 4. jwt 토큰 발급 v
// TODO 5. Front(디바이스)에 토큰 저장 v
// TODO 6. Back 에 검증 날리기

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/show', (req, res) => {
  UserInfo.find({}, function(err, data) {
    if (err) throw err;
    res.send(data)
  });
})

app.post('/login', async (req, res) => {
  // req.body => { id: admin, pw: 123 }
  UserInfo.findOne({id: req.body.id}, function(err, data) {
    if (err) throw err;
    else if (req.body.pw === data.password) {
      // * 데이터에 저장된 password 비교 후 일치하면 토큰 생성
      try {
        const loginid = data.id;
        const loginpw = data.pw;
        
        const token = jwt.sign(
          {
            loginid, // 토큰 내용
            loginpw
          },
          process.env.JWT_SECRET, // 시크릿 키
          {
            expiresIn: '5m', // 유효 시간 1분
            issuer: 'Admin'
          }
        );
        // * header에 토큰 저장해주어야함!!
        req.headers.authorization = token
        return res.status(200).header({ token: req.headers.authorization }).json({state: 'success', token})
      } catch(err) {
        console.log(err);
        return res.status(500).send('사용자 정보가 유효하지 않습니다')
      }
    }
    res.send()
  });
})
app.get('/verify', verifyToken, (req, res, next) => {
  res.status(200).send('success')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('server is listening to port : ' + port);
});