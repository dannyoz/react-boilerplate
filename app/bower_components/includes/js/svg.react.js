var Doughnut = React.createClass({displayName: "Doughnut",

	// Eample usage 
	// <Doughnut val="75" className="submit" padding="15" size="120" />

	getInitialState : function(){
		return {
			val       : this.props.val,
			className : this.props.className,
			padding   : this.props.padding,
			size      : this.props.size,
			angle     : (this.props.val * 3.6 - 90) - 0.0001,
			radius    : (this.props.size /2)-(this.props.padding/2) 
		}
	},

	pathAttr : function(angle,size,padding){

		var PI = Math.PI,
		    cos = Math.cos,
		    sin = Math.sin,
		    centerY = size/2,
		    centerX = size/2,
			radius = (size/2)-(padding/2),
			startAngle = - 90,
		    startRadians = startAngle * PI / 180,
		    endRadians = angle * PI / 180,
		    largeArc = ((endRadians - startRadians) % (PI * 2)) > PI ? 1 : 0,
		    startX = centerX + cos(startRadians) * radius,
	        startY = centerY + sin(startRadians) * radius,
	        endX = centerX + cos(endRadians) * radius,
	        endY = centerY + sin(endRadians) * radius


		var commands = [
	      	'M', startX, startY,      
	      	'A', radius, radius, 0, largeArc, 1, endX, endY
	    ]

	    return String(commands.join(' '))
	},

	render : function(){
		return (
			React.createElement("div", {style: {width:this.state.size+'px',height:this.state.size+'px',position:'relative', display : "inline-block"}}, 
				React.createElement("svg", {className: this.state.className, style: {width:this.state.size+'px',height:this.state.size+'px'}}, 
					React.createElement("circle", {cx: "50%", cy: "50%", r: this.state.radius}), 
					React.createElement("path", {d: this.pathAttr(this.state.angle,this.state.size,this.state.padding)})
				), 
				React.createElement("p", {className: this.state.className + ' percentage'}, this.state.val, "%")
			)
		);
	}
});

