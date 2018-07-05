function exam(modeinput,questioninput,answerinput,did){ 
	$("#loading").html('<img src="ico/loading.gif">提交中，请稍后……');
	$.post("exam.php",{mode:modeinput,question:questioninput,answer:answerinput,ajax:1},function(data){   
		if(data==''){//0 
		}else{  
			$("#loading").html('');
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