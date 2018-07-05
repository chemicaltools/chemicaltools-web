<?php
require 'leancloud/src/autoload.php';
use \LeanCloud\Query;
use \LeanCloud\Client;
Client::initialize("wUzGKF5dp34OqCeaI0VwVG8E-gzGzoHsz", "QiyXtJjBHFJCIVYQRbrKFiB7", "cnW0tSpfljie0GIfqT19iBD5");
Client::useMasterKey(true);
function updateScore($openid, $correctadd, $incorrectadd) {
	$Userquery = new Query("_User");
	$Userquery->equalTo("wxid",$openid);
	if($Userquery->count()>0){
		$currentuser=$Userquery->first();
		$correct=(int)$currentuser->get("examCorrectNumber");
		$incorrect=(int)$currentuser->get("examIncorrectnumber");
		$correct=$correct+$correctadd;
		$incorrect=$incorrect+$incorrectadd;
		$currentuser->set("examCorrectNumber",(string)$correct);
		$currentuser->set("examIncorrectnumber",(string)$incorrect);
		$currentuser->save();
	}
};
function update($openid, $name,$value) {
	$Userquery = new Query("_User");
	$Userquery->equalTo("wxid",$openid);
	if($Userquery->count()>0){
		$currentuser=$Userquery->first();
		$currentuser->set($name,$value);
		$currentuser->save();
	}
};

if($_GET["type"]=="update"){
	update($_GET["openid"], $_GET["name"],$_GET["value"]);
}elseif($_GET["type"]=="updateScore"){
	updateScore($_GET["openid"], $_GET["correctadd"],$_GET["incorrectadd"]);
}
$mysqlname="localhost";

$con=mysql_connect($mysqlname,"root","root");
mysql_select_db("chemapp", $con);
$result = mysql_query("SELECT * FROM wx_change");
while($row = mysql_fetch_array($result)){
	update($row['openid'],$row['name'],$row['value']);
}
mysql_query("DELETE FROM wx_change");
mysql_close($con);

$con=mysql_connect($mysqlname,"root","root");
mysql_select_db("chemapp", $con);
$result = mysql_query("SELECT * FROM wx_exam");
while($row = mysql_fetch_array($result)){
	if($row['correct'] >0||$row['incorrect'] >0){
		mysql_query("UPDATE wx_exam SET correct = 0, incorrect = 0
		WHERE openid = '".$row['openid']."'");
		updateScore($row['openid'],$row['correct'],$row['incorrect']);
	}
}
mysql_close($con);