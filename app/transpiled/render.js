var Example = React.createClass({displayName: "Example",
	render : function(){
		return (
			React.createElement("div", {className: "centre text-centre"}, 
				React.createElement("h1", {className: "fade-in"}, "React.js App"), 
				React.createElement("p", {className: "fade-in"}, "This is a react component example...")
			)
		);
	}
});

React.render(
 	React.createElement(Example, null),
    document.getElementById('app')
);