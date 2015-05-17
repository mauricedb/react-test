

var InputText = React.createClass({displayName: "InputText",
    render: function () {
        console.log(this.props.value)
        return React.createElement("div", {class: "form-group"}, 
            React.createElement("label", null, "Title"), 
            React.createElement("input", {type: "text", className: "form-control", value: this.props.value})
        )
    }
});

var MovieEdit = React.createClass({displayName: "MovieEdit",
    getInitialState: function () {
        return {movie: {}};
    },
    componentWillMount: function () {
        var _this = this;
        $.getJSON('/api/movies/771028554').then(function (movie) {
            console.log(movie)
            _this.setState({movie: movie});
        })
    },
    render: function () {
        return React.createElement("form", null, 
            React.createElement(InputText, {value: this.state.movie.title}, "Title 2"), 
            React.createElement(InputText, null)
        );
    }
});
