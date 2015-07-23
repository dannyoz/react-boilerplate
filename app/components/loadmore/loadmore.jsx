var Loadmore = React.createClass({
	render : function(){
		return (
			<button className="primary large" onClick={this.props.onClick}>Load more</button>
		);
	}
});