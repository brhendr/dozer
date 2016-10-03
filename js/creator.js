$(function() {
	var map = $('#map');
	
    var $select = $(".1-100");
    for (i=1;i<=100;i++){
        $select.append($('<option></option>').val(i).html(i))
    }

    $( ".fn-set-size" ).change(function() {
		var mapHeight =$('select.height').val();
		var mapWidth =$('select.width').val();
		buildMap(mapWidth, mapHeight);
	});

    function buildMap(x,y){
    	map.html('')
    	for(i=0; i<y; i++){
    		for(j=0; j<x; j++){
    			map.append('<div class="box" id="'+ j +'-'+ i +'"></div>')	
    		}
    	}
    	setHeights(x);
    	$('.box').on('click', function(){
    		addClass($(this));
    	})
    }
    function setHeights(x){
    	boxWidth = ((100/x)-2)+"%";
    	
    	$('.box').width(boxWidth);
    	$('.box').height($('.box').width());
    }
    $( window ).resize(function() {
	  setHeights();
	});

	function addClass(t){
		var thisClass = $('.selected').attr('id');
		if(thisClass=="active"){
			$('.box.active').removeClass('active')
		}
		t.removeClass('rock').removeClass('wall').removeClass('goal');
		t.addClass(thisClass);
	}
	$('.fn-selector').on('click', function(){
		$('.fn-selector').removeClass('selected');
		$(this).addClass('selected')
	})

	$('.fn-get-json').on('click', function(){
		var walls = '';
		var rocks = '';
		var goals = '';
		var dozer = '';
		$('.box.wall').each(function() {
			walls = walls + ',"' + this.id + '"';
		});
		$('.box.rock').each(function() {
			rocks = rocks + ',"' + this.id + '"';
		});
		$('.box.goal').each(function() {
			goals = goals + ',"' + this.id + '"';
		});
		dozer = '"' + $('.box.active').attr('id') + '"';
		var walls = walls.slice(1);
		var rocks = rocks.slice(1);
		var goals = goals.slice(1);
		
		if($('.box.rock').length != $('.box.goal').length){
			alert('Unequal Rocks and Targets');
		}else if($('.box.active').length == 0){
			alert("No dozer")
		}

		var json = 	'{'+
					'"height": '+ $('select.height').val() +','+
					'"width": '+ $('select.width').val() +','+
					'"start": '+ dozer +','+
					'"rocks": ['+ rocks +'],'+
					'"goals": ['+ goals +'],'+
					'"walls": ['+ walls +']'+
				    '}'

				$('.json').html(json)
	})
});