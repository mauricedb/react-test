

var InputText = React.createClass({displayName: "InputText",
    render: function () {
        return React.createElement("div", {class: "form-group"}, 
            React.createElement("label", {for: "title"}, "Title"), 
            React.createElement("input", {type: "text", class: "form-control", id: "title", "ng-model": "movie.title"})
        )
    }
});

var MovieEdit = React.createClass({displayName: "MovieEdit",
    getInitialState: function () {
        return {movie: {}};
    },
    render: function () {
        return React.createElement("form", null, 
            React.createElement(InputText, {field: this.state.movie.title}, "Title 2"), 
            React.createElement(InputText, null)
        );
    }
});
