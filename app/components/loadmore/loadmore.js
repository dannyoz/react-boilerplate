var Loadmore = React.createClass({displayName: "Loadmore",
	render : function(){
		return (
			React.createElement("button", {className: "primary large", onClick: this.props.onClick}, "Load more")
		);
	}
});