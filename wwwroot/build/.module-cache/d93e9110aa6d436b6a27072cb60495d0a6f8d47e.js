var InputText = React.createClass({displayName: "InputText",
    componentWillReceiveProps: function (newProps) {
        console.log(newProps)
        React.findDOMNode(this.refs.input).value = newProps.value
    },
    render: function () {
        return React.createElement("div", {class: "form-group"}, 
            React.createElement("label", null, this.props.children), 
            React.createElement("input", {type: "text", className: "form-control", ref: "input", defaultValue: this.props.value})
        )
    }
});

var MovieEdit = React.createClass({displayName: "MovieEdit",
    getInitialState: function () {
        return {movie: {}};
    },
    componentWillMount: function () {
        var id = this.context.router.getCurrentParams().id;
        console.log(this.context.router.getCurrentParams())
        var _this = this;
        $.getJSON('/api/movies/771028554').then(function (movie) {
            _this.setState({movie: movie});
        })
    },
    render: function () {
        return React.createElement("form", null, 
            React.createElement(InputText, {value: this.state.movie.title}, "Title"), 
            React.createElement(InputText, {value: this.state.movie.abridgedDirectors}, "Directors")
        );
    }
});
