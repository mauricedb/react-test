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

var TextArea = React.createClass({displayName: "TextArea",
    componentWillReceiveProps: function (newProps) {
        console.log(newProps)
        React.findDOMNode(this.refs.input).value = newProps.value
    },
    render: function () {
        return React.createElement("div", {class: "form-group"}, 
            React.createElement("label", null, this.props.children), 
            React.createElement("textarea", {className: "form-control", ref: "input", defaultValue: this.props.value, rows: "5"})
        )
    }
});

var MovieEdit = React.createClass({displayName: "MovieEdit",
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState: function () {
        return {movie: {ratings:{}}};
    },
    componentWillMount: function () {
        var id = this.context.router.getCurrentParams().id;
        var _this = this;
        $.getJSON('/api/movies/' + id).then(function (movie) {
            _this.setState({movie: movie});
        })
    },
    render: function () {
        console.log(this.state.movie)
        return React.createElement("form", null, 
            React.createElement(InputText, {value: this.state.movie.title}, "Title"), 
            React.createElement(InputText, {value: this.state.movie.abridgedDirectors}, "Directors"), 
            React.createElement(TextArea, {value: this.state.movie.criticsConsensus}, "Critics Consensus"), 
            React.createElement(InputText, {value: this.state.movie.year}, "Year"), 
            React.createElement(InputText, {value: this.state.movie.mpaaRating}, "MPAA Rating"), 
            React.createElement(InputText, {value: this.state.movie.ratings.criticsScore}, "Critics Score"), 
            React.createElement(InputText, {value: this.state.movie.ratings.audienceScore}, "Audience Score")
        );
    }
});
