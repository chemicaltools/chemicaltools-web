<?php
require 'load.php';
use \LeanCloud\User;
if ($currentUser != null) {
	if(isset($_POST['name']))$name = $_POST['name']; else $name="";
	if($name=="historyElement"){
		$outputHtml=$currentUser->get("historyElementOutputHtml");
		if($outputHtml==""){
			echo "您尚未使用本功能，赶快试试吧！";
		}else{
			$ElementNumber=$currentUser->get("historyElementNumber");
			echo "<table><tr><td><img src='img/element_".$ElementNumber.".png'></td></tr><tr><td>".nl2br($outputHtml)."</td></tr></table></tr>";
		}
	}else if($name=="historyElementmin"){
		$outputHtml=$currentUser->get("historyElementOutputHtml");
		if($outputHtml==""){
			echo"您尚未使用本功能，赶快试试吧！";
		}else{
			echo nl2br($outputHtml);
		}
	}else if($name=="historyMass"){
		$output=$currentUser->get("historyMassOutput");
		if($output==""){
			echo "您尚未使用本功能，赶快试试吧！";
		}else{
			echo nl2br($output);
		}
	}else if($name=="historyAcid"){
		$acidOutput=$currentUser->get("historyAcidOutput");
		if($acidOutput==""){
			echo "您尚未使用本功能，赶快试试吧！";
		}else{
			echo nl2br($acidOutput);
		}
	}else if($name=="historyDeviation"){
		$output=$currentUser->get("historyDeviation");
		if($output==""){
			echo "您尚未使用本功能，赶快试试吧！";
		}else{
			echo nl2br($output);
		}
	}else if($name=="historyExam"){
		$correct=(int)($currentUser->get("examCorrectNumber"));
		$incorrect=(int)($currentUser->get("examIncorrectnumber"));
		$sum=$correct+$incorrect;
		$rate=(double)$correct/(double)$sum*100;
		if($sum>0) echo '共回答'.$sum.'题，其中'.$correct.'题正确，正确率为'.sprintf("%.2f", $rate).'%';
		else echo "您尚未使用本功能，赶快试试吧！";
	}
}