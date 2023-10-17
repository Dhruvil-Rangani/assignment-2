
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3030;
app.use(cors());

app.get("/" ,(req,res) =>{
    res.status(500).send(`{"message": "Welcome to DressStore Application"}`);
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})