function startGame(g){
	$('.level-number').html(g);
	var map = $('#map');
	$(document).unbind( "keydown" );
	map.html('');
	var level;
	$.getJSON("levels/"+g+".json", function(result){
        createMap(result,map);
        level=result;
    }).fail(function() { 
    	alert('Level Not Found, back to level 1...');
    	startGame(1);
    });
    
    function createMap(level,ele){
    	for(i=0; i<level.height; i++){
    		for(j=0; j<level.width; j++){
    			ele.append('<div class="box" id="'+ j +'-'+ i +'"></div>')	
    		}
    	}
    	boxWidth = (100/level.width)+"%";
    	$('.box').width(boxWidth);
    	setHeights(level);
		buildLevel(level);
		$(document).keydown(function(e) {
			if(e.which == 38 || e.which == 39|| e.which == 40 || e.which == 37){
				e.preventDefault();
		    	getMove(e.which, level);
		    }
		});	
    }
    function setHeights(level){
    	$('.box').height($('.box').width());
    }
    $( window ).resize(function() {
	  setHeights();
	});
	function getMove(e, level){
		var pos = $('.active').attr('id');
		pos = pos.split("-");
		pos[0] = parseInt(pos[0]);
		pos[1] = parseInt(pos[1]);
		if(e == 38){ //up
			if(pos[1]!=0){
				pos[1] = pos[1]-1;
				checkMove(pos[0] +'-'+pos[1], "up");
			}
		}else if(e == 39){ //right
			if(pos[0]!= (level.width-1)){
				pos[0] = pos[0]+1;
				checkMove(pos[0] +'-'+pos[1], "right");
			}
		}else if(e == 40) { //down
			if(pos[1]!= (level.height-1)){
				pos[1] = pos[1]+1;
				checkMove(pos[0] +'-'+pos[1], "down");
			}
		}else if(e == 37){  //left
			if(pos[0]!=0){
				pos[0] = pos[0]-1;
				checkMove(pos[0] +'-'+pos[1], "left");
			}
		}
	}
	function checkMove(id, direction){
		if($('#'+id).hasClass('rock')){
			moveRock(id, direction)
		}else if(!$('#'+id).hasClass('wall')){
			$('.active').removeClass('active').removeClass('up').removeClass('down').removeClass('right').removeClass('left');
			$('#'+id).addClass('active').addClass(direction);
		}
	}
	function moveRock(id, dir){
		var rockpos = $('#'+id).attr('id');
		pos = rockpos.split("-");
		pos[0] = parseInt(pos[0]);
		pos[1] = parseInt(pos[1]);

		switch(dir) {
		    case "up":
		    	pos[1] = pos[1]-1;
		    	var spot = pos[0] +'-'+pos[1];
		    	if(pos[1]!=-1){
		    		moveBoth(spot, id, dir);	
		    	}
		        break;
		    case "down":
		    	pos[1] = pos[1]+1;
		    	var spot = pos[0] +'-'+pos[1];
		       	if(pos[1]!= (level.height)){
					moveBoth(spot, id, dir);	
				}
		        break;
		    case "right":
		       	pos[0] = pos[0]+1;
		    	var spot = pos[0] +'-'+pos[1];
		       	if(pos[0]!= (level.width)){
					moveBoth(spot, id, dir);	
				}
		        break;
		    case "left":
		       	pos[0] = pos[0]-1;
		    	var spot = pos[0] +'-'+pos[1];
		    	if(pos[0]!=-1){
		    		moveBoth(spot, id, dir);	
		    	}
		        break;
		    default:
		        console.log('error');
		}
	}
	function moveBoth(s, id, direction){
		var spot = $('#'+s)
		if(!spot.hasClass('wall') && !spot.hasClass('rock')){
			$('#'+id).removeClass('rock');
			spot.addClass('rock');
			$('.active').removeClass('active').removeClass('up').removeClass('down').removeClass('right').removeClass('left');
			$('#'+id).addClass('active').addClass(direction);
			checkWin();
		}
	}
	function checkWin(){
		var goals = $('.goal').length;
		var completed = $('.goal.rock').length;
		if(goals == completed){
			var nextLevel=confirm('You Win! Are you ready for the next level?');
		    if (nextLevel) {
		    	g++;
		    	window.location.href = "index.html?"+g;
		    }
		}
	}

	function buildLevel(level){
		
		for(var i=0; i<level.walls.length; i++){
			$("#"+level.walls[i]).addClass('wall');
		}
		for(var i=0; i<level.rocks.length; i++){
			$("#"+level.rocks[i]).addClass('rock');
		}
		for(var i=0; i<level.goals.length; i++){
			$("#"+level.goals[i]).addClass('goal');
		}

		$("#"+level.start).addClass('active').addClass('right');

	}
};
var query = window.location.search.slice(1);
var gameLevel = query.trimLeft("/");
if(gameLevel == ''){
	startGame(1);	
}else{
	startGame(gameLevel);
}
$('button').on('click', function(){
	startGame(gameLevel);
})