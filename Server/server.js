import express from 'express'
import './config/congfig.js'



const app=express()
const port=process.env.PORT

























app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  