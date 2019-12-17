const express = require("express");
const app = express();

<<<<<<< HEAD
var port = process.env.PORT || 8080;
=======
const port = 8080;
>>>>>>> 26dadbb472ffc218ee9f71dc56af1fe4dd0c49b4

app.use(express.static("build"));

app.listen(port,()=>{
    console.log("App is listening at port: " +port);
});
