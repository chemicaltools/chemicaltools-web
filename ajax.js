function history(hisname,did){ 
	$.post("/ajax.php",{name:hisname},function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
		}    
	});
}
history('historyElement','#historyElement');
history('historyMass','#historyMass');
history('historyAcid','#historyAcid');
history('historyElementmin','#historyElementmin');
history('historyDeviation','#historyDeviation');
history('historyExam','#historyExam');
function change(changename,changevalue){ 
	$.post("/change.php",{name:changename,value:changevalue});
}
