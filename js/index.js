$(document).ready(function() {
	var clicked_o = [];
    var clicked_x = [];
    var count = 0;
    var row = [];
    var column = [];
    var cross = [];

    var x = "x";
    var o = "o";
    
    var o_win = 0;
    var x_win = 0;
    //Change the total_row's value to test scalability
	var total_row = 3;
	//

    for(i=1;i<=total_row*total_row;i++){
    	$("#game > .row").append('<div class="pane"><div id="tic_'+ i +'" class="btn span1"></div></div>');
    	$("#tic-tac-toe").css("width", ((total_row*50)+total_row)+"px");
    }

    //Clicked o
    function fclicked_o(i){
    	clicked_o.push(i);
    }    
   	//
   	
   	//Clicked x
    function fclicked_x(i){
    	clicked_x.push(i);
    }    
   	//


    function gameReset() {
        $("#game div.span1").text("");
        $("#game div.span1").removeClass('disable');
        $("#game div.span1").removeClass('o');
        $("#game div.span1").removeClass('x');
        $("#game div.span1").removeClass('btn-primary');
        $("#game div.span1").removeClass('btn-info');
        clicked_o = [];
    	clicked_x = [];
    	count = 0;
    }

    function oCheck() {    	
    	for(i=1;i<=total_row;i++){
    		row[i] = clicked_o.filter(function(x){return x > total_row*(i-1) && x <= total_row*i;});
    	}
    	
    	for(i=1;i<=total_row;i++){
    		column[i] = clicked_o.filter(function(x){return x%total_row === i-1});
    	}
    	cross[1] = clicked_o.filter(function(x){return x%(total_row + 1) === 1});
    	cross[2] = clicked_o.filter(function(x){return x%(total_row - 1) === 1 && x !== 1 && x !== total_row*total_row});

    	function comparer(){
    		return row.find(function(x){if (x){return x.length === total_row}}) !== undefined ||
    			column.find(function(x){if (x){return x.length === total_row}}) !== undefined ||
    			cross.find(function(x){if (x){return x.length === total_row}}) !== undefined;
    	}

        if (comparer()) {
            return true;
        } else {
            return false;
        }
    }

    function xCheck() {
    	for(i=1;i<=total_row;i++){
    		row[i] = clicked_x.filter(function(x){return x > total_row*(i-1) && x <= total_row*i;});
    	}
    	
    	for(i=1;i<=total_row;i++){
    		column[i] = clicked_x.filter(function(x){return x%total_row === i-1});
    	}
    	cross[1] = clicked_x.filter(function(x){return x%(total_row + 1) === 1});
    	cross[2] = clicked_x.filter(function(x){return x%(total_row - 1) === 1 && x !== 1 && x !== total_row*total_row});

    	function comparer(){
    		return row.find(function(x){if (x){return x.length === total_row}}) !== undefined ||
    			column.find(function(x){if (x){return x.length === total_row}}) !== undefined ||
    			cross.find(function(x){if (x){return x.length === total_row}}) !== undefined;
    	}

        if (comparer()) {
            return true;
        } else {
            return false;
        }
    }

    $('#game div.span1').click(function() {
    	//if already selected
    	if ($(this).hasClass('disable')) {
            alert('Already selected');
        //

        //O Turn
        } else if (count % 2 == 0) {
            count++;
            $(this).text(o);
            $(this).addClass('disable o btn-primary');
            var arr_str = this.id;
            var str_sliced = arr_str.slice(4);
            fclicked_o(parseInt(str_sliced));
        //

        //X Turn
        } else {
            count++;
            $(this).text(x);
            $(this).addClass('disable x btn-info');      
            var arr_str = this.id;
            var str_sliced = arr_str.slice(4);
            fclicked_x(parseInt(str_sliced));
        } 
        //

    	//if O has won
        if (oCheck()) {
            alert('O has won the game. Start a new game');
            o_win++;
            $('#o_win').text(o_win);
            gameReset();
        //

        //if X has won
        } else if (xCheck()) {
            alert('X wins has won the game. Start a new game');
            x_win++;
            $('#x_win').text(x_win);
            gameReset();
        //

        //if tie
        } else if (count == total_row*total_row) {
            alert('Its a tie. It will restart.');
            gameReset();
        //

        } 

    });
    $("#reset").click(function() {
        gameReset();
        count = 0;        
    });
});