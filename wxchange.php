<?php
require 'leancloud/src/autoload.php';
use \LeanCloud\Client;
use \LeanCloud\Object;
//use \LeanCloud\User;
use \LeanCloud\CloudException;
use \LeanCloud\Query;
//use \LeanCloud\Engine\Cloud;
Client::initialize("wUzGKF5dp34OqCeaI0VwVG8E-gzGzoHsz", "QiyXtJjBHFJCIVYQRbrKFiB7", "cnW0tSpfljie0GIfqT19iBD5");
$mysqlname="localhost";
	if($_GET['update'] == 1){
		try{
			$con=mysql_connect($mysqlname,"root","root");
			mysql_select_db("chemapp", $con);
			$result = mysql_query("SELECT * FROM wx_change");
			while($row = mysql_fetch_array($result)){
				$todo = new Object("wxupdate");
				$todo->set("wxid", $row['openid']);
				$todo->set("name", $row['name']);
				$todo->set("value", $row['value']);
				$todo->save();
			}
			mysql_query("DELETE FROM wx_change");
			mysql_close($con);
		}catch (CloudException $ex) {
				//$arr = ['errorcode' => '-1'];
				print_r($ex);
		}
	}else{
		try{
			$con=mysql_connect($mysqlname,"root","root");
			mysql_select_db("chemapp", $con);
			$result = mysql_query("SELECT * FROM wx_exam");
			while($row = mysql_fetch_array($result)){
				if($row['correct'] >0||$row['incorrect'] >0){
					$todo = new Object("Score");
					$todo->set("wxid", $row['openid']);
					$todo->set("examCorrectNumber", $row['correct']);
					$todo->set("examIncorrectnumber", $row['incorrect']);
					mysql_query("UPDATE wx_exam SET correct = 0, incorrect = 0
					WHERE openid = '".$row['openid']."'");
					$todo->save();
				}
			}
			mysql_close($con);
		}catch (CloudException $ex) {
				//$arr = ['errorcode' => '-1'];
				print_r($ex);
		}
	}