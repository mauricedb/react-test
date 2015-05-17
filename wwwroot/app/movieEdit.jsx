var InputText = React.createClass({
    componentWillReceiveProps: function (newProps) {
        React.findDOMNode(this.refs.input).value = newProps.value
    },
    onChange: function(){
        var value = React.findDOMNode(this.refs.input).value;
        this.props.onChange({value: value, prop: this.props.prop});
    },
    render: function () {
        return <div className="form-group">
            <label>
                {this.props.children}
            </label>
            <input id={this.props.prop + 'Input'}
                   type="text"
                   className="form-control"
                   ref="input"
                   onChange={this.onChange}/>
        </div>
    }
});

var TextArea = React.createClass({
    componentWillReceiveProps: function (newProps) {
        React.findDOMNode(this.refs.input).value = newProps.value
    },
    onChange: function(){
        var value = React.findDOMNode(this.refs.input).value;
        this.props.onChange({value: value, prop: this.props.prop});
    },
    render: function () {
        return <div className="form-group">
            <label>
                {this.props.children}
            </label>
            <textarea id={this.props.prop + 'Input'}
                      className="form-control"
                      ref="input"
                      onChange={this.onChange}
                      rows="5"/>
        </div>
    }
});

var MovieEdit = React.createClass({
    mixins: [ReactRouter.Navigation],
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
    onChange: function(e){
        var movie = this.state.movie;
        movie[e.prop] = e.value;
        this.setState({movie: movie});
    },
    onChangeRatings: function(e){
        var movie = this.state.movie;
        movie.ratings[e.prop] = e.value;
        this.setState({movie: movie});
    },
    save: function(){
        var id = this.context.router.getCurrentParams().id;
        var _this = this;
        $.ajax('/api/movies/' + id, {
            data: this.state.movie,
            type: 'put'
        }).then(function () {
            _this.transitionTo('movies')
        });
    },
    render: function () {
        var movie = this.state.movie;
        var ratings = movie.ratings || {};

        return <form>
            <InputText onChange={this.onChange}
                       prop='title'
                       value={movie.title}>
                Title
            </InputText>
            <InputText onChange={this.onChange}
                       prop='abridgedDirectors'
                       value={movie.abridgedDirectors}>
                Directors
            </InputText>
            <TextArea onChange={this.onChange}
                      prop='criticsConsensus'
                      value={movie.criticsConsensus}>
                Critics Consensus
            </TextArea>
            <TextArea onChange={this.onChange}
                      prop='synopsis'
                      value={movie.synopsis}>
                Synopsis
            </TextArea>
            <InputText onChange={this.onChange}
                       prop='year'
                       value={movie.year}>
                Year
            </InputText>
            <InputText onChange={this.onChange}
                       prop='mpaaRating'
                       value={movie.mpaaRating}>
                MPAA Rating
            </InputText>
            <InputText onChange={this.onChangeRatings}
                       prop='criticsScore'
                       value={ratings.criticsScore}>
                Critics Score
            </InputText>
            <InputText onChange={this.onChangeRatings}
                       prop='audienceScore'
                       value={ratings.audienceScore}>
                Audience Score
            </InputText>

            <div className="form-group">
                <button type="submit"
                        onClick={this.save}
                        className="btn btn-primary">
                    Save
                </button>
                <Link className="btn btn-danger"
                      to="movies">
                    Cancel
                </Link>
            </div>
        </form>;
    }
});
