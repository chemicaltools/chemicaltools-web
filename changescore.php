<?php
session_start();
require 'load.php';
use \LeanCloud\User;
use \LeanCloud\CloudException;
if ($currentUser != null) {
	try{
		if(isset($_SESSION['correct'])||isset($_SESSION['incorrect'])){
			if(isset($_SESSION['correct'])){
				$correct=(int)($currentUser->get("examCorrectNumber"));
				$correct=$correct+$_SESSION['correct'];
				unset($_SESSION['correct']);
				$currentUser->set("examCorrectNumber", (string) $correct);
			}
			if(isset($_SESSION['incorrect'])){
				$incorrect=(int)($currentUser->get("examIncorrectnumber"));
				$incorrect=$incorrect+$_SESSION['incorrect'];
				unset($_SESSION['incorrect']);
				$currentUser->set("examIncorrectnumber", (string) $incorrect);
			}
			$currentUser->save();
			//$arr = ['errorcode' => '0'];
		}
	} catch (CloudException $ex) {
			//$arr = ['errorcode' => '-1'];
	}
} else {
	//$arr = ['errorcode' => '-1'];
}
//$json= json_encode($arr);
//echo $json;