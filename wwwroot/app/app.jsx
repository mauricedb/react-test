/**
 * Created by Maurice on 5/10/2015.
 */

var RouteHandler = ReactRouter.RouteHandler;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var App = React.createClass({
    render: function(){
        return <div>
            <h1>ReactJS</h1>

            <RouteHandler/>
        </div>;
    }
});

var routes = (
    <Route handler={App} path="/">
        <DefaultRoute handler={MovieList} />
        <Route name="movies" handler={MovieList} />
        <Route name="movie" path="movie/:id" handler={MovieEdit} />
    </Route>
);

ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});

//React.render(
//    <App />,
//    document.getElementById('app')
//);
