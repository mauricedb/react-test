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

React.render(
    React.createElement(App, null),
    document.getElementById('app')
);