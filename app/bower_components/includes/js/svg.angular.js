var ngSvg = angular.module('ngSvg', []);

// Example usage
// <div ng-doughnut="{val:100,size:120,padding:15,className:'submit'}"></div>

ngSvg.directive('ngDoughnut',function(){
	return {
		restrict : "A",
		template : '<svg ng-attr-class="{{config.className}}" ng-attr-style="{{svgStyle}}">' +
				   '<circle cx="50%" cy="50%" ng-attr-r="{{radius}}"></circle>' +
			       '<path ng-attr-d="{{percentage}}"></path>' +
			       '</svg>' +
			       '<p ng-attr-class="{{config.className}} percentage">{{config.val}}%</p>',     
		scope : {
			config : "=ngDoughnut"
		},
		link : function(scope,element,attrs){

			var percent   = scope.config.val * 3.6 - 90,
				endAngle  = percent - 0.0001,
				container = {
					position : "relative",
					display  : "inline-block",
					margin   : "0 10px",
					width    : scope.config.size+"px",
					height   : scope.config.size+"px"
				};

			element.css(container);

			scope.radius      = (scope.config.size /2)-(scope.config.padding/2);
			scope.svgStyle    = "width:"+scope.config.size+"px;height:"+scope.config.size+"px;";

			scope.pathAttr = function(angle){

				var PI = Math.PI,
				    cos = Math.cos,
				    sin = Math.sin,
				    centerY = scope.config.size/2,
				    centerX = scope.config.size/2,
					radius = (scope.config.size/2)-(scope.config.padding/2),
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
			}

			scope.percentage = scope.pathAttr(endAngle);
		}
	}
});

ngSvg.directive('ngPieNut', function(){
	return {
		restrict : "A",
		template : '<svg ng-attr-class="{{config.className}} pie-nut" ng-attr-style="{{svgStyle}}">' +
				   '<circle cx="50%" cy="50%" ng-attr-r="{{radius}}"></circle>' +
			       '<path ng-repeat="path in config.vals" ng-attr-transform="{{rotates[$index]}}" ng-attr-d="{{paths[$index]}}"></path>' +
			       '</svg>',   
		scope : {
			config : "=ngPieNut"
		},
		link : function(scope,element){
			
			var container = {
					position : "relative",
					display  : "inline-block",
					margin   : "0 10px",
					width    : scope.config.size+"px",
					height   : scope.config.size+"px"
				};

			element.css(container);

			scope.paths    = [];
			scope.rotates  = [];
			scope.radius   = (scope.config.size /2)-(scope.config.padding/2);
			scope.svgStyle = "width:"+scope.config.size+"px;height:"+scope.config.size+"px;";

			scope.pathAttr = function(angle){

				var PI = Math.PI,
				    cos = Math.cos,
				    sin = Math.sin,
				    centerY = scope.config.size/2,
				    centerX = scope.config.size/2,
					radius = (scope.config.size/2)-(scope.config.padding/2),
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
			}

			scope.calcSize = function(index){


				var val       = scope.config.vals[index];
					percent   = val * 3.6 - 90,
					endAngle  = percent - 0.0001,
					path      = scope.pathAttr(endAngle);

				scope.paths.push(path);

				if(index > 0){

					var newVal = 0;

					for(var j=0;j<index;j++){
						newVal += scope.config.vals[j];
					}

					var deg    = newVal * 3.6;
						half   = scope.config.size/2,
						rotate = "rotate("+deg+" "+half+" "+half+")";

				} else {
					var half   = scope.config.size/2,
						rotate = "rotate(0 "+half+" "+half+")";
				}

				scope.rotates.push(rotate);
			}

			for (var i=0; i<scope.config.vals.length;i++){
				scope.calcSize(i)
			}

		}
	}
});
