<?php
session_start();
require 'load.php';
require 'element_xml.php';
use \LeanCloud\Query;
use \LeanCloud\User;
//$query = new Query("Element");
if($_POST['question'] != ""){
	$question=$_POST['question'];
	$answer=$_POST['answer'];
	$mode=(string)$_POST['mode'];
	if($mode=="")$mode="2";
	switch ($mode){
		case "0":case"1":case"2":
			$elementnumber=searchforkind("ElementName", $question);
			break;
		case "3":case"4":case"5":
			$elementnumber=searchforkind("ElementAbbr", $question);
			break;
		case "6":case"7":case"8":
			$elementnumber=searchforkind("ElementNumber", (int)$question);
			break;
		case "9":case"10":case"11":
			$elementnumber=searchforkind("ElementIUPACname", $question);
			break;
	}
	switch ($mode){
        case "3":case"6":case"9":
            //$query->select('ElementName');
			//$todo = $query->first();
			//$correct_answer = $todo->get("ElementName");
			$correct_answer=$elementNameArray[$elementnumber-1];
            break;
        case "0":case"7":case"10":
            //$query->select('ElementAbbr');
			//$todo = $query->first();
			//$correct_answer = $todo->get("ElementAbbr");
			$correct_answer=$elementAbbrArray[$elementnumber-1];
            break;
        case "1":case"4":case"11":
            //$query->select('ElementNumber');
			//$todo = $query->first();
			//$correct_answer = (string)($todo->get("ElementNumber"));
			$correct_answer=(string)$elementnumber;
            break;
        case "2":case"5":case"8":
            //$query->select('ElementIUPACname');
			//$todo = $query->first();
			//$correct_answer = $todo->get("ElementIUPACname");
			$correct_answer=$elementIUPACArray[$elementnumber-1];
            break;
    }
	if($correct_answer==$answer){
		$result= "回答正确！";
		if ($currentUser != null) {
			if(isset($_SESSION['correct']))$_SESSION['correct']=$_SESSION['correct']+1;
			else  $_SESSION['correct']=1;
			//$correct=(int)($currentUser->get("examCorrectNumber"));
			//$correct++;
			//$currentUser->set("examCorrectNumber", (string) $correct);
			//$currentUser->save();
		}
	}else{
		$result= "回答错误，正确答案为：".$correct_answer."，题目为：".$question."，您的答案为：".$answer;
		if ($currentUser != null) {
			if(isset($_SESSION['incorrect']))$_SESSION['incorrect']=$_SESSION['incorrect']+1;
			else  $_SESSION['incorrect']=1;
			//$incorrect=(int)($currentUser->get("examIncorrectnumber"));
			//$incorrect++;
			//$currentUser->set("examIncorrectnumber", (string) $incorrect);
			//$currentUser->save();
		}
	}
	header('Location: exam.php?result='.$result);
	exit;
}else{
?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>元素记忆 -- 化学e+</title>
<?php include 'head.php';
if ($currentUser != null) {
?>
	<script type="text/javascript">
		<?php if($_GET['result']!="")echo"changescore();"?>
		
		update('examMode');
		update('elementnumber_limit');
	</script>
<?php }?>
  </head>
  <body>
<?php include 'header.php';
?>
    <section class="main-content">
	<? 
	include 'title.php';?>
		<h2>元素记忆</h2>
<?php
if($_GET['result'] != ""){
	echo "<p>".$_GET['result']."</p>";
}
?>
<table>
<?php
if ($currentUser != null) {
	if(isset($_COOKIE['elementnumber_limit'])){
		$max=(int)$_COOKIE['elementnumber_limit'];
	}else{
		$max=(int)$currentUser->get("elementnumber_limit");
		setcookie('elementnumber_limit',(string)$max,time() + 259200);
	}
	if(isset($_COOKIE['examMode'])){
		$mode=(double)$_COOKIE['examMode'];
	}else{
		$mode=($currentUser->get("examMode"));
		setcookie('examMode',$mode,time() + 259200);
	}
	if($max==0)$max=118;
	if($mode=="")$mode="2";
}else{
	$max=118;
	$mode="2";
}
$query = new Query("Element");
$n=rand(1,$max);
//$query->equalTo("ElementNumber", $n);
switch ($mode){
    case "0":case"1":case"2":
        //$query->select('ElementName');
		//$todo = $query->first();
		//$Question = $todo->get("ElementName");
		$Question=$elementNameArray[$n-1];
		break;
    case "3":case"4":case"5":
        //$query->select('ElementAbbr');
		//$todo = $query->first();
		//$Question = $todo->get("ElementAbbr");
		$Question=$elementAbbrArray[$n-1];
		break;
    case "6":case"7":case"8":
        $Question = (string)$n;
        break;
    case "9":case"10":case"11":
        //$query->select('ElementIUPACname');
		//$todo = $query->first();
		//$Question = $todo->get("ElementIUPACname");
		$Question=$elementIUPACArray[$n-1];
		break;
}
echo "<tr><td>题目</td><td>".$Question."</td></tr>";
$numbers=array();
$numbers[]=$n;

for($i2 = 1;$i2<4;$i2++){
   $numbers[] = rand(1,$max);
   for($i3=0;$i3<$i2;$i3++) {
       while ($numbers[$i2]==$numbers[$i3]) $numbers[$i2] = rand(1,$max);
   }
}

for($i=0,$k=count($numbers);$i<$k;$i++) {
    for ($j=$i+1;$j<$k;$j++) {
        if($numbers[$i]<$numbers[$j]){
            $temp = $numbers[$j];
            $numbers[$j] = $numbers[$i];
            $numbers[$i] = $temp;
        }
    }
}
for($i2 = 0;$i2<4;$i2++){
	//$query->equalTo("ElementNumber", $numbers[$i2]);
	switch ($mode){
        case "3":case"6":case"9":
            //$query->select('ElementName');
			//$todo = $query->first();
			//$option = $todo->get("ElementName");
			$option=$elementNameArray[$numbers[$i2]-1];
            break;
        case "0":case"7":case"10":
            //$query->select('ElementAbbr');
			//$todo = $query->first();
			//$option = $todo->get("ElementAbbr");
			$option=$elementAbbrArray[$numbers[$i2]-1];
            break;
        case "1":case"4":case"11":
            //$query->select('ElementNumber');
			//$todo = $query->first();
			//$option = $todo->get("ElementNumber");
			$option=(string)$numbers[$i2];
            break;
        case "2":case"5":case"8":
            //$query->select('ElementIUPACname');
			//$todo = $query->first();
			//$option = $todo->get("ElementIUPACname");
			$option=$elementIUPACArray[$numbers[$i2]-1];
            break;
    }
	echo "<tr><td>".($i2+1)."</td><td><form name='form".$i2."' method='post' action='exam.php'><input type='hidden' name='mode' value='".$mode."'/> <input type='hidden' name='question' value='".$Question."'/> <input type='hidden' name='answer' value='".$option."'/><a href='javascript:document.form".$i2.".submit();'>".$option."</a></form></td></tr>";
}   
?>
</table>
<?php
if ($currentUser != null) {
	?>
	<p><script type="text/javascript">
		history('historyExam','#historyExam');
	</script>
	<div class="history" id="historyExam"><img src="\ico\loading.gif">加载中，请稍后……</div>
	</p>
	<?php
}
?>
<?php include 'foot.php';?>
    </section>
  </body>
</html>
<?php
}
function searchforkind($kind,$input){
	$elementNumber=0;
	global $elementNameArray,$elementAbbrArray,$elementIUPACArray;
	for($i=0;$i<118;$i++) {
		switch($kind){
			case "ElementName":
				if($input==($elementNameArray[$i])){
					$elementNumber=$i+1;
				}
			break;
			case "ElementAbbr":
				if($input==ucfirst($elementAbbrArray[$i])){
					$elementNumber=$i+1;
			}
			break;
			case "ElementNumber":
				if ($input==(string)($i+1)){
					$elementNumber=$i+1;
				}
			break;
			case "ElementIUPACname":
				if($input==ucfirst($elementIUPACArray[$i])){
					$elementNumber=$i+1;
				}
			break;
		}
	}
	return $elementNumber;
}