<!DOCTYPE HTML>
<html>  
<head>
<meta charset="UTF-8">
		<title>Congress Information Search</title>
		<style>
		#mainbox {
			width: 300px;
			margin: 0 auto;
			border: 1px solid;
			line-height: 20pt;
			text-align: center;
		}
		#output_box1{
			
			margin: 0 auto;
			border: 1px solid;
			line-height: 20pt;
			text-align: center;
		}
		h1,p {text-align: center;}
		
		table{
			border: 2px solid; 
			text-align: center;
			border-collapse: collapse;
			margin: 0 auto; 
			line-height: 20pt;
		}
		
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
	function showbilldetails(view_bill_details) {
                document.getElementById("view_legislators_details_url").value = view_bill_details;
                document.getElementById("search_form").submit();
            }
	function resetVal()
	{
		var x = document.getElementById("mySelect").value;
    	document.getElementById("demo").innerHTML = "Keyword*";

    	document.getElementById("mybox").innerHTML = "";
	}
</SCRIPT>
</head>
<body>
<h1>Congress Information Search</h1>
<div >

<form  method="post" id="search_form">
<table align="center" style="border: 1px solid; text-align: center;width: 300px;
			margin: 0 auto; line-height: 20pt;">
<tr>
<td>
Congress Database</td>
<td>
<select name="cdb" id="mySelect" onchange="myFunction()">
  <option value="" >Select your option</option>
  <option value="State/Represntative*" name="Legislator">Legislator</option>
  <option value="Committee ID*" name="Committees">Committees</option>
  <option value="Bill ID*" name="Bills">Bills</option>
  <option value="Amendment ID*" name="Amendments">Amendments</option>
</select></td></tr>
<tr>
<td>

Chamber</td> <td><input type="radio" name="chamber" value="senate" checked="checked" />Senate <input type="radio" name="chamber" value="house"/>House</td></tr>
<tr>
<td>
<span name="keyword" id="demo" >Keyword*</span> 
</td><td><input type="text" name="keyVal" /></td>
</tr>
<tr>
<td></td><td>
<input name="submit" id="btn" type="submit" value="search" onclick="testempty(this.form)" /> <input type="reset" onclick="resetVal()" />
<br/>
</td></tr><tr>
<td colspan="2">
<div style="text-align:center">
<a href="http://sunlightfoundation.com/" >Powerd by Sunlight Foundation</a></div></td></tr>
</table>
<input type="hidden" name="view_legislators_details_url" id = "view_legislators_details_url" value = ""/>
</form>
<br/>
</div>
<div id="mybox">
<?php
if(isset($_POST["submit"]))
{
if(empty($congressDB) || empty($chamber) || empty($keyword)){
		$str = "Please enter the following missing information";
		echo "<SCRIPT TYPE='text/javascript'>alert($str);</SCRIPT>";
	}
	
	$congressDB = $_POST['cdb'];
	//echo "$congressDB";
	$chamb = $_POST['chamber'];
	$flag=0;
	$keyword = $_POST['keyVal'];
	if(strcmp($congressDB, "State/Represntative*") == 0)
	{
	//echo $keyword;
	if(strcmp($keyword, "Alabama") == 0)
		$keyword="AL";
	elseif(strcmp($keyword, "Alaska") == 0)
		$keyword="AK";
	elseif(strcmp($keyword, "Arizona") == 0)
		$keyword="AZ";
	elseif(strcmp($keyword, "Arkansas") == 0)
		$keyword="AR";
	elseif(strcmp($keyword, "California") == 0)
		$keyword="CA";
	elseif(strcmp($keyword, "Colarado") == 0)
		$keyword="CO";
	elseif(strcmp($keyword, "Connecticut") == 0)
		$keyword="CT";
	elseif(strcmp($keyword, "Delaware") == 0)
		$keyword="DE";
	elseif(strcmp($keyword, "District Of Columbia") == 0)
		$keyword="DC";
	elseif(strcmp($keyword, "Florida") == 0)
		$keyword="FL";
	elseif(strcmp($keyword, "Georgia") == 0)
		$keyword="GA";
	elseif(strcmp($keyword, "Hawaii") == 0)
		$keyword="HI";
	elseif(strcmp($keyword, "Idaho") == 0)
		$keyword="ID";
	elseif(strcmp($keyword, "Illinois") == 0)
		$keyword="IL";
	elseif(strcmp($keyword, "Indiana") == 0)
		$keyword="IN";
	elseif(strcmp($keyword, "Iowa") == 0)
		$keyword="IA";
	elseif(strcmp($keyword, "Kansas") == 0)
		$keyword="KS";
	elseif(strcmp($keyword, "Kentucky") == 0)
		$keyword="KY";
	elseif(strcmp($keyword, "Louisiana") == 0)
		$keyword="LA";
	elseif(strcmp($keyword, "Maine") == 0)
		$keyword="ME";
	elseif(strcmp($keyword, "Maryland") == 0)
		$keyword="MD";
	elseif(strcmp($keyword, "Massachusetts") == 0)
		$keyword="MA";
	elseif(strcmp($keyword, "Michigan") == 0)
		$keyword="MI";
	elseif(strcmp($keyword, "Minnesota") == 0)
		$keyword="MN";
	elseif(strcmp($keyword, "Mississippi") == 0)
		$keyword="MS";
	elseif(strcmp($keyword, "Missouri") == 0)
		$keyword="MO";
	elseif(strcmp($keyword, "Montana") == 0)
		$keyword="MT";
	elseif(strcmp($keyword, "Nebraska") == 0)
		$keyword="NE";
	elseif(strcmp($keyword, "Nevada") == 0)
		$keyword="NV";
	elseif(strcmp($keyword, "New Hampshire") == 0)
		$keyword="NH";
	elseif(strcmp($keyword, "New Jersey") == 0)
		$keyword="NJ";
	elseif(strcmp($keyword, "New Mexico") == 0)
		$keyword="NM";
	elseif(strcmp($keyword, "New York") == 0)
		$keyword="NY";
	elseif(strcmp($keyword, "North Carolina") == 0)
		$keyword="NC";
	elseif(strcmp($keyword, "North Dakota") == 0)
		$keyword="ND";
	elseif(strcmp($keyword, "Ohio") == 0)
		$keyword="OH";
	elseif(strcmp($keyword, "Oklahoma") == 0)
		$keyword="OK";
	elseif(strcmp($keyword, "Oregon") == 0)
		$keyword="OR";
	elseif(strcmp($keyword, "Pennsylvania") == 0)
		$keyword="PA";
	elseif(strcmp($keyword, "Rhode Island") == 0)
		$keyword="RI";
	elseif(strcmp($keyword, "South Carolina") == 0)
		$keyword="SC";
	elseif(strcmp($keyword, "South Dakota") == 0)
		$keyword="SD";
	elseif(strcmp($keyword, "Tennessee") == 0)
		$keyword="TN";
	elseif(strcmp($keyword, "Texas") == 0)
		$keyword="TX";
	elseif(strcmp($keyword, "Utah") == 0)
		$keyword="UT";
	elseif(strcmp($keyword, "Vermont") == 0)
		$keyword="VT";
	elseif(strcmp($keyword, "Virginia") == 0)
		$keyword="VA";
	elseif(strcmp($keyword, "Washington") == 0)
		$keyword="WA";
	elseif(strcmp($keyword, "West Virginia") == 0)
		$keyword="WV";
	elseif(strcmp($keyword, "Wisconsin") == 0)
		$keyword="WI";
	elseif(strcmp($keyword, "Wyoming") == 0)
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
	echo $url;
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
	//echo "<br/>";
	$text="<table border=1 align=center style=\"width: 900px;\">";
	$text=$text."<tr border=1><th>Name</th><th>State</th><th>Chamber</th><th>Details</th></tr>";
	//print_r($obj['results'][0]['chamber']);
	for ($x = 0; $x <= $len-1; $x++)
	{

		$text=$text."<tr border=2>";
		$fname=$obj['results'][$x]['first_name'];
		$lname=$obj['results'][$x]['last_name'];
		$text=$text."<td>". $fname . " ".$lname."</td>";
		$sname=$obj['results'][$x]['state_name'];
		$text=$text."<td>". $sname."</td>";
		$cname=$obj['results'][$x]['chamber'];
		$text=$text."<td>". $cname."</td>";
		$bname=$obj['results'][$x]['bioguide_id'];
		$bid="http://congress.api.sunlightfoundation.com/legislators?chamber=$chamb&state=$keyword&bioguide_id=$bname&apikey=b8ba30d18f3b48259227944edff23ca3";
		$text=$text."<td><a href=\"javascript:showlegislatordetails('".$bid."')\">More Details</a></td>";
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
		echo "<p>No Records have been found. </p>";
	}
	}
elseif (strcmp($congressDB, "Committee ID*") == 0) {
	# code...
	$url = "http://congress.api.sunlightfoundation.com/committees?committee_id=$keyword&chamber=$chamb&apikey=b8ba30d18f3b48259227944edff23ca3";
	//echo $url;
	$json=file_get_contents($url);
	$obj=json_decode($json,true);
	$len=count($student_id = $obj['results']);
	//echo $len;
	if($len>0)
	{
	$text="<table border=1 align=center style=\"width: 900px;\">";
	$text=$text."<tr border=1><th>Committee ID</th><th>Committee Name</th><th>Chamber</th></tr>";
	$text=$text."<tr border=1>";
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
		echo "<p>No Records have been found. </p>";
	}
}


elseif (strcmp($congressDB, "Bill ID*") == 0) {
	# code...
	$url = "http://congress.api.sunlightfoundation.com/bills?bill_id=$keyword&chamber=$chamb&apikey=b8ba30d18f3b48259227944edff23ca3";
	//echo $url;
	$json=file_get_contents($url);
	$obj=json_decode($json,true);
	$len=count($student_id = $obj['results']);
	//echo $len;
	if($len>0)
	{
	$text="<table border=1 align=center style=\"width: 900px;\">";
	$text=$text."<tr border=1><th>Bill ID</th><th>Short Title</th><th>Chamber</th><th>Details</th></tr>";
	$text=$text."<tr border=1>";
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
		echo "<p>No Records have been found. </p>";
	}

}
elseif (strcmp($congressDB, "Amendment ID*") == 0) {
	# code...
	$url = "http://congress.api.sunlightfoundation.com/amendments?amendment_id=$keyword&chamber=$chamb&apikey=b8ba30d18f3b48259227944edff23ca3";
	//echo $url;
	$json=file_get_contents($url);
	$obj=json_decode($json,true);
	$len=count($student_id = $obj['results']);
	//echo $len;
	if($len>0)
	{
	$text="<table border=1 align=center style=\"width: 900px;\">";
	$text=$text."<tr border=1><th>Amendment ID</th><th>Amendment Name</th><th>Chamber</th><th>Introduced on</th></tr>";
	$text=$text."<tr border=1>";
	$cid=$obj['results'][0]['amendment_id'];
	$text=$text."<td>". $cid."</td>";
	$name=$obj['results'][0]['amendment_type'];
	$text=$text."<td>". $name."</td>";
	$name1=$obj['results'][0]['chamber'];
	$text=$text."<td>". $name1."</td>";
	$bname=$obj['results'][0]['introduced_on'];
	$bid="http://congress.api.sunlightfoundation.com/legislators?chamber=$chamb&state=$keyword&bioguid
//e_id=$bname&apikey=b8ba30d18f3b48259227944edff23ca3";
	$text=$text."<td>".$bid."</td>";
	$text=$text."</tr>";
	$text=$text."</table>";
	echo $text;
	}
	else
	{
		echo "<p>No Records have been found. </p>";
	}

}

	}
?>
<?php

if(isset($_POST["view_legislators_details_url"]))
{
	#echo "rakesh is runnig";
	#$b=$_POST["$bname"];

	$url="http://congress.api.sunlightfoundation.com/legislators?chamber=$chamb&state=$keyword&bioguide_id=$bname&apikey=b8ba30d18f3b48259227944edff23ca3";
	$json=file_get_contents($url);
	$obj=json_decode($json,true);
	$len=count($student_id = $obj['results']);
	if($len>0)
	{
	$text1="<table  align=center style=\"width: 900px;\">";
	$text1=$text1."<tr>";
	$cid=$obj['results'][0]['bioguide_id'];

	//https://theunitedstates.io/images/congress/225x275/
	$url1="http://theunitedstates.io/images/congress/225x275/".$cid.".jpg";
	#echo $url1;
	$text1=$text1."<td colspan=2><img src=\"$url1\"></img></td></tr>";
	$title=$obj['results'][0]['title'];
	$fname=$obj['results'][0]['first_name'];
	$lname=$obj['results'][0]['last_name'];
	#echo $lname;
	$full_name=$title." ".$fname." ".$lname;
	$text1=$text1."<tr><td>Full Name</td>";
	$text1=$text1."<td>".$full_name."</td></tr>";
	$term=$obj['results'][0]['term_end'];
	$text1=$text1."<tr><td>Term Ends on </td>";
	$text1=$text1."<td>". $term."</td></tr>";

	$web=$obj['results'][0]['website'];
	$text1=$text1."<tr><td>Website</td>";
	$text1=$text1."<td><a href=\"$web\">". $web."</a></td></tr>";

	$office=$obj['results'][0]['office'];
	$text1=$text1."<tr><td>Office </td>";
	$text1=$text1."<td>". $office."</td></tr>";
	
	$facebook=$obj['results'][0]['facebook_id'];
	$text1=$text1."<tr><td>Website</td>";
	if($facebook=="")
		$text1=$text1."<td>N/A</td></tr>";
	else
	$text1=$text1."<td><a href=\"$facebook\">".$fname." ".$lname."</a></td></tr>";

	$twitter=$obj['results'][0]['twitter_id'];
	$text1=$text1."<tr><td>Website</td>";
	$text1=$text1."<td><a href=\"$twitter\">".$fname." ".$lname."</a></td></tr>";

	
	$text1=$text1."</table>";
	echo $text1;
	}
	else
	{
		echo "<p>No Records have been found. </p>";
	}

}

?>


</div>
<NOSCRIPT>
</body>
</html>
