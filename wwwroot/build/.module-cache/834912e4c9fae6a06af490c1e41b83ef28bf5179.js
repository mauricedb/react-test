var Link = ReactRouter.Link;

var MovieRow = React.createClass({displayName: "MovieRow",
    movieClicked: function () {
        alert(this.props.movie.title)
    },
    render: function () {
        return React.createElement("tr", null, 
            React.createElement("td", null, this.props.movie.title), 
            React.createElement("td", null, this.props.movie.abridgedDirectors.join(', ')), 
            React.createElement("td", {style: {width: 1}}, 
                React.createElement("button", {className: "btn btn-default btn-xs edit-button", 
                        onClick: this.movieClicked}, 
                    "Edit"
                ), 
                React.createElement(Link, {to: "movie", params: {id: this.props.movie.id}})
            )
        );
    }
});

var MovieList = React.createClass({displayName: "MovieList",
    getInitialState: function () {
        return {movies: []};
    },
    componentWillMount: function () {
        var _this = this;
        $.getJSON('/api/movies').then(function (movies) {
            _this.setState({movies: movies});
        })
    },
    render: function () {
        var rows = this.state.movies.map(function (movie) {
            return React.createElement(MovieRow, {key: movie.id, movie: movie});
        });

        return React.createElement("table", {className: "table table-bordered table-striped"}, 
            React.createElement("thead", null, 
                React.createElement("tr", null, 
                    React.createElement("th", null, "Title"), 
                    React.createElement("th", null, "Directors"), 
                    React.createElement("th", null)
                )
            ), 
            React.createElement("tbody", null, 
                rows
            )
        )
    }
});