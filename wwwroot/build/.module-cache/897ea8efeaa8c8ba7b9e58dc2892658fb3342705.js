var InputText = React.createClass({displayName: "InputText",
    componentWillReceiveProps: function (newProps) {
        React.findDOMNode(this.refs.input).value = newProps.value
    },
    onChange(){
        var value = React.findDOMNode(this.refs.input).value;
        this.props.onChange({value: value, prop: this.props.prop});
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
    onChange(){
        var value = React.findDOMNode(this.refs.input).value;
        this.props.onChange({value: value, prop: this.props.prop});
    },
    render: function () {
        return React.createElement("div", {className: "form-group"}, 
            React.createElement("label", null, this.props.children), 
            React.createElement("textarea", {className: "form-control", ref: "input", onChange: this.onChange, rows: "5"})
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
    onChange(e){
        var movie = this.state.movie;
        movie[e.prop] = e.value;
        this.setState({movie: movie});
    },
    save(){
console.log(this.state.movie)
        var id = this.context.router.getCurrentParams().id;
        var _this = this;
        $.ajax('/api/movies/' + id, {
            data: this.state.movie,
            type: 'put'
        }).then(function () {
            alert('saved')

        });
    },
    render: function () {
        var movie = this.state.movie;
        var ratings = movie.ratings || {};

        return React.createElement("form", null, 
            React.createElement(InputText, {onChange: this.onChange, prop: "title", value: movie.title}, "Title"), 
            React.createElement(InputText, {onChange: this.onChange, prop: "abridgedDirectors", value: movie.abridgedDirectors}, "Directors"), 
            React.createElement(TextArea, {onChange: this.onChange, prop: "criticsConsensus", value: movie.criticsConsensus}, "Critics Consensus"), 
            React.createElement(TextArea, {onChange: this.onChange, prop: "synopsis", value: movie.synopsis}, "Synopsis"), 
            React.createElement(InputText, {onChange: this.onChange, prop: "year", value: movie.year}, "Year"), 
            React.createElement(InputText, {onChange: this.onChange, prop: "mpaaRating", value: movie.mpaaRating}, "MPAA Rating"), 
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
