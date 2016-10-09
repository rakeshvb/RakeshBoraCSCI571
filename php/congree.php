<!DOCTYPE HTML>
<html>  
<head>
<meta charset="UTF-8">
		<title>Congress Information Search</title>
		<style>
		#mainbox, #output_box1 {
			width: 500px;
			margin: 0 auto;
			border: 1px solid;
			line-height: 20pt;
			text-align: center;
		}
		h1 {text-align: center;}
		#website, #button_group {text-align: center;}
		table, td, th {
			border: 1px solid;
			text-align: center;
		}
		table {
			width: 500px;
			border-collapse: collapse;
		};
	</style>
	<SCRIPT TYPE="text/javascript">
	function isEmpty(input){
	if(input.replace(/^\s*|\s$/g,"") == ""){
		return true;
	}
	else
	{
		return false;
	}
	}
	function testempty(inform){
		var congDB = inform.cdb.value;
		var cham = inform.chamber.value;
		var key = inform.keyVal.value;
		var str = "";
		if(isEmpty(congDB) && isEmpty(cham) &&isEmpty(key)){
			str = "Please enter the following missing information: Congress Database, Chamber and Keyword";
			alert(str);
		}else if(isEmpty(congDB) && isEmpty(key)){
			str = "Please enter the following missing information: Congress Database and Keyword";
			alert(str);
		}else if(isEmpty(congDB) && isEmpty(cham)){
			str = "Please enter the following missing information: Congress Database and Chamber";
			alert(str);
		}else if(isEmpty(cham) && isEmpty(key)){
			str = "Please enter the following missing information: Chamber and Keyword";
			alert(str);
		}else if(isEmpty(congDB)){
			str = "Please enter the following missing information: Congress Database";
			alert(str);
		}else if(isEmpty(cham)){
			str = "Please enter the following missing information: Chamber";
			alert(str);
		}else if(isEmpty(key)){
			str = "Please enter the following missing information: Keyword";
			alert(str);
		}
	}
	function myFunction()
	{
		var x = document.getElementById("mySelect").value;
    	document.getElementById("demo").innerHTML = x;
	}
	function resetVal()
	{
		var x = document.getElementById("mySelect").value;
    	document.getElementById("demo").innerHTML = "Keyword*";
	}
</SCRIPT>
</head>
<body>
<h1>Congress Information Search</h1>
<div id="mainbox">
<form  method="post">
Congress Database
<select name="cdb" id="mySelect" onchange="myFunction()">
  <option value="" >Select your option</option>
  <option value="State/Represntative*" name="Legislator">Legislator</option>
  <option value="Committee ID*" name="Committees">Committees</option>
  <option value="Bill ID*" name="Bills">Bills</option>
  <option value="Amendment ID*" name="Amendments">Amendments</option>
</select><br>

Chamber <input type="radio" name="chamber" value="senate" checked="checked" />Senate <input type="radio" name="chamber" value="house"/>House<br>
<span name="keyword" id="demo" >Keyword*</span> <input type="text" name="keyVal" /><br>
<input name="submit" id="btn" type="submit" value="search" onclick="testempty(this.form)" /> <input type="reset" onclick="resetVal()" />
<br/>
<a href="http://sunlightfoundation.com/">Powerd by Sunlight Foundation</a>
</form>
</div>

<?php
if(isset($_POST["submit"]))
{

	
	$congressDB = $_POST['cdb'];
	//echo "$congressDB";
	$chamb = $_POST['chamber'];
	$flag=0;
	$keyword = $_POST['keyVal'];
	if(strcasecmp($congressDB, "State/Represntative*") == 0)
	{
	//echo $keyword;
	if(strcasecmp($keyword, "Alabama") == 0)
		$keyword="AL";
	elseif(strcasecmp($keyword, "Alaska") == 0)
		$keyword="AK";
	elseif(strcasecmp($keyword, "Arizona") == 0)
		$keyword="AZ";
	elseif(strcasecmp($keyword, "Arkansas") == 0)
		$keyword="AR";
	elseif(strcasecmp($keyword, "California") == 0)
		$keyword="CA";
	elseif(strcasecmp($keyword, "Colarado") == 0)
		$keyword="CO";
	elseif(strcasecmp($keyword, "Connecticut") == 0)
		$keyword="CT";
	elseif(strcasecmp($keyword, "Delaware") == 0)
		$keyword="DE";
	elseif(strcasecmp($keyword, "District Of Columbia") == 0)
		$keyword="DC";
	elseif(strcasecmp($keyword, "Florida") == 0)
		$keyword="FL";
	elseif(strcasecmp($keyword, "Georgia") == 0)
		$keyword="GA";
	elseif(strcasecmp($keyword, "Hawaii") == 0)
		$keyword="HI";
	elseif(strcasecmp($keyword, "Idaho") == 0)
		$keyword="ID";
	elseif(strcasecmp($keyword, "Illinois") == 0)
		$keyword="IL";
	elseif(strcasecmp($keyword, "Indiana") == 0)
		$keyword="IN";
	elseif(strcasecmp($keyword, "Iowa") == 0)
		$keyword="IA";
	elseif(strcasecmp($keyword, "Kansas") == 0)
		$keyword="KS";
	elseif(strcasecmp($keyword, "Kentucky") == 0)
		$keyword="KY";
	elseif(strcasecmp($keyword, "Louisiana") == 0)
		$keyword="LA";
	elseif(strcasecmp($keyword, "Maine") == 0)
		$keyword="ME";
	elseif(strcasecmp($keyword, "Maryland") == 0)
		$keyword="MD";
	elseif(strcasecmp($keyword, "Massachusetts") == 0)
		$keyword="MA";
	elseif(strcasecmp($keyword, "Michigan") == 0)
		$keyword="MI";
	elseif(strcasecmp($keyword, "Minnesota") == 0)
		$keyword="MN";
	elseif(strcasecmp($keyword, "Mississippi") == 0)
		$keyword="MS";
	elseif(strcasecmp($keyword, "Missouri") == 0)
		$keyword="MO";
	elseif(strcasecmp($keyword, "Montana") == 0)
		$keyword="MT";
	elseif(strcasecmp($keyword, "Nebraska") == 0)
		$keyword="NE";
	elseif(strcasecmp($keyword, "Nevada") == 0)
		$keyword="NV";
	elseif(strcasecmp($keyword, "New Hampshire") == 0)
		$keyword="NH";
	elseif(strcasecmp($keyword, "New Jersey") == 0)
		$keyword="NJ";
	elseif(strcasecmp($keyword, "New Mexico") == 0)
		$keyword="NM";
	elseif(strcasecmp($keyword, "New York") == 0)
		$keyword="NY";
	elseif(strcasecmp($keyword, "North Carolina") == 0)
		$keyword="NC";
	elseif(strcasecmp($keyword, "North Dakota") == 0)
		$keyword="ND";
	elseif(strcasecmp($keyword, "Ohio") == 0)
		$keyword="OH";
	elseif(strcasecmp($keyword, "Oklahoma") == 0)
		$keyword="OK";
	elseif(strcasecmp($keyword, "Oregon") == 0)
		$keyword="OR";
	elseif(strcasecmp($keyword, "Pennsylvania") == 0)
		$keyword="PA";
	elseif(strcasecmp($keyword, "Rhode Island") == 0)
		$keyword="RI";
	elseif(strcasecmp($keyword, "South Carolina") == 0)
		$keyword="SC";
	elseif(strcasecmp($keyword, "South Dakota") == 0)
		$keyword="SD";
	elseif(strcasecmp($keyword, "Tennessee") == 0)
		$keyword="TN";
	elseif(strcasecmp($keyword, "Texas") == 0)
		$keyword="TX";
	elseif(strcasecmp($keyword, "Utah") == 0)
		$keyword="UT";
	elseif(strcasecmp($keyword, "Vermont") == 0)
		$keyword="VT";
	elseif(strcasecmp($keyword, "Virginia") == 0)
		$keyword="VA";
	elseif(strcasecmp($keyword, "Washington") == 0)
		$keyword="WA";
	elseif(strcasecmp($keyword, "West Virginia") == 0)
		$keyword="WV";
	elseif(strcasecmp($keyword, "Wisconsin") == 0)
		$keyword="WI";
	elseif(strcasecmp($keyword, "Wyoming") == 0)
		$keyword="WY";
	else
	{
	//	$keyword=$keyword;
		$flag=1;
	}
	//echo $flag;
	
	/*if(empty($congressDB) || empty($chamber) || empty($keyword)){
		$str = "Please enter the following missing information";
		echo "<SCRIPT TYPE='text/javascript'>alert($str);</SCRIPT>";
	}*/
	
	if($flag==1)
	{
		$url = "http://congress.api.sunlightfoundation.com/legislators?chamber=$chamb&query=$keyword&apikey=b8ba30d18f3b48259227944edff23ca3";
		//echo $url;
	}
	else
	{
	$url = "http://congress.api.sunlightfoundation.com/legislators?chamber=$chamb&state=$keyword&apikey=b8ba30d18f3b48259227944edff23ca3";
	//echo $url;
	}

	$json=file_get_contents($url);
	/*$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, $url);
	$result = curl_exec($ch);
	curl_close($ch);*/

	//
	$obj=json_decode($json,true);
	//print_r($obj);
	$len=count($student_id = $obj['results']);
	//echo $len;
	if($len>0)
	{
	//print_r($obj['results'][0]['bioguide_id']);
	echo "<br/>";
	$text="<table border=2 align=center>";
	//print_r($obj['results'][0]['chamber']);
	for ($x = 0; $x <= $len-1; $x++)
	{

		$text=$text."<tr>";
		$fname=$obj['results'][$x]['first_name'];
		$lname=$obj['results'][$x]['last_name'];
		$text=$text."<td>". $fname . " ".$lname."</td>";
		$sname=$obj['results'][$x]['state_name'];
		$text=$text."<td>". $sname."</td>";
		$cname=$obj['results'][$x]['chamber'];
		$text=$text."<td>". $cname."</td>";
		$bname=$obj['results'][$x]['bioguide_id'];
		$bid="http://congress.api.sunlightfoundation.com/legislators?chamber=$chamb&state=$keyword&bioguide_id=$bname&apikey=b8ba30d18f3b48259227944edff23ca3";
		$text=$text."<td><a href=".$bid.">Details</a>"."</td>";
		$text=$text."</tr>";
		//print_r($fname);
		//print_r($obj['results'][0]['first_name']);
		//echo "<br/>";
		//$student_id = $obj['results'][0];
		//print_r($student_id);
	}
	$text=$text."</table>";
	echo $text;
	}
	else
	{
		echo "<div id=\"output_box1\"><p>No Records have been found. </p></div>";
	}
	}
elseif (strcasecmp($congressDB, "Committee ID*") == 0) {
	# code...
	$url = "http://congress.api.sunlightfoundation.com/committees?committee_id=$keyword&chamber=$chamb&apikey=b8ba30d18f3b48259227944edff23ca3";
	//echo $url;
	$json=file_get_contents($url);
	$obj=json_decode($json,true);
	$len=count($student_id = $obj['results']);
	//echo $len;
	if($len>0)
	{
	$text="<table border=2 align=center>";
	$text=$text."<tr>";
	$cid=$obj['results'][0]['committee_id'];
	$text=$text."<td>". $cid."</td>";
	$name=$obj['results'][0]['name'];
	$text=$text."<td>". $name."</td>";
	$name1=$obj['results'][0]['chamber'];
	$text=$text."<td>". $name1."</td>";
	$text=$text."</tr>";
	$text=$text."</table>";
	echo $text;
	}
	else
	{
		echo "<div id=\"output_box1\"><p>No Records have been found. </p></div>";
	}
}


elseif (strcasecmp($congressDB, "Bill ID*") == 0) {
	# code...
	$url = "http://congress.api.sunlightfoundation.com/bills?bill_id=$keyword&chamber=$chamb&apikey=b8ba30d18f3b48259227944edff23ca3";
	//echo $url;
	$json=file_get_contents($url);
	$obj=json_decode($json,true);
	$len=count($student_id = $obj['results']);
	//echo $len;
	if($len>0)
	{
	$text="<table border=2 align=center>";
	$text=$text."<tr>";
	$cid=$obj['results'][0]['bill_id'];
	$text=$text."<td>". $cid."</td>";
	$name=$obj['results'][0]['short_title'];
	$text=$text."<td>". $name."</td>";
	$name1=$obj['results'][0]['chamber'];
	$text=$text."<td>". $name1."</td>";
	$bname=$obj['results'][0]['urls'][2];
		//$bid="http://congress.api.sunlightfoundation.com/legislators?chamber=$chamb&state=$keyword&bioguid
//e_id=$bname&apikey=b8ba30d18f3b48259227944edff23ca3";
	$text=$text."<td><a href=".$bname.">Details</a>"."</td>";
	$text=$text."</tr>";
	$text=$text."</table>";
	echo $text;
	}
	else
	{
		echo "<div id=\"output_box1\"><p>No Records have been found. </p></div>";
	}

}
elseif (strcasecmp($congressDB, "Amendment ID*") == 0) {
	# code...
	$url = "http://congress.api.sunlightfoundation.com/amendments?amendment_id=$keyword&chamber=$chamb&apikey=b8ba30d18f3b48259227944edff23ca3";
	//echo $url;
	$json=file_get_contents($url);
	$obj=json_decode($json,true);
	$len=count($student_id = $obj['results']);
	//echo $len;
	if($len>0)
	{
	$text="<table border=2 align=center>";
	$text=$text."<tr>";
	$cid=$obj['results'][0]['amendment_id'];
	$text=$text."<td>". $cid."</td>";
	$name=$obj['results'][0]['amendment_type'];
	$text=$text."<td>". $name."</td>";
	$name1=$obj['results'][0]['chamber'];
	$text=$text."<td>". $name1."</td>";
	$bname=$obj['results'][0]['introduced_on'];
		//$bid="http://congress.api.sunlightfoundation.com/legislators?chamber=$chamb&state=$keyword&bioguid
//e_id=$bname&apikey=b8ba30d18f3b48259227944edff23ca3";
	$text=$text."<td>".$bname."</td>";
	$text=$text."</tr>";
	$text=$text."</table>";
	echo $text;
	}
	else
	{
		echo "<div id=\"output_box1\"><p>No Records have been found. </p></div>";
	}

}

	}
?>
<NOSCRIPT>
</body>
</html>