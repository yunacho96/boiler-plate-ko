const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { User } = require('./models/User')
const config = require('./config/key');
//application/x-www-form-urlencoded 폼 부분을 가져올 수 있게 
app.use(bodyParser.urlencoded({extended: true}));
//application.json 으로된 부분 분석해서 가져올 수 있게 
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.set('strictQuery',true)
mongoose.connect(config.mongoURI, {
   
}).then(()=> console.log('MongoDB Connected....'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 헤헤 ')
})

app.post('/register', (req, res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 database에 넣어준다.
  const user = new User(req.body)
  user.save((err, userInfo)=> {
    if(err) return res.json({ success : false, err})
    return res.status(200).json({
      success:true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})