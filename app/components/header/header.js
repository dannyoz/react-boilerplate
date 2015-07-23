var Header = React.createClass({displayName: "Header",
	render: function(){
		return (
			React.createElement("header", null, 
	      		React.createElement("div", {className: "container"}, 
	        		React.createElement("h6", null, "React.js App!")
	        	)
	      	)
		);
	}
});


