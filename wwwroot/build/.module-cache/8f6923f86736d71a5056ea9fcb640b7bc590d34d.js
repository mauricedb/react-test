/**
 * Created by Maurice on 5/10/2015.
 */



var App = React.createClass({displayName: "App",
    render: function(){
        return React.createElement("div", null, 
        React.createElement(MovieList, null)
        );
    }
});

//React.render(
//    <App />,
//    document.getElementById('app')
//);

Router.run(routes, function (Handler) {
    React.render(React.createElement(Handler, null), document.body);
});