var app = require('express').createServer();

//Simple static URL redirection
var simples = {
	'/github'   : 'https://github.com/JakeWharton/ActionBarSherlock',
	'/issues'   : 'https://github.com/JakeWharton/ActionBarSherlock/issues',
	'/download' : 'http://actionbarsherlock.com/download.html',
	'/group'    : 'https://groups.google.com/group/actionbarsherlock',
	'/forum'    : 'https://groups.google.com/group/actionbarsherlock',
	'/store'    : 'http://actionbarsherlock.spreadshirt.com',
	'/shop'     : 'http://actionbarsherlock.spreadshirt.com',
	'/flattr'   : 'https://flattr.com/thing/320252/ActionBarSherlock',
	'/ohloh'    : 'https://www.ohloh.net/p/ActionBarSherlock',
	'/donate'   : 'http://actionbarsherlock.com/merch-and-donations.html',
	'/changelog': 'https://github.com/JakeWharton/ActionBarSherlock/blob/master/CHANGELOG.md#readme',
	'/tags'     : 'https://github.com/JakeWharton/ActionBarSherlock/tags',
	'/market'   : 'https://market.android.com/search?q=com.actionbarsherlock',
	'/4'        : 'https://github.com/JakeWharton/ActionBarSherlock/issues?milestone=4&state=open',
}
for (var simple in simples) {
	console.log('Redirecting "' + simple + '" to "' + simples[simple] + '"');
	app.get(simple, function(req, res) {
		res.redirect(simples[req.url]);
	});
}

//Regex-based URL redirection
app.get(/^\/i(?:ssues?)?\/([0-9]+)/, function(req, res) {
	res.redirect('https://github.com/JakeWharton/ActionBarSherlock/issues/' + req.params[0]);
});
app.get(/^\/b(?:ranch)?\/([.a-zA-Z0-9_-]+)/, function(req, res) {
	res.redirect('https://github.com/JakeWharton/ActionBarSherlock/tree/' + req.params[0]);
});
app.get(/^\/([0-9A-Fa-f]{6,})/, function(req, res) {
	res.redirect('https://github.com/JakeWharton/ActionBarSherlock/commit/' + req.params[0]);
});

//Catch-all
app.get('*', function(req, res) {
	res.redirect('http://actionbarsherlock.com' + req.url);
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
