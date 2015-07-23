
var CardHolder = React.createClass({displayName: "CardHolder",

	getInitialState : function(){
		return {
			pageNumber : 1,
			projects : []
		}
	},

	componentDidMount : function(){
		this.makeRequest(this.state.pageNumber);
	},

	makeRequest : function(page){

		$.ajax({
		    url: this.props.api + "&page=" + page,
		    jsonp: "callback",
		    dataType: "jsonp",
		    success: this.onDataReceived
		});
	},

	onDataReceived : function(data){
		
		if (this.isMounted()) {
        	this.setState({
          		projects : this.state.projects.concat(data.projects),
          		pageNumber : this.state.pageNumber + 1
        	});
      	}
	},

	loadMorePosts : function(){
		this.makeRequest(this.state.pageNumber);
	},

	render:function(){
		return (
			React.createElement("div", {className: "container"}, 
				React.createElement("div", {className: "masonry"}, 
					this.state.projects.map(function (data){
						return React.createElement(Card, {data: data})
					})
				), 
				React.createElement("div", {className: "text-centre"}, 
					React.createElement(Loadmore, {onClick: this.loadMorePosts})
				)
			)
		);
	}
});



var Card = React.createClass({displayName: "Card",
	render: function(){
		return (
			React.createElement("div", {className: "masonry-item card"}, 
				React.createElement("img", {src: this.props.data.covers[404]}), 
				React.createElement("div", {className: "card-body"}, 
					React.createElement("h4", null, this.props.data.name)
				), 
				React.createElement("footer", null, 
					React.createElement("a", {href: "#"}, React.createElement("i", {className: "icon-eye"}), " ", this.props.data.stats.views), 
					React.createElement("a", {href: "#"}, React.createElement("i", {className: "icon-heart"}), " ", this.props.data.stats.appreciations)
				)
			)
		);
	}
});

