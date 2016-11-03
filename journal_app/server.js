// initialize Express in project
const express = require('express');
const app = express();

// start Express on port 8080.
app.listen(8080, () => {
	console.log('Server Started on http://localhost:8080');
	console.log('Press CTRL + C to stop server');
});

// NEW CODE
//lets Express know where to serve static content from
app.use(express.static('public'));
// END OF NEW CODE