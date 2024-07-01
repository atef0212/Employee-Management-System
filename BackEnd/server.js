import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { connect } from './db-connection.js'
import userRoute from './src/routes/users-routes.js'
import './config/congfig.js'
import { refreshAccessToken } from './src/maddleWare/check-auth.js'
import commentRoute from './src/routes/comment-routes.js'
import cookieParser from 'cookie-parser'

const app=express()
app.use(bodyParser.json())
app.use(cookieParser());

console.log("hello World")
app.use(cors({
  origin:["http://localhost:5173", "https://employee-management-system-ogvu.onrender.com"],
  methods:["GET","POST","DELETE","PUT"],
  credentials:true
}))

// Apply refresh token middleware to all routes
app.use(refreshAccessToken);

app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});


app.use("/api/comment", commentRoute)
app.use('/api/users', userRoute);



  connect()


const port=process.env.PORT

























app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  