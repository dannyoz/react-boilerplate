
var CardHolder = React.createClass({

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
			<div className="container">
				<div className="masonry">
					{this.state.projects.map(function (data){
						return <Card data={data}/>
					})}
				</div>
			</div>
		);
	}
});



var Card = React.createClass({
	render: function(){
		return (
			<div className="masonry-item card">
				<img src={this.props.data.covers[404]}/>
				<div className="card-body">
					<h4>{this.props.data.name}</h4>
				</div>
				<footer>
					<a href="#"><i className="icon-eye"/> {this.props.data.stats.views}</a>
					<a href="#"><i className="icon-heart"/> {this.props.data.stats.appreciations}</a>
				</footer>
			</div>
		);
	}
});

