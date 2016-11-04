<?php
	//echo "rakesh";
	header("Access-Control-Allow-Origin:*","Content-Type:application/json");
	if(isset($_GET["call"]))
{
		//echo "rakesh";

	if($_GET["call"]=="getLegislatorDefaultDetails")
	{
		$url="http://congress.api.sunlightfoundation.com/legislators?apikey=b8ba30d18f3b48259227944edff23ca3&per_page=all";

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
		$url="http://congress.api.sunlightfoundation.com/bills?apikey=b8ba30d18f3b48259227944edff23ca3&per_page=50";

		//echo $url;
		$json=file_get_contents($url);
		
		echo $json;
	}
	else if($_GET["call"]=="getCommDefaultDetails")
	{
		$url="http://congress.api.sunlightfoundation.com/committees?apikey=b8ba30d18f3b48259227944edff23ca3&per_page=all";

		//echo $url;
		$json=file_get_contents($url);
		
		echo $json;
	}
}
function getBillsOfMember($bioguide_id){
    
	$url="http://congress.api.sunlightfoundation.com/bills?apikey=b8ba30d18f3b48259227944edff23ca3&sponsor_id=".$bioguide_id."";

		//echo $url;
		$json=file_get_contents($url);
		
		return $json;
    
}




function getBDetails($bid){
    $url="http://congress.api.sunlightfoundation.com/bills?apikey=b8ba30d18f3b48259227944edff23ca3&bill_id=".$bid."";

		//echo $url;http://congress.api.sunlightfoundation.com/bills?apikey=1a96a93a893e4974a6c387cadad7e403&bill_id=hr5929-114
		$json=file_get_contents($url);
		
		return $json;
}

function getLegislatorMemberDetails($bioguide_id){

	//$bid=$_GET['bioguide_id']
		$url="http://congress.api.sunlightfoundation.com/legislators?apikey=b8ba30d18f3b48259227944edff23ca3&bioguide_id=".$bioguide_id."&all_legislators=true";

		//echo $url;
		$json=file_get_contents($url);
		
		return $json;


    
}

function getCommitteesOfMember($bioguide_id){


	$url="http://congress.api.sunlightfoundation.com/committees?apikey=b8ba30d18f3b48259227944edff23ca3&member_ids=".$bioguide_id."";

		//echo $url;
		$json=file_get_contents($url);
		
		return $json;

   
}




	
	?>
