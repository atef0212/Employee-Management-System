import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { connect } from './db-connection.js'
import userRoute from './src/routes/users-routes.js'
import './config/congfig.js'
import { refreshAccessToken } from './src/maddleWare/check-auth.js'


const app=express()
app.use(bodyParser.json())

app.use(cors({
  origin:["http://localhost:5173"],
  methods:["GET","POST","DELETE","PUT"],
  credentials:true
}))
app.use('/api/users', userRoute);

// Apply refresh token middleware to all routes
app.use(refreshAccessToken)
  connect()


const port=process.env.PORT

























app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  