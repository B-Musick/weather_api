let express = require('express');
let app = express();
require('dotenv').config();
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile('/Users/bmuze1/Desktop/WEATHER_API/views/index.html');
});

app.listen(3000,()=>{
    console.log('SERVER STARTED');
})
