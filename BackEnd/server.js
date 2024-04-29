import express from 'express'
import bodyParser from 'body-parser'
import { connect } from './db-connection.js'
import userRoute from './src/routes/users-routes.js'
import './config/congfig.js'



const app=express()
app.use(bodyParser.json())

app.use('/api/users', userRoute);
  connect()


const port=process.env.PORT

























app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  