import express from 'express'
import { connect } from './db-connection.js'
import './config/congfig.js'

  connect()

const app=express()
const port=process.env.PORT

























app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  