var Example = React.createClass({
	render : function(){
		return (
			<div className="centre text-centre">
				<h1 className="fade-in">React.js App</h1>
				<p className="fade-in">This is a react component example...</p>
			</div>
		);
	}
});

React.render(
 	<Example/>,
    document.getElementById('app')
);