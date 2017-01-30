function exam(modeinput,questioninput,answerinput,did){ 
	$.post("/exam.php",{mode:modeinput,question:questioninput,answer:answerinput,ajax:1},function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
			$("form").submit(function(e) {
				exam($(this).children("#mode").val(),$(this).children("#question").val(),$(this).children("#answer").val(),"#questionarea");
				return false;
			});
		}    
	});
}
$(function(){
	exam("","","","#questionarea");
	if($("#login").val()=="1"){
		history('historyExam','#historyExam');
		update('examMode');
		update('elementnumber_limit');
	}else{
		$("#historyExam").html("");
	}
});