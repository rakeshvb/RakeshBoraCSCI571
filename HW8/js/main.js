/*global $ */

$(document).ready(function () {
    $("#menu-toggle-2").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    //localStorage.clear();
    getLegislatorDetails();
    getBillDetails();
    getCommitteesDetails();
    loadFavorites();

    $('.carousel').carousel('pause');
});
if (screen.width < 600) {
    $("#wrapper").toggleClass("toggled");
}

function slideToNext() {
    $("#legislator_by_state_carousal").carousel(1);
    
}

function slideToPrev() {
    $("#legislator_by_state_carousal").carousel(0);
}
//added for second bill carousal
function slideToNext1() {
    $("#bill_by_state_carousal").carousel(1);
    
}
//added for second bill carousal
function slideToPrev1() {
    $("#bill_by_state_carousal").carousel(0);
}




var app = angular.module('myapp', ['angularUtils.directives.dirPagination']);
app.controller('legis', function ($scope, $http, $element) {
    $scope.filterOptions = [
            'stateAbbr', 'chamber', 'name', 'district', 'state'
        ];
    
    $scope.legislator_results = [];

    

    $scope.loadLegislatorDetails = function () {
       // console.log("Before calling AJAX");
        var httpRequest = $http({
            method: "GET",
            url: 'http://csci571hw8.eaygexnyaw.us-west-2.elasticbeanstalk.com/index.php?call=getLegislatorDefaultDetails',
            //            url: 'index.php?call=getLegislatorDefaultDetails',
            data: {
                call: 'getLegislatorDefaultDetails'
            },
        }).then(function mySucces(response) {
            //console.log(response.data);
            $res = (response.data);
            if ($res["count"] > 0) {
                $results = $res["results"];
                 $scope.legislator_results = [];
                for (var i = 0; i < $res["count"]; i++) {

                    name = $results[i]["last_name"] + "," + $results[i]["first_name"];
                    last_name = $results[i]["last_name"];
                    if ($results[i]["party"] == 'R') {
                        partyImg = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
                    } else {
                        partyImg = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
                    }

                    districtVal = "";
                    if ($results[i].hasOwnProperty("district") == true) {
                        if ($results[i]["district"] == null) {
                            districtVal = "N.A.";
                        } else {
                            districtVal = "District "+$results[i]["district"];
                        }
                    } else {
                        districtVal = "N.A.";
                    }
                    state = $results[i]["state"];
                    //stateVal = abbrState($results[i]["state"], 'name');
                    stateVal=$results[i]['state_name'];
                    chamber = "";
                    chamber_img_url = "";
                    if ($results[i]["chamber"] == "house") {
                        chamber = "House";
                        chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
                    } else {
                        chamber = "Senate";
                        chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
                    }
                    newData = {
                        "partyImg": partyImg,
                        "name": name,
                        "chamber": chamber,
                        "district": districtVal,
                        "state": stateVal,
                        "stateAbbr": state,
                        "chamber_img_url": chamber_img_url,
                        "bioguide_id": $results[i]["bioguide_id"],
                        "last_name" : $results[i]["last_name"]
                    };
                    $scope.legislator_results.push(newData);
                }
            }
           // console.log("After loading");
        });
    };
   
    $scope.viewLegislatorDetails = function (bioguide_id) {
                 
        slideToNext();
        getFullLegislatorDetails(bioguide_id);
    }
});


function getLegislatorDetails() {
    var scope = angular.element(document.getElementById('legislator_controller_div')).scope();
    scope.loadLegislatorDetails();
}

function getBillDetails() {
    var scope = angular.element(document.getElementById('bill_controller_div')).scope();
    scope.loadBillDetails();
    scope.loadBillDetails1();
}
//getCommitteesDetails

function getCommitteesDetails() {
    var scope = angular.element(document.getElementById('commi_controller_div')).scope();
    scope.loadComDetails();
}
//added for second bill carousal
function getFullBillDetails(bill_id) {
    var scope = angular.element(document.getElementById('full_bill_controller_div')).scope();
    scope.loadBillDetails(bill_id);
}



function getFullLegislatorDetails(bioguide_id) {
    var scope = angular.element(document.getElementById('full_legislator_controller_div')).scope();
    scope.loadLegislatorDetails(bioguide_id);
}


app.controller('bill_controller', function ($scope, $http, $element) {
    $scope.bill = [];

    $scope.loadBillDetails = function (bill_id) {
        //        console.log("Before calling AJAX");
        var httpRequest = $http({
            method: "GET",
            url: 'http://csci571hw8.eaygexnyaw.us-west-2.elasticbeanstalk.com/index.php?call=getBDetails&bill_id=' + bill_id,
            //            url: 'index.php?call=getBDetails&bill_id=' + bioguide_id,
            data: {
                call: 'getBDetails'
            },
        }).then(function mySucces(response) {
           // console.log(response.data);
            $res = (response.data);
            if ($res["count"] > 0) {
                    $result = $res["results"][0];
                    $scope.bid = bill_id;
                    $scope.ID=$result["bill_id"];
                    $scope.tit=$result["official_title"];
                    $scope.bType=$result["bill_type"];
                    $scope.name = $result["sponsor"]["title"] + ", "+$result["sponsor"]["last_name"] + ", " + $result["sponsor"]["first_name"];
                    //$scope.name = $result["title"]
                    $scope.cham=$result["chamber"];
                    $scope.stat = "";
                    if($result["history"]["active"]==false)
                        $scope.stat ="New";
                    else
                        $scope.stat ="Active";
                    $scope.introOn=new Date($result["introduced_on"]);
                    $scope.conLink=$result["urls"]["congress"];
                    $scope.version=$result["last_version"]["version_name"];
                    $scope.pdf=$result["last_version"]["urls"]["pdf"];
                    $scope.bollBill=bollBill(bill_id);
                }
            } );
        };
        $scope.viewMeDetails = function (bill_id) {
               
        slideToNext1();
    }
    $scope.addToBillFav = function (ID,bType,tit,cham,introOn,name) {
        console.log("i worked on ng-click");
        //addToBillFav(ID,bType,tit,cham,introOn,name);
        $scope.bollBill = true;
        var favB = {
        'ID': ID,
        'bType': bType,
        'tit': tit,
        'cham': cham,
        'introOn': introOn,
        'name': name
        
        }
        var billFav = JSON.parse(localStorage.getItem("billFav")) || [];
        for (var i = 0; i < billFav.length; i++) {
            if (billFav[i]["ID"] == ID) {
                return;
            }
        }
        billFav.push(favB);
        localStorage.setItem("billFav", JSON.stringify(billFav));
        loadFavorites();
        }
    $scope.removeFavBill=function(ID){
        var lst = JSON.parse(localStorage.getItem("billFav")) || [];
        for (var i = 0; i < lst.length; i++) {
            if (lst[i]["ID"] == ID) {
                lst.splice(i, 1);
            }
        }
        localStorage.setItem("billFav", JSON.stringify(lst));
        var scope = angular.element(document.getElementById('full_bill_controller_div')).scope();
        scope.loadBillDetails(ID);
        loadFavorites();
    }
    
    });

function bollLeg(bioguide_id){
    var lst = JSON.parse(localStorage.getItem("legFav"));
    if (lst != null) {
        for (var i = 0; i < lst.length; i++) {
            if (lst[i]["bioguide_id"] == bioguide_id) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}
function bollBill(bill_id){
    var lst = JSON.parse(localStorage.getItem("billFav"));
    if (lst != null) {
        for (var i = 0; i < lst.length; i++) {
            if (lst[i]["ID"] == bill_id) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}
function bollComm(com_id){
    var lst = JSON.parse(localStorage.getItem("comFav"));
    if (lst != null) {
        for (var i = 0; i < lst.length; i++) {
            if (lst[i]["commID"] == com_id) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}

app.controller('full_legislator_controller', function ($scope, $http, $element) {
    $scope.legislator_committes = [];

    $scope.loadLegislatorDetails = function (bioguide_id) {
        //        console.log("Before calling AJAX");
        var httpRequest = $http({
            method: "GET",
            url: 'http://csci571hw8.eaygexnyaw.us-west-2.elasticbeanstalk.com/index.php?call=getLegislatorMemberDetails&bioguide_id=' + bioguide_id,
            //            url: 'index.php?call=getLegislatorMemberDetails&bioguide_id=' + bioguide_id,
            data: {
                call: 'getLegislatorMemberDetails'
            },
        }).then(function mySucces(response) {
            //console.log(response.data);
            $res = (response.data);
            if ($res["count"] > 0) {
                $result = $res["results"][0];
                $scope.bioguide_id = bioguide_id;

                $scope.legislator_image = "https://theunitedstates.io/images/congress/original/" + bioguide_id + ".jpg";
                $scope.name = $result["title"] + ", " +
                    $result["last_name"] + ", " + $result["first_name"];

                if ($result.hasOwnProperty("oc_email") == true) {
                    if ($result["oc_email"] != null) {
                        $scope.email = $result["oc_email"];
                    } else {
                        $scope.email = "N.A.";
                    }
                }

                if ($result.hasOwnProperty("chamber") == true) {
                    if ($result["chamber"] != null) {
                        $scope.chamber =$result["chamber"];
                    } else {
                        $scope.chamber = "N.A.";
                    }
                }

                if ($result.hasOwnProperty("phone") == true) {
                    if ($result["phone"] != null) {
                        $scope.contact = $result["phone"];
                    } else {
                        $scope.contact = "Contact : N.A.";
                    }
                }

                if ($result.hasOwnProperty("party") == true) {
                    if ($result["party"] != null) {
                        if ($result["party"] == 'R') {
                            $scope.partyImg = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
                            $scope.party = "Republican";
                        } else {
                            $scope.partyImg = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
                            $scope.party = "Democrat";
                        }
                    } else {
                        $scope.partyImg = "";
                        $scope.party = "";
                    }
                }

                if ($result.hasOwnProperty("term_start") == true) {
                    if ($result["term_start"] != null) {
                        $scope.start_term = new Date($result["term_start"]);
                    } else {
                        $scope.start_term = "N.A.";
                    }
                }
                if ($result.hasOwnProperty("term_end") == true) {
                    if ($result["term_end"] != null) {
                        $scope.end_term = new Date($result["term_end"]);
                    } else {
                        $scope.end_term = "N.A.";
                    }
                }
                $scope.bollLeg = bollLeg(bioguide_id);
                start = (new Date($scope.start_term).getTime() / 1000);
                start_date = (new Date($scope.start_term));
                $scope.start_term = getFormattedDate(start_date);
                end = (new Date($scope.end_term).getTime() / 1000);
                end_date = (new Date($scope.end_term));
                $scope.end_term = getFormattedDate(end_date);
                now = new Date() / 1000;
                $scope.term_progress =Math.round((now - start) / (end - start) * 100);
                $scope.end_term = new Date($result["term_end"]);
                $scope.start_term = new Date($result["term_start"]);
                if ($result.hasOwnProperty("office") == true) {
                    if ($result["office"] != null) {
                        $scope.office_address = $result["office"];
                    } else {
                        $scope.office_address = "N.A.";
                    }
                }

                if ($result.hasOwnProperty("state") == true) {
                    if ($result["state"] != null) {
                        $scope.state = $result["state"];
                    } else {
                        $scope.state = "N.A.";
                    }
                }
                if ($result.hasOwnProperty("fax") == true) {
                    if ($result["fax"] != null) {
                        $scope.fax = $result["fax"];
                    } else {
                        $scope.fax = "N.A.";
                    }
                }

                if ($result.hasOwnProperty("birthday") == true) {
                    if ($result["birthday"] != null) {
                        $scope.dob = new Date($result["birthday"]);
                    } else {
                        $scope.dob = "N.A.";
                    }
                }
                if ($result.hasOwnProperty("twitter_id") == true) {
                    if ($result["twitter_id"] != null) {
                        $scope.twitter_link = "http://www.twitter.com/" + $result["twitter_id"];
                    } else {
                        $scope.twitter_link = "N.A.";
                    }
                }
                if ($result.hasOwnProperty("facebook_id") == true) {
                    if ($result["facebook_id"] != null) {
                        $scope.facebook_link = "http://www.facebook.com/" + $result["facebook_id"];
                    } else {
                        $scope.facebook_link = "N.A.";
                    }
                }
                if ($result.hasOwnProperty("website") == true) {
                    if ($result["website"] != null) {
                        $scope.website_link = $result["website"];
                    } else {
                        $scope.website_link = "N.A.";
                    }
                }
            }
            //            console.log("After loading");
        });
        $scope.legislator_committees = [];
        var httpRequest = $http({
            method: "GET",
                        url: 'http://csci571hw8.eaygexnyaw.us-west-2.elasticbeanstalk.com/index.php?call=getCommitteesOfMember&bioguide_id=' + bioguide_id,
//            url: 'index.php?call=getCommitteesOfMember&bioguide_id=' + bioguide_id,
            data: {
                call: 'getCommitteesOfMember'
            },
        }).then(function mySucces(response) {
            $res = (response.data);
            if ($res["count"] > 0) {
                $results = $res["results"];
                if ($res["count"] > 5) {
                    count = 5;
                } else {
                    count = $res["count"];
                }
                $scope.legislator_committees = [];
                for (var i = 0; i < count; i++) {

                    chamber = $results[i]["chamber"];
                    committee_id = $results[i]["committee_id"];
                    name = $results[i]["name"];

                    newData = {
                        "chamber": chamber,
                        "committee_id": committee_id,
                        "name": name,
                    };
                    $scope.legislator_committees.push(newData);
                }
            }
        });

        // legislator_bills
        $scope.legislator_bills = [];
        var httpRequest = $http({
            method: "GET",
                        url: 'http://csci571hw8.eaygexnyaw.us-west-2.elasticbeanstalk.com/index.php?call=getBillsOfMember&bioguide_id=' + bioguide_id,
//            url: 'index.php?call=getBillsOfMember&bioguide_id=' + bioguide_id,
            data: {
                call: 'getBillsOfMember'
            },
        }).then(function mySucces(response) {
            $res = (response.data);
            if ($res["count"] > 0) {
                $results = $res["results"];
                if ($res["count"] > 5) {
                    count = 5;
                } else {
                    count = $res["count"];
                }
                $scope.legislator_bills = [];
                for (var i = 0; i < count; i++) {
                    bill_id = $results[i]["bill_id"];
                    title = $results[i]["official_title"];
                    chamber = $results[i]["chamber"];
                    bill_type = $results[i]["bill_type"];
                    congress = $results[i]["congress"];
                    if($results.hasOwnProperty("last_version"))
                    link = $results[i]["last_version"]["urls"]["pdf"];
                    else
                        link="N.A"
                    newData = {
                        "bill_id": bill_id,
                        "title": title,
                        "chamber": chamber,
                        "bill_type": bill_type,
                        "congress": congress,
                        "link": link                        
                    };
                    $scope.legislator_bills.push(newData);
                }
            }
        });

    };
    
    $scope.viewLegislatorDetails = function (bioguide_id) {
               
        slideToNext();
    }
    $scope.addToFavLeg = function (legislator_image,party,name,chamber,state,email,bioguide_id) {
        console.log("i worked on ng-click");
        $scope.bollLeg=true;
        addToFavLeg(legislator_image,party,name,chamber,state,email,bioguide_id);
    }
    $scope.removeFavLeg =function(bioguide_id){
        var lst = JSON.parse(localStorage.getItem("legFav")) || [];
        for (var i = 0; i < lst.length; i++) {
            if (lst[i]["bioguide_id"] == bioguide_id) {
                lst.splice(i, 1);
            }
        }
        localStorage.setItem("legFav", JSON.stringify(lst));
        var scope = angular.element(document.getElementById('full_legislator_controller_div')).scope();
        scope.loadLegislatorDetails(bioguide_id);
        loadFavorites();
    }
});
//BILL CONTROLLER
app.controller('full_bills_controller', function ($scope, $http, $element) {
    $scope.bills_committes_active = [];
    $scope.bills_committes_new = [];


    $scope.loadBillDetails = function () {
        
        var httpRequest = $http({
            method: "GET",
            url: 'http://csci571hw8.eaygexnyaw.us-west-2.elasticbeanstalk.com/index.php?call=getBillDefaultDetails',
            //            url: 'index.php?call=getBillDefaultDetails',
            //http://congress.api.sunlightfoundation.com/bills?apikey=b8ba30d18f3b48259227944edff23ca3&history.active=true&per_page=50
            //http://congress.api.sunlightfoundation.com/bills?apikey=b8ba30d18f3b48259227944edff23ca3&history.active=false&per_page=50
            data: {
                call: 'getBillDefaultDetails'
            },
        }).then(function mySucces(response) {
            
            $res = (response.data);
            if ($res["count"] > 0) {
                $results = $res["results"];
                $scope.bills_committes_active = [];
                //$scope.bills_committes_new = [];

                for (var i = 0; i < $res["page"]["count"]; i++) {

                    billID = $results[i]["bill_id"];
                    billType = $results[i]["bill_type"];
                    billTitle= $results[i]["official_title"];
                    cham=$results[i]["chamber"];
                    chamber_img_url="";
                    if ($results[i]["chamber"] == "house") {
                        
                        chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
                    } else {
                        
                        chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
                    }
                    introOn=new Date($results[i]["introduced_on"]);
                    sponsor=$results[i]["sponsor"]["title"]+","+$results[i]["sponsor"]["last_name"]+","+$results[i]["sponsor"]["first_name"];
                     active=$results[i]["history"]["active"];                   
                    newData = {
                        "billID": billID,
                        "billType": billType,
                        "billTitle": billTitle,
                        "cham": cham,
                        "chamber_img_url": chamber_img_url,
                        "introOn": introOn,
                        "sponsor": sponsor
                        };
                    //if(active==false)
                      //  $scope.bills_committes_new.push(newData);
                    //else
                        $scope.bills_committes_active.push(newData);
                }
            }
            
        });

        };
        $scope.loadBillDetails1 = function () {
        
        var httpRequest = $http({
            method: "GET",
            url: 'http://csci571hw8.eaygexnyaw.us-west-2.elasticbeanstalk.com/index.php?call=getBillDefaultDetails1',
            //            url: 'index.php?call=getBillDefaultDetails',
            //http://congress.api.sunlightfoundation.com/bills?apikey=b8ba30d18f3b48259227944edff23ca3&history.active=true&per_page=50
            //http://congress.api.sunlightfoundation.com/bills?apikey=b8ba30d18f3b48259227944edff23ca3&history.active=false&per_page=50
            data: {
                call: 'getBillDefaultDetails1'
            },
        }).then(function mySucces(response) {
            
            $res = (response.data);
            if ($res["count"] > 0) {
                $results = $res["results"];
                //$scope.bills_committes_active = [];
                $scope.bills_committes_new = [];

                for (var i = 0; i < $res["page"]["count"]; i++) {

                    billID = $results[i]["bill_id"];
                    billType = $results[i]["bill_type"];
                    billTitle= $results[i]["official_title"];
                    cham=$results[i]["chamber"];
                    chamber_img_url="";
                    if ($results[i]["chamber"] == "house") {
                        
                        chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
                    } else {
                        
                        chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
                    }
                    introOn=new Date($results[i]["introduced_on"]);
                    sponsor=$results[i]["sponsor"]["title"]+","+$results[i]["sponsor"]["last_name"]+","+$results[i]["sponsor"]["first_name"];
                     active=$results[i]["history"]["active"];                   
                    newData = {
                        "billID": billID,
                        "billType": billType,
                        "billTitle": billTitle,
                        "cham": cham,
                        "chamber_img_url": chamber_img_url,
                        "introOn": introOn,
                        "sponsor": sponsor
                        };
                    //if(active==false)
                        $scope.bills_committes_new.push(newData);
                    //else
                     //   $scope.bills_committes_active.push(newData);
                }
            }
            
        });

        
    };
   
    $scope.viewMeDetails = function (bill_id) {
             
        slideToNext1();
        getFullBillDetails(bill_id);
    }
    
});


//Committee Controller

app.controller('full_committees_controller', function ($scope, $http, $element) {
    $scope.comm = [];
  

    $scope.loadComDetails = function () {
        //console.log("Before calling AJAX");
        var httpRequest = $http({
            method: "GET",
            url: 'http://csci571hw8.eaygexnyaw.us-west-2.elasticbeanstalk.com/index.php?call=getCommDefaultDetails',
            //            url: 'hw8.php?call=getLegislatorDefaultDetails',
            data: {
                call: 'getCommDefaultDetails'
            },
        }).then(function mySucces(response) {
            //console.log(response.data);
            $res = (response.data);
            if ($res["count"] > 0) {
                $results = $res["results"];
                 $scope.comm = [];
                 //commID="";
                for (var i = 0; i < $res["count"]; i++) {

                    commID = $results[i]["committee_id"];
                    name = $results[i]["name"];
                    pCommID= $results[i]["parent_committee_id"];
                    cham=$results[i]["chamber"];
                    contact=$results[i]["phone"];
                    subcommittee=$results[i]["subcommittee"];
                    bollCom = bollComm(commID);
                    office="";
                    if($results[i]["office"]==null)
                        office="N.A";
                    else
                        office=$results[i]["office"];
                    
                    chamber_img_url="";
                    if ($results[i]["chamber"] == "house") {
                        
                        chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
                    } else {
                        
                        chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
                    }
                                 
                    newData = {
                        "commID": commID,
                        "name": name,
                        "pCommID": pCommID,
                        "cham": cham,
                        "chamber_img_url": chamber_img_url,
                        "contact": contact,
                        "office": office,
                        "subcommittee":subcommittee,
                        "bollCom":bollCom
                        };
                    
                        $scope.comm.push(newData);
                    
                }
                
            }
            
        });
    };
   
    
    $scope.addToComFav = function (cham,commID,name,pCommID,subcommittee) {
        console.log("i worked on ng-click");
        //addToBillFav(ID,bType,tit,cham,introOn,name);
        /*
        if (color.replace(/\D+/g, '') === '255255255') {
                $(".fa-star-o").css("color", "yellow");

    */
        //$scope.bollCom = true;
        //
        var favC = {
        'cham': cham,
        'commID': commID,
        'name': name,
        'pCommID': pCommID,
        'subcommittee': subcommittee
        
        }
        var comFav = JSON.parse(localStorage.getItem("comFav")) || [];
        for (var i = 0; i < comFav.length; i++) {
            if (comFav[i]["commID"] == commID) {
                //$(".fa-star-o").css("color", "black");
               /* var color = $(".fa-star-o").css("color");
                if (color.replace(/\D+/g, '') === '2552550') {
                    $(".fa fa-star").css("color", "black");
                    var json = JSON.parse(localStorage.getItem(comFav));
                    if (json[i].commID == commID) json.splice(i,1);
                    localStorage.setItem(comFav, JSON.stringify(json));

                    $scope.FL();
                    $scope.FB();
                    $scope.FC();
                }*/
                $scope.comm[i]["bollCom"] = true;
                return;
            }
        }
        //$(".fa fa-star").css("color", "yellow");
        comFav.push(favC);
        localStorage.setItem("comFav", JSON.stringify(comFav));
        var scope = angular.element(document.getElementById('commi_controller_div')).scope();
        scope.loadComDetails();
        loadFavorites();
        }
    $scope.removecom=function(commID){
        var lst = JSON.parse(localStorage.getItem("comFav")) || [];
        for (var i = 0; i < lst.length; i++) {
            if (lst[i]["commID"] == commID) {
                $scope.comm[i]["bollCom"] = false;
                lst.splice(i, 1);
            }
        }
        localStorage.setItem("comFav", JSON.stringify(lst));
        var scope = angular.element(document.getElementById('commi_controller_div')).scope();
        scope.loadComDetails();
        loadFavorites();
    }
    
});



function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '-' + day + '-' + year;
}


//favourite code goes here completely

function addToFavLeg(legislator_image,party,name,chamber,state,email,bioguide_id) {
    var favL = {
        'legislator_image': legislator_image,
        'party': party,
        'name': name,
        'chamber': chamber,
        'state': state,
        'email': email,
        'bioguide_id' : bioguide_id
    }
    var legFav = JSON.parse(localStorage.getItem("legFav")) || [];
    for (var i = 0; i < legFav.length; i++) {
        if (legFav[i]["bioguide_id"] == bioguide_id) {
            return;
        }
    }
    legFav.push(favL);
    localStorage.setItem("legFav", JSON.stringify(legFav));
    loadFavorites();
}


function loadFavorites()
{
    var scope = angular.element(document.getElementById('favorites_div')).scope();
    scope.FL();
    scope.FB();
    scope.FC();
}

//Favourite controller goes here

app.controller('favorites_Controller', function ($scope, $http, $element, $sce) {
    $scope.fav_leg = [];
    $scope.fav_bills = [];
    $scope.fav_committees = [];
    $scope.FL = function () {
        var legFav = JSON.parse(localStorage.getItem("legFav"));
        if (legFav != null) {
            $scope.fav_leg = [];
            for (var i = 0; i < legFav.length; i++) {
                legislator_image=legFav[i]["legislator_image"];
                party=legFav[i]["party"];
                cham=legFav[i]["chamber"];
                state=legFav[i]["state"];
                email=legFav[i]["email"];
                name=legFav[i]["name"];
                bioguide_id=legFav[i]["bioguide_id"];
                if (party == 'R') {
                    partyImg = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
                } else {
                    partyImg = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
                }
                chamber_img_url = "";
                if (cham.toLocaleLowerCase() == "house") {
                    
                    chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
                } else {
                    
                    chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
                }

                var leg = {
                    'bioguide_id': bioguide_id,
                    'legislator_image': legislator_image,
                    'party': party,
                    'name': name,
                    'cham': cham,
                    'state': state,
                    'email': email,
                    'partyImg': partyImg,
                    'chamber_img_url': chamber_img_url
                }
                $scope.fav_leg.push(leg);
            }
        }
    }
    $scope.FB = function () {
        var bilFav = JSON.parse(localStorage.getItem("billFav"));
        if (bilFav != null) {
            $scope.fav_bills = [];
            for (var i = 0; i < bilFav.length; i++) {
                ID=bilFav[i]["ID"];
                bType=bilFav[i]["bType"];
                tit=bilFav[i]["tit"];
                cham=bilFav[i]["cham"];
                introOn=new Date(bilFav[i]["introOn"]);
                name=bilFav[i]["name"];
                //bioguide_id=bilFav[i]["bioguide_id"];
                
                chamber_img_url = "";
                if (cham.toLocaleLowerCase() == "house") {
                    
                    chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
                } else {
                    
                    chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
                }

                var bill = {
                    'ID': ID,
                    'bType': bType,
                    'tit': tit,
                    'name': name,
                    'cham': cham,
                    'introOn': introOn,
                    'chamber_img_url': chamber_img_url
                }
                $scope.fav_bills.push(bill);
            }
        }
    }
    $scope.FC = function () {
        var comFav = JSON.parse(localStorage.getItem("comFav"));
        if (comFav != null) {
            $scope.fav_committees = [];
            for (var i = 0; i < comFav.length; i++) {
                cham=comFav[i]["cham"];
                commID=comFav[i]["commID"];
                name=comFav[i]["name"];
                pCommID=comFav[i]["pCommID"];
                subcommittee=comFav[i]["subcommittee"];
                chamber_img_url = "";
                if (cham.toLocaleLowerCase() == "house") {
                    
                    chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
                } else {
                    
                    chamber_img_url = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
                }

                var com = {
                    'cham': cham,
                    'commID': commID,
                    'pCommID': pCommID,
                    'subcommittee': subcommittee,
                    'name':name,
                    'chamber_img_url': chamber_img_url
                }
                $scope.fav_committees.push(com);
            }
        }
    }
    $scope.delete = function (id,bioguide_id) {
             
        
        console.log("inside delete controller");
        var json = JSON.parse(localStorage.getItem(id));
        for (i=0;i<json.length;i++)
        {
            if(id=="legFav")
            {
                if (json[i].bioguide_id == bioguide_id) json.splice(i,1);
            }
            if(id=="billFav")
            {
                if (json[i].ID == bioguide_id) json.splice(i,1);
            }
            if(id=="comFav")
            {
                if (json[i].commID == bioguide_id) json.splice(i,1);
            }
            }
        localStorage.setItem(id, JSON.stringify(json));

        $scope.FL();
        $scope.FB();
        $scope.FC();
        
    }
    $scope.viewMeDetails = function (bill_id) {
             
        slideToNext1();
        console.log("inside fav controller");
        getFullBillDetails(bill_id);
        //set legislator tab active
        $('#b').addClass("active");
        $('#f').removeClass("active");
        $('#bill_details_section').addClass("active");
        $('#favorites_details_section').removeClass("active");

    }
     $scope.viewLegislatorDetails = function (bioguide_id) {
             
        slideToNext();
         console.log("inside fav controller 2");
        getFullLegislatorDetails(bioguide_id);
        $('#l').addClass("active");
        $('#f').removeClass("active");
        $('#legislator_details_section').addClass("active");
        $('#favorites_details_section').removeClass("active");
    }
    
});











