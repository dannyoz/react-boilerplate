
var CardHolder = React.createClass({displayName: "CardHolder",

	getInitialState : function(){
		return {
			projects : []
		}
	},

	componentDidMount : function(){

		$.ajax({
		    url: this.props.api,
		    jsonp: "callback",
		    dataType: "jsonp",
		    success: this.onDataReceived
		});
	},

	onDataReceived : function(data){

		if (this.isMounted()) {
        	this.setState({
          		projects : data.projects
        	});
      	}
	},

	render:function(){
		return (
			React.createElement("div", {className: "container"}, 
				React.createElement("div", {className: "masonry"}, 
					this.state.projects.map(function (data){
						return React.createElement(Card, {data: data})
					})
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

