const express = require('express');
const app = express(); //Generate a new express aplication

app.get('/', (req, res) => {
    res.send({ bye: "Buddy buddy" });
});

const PORT = process.env.PORT || 5000; //If there an environment variable that has been already defined by heroku then used, IFNOT use port 5000
//so in development environment we're listenig in port 5000 and in producction we're listening in wherever port heroku set to us
app.listen(PORT, () => console.log('server listenig'));
