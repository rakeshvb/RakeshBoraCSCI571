<?php
	//echo "rakesh";
	header("Access-Control-Allow-Origin:*","Content-Type:application/json");
	if(isset($_GET["call"]))
{
		//echo "rakesh";

	if($_GET["call"]=="getLegislatorDefaultDetails")
	{
		$url="http://104.198.0.197:8080/legislators?apikey=b8ba30d18f3b48259227944edff23ca3&per_page=all";
		// http://104.198.0.197:8080/legislators?apikey=b8ba30d18f3b48259227944edff23ca3&per_page=all
		//echo $url;
		$json=file_get_contents($url);
		
		echo $json;
	}

	else if($_GET["call"]=="getCommitteesOfMember")
	{
		 echo getCommitteesOfMember($_GET['bioguide_id']);
		
	}
	else if($_GET["call"]=="getBDetails")
	{
		echo getBDetails($_GET['bill_id']);
	}
	else if($_GET["call"]=="getLegislatorMemberDetails")
	{
		echo getLegislatorMemberDetails($_GET['bioguide_id']);
		
	}
	else if($_GET["call"]=="getBillsOfMember")
	{
		echo getBillsOfMember($_GET['bioguide_id']);
		
	}

	else if($_GET["call"]=="getBillDefaultDetails")
	{
		$url="http://104.198.0.197:8080/bills?apikey=b8ba30d18f3b48259227944edff23ca3&history.active=true&last_version.urls.pdf__exists=true&per_page=50";
		//http://104.198.0.197:8080/bills?apikey=b8ba30d18f3b48259227944edff23ca3&history.active=true&per_page=50
		//echo $url;
		$json=file_get_contents($url);
		
		echo $json;
	}
	else if($_GET["call"]=="getBillDefaultDetails1")
	{
		$url="http://104.198.0.197:8080/bills?apikey=b8ba30d18f3b48259227944edff23ca3&history.active=false&last_version.urls.pdf__exists=true&per_page=50";
		//http://104.198.0.197:8080/bills?apikey=b8ba30d18f3b48259227944edff23ca3&history.active=false&per_page=50
		//echo $url;
		$json=file_get_contents($url);
		
		echo $json;
	}
	else if($_GET["call"]=="getCommDefaultDetails")
	{

		$url="http://104.198.0.197:8080/committees?apikey=b8ba30d18f3b48259227944edff23ca3&per_page=all";
		//http://104.198.0.197:8080/committees?apikey=b8ba30d18f3b48259227944edff23ca3&per_page=all
		//echo $url;
		$json=file_get_contents($url);
		
		echo $json;
	}
}
function getBillsOfMember($bioguide_id){
    
	$url="http://104.198.0.197:8080/bills?apikey=b8ba30d18f3b48259227944edff23ca3&sponsor_id=".$bioguide_id."&per_page=5";
		//http://104.198.0.197:8080/bills?apikey=b8ba30d18f3b48259227944edff23ca3&sponsor_id=D000626&per_page=5
		//echo $url;
		$json=file_get_contents($url);
		
		return $json;
    
}




function getBDetails($bid){
    $url="http://104.198.0.197:8080/bills?apikey=b8ba30d18f3b48259227944edff23ca3&bill_id=".$bid."";

		//echo $url;
		//http://104.198.0.197:8080/bills?apikey=b8ba30d18f3b48259227944edff23ca3&bill_id=sconres25-114
		$json=file_get_contents($url);
		
		return $json;
}

function getLegislatorMemberDetails($bioguide_id){

	//$bid=$_GET['bioguide_id']
		$url="http://104.198.0.197:8080/legislators?apikey=b8ba30d18f3b48259227944edff23ca3&bioguide_id=".$bioguide_id."&all_legislators=true";
		//http://104.198.0.197:8080/legislators?apikey=b8ba30d18f3b48259227944edff23ca3&bioguide_id=D000626&all_legislators=true

		//echo $url;
		$json=file_get_contents($url);
		
		return $json;


    
}

function getCommitteesOfMember($bioguide_id){


	$url="http://104.198.0.197:8080/committees?apikey=b8ba30d18f3b48259227944edff23ca3&member_ids=".$bioguide_id."&per_page=5";
		//http://104.198.0.197:8080/committees?apikey=b8ba30d18f3b48259227944edff23ca3&member_ids=D000626&per_page=5
		//echo $url;
		$json=file_get_contents($url);
		
		return $json;

   
}




	
	?>
