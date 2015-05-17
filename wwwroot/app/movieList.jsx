var Link = ReactRouter.Link;

var MovieRow = React.createClass({
    render: function () {
        return <tr>
            <td>{this.props.movie.title}</td>
            <td>{this.props.movie.abridgedDirectors.join(', ')}</td>
            <td style={{width: 1}}>
                <Link className="btn btn-default btn-xs edit-button"
                      to="movie"
                      params={{id: this.props.movie.id}}>
                    Edit
                </Link>
            </td>
        </tr>;
    }
});

var MovieList = React.createClass({
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
            return <MovieRow key={movie.id} movie={movie}/>;
        });

        return <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Directors</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    }
});