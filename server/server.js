/**
 * Created by Maurice on 10/26/2014.
 */

var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var app = express();

var movies = require('./movies');
app.use('/api/movies', movies);

app.use(serveStatic(path.join(__dirname, '../wwwroot')));

app.listen(process.env.PORT || 8080, function () {
    console.info('The server is listening at port ' + (process.env.PORT || 8080));
});
