<?php
require 'leancloud/src/autoload.php';
use \LeanCloud\Client;
use \LeanCloud\Object;
//use \LeanCloud\User;
use \LeanCloud\CloudException;
use \LeanCloud\Query;
//use \LeanCloud\Engine\Cloud;
Client::initialize("wUzGKF5dp34OqCeaI0VwVG8E-gzGzoHsz", "QiyXtJjBHFJCIVYQRbrKFiB7", "cnW0tSpfljie0GIfqT19iBD5");

if($_GET['openid'] != ""){
	try{
		$todo = new Object("Score");
		$todo->set("wxid", $_GET['openid']);
		$con=mysql_connect("localhost","root","root");
		mysql_select_db("chemapp", $con);
		$result = mysql_query("SELECT * FROM wx_exam
		WHERE openid='".$_GET['openid']."' limit 1");
		$row = mysql_fetch_array($result);
		if (mysql_num_rows($result)){
			if($row['correct'] >0){
				$todo->set("examCorrectNumber", $row['correct']);
			}
			if($row['incorrect'] >0){
				$todo->set("examIncorrectnumber", $row['incorrect']);
			}
			mysql_query("UPDATE wx_exam SET correct = 0, incorrect = 0
			WHERE openid = '".$_GET['openid']."'");
			mysql_close($con);
			$todo->save();
			/*
			$params = array(
				"openid" => $_GET['openid'],
				"correct" => $row['correct'],
				"incorrect" => $row['incorrect']
			);*/
			 //try {
				 //Cloud::run("wxchange", $params);
			//} catch (CloudException $ex) {
				//throw new FunctionError($ex->getMessage());
			//}
		}
	}catch (CloudException $ex) {
			//$arr = ['errorcode' => '-1'];
			print_r($ex);
	}
}