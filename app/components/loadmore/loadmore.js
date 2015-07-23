var Loadmore = React.createClass({displayName: "Loadmore",
	render : function(){
		return (
			React.createElement("div", {className: "container text-centre"}, 
				React.createElement("button", {className: "primary large"}, "Load more")
			)
		);
	}
});