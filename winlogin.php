<?php
require 'load.php';
use \LeanCloud\User;
use \LeanCloud\CloudException;
if($_GET['username'] != ""&&$_GET['password'] != "")
{
	try {
		User::logIn($_GET['username'],$_GET['password']);
		$token = User::getCurrentSessionToken();
	} catch (CloudException $ex) {	$error=true;}
}
$currentUser = User::getCurrentUser();
if ($currentUser != null) {
	$elementnumber_limit=$currentUser->get("elementnumber_limit");
	$examCorrectNumber=$currentUser->get("examCorrectNumber");
	$examIncorrectnumber=$currentUser->get("examIncorrectnumber");
	$examMode=$currentUser->get("examMode");
	$historyAcidOutput=$currentUser->get("historyAcidOutput");
	$historyDeviation=$currentUser->get("historyDeviation");
	$historyElement=$currentUser->get("historyElement");
	$historyElementNumber=$currentUser->get("historyElementNumber");
	$historyElementOutput=$currentUser->get("historyElementOutput");
	$historyElementOutputHtml=$currentUser->get("historyElementOutputHtml");
	$historyMass=$currentUser->get("historyMass");
	$historyMassOutput=$currentUser->get("historyMassOutput");
	$pKw=$currentUser->get("pKw");
	$qqname=$currentUser->get("qqname");
	$setting_examOptionMode=$currentUser->get("setting_examOptionMode");
	$arr = ['errorcode' => '0', 'token'=>$token, 'elementnumber_limit' => $elementnumber_limit, 'examCorrectNumber' => $examCorrectNumber, 
	'examIncorrectnumber' => $examIncorrectnumber, 'examMode' => $examMode, 'historyAcidOutput' => $historyAcidOutput, 
	'historyDeviation' => $historyDeviation, 'historyElement' => $historyElement, 'historyElementNumber' => $historyElementNumber, 
	'historyElementOutput' => $historyElementOutput, 'historyElementOutputHtml' => $historyElementOutputHtml,
	'historyMass' => $historyMass, 'historyMassOutput' => $historyMassOutput, 'pKw' => $pKw, 'qqname' => $qqname, 
	'setting_examOptionMode' => $setting_examOptionMode];
} else {
	$arr = ['errorcode' => '-1'];
}
$json= json_encode($arr);
echo $json;