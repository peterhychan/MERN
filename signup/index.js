const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.post('/subscription', (req, res)=>{
	const { name, email } = req.body;
	if(!name || !email){
		res.redirect('/fail.html');
		return;
	} 

	const postData = JSON.stringify({
		members: [{
			email_address: email,
			status: 'subscribed',
			merge_fileds:{
				FNAME: name
			}
		}]
	});

	const infoObject = {
		url: process.env.URL,
		method: 'POST',
		headers: {
			Authorization: process.env.AUTH
		},
		body: postData
	}

	request(infoObject, (err, response, body)=>{
		if (err){
			res.redirect('/fail.html');
		}else{
			if (response.statusCode ===200){
				res.redirect('/success.html');
			}else{
				res.redirect('/fail.html');
			}
		}
	});
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Listening to PORT'));