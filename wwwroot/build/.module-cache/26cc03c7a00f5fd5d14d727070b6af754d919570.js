

var InputText = React.createClass({displayName: "InputText",
    render: function () {
        return React.createElement("div", {class: "form-group"}, 
            React.createElement("label", null, "Title"), 
            React.createElement("input", {type: "text", className: "form-control", defaultValue: this.props.value})
        )
    }
});

var MovieEdit = React.createClass({displayName: "MovieEdit",
    getInitialState: function () {
        return {movie: {}};
    },
    componentWillMount: function () {
        var _this = this;
        $.getJSON('/api/movies/').then(function (movies) {
            _this.setState({movies: movies});
        })
    },
    render: function () {
        return React.createElement("form", null, 
            React.createElement(InputText, {value: this.state.movie.title}, "Title 2"), 
            React.createElement(InputText, null)
        );
    }
});
