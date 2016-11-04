/*global $ */

$(document).ready(function () {
    $("#menu-toggle-2").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    getLegislatorDetails();
    getBillDetails();
    getCommitteesDetails();
    loadFavorites();
});

function slideToNext() {
    $("#legislator_by_state_carousal").carousel(1);
    
}

function slideToPrev() {
    $("#legislator_by_state_carousal").carousel(0);
}
//added for second bill carousal
function slideToNext1() {
    $("#bill_details_section").carousel(1);
    
}
//added for second bill carousal
function slideToPrev1() {
    $("#bill_details_section").carousel(0);
}


function abbrState(input, to) {
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr') {
        input = input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        for (i = 0; i < states.length; i++) {
            if (states[i][0] == input) {
                return (states[i][1]);
            }
        }
    } else if (to == 'name') {
        input = input.toUpperCase();
        for (i = 0; i < states.length; i++) {
            if (states[i][1] == input) {
                return (states[i][0]);
            }
        }
    }
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
            url: 'index.php?call=getLegislatorDefaultDetails',
            //            url: 'hw8.php?call=getLegislatorDefaultDetails',
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
                            districtVal = $results[i]["district"];
                        }
                    } else {
                        districtVal = "N.A.";
                    }
                    state = $results[i]["state"];
                    stateVal = abbrState($results[i]["state"], 'name');
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
                        "bioguide_id": $results[i]["bioguide_id"]
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
            url: 'index.php?call=getBDetails&bill_id=' + bill_id,
            //            url: 'hw8.php?call=getLegislatorMemberDetails&bioguide_id=' + bioguide_id,
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
                    $scope.introOn=$result["introduced_on"];
                    $scope.conLink=$result["urls"]["congress"];
                    $scope.version=$result["last_version"]["version_name"];
                    $scope.pdf=$result["last_version"]["urls"]["pdf"];
                }
            } );
        };
        $scope.viewMeDetails = function (bill_id) {
               
        slideToNext1();
    }
    });

app.controller('full_legislator_controller', function ($scope, $http, $element) {
    $scope.legislator_committes = [];

    $scope.loadLegislatorDetails = function (bioguide_id) {
        //        console.log("Before calling AJAX");
        var httpRequest = $http({
            method: "GET",
            url: 'index.php?call=getLegislatorMemberDetails&bioguide_id=' + bioguide_id,
            //            url: 'hw8.php?call=getLegislatorMemberDetails&bioguide_id=' + bioguide_id,
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
                        $scope.chamber = "Chamber: " + $result["chamber"];
                    } else {
                        $scope.chamber = "Chamber: N.A.";
                    }
                }

                if ($result.hasOwnProperty("phone") == true) {
                    if ($result["phone"] != null) {
                        $scope.contact = "Contact : " + $result["phone"];
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
                        $scope.start_term = $result["term_start"];
                    } else {
                        $scope.start_term = "N.A.";
                    }
                }
                if ($result.hasOwnProperty("term_end") == true) {
                    if ($result["term_end"] != null) {
                        $scope.end_term = $result["term_end"];
                    } else {
                        $scope.end_term = "N.A.";
                    }
                }

                start = (new Date($scope.start_term).getTime() / 1000);
                start_date = (new Date($scope.start_term));
                $scope.start_term = getFormattedDate(start_date);
                end = (new Date($scope.end_term).getTime() / 1000);
                end_date = (new Date($scope.end_term));
                $scope.end_term = getFormattedDate(end_date);
                now = new Date() / 1000;
                $scope.term_progress = (now - start) / (end - start) * 100;

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
                        $scope.dob = $result["birthday"];
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
                        url: 'index.php?call=getCommitteesOfMember&bioguide_id=' + bioguide_id,
//            url: 'hw8.php?call=getCommitteesOfMember&bioguide_id=' + bioguide_id,
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
                        url: 'index.php?call=getBillsOfMember&bioguide_id=' + bioguide_id,
//            url: 'hw8.php?call=getBillsOfMember&bioguide_id=' + bioguide_id,
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
                    link = $results[i]["last_version"]["urls"]["pdf"];
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
        addToFavLeg(legislator_image,party,name,chamber,state,email,bioguide_id);
    }
});
//BILL CONTROLLER
app.controller('full_bills_controller', function ($scope, $http, $element) {
    $scope.bills_committes_active = [];
    $scope.bills_committes_new = [];


    $scope.loadBillDetails = function () {
        
        var httpRequest = $http({
            method: "GET",
            url: 'index.php?call=getBillDefaultDetails',
            //            url: 'hw8.php?call=getLegislatorDefaultDetails',
            data: {
                call: 'getBillDefaultDetails'
            },
        }).then(function mySucces(response) {
            
            $res = (response.data);
            if ($res["count"] > 0) {
                $results = $res["results"];
                $scope.bills_committes_active = [];
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
                    introOn=$results[i]["introduced_on"];
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
                    if(active==false)
                        $scope.bills_committes_new.push(newData);
                    else
                        $scope.bills_committes_active.push(newData);
                }
            }
            
        });
    };
   
    $scope.viewMeDetails = function (bill_id) {
             
        slideToNext1();
        getFullBillDetails(bill_id);
    }
    $scope.addToBillFav = function (ID,bType,tit,cham,introOn,name) {
        console.log("i worked on ng-click");
        //addToBillFav(ID,bType,tit,cham,introOn,name);

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
});


//Committee Controller

app.controller('full_committees_controller', function ($scope, $http, $element) {
    $scope.comm = [];
  

    $scope.loadComDetails = function () {
        //console.log("Before calling AJAX");
        var httpRequest = $http({
            method: "GET",
            url: 'index.php?call=getCommDefaultDetails',
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
                for (var i = 0; i < $res["count"]; i++) {

                    commID = $results[i]["committee_id"];
                    name = $results[i]["name"];
                    pCommID= $results[i]["parent_committee_id"];
                    cham=$results[i]["chamber"];
                    contact=$results[i]["phone"];
                    subcommittee=$results[i]["subcommittee"];
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
                        "subcommittee":subcommittee
                        };
                    
                        $scope.comm.push(newData);
                    
                }
            }
            
        });
    };
   
    //$scope.viewLegislatorDetails = function (bioguide_id) {
              
      //  slideToNext();
        //getFullLegislatorDetails(bioguide_id);
    //}
    $scope.addToComFav = function (cham,commID,name,pCommID,subcommittee) {
        console.log("i worked on ng-click");
        //addToBillFav(ID,bType,tit,cham,introOn,name);

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
                return;
            }
        }
        comFav.push(favC);
        localStorage.setItem("comFav", JSON.stringify(comFav));
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
                introOn=bilFav[i]["introOn"];
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
    
});











//pagination code here after be carefull whule editing

(function () {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirPagination';
    var DEFAULT_ID = '__default';

    /**
     * Module
     */
    angular.module(moduleName, [])
        .directive('dirPaginate', ['$compile', '$parse', 'paginationService', dirPaginateDirective])
        .directive('dirPaginateNoCompile', noCompileDirective)
        .directive('dirPaginationControls', ['paginationService', 'paginationTemplate', dirPaginationControlsDirective])
        .filter('itemsPerPage', ['paginationService', itemsPerPageFilter])
        .service('paginationService', paginationService)
        .provider('paginationTemplate', paginationTemplateProvider)
        .run(['$templateCache', dirPaginationControlsTemplateInstaller]);

    function dirPaginateDirective($compile, $parse, paginationService) {

        return {
            terminal: true,
            multiElement: true,
            priority: 100,
            compile: dirPaginationCompileFn
        };

        function dirPaginationCompileFn(tElement, tAttrs) {

            var expression = tAttrs.dirPaginate;
            // regex taken directly from https://github.com/angular/angular.js/blob/v1.4.x/src/ng/directive/ngRepeat.js#L339
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

            var filterPattern = /\|\s*itemsPerPage\s*:\s*(.*\(\s*\w*\)|([^\)]*?(?=\s+as\s+))|[^\)]*)/;
            if (match[2].match(filterPattern) === null) {
                throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
            }
            var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
            var collectionGetter = $parse(itemsPerPageFilterRemoved);

            addNoCompileAttributes(tElement);

            // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
            // dir-pagination-controls directives that may be looking for this ID.
            var rawId = tAttrs.paginationId || DEFAULT_ID;
            paginationService.registerInstance(rawId);

            return function dirPaginationLinkFn(scope, element, attrs) {

                // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                // potentially register a new ID if it evaluates to a different value than the rawId.
                var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;

                // (TODO: this seems sound, but I'm reverting as many bug reports followed it's introduction in 0.11.0.
                // Needs more investigation.)
                // In case rawId != paginationId we deregister using rawId for the sake of general cleanliness
                // before registering using paginationId
                // paginationService.deregisterInstance(rawId);
                paginationService.registerInstance(paginationId);

                var repeatExpression = getRepeatExpression(expression, paginationId);
                addNgRepeatToElement(element, attrs, repeatExpression);

                removeTemporaryAttributes(element);
                var compiled = $compile(element);

                var currentPageGetter = makeCurrentPageGetterFn(scope, attrs, paginationId);
                paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                if (typeof attrs.totalItems !== 'undefined') {
                    paginationService.setAsyncModeTrue(paginationId);
                    scope.$watch(function () {
                        return $parse(attrs.totalItems)(scope);
                    }, function (result) {
                        if (0 <= result) {
                            paginationService.setCollectionLength(paginationId, result);
                        }
                    });
                } else {
                    paginationService.setAsyncModeFalse(paginationId);
                    scope.$watchCollection(function () {
                        return collectionGetter(scope);
                    }, function (collection) {
                        if (collection) {
                            var collectionLength = (collection instanceof Array) ? collection.length : Object.keys(collection).length;
                            paginationService.setCollectionLength(paginationId, collectionLength);
                        }
                    });
                }

                // Delegate to the link function returned by the new compilation of the ng-repeat
                compiled(scope);

                // (TODO: Reverting this due to many bug reports in v 0.11.0. Needs investigation as the
                // principle is sound)
                // When the scope is destroyed, we make sure to remove the reference to it in paginationService
                // so that it can be properly garbage collected
                // scope.$on('$destroy', function destroyDirPagination() {
                //     paginationService.deregisterInstance(paginationId);
                // });
            };
        }

        /**
         * If a pagination id has been specified, we need to check that it is present as the second argument passed to
         * the itemsPerPage filter. If it is not there, we add it and return the modified expression.
         *
         * @param expression
         * @param paginationId
         * @returns {*}
         */
        function getRepeatExpression(expression, paginationId) {
            var repeatExpression,
                idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);

            if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {
                repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:\s*[^|\s]*)/, "$1 : '" + paginationId + "'");
            } else {
                repeatExpression = expression;
            }

            return repeatExpression;
        }

        /**
         * Adds the ng-repeat directive to the element. In the case of multi-element (-start, -end) it adds the
         * appropriate multi-element ng-repeat to the first and last element in the range.
         * @param element
         * @param attrs
         * @param repeatExpression
         */
        function addNgRepeatToElement(element, attrs, repeatExpression) {
            if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                // using multiElement mode (dir-paginate-start, dir-paginate-end)
                attrs.$set('ngRepeatStart', repeatExpression);
                element.eq(element.length - 1).attr('ng-repeat-end', true);
            } else {
                attrs.$set('ngRepeat', repeatExpression);
            }
        }

        /**
         * Adds the dir-paginate-no-compile directive to each element in the tElement range.
         * @param tElement
         */
        function addNoCompileAttributes(tElement) {
            angular.forEach(tElement, function (el) {
                if (el.nodeType === 1) {
                    angular.element(el).attr('dir-paginate-no-compile', true);
                }
            });
        }

        /**
         * Removes the variations on dir-paginate (data-, -start, -end) and the dir-paginate-no-compile directives.
         * @param element
         */
        function removeTemporaryAttributes(element) {
            angular.forEach(element, function (el) {
                if (el.nodeType === 1) {
                    angular.element(el).removeAttr('dir-paginate-no-compile');
                }
            });
            element.eq(0).removeAttr('dir-paginate-start').removeAttr('dir-paginate').removeAttr('data-dir-paginate-start').removeAttr('data-dir-paginate');
            element.eq(element.length - 1).removeAttr('dir-paginate-end').removeAttr('data-dir-paginate-end');
        }

        /**
         * Creates a getter function for the current-page attribute, using the expression provided or a default value if
         * no current-page expression was specified.
         *
         * @param scope
         * @param attrs
         * @param paginationId
         * @returns {*}
         */
        function makeCurrentPageGetterFn(scope, attrs, paginationId) {
            var currentPageGetter;
            if (attrs.currentPage) {
                currentPageGetter = $parse(attrs.currentPage);
            } else {
                // If the current-page attribute was not set, we'll make our own.
                // Replace any non-alphanumeric characters which might confuse
                // the $parse service and give unexpected results.
                // See https://github.com/michaelbromley/angularUtils/issues/233
                var defaultCurrentPage = (paginationId + '__currentPage').replace(/\W/g, '_');
                scope[defaultCurrentPage] = 1;
                currentPageGetter = $parse(defaultCurrentPage);
            }
            return currentPageGetter;
        }
    }

    /**
     * This is a helper directive that allows correct compilation when in multi-element mode (ie dir-paginate-start, dir-paginate-end).
     * It is dynamically added to all elements in the dir-paginate compile function, and it prevents further compilation of
     * any inner directives. It is then removed in the link function, and all inner directives are then manually compiled.
     */
    function noCompileDirective() {
        return {
            priority: 5000,
            terminal: true
        };
    }

    function dirPaginationControlsTemplateInstaller($templateCache) {
        $templateCache.put('angularUtils.directives.dirPagination.template', '<ul class="pagination" ng-if="1 < pages.length || !autoHide"><li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(1)">&laquo;</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a></li><li ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' || ( ! autoHide && pages.length === 1 ) }"><a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></li><li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)">&raquo;</a></li></ul>');
    }

    function dirPaginationControlsDirective(paginationService, paginationTemplate) {

        var numberRegex = /^\d+$/;

        var DDO = {
            restrict: 'AE',
            scope: {
                maxSize: '=?',
                onPageChange: '&?',
                paginationId: '=?',
                autoHide: '=?'
            },
            link: dirPaginationControlsLinkFn
        };

        // We need to check the paginationTemplate service to see whether a template path or
        // string has been specified, and add the `template` or `templateUrl` property to
        // the DDO as appropriate. The order of priority to decide which template to use is
        // (highest priority first):
        // 1. paginationTemplate.getString()
        // 2. attrs.templateUrl
        // 3. paginationTemplate.getPath()
        var templateString = paginationTemplate.getString();
        if (templateString !== undefined) {
            DDO.template = templateString;
        } else {
            DDO.templateUrl = function (elem, attrs) {
                return attrs.templateUrl || paginationTemplate.getPath();
            };
        }
        return DDO;

        function dirPaginationControlsLinkFn(scope, element, attrs) {

            // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
            // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
            // no corresponding dir-paginate directive and wrongly throwing an exception.
            var rawId = attrs.paginationId || DEFAULT_ID;
            var paginationId = scope.paginationId || attrs.paginationId || DEFAULT_ID;

            if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {
                var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';
                if (window.console) {
                    console.warn('Pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive, which was not found at link time.');
                }
            }

            if (!scope.maxSize) {
                scope.maxSize = 9;
            }
            scope.autoHide = scope.autoHide === undefined ? true : scope.autoHide;
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

            var paginationRange = Math.max(scope.maxSize, 5);
            scope.pages = [];
            scope.pagination = {
                last: 1,
                current: 1
            };
            scope.range = {
                lower: 1,
                upper: 1,
                total: 1
            };

            scope.$watch('maxSize', function (val) {
                if (val) {
                    paginationRange = Math.max(scope.maxSize, 5);
                    generatePagination();
                }
            });

            scope.$watch(function () {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
                }
            }, function (length) {
                if (0 < length) {
                    generatePagination();
                }
            });

            scope.$watch(function () {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getItemsPerPage(paginationId));
                }
            }, function (current, previous) {
                if (current != previous && typeof previous !== 'undefined') {
                    goToPage(scope.pagination.current);
                }
            });

            scope.$watch(function () {
                if (paginationService.isRegistered(paginationId)) {
                    return paginationService.getCurrentPage(paginationId);
                }
            }, function (currentPage, previousPage) {
                if (currentPage != previousPage) {
                    goToPage(currentPage);
                }
            });

            scope.setCurrent = function (num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    num = parseInt(num, 10);
                    paginationService.setCurrentPage(paginationId, num);
                }
            };

            /**
             * Custom "track by" function which allows for duplicate "..." entries on long lists,
             * yet fixes the problem of wrongly-highlighted links which happens when using
             * "track by $index" - see https://github.com/michaelbromley/angularUtils/issues/153
             * @param id
             * @param index
             * @returns {string}
             */
            scope.tracker = function (id, index) {
                return id + '_' + index;
            };

            function goToPage(num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    var oldPageNumber = scope.pagination.current;

                    scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = num;
                    updateRangeValues();

                    // if a callback has been set, then call it with the page number as the first argument
                    // and the previous page number as a second argument
                    if (scope.onPageChange) {
                        scope.onPageChange({
                            newPageNumber: num,
                            oldPageNumber: oldPageNumber
                        });
                    }
                }
            }

            function generatePagination() {
                if (paginationService.isRegistered(paginationId)) {
                    var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;
                    scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = page;
                    scope.pagination.last = scope.pages[scope.pages.length - 1];
                    if (scope.pagination.last < scope.pagination.current) {
                        scope.setCurrent(scope.pagination.last);
                    } else {
                        updateRangeValues();
                    }
                }
            }

            /**
             * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
             * template to display the current page range, e.g. "showing 21 - 40 of 144 results";
             */
            function updateRangeValues() {
                if (paginationService.isRegistered(paginationId)) {
                    var currentPage = paginationService.getCurrentPage(paginationId),
                        itemsPerPage = paginationService.getItemsPerPage(paginationId),
                        totalItems = paginationService.getCollectionLength(paginationId);

                    scope.range.lower = (currentPage - 1) * itemsPerPage + 1;
                    scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);
                    scope.range.total = totalItems;
                }
            }

            function isValidPageNumber(num) {
                return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
            }
        }

        /**
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
         * links used in pagination
         *
         * @param currentPage
         * @param rowsPerPage
         * @param paginationRange
         * @param collectionLength
         * @returns {Array}
         */
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i++;
            }
            return pages;
        }

        /**
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *
         * @param i
         * @param currentPage
         * @param paginationRange
         * @param totalPages
         * @returns {*}
         */
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange / 2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
    }

    /**
     * This filter slices the collection into pages based on the current page number and number of items per page.
     * @param paginationService
     * @returns {Function}
     */
    function itemsPerPageFilter(paginationService) {

        return function (collection, itemsPerPage, paginationId) {
            if (typeof (paginationId) === 'undefined') {
                paginationId = DEFAULT_ID;
            }
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (angular.isObject(collection)) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                if (collection instanceof Array) {
                    // the array just needs to be sliced
                    return collection.slice(start, end);
                } else {
                    // in the case of an object, we need to get an array of keys, slice that, then map back to
                    // the original object.
                    var slicedObject = {};
                    angular.forEach(keys(collection).slice(start, end), function (key) {
                        slicedObject[key] = collection[key];
                    });
                    return slicedObject;
                }
            } else {
                return collection;
            }
        };
    }

    /**
     * Shim for the Object.keys() method which does not exist in IE < 9
     * @param obj
     * @returns {Array}
     */
    function keys(obj) {
        if (!Object.keys) {
            var objKeys = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    objKeys.push(i);
                }
            }
            return objKeys;
        } else {
            return Object.keys(obj);
        }
    }

    /**
     * This service allows the various parts of the module to communicate and stay in sync.
     */
    function paginationService() {

        var instances = {};
        var lastRegisteredInstance;

        this.registerInstance = function (instanceId) {
            if (typeof instances[instanceId] === 'undefined') {
                instances[instanceId] = {
                    asyncMode: false
                };
                lastRegisteredInstance = instanceId;
            }
        };

        this.deregisterInstance = function (instanceId) {
            delete instances[instanceId];
        };

        this.isRegistered = function (instanceId) {
            return (typeof instances[instanceId] !== 'undefined');
        };

        this.getLastInstanceId = function () {
            return lastRegisteredInstance;
        };

        this.setCurrentPageParser = function (instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        };
        this.setCurrentPage = function (instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        };
        this.getCurrentPage = function (instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        };

        this.setItemsPerPage = function (instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        };
        this.getItemsPerPage = function (instanceId) {
            return instances[instanceId].itemsPerPage;
        };

        this.setCollectionLength = function (instanceId, val) {
            instances[instanceId].collectionLength = val;
        };
        this.getCollectionLength = function (instanceId) {
            return instances[instanceId].collectionLength;
        };

        this.setAsyncModeTrue = function (instanceId) {
            instances[instanceId].asyncMode = true;
        };

        this.setAsyncModeFalse = function (instanceId) {
            instances[instanceId].asyncMode = false;
        };

        this.isAsyncMode = function (instanceId) {
            return instances[instanceId].asyncMode;
        };
    }

    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function paginationTemplateProvider() {

        var templatePath = 'angularUtils.directives.dirPagination.template';
        var templateString;

        /**
         * Set a templateUrl to be used by all instances of <dir-pagination-controls>
         * @param {String} path
         */
        this.setPath = function (path) {
            templatePath = path;
        };

        /**
         * Set a string of HTML to be used as a template by all instances
         * of <dir-pagination-controls>. If both a path *and* a string have been set,
         * the string takes precedence.
         * @param {String} str
         */
        this.setString = function (str) {
            templateString = str;
        };

        this.$get = function () {
            return {
                getPath: function () {
                    return templatePath;
                },
                getString: function () {
                    return templateString;
                }
            };
        };
    }
})();
