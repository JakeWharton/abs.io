var app = require('express').createServer();

//Simple static URL redirection
var simples = {
	'/github'   : 'https://github.com/JakeWharton/ActionBarSherlock',
	'/issues'   : 'https://github.com/JakeWharton/ActionBarSherlock/issues',
	'/download' : 'http://actionbarsherlock.com/download.html',
	'/group'    : 'https://groups.google.com/group/actionbarsherlock',
}
for (var simple in simples) {
	console.log('Redirecting "' + simple + '" to "' + simples[simple] + '"');
	app.get(simple, function(req, res) {
		res.redirect(simples[req.url]);
	});
}

//Regex-based URL redirection
app.get('/issues?/:id', function(req, res) {
	res.redirect('https://github.com/JakeWharton/ActionBarSherlock/issues/' + req.params.id);
});

//Catch-all
app.get('*', function(req, res) {
	res.redirect('http://actionbarsherlock.com');
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
