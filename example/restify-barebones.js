/**
 * New node file
 */
var restify = require('restify');
var assert = require('assert');

function send(request, response, next) {
	response.send('hello ' + request.params.name);
	return next();
}

var server = restify.createServer();

server.listen(8088, function() {
	console.log('%s listening at %s', server.name, server.url);
});

server.put('/hello', send);
server.get('/hello/:name', send);
server.head('hello/:name', send);
server.del('hello/:name', function rm(req, res, next) {
	res.send(204);
	return next();
});

//server.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, function(req, res, next) {
//	console.log(req.params[0]);
//	console.log(req.params[1]);
//	res.send(200);
//	return next();
//});

var count = 0;

server.use(function foo(req, res, next) {
	count++;
	next();
});

server.get('/foo/:id', function (req, res, next) {
	next('foo2');
});

server.get({
	name: 'foo2',
	path: '/foo/:id'
}, function (req, res, next) {
	assert.equal(count, 1);
	res.send(200);
	next();
});