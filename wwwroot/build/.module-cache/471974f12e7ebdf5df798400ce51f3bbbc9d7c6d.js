/**
 * Created by Maurice on 5/10/2015.
 */

var RouteHandler = ReactRouter.RouteHandler;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var App = React.createClass({displayName: "App",
    render: function(){
        return React.createElement("div", null, 
            React.createElement(RouteHandler, null)
        );
    }
});

//React.render(
//    <App />,
//    document.getElementById('app')
//);

var routes = (
    React.createElement(Route, {handler: App, path: "/"}, 
        React.createElement(DefaultRoute, {handler: MovieList}), 
        React.createElement(Route, {name: "movies", handler: MovieList}), 
        React.createElement(Route, {name: "movie/:id", handler: MovieList})
    )
);

ReactRouter.run(routes, function (Handler) {
    React.render(React.createElement(Handler, null), document.body);
});