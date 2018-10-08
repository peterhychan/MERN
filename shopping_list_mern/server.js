const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const items = require('./routes/api/items')
const path = require('path');

const app = express()

//BodyParser Middleware
app.use(bodyParser.json())

//Database Config
const database = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
	.connect(database)
	.then(()=> console.log('MongoDB Connected Successfully.'))
	.catch(error => console.log(error))

//Use Routes
app.use('/api/items', items)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5050

app.listen(port, ()=> console.log("Server is listening on PORT "+port))

