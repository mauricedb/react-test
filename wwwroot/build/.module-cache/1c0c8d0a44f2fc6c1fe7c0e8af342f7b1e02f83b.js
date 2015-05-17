var InputText = React.createClass({displayName: "InputText",
    componentWillReceiveProps: function (newProps) {
        React.findDOMNode(this.refs.input).value = newProps.value
    },
    onChange(){
        var value = React.findDOMNode(this.refs.input).value;
        console.log(value)
        this.props.value = value;
    },
    render: function () {
        return React.createElement("div", {className: "form-group"}, 
            React.createElement("label", null, this.props.children), 
            React.createElement("input", {type: "text", className: "form-control", ref: "input", onChange: this.onChange})
        )
    }
});

var TextArea = React.createClass({displayName: "TextArea",
    componentWillReceiveProps: function (newProps) {
        React.findDOMNode(this.refs.input).value = newProps.value
    },
    render: function () {
        return React.createElement("div", {className: "form-group"}, 
            React.createElement("label", null, this.props.children), 
            React.createElement("textarea", {className: "form-control", ref: "input", rows: "5"})
        )
    }
});

var MovieEdit = React.createClass({displayName: "MovieEdit",
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState: function () {
        return {movie: {}};
    },
    componentWillMount: function () {
        var id = this.context.router.getCurrentParams().id;
        var _this = this;
        $.getJSON('/api/movies/' + id).then(function (movie) {
            _this.setState({movie: movie});
        })
    },
    save(){
        console.log(this.state.movie)
        var id = this.context.router.getCurrentParams().id;
        var _this = this;
        $.ajax('/api/movies/' + id, {
            data: this.state.movie,
            type: 'put'
        }).then(function(){
            alert('saved')

        });
    },
    render: function () {
        var movie = this.state.movie;
        var ratings = movie.ratings || {};

        return React.createElement("form", null, 
            React.createElement(InputText, {value: movie.title}, "Title"), 
            React.createElement(InputText, {value: movie.abridgedDirectors}, "Directors"), 
            React.createElement(TextArea, {value: movie.criticsConsensus}, "Critics Consensus"), 
            React.createElement(TextArea, {value: movie.synopsis}, "Synopsis"), 
            React.createElement(InputText, {value: movie.year}, "Year"), 
            React.createElement(InputText, {value: movie.mpaaRating}, "MPAA Rating"), 
            React.createElement(InputText, {value: ratings.criticsScore}, "Critics Score"), 
            React.createElement(InputText, {value: ratings.audienceScore}, "Audience Score"), 

            React.createElement("div", {className: "form-group"}, 
                React.createElement("button", {type: "submit", onClick: this.save, className: "btn btn-primary"}, "Save"), 
                React.createElement(Link, {className: "btn btn-danger", 
                      to: "movies"}, 
                    "Cancel"
                )
            )
        );
    }
});
