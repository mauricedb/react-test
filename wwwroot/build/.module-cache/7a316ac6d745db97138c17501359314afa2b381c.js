var MovieList = React.createClass({displayName: "MovieList",
    getInitialState: function () {
        return {movies: []};
    },
    componentWillMount(){},
    render: function () {

        return React.createElement("table", {class: "table table-bordered"}, 
            React.createElement("tr", null, 
                React.createElement("th", null, "Title"), 
                React.createElement("th", null, "Directors"), 
                React.createElement("th", null)
            )
        )

    }
});