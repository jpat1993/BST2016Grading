Parse.initialize("1dlfQyT8N0OrUJXzRWk9gtWz3fXHYNgKnZNOhWyY", "OTs8JFyPYJ3yrm03qc1jgY9NGCFJBXqsxsNCKT8E");


var DB = "SEEBSTDB";
var centers;
var seva;



function loadBalaks(){

    (function(global) {
        centers =  global.localStorage.getItem("centers");
        seva =  global.localStorage.getItem("seva");

    }(window));

    var test = JSON.parse(centers);

    console.log(test);


    var div = document.getElementById("searchResults");
    if (seva ==="RC") {
        var header = document.getElementById("header");
        var t = document.createTextNode("Click on the Name to Enter information about Balak.");
        header.appendChild(t);
    }

    // for(var input in test) {
        var searcher = Parse.Object.extend(DB);
        var query = new Parse.Query(searcher);

        // query.startsWith("center", test[input]);
        query.containedIn("center", test);
        event.preventDefault();
        query.find({
            success: function(results) {
                if((seva ==="Grader1" || seva === "Grader2" || seva === "Grader3") && results.length > 0) {
                    essayLayout(results);
                } else if ((seva === "Sant") && results.length > 0) {
                    recomLayout(results);
                } else if ((seva === "RC") && results.length > 0 ){
                    rcLayout(results);
                }

            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

    // }
    
    


}



function essayLayout(results) {
    var div = document.getElementById("searchResults");

    for (var i = 0; i < results.length; i++) {
        var object = results[i];
      // alert(object.id + ' - ' + object.get('email') + "name" : object.get('name'));

        var myDiv = document.createElement("div");

        var t = document.createTextNode(object.get('center') + ' - ' + "\n Name : " + object.get('firstname'));

        var essay = document.createElement("button");

        essay.setAttribute("id", object.id);
        essay.innerHTML= 'Grade Essay';
        essay.setAttribute('onclick','essay(id);');
        essay.setAttribute('class', 'btn btn-default small');
        essay.setAttribute("style","text-align: center", "margin = '50px auto'");
        
        var check = document.createElement('input');
        check.type = 'checkbox';
        check.id = 'gradedEssay';
        // check.disabled = true;
        check.setAttribute("onclick", "return false");

        var checker = seva + "essaycheck";
        if (object.get(checker) === true) {
            check.checked = true;   
        } else {
            check.checked = false;
        }

        var newlabel = document.createElement("label");
        newlabel.setAttribute("for","gradedEssay");
        newlabel.setAttribute("style","color:#6F84FF");
        newlabel.innerHTML = "Essay Graded";


        myDiv.appendChild(t);
        myDiv.appendChild(essay);
        myDiv.appendChild(check);
        myDiv.appendChild(newlabel);

        div.appendChild(myDiv);

    }
}

function essay(id) {
    (function(global) {
            global.localStorage.setItem("id", id);
    }(window));

    window.location="essay.html";
}

function recomLayout(results) {
    var div = document.getElementById("searchResults");

    for (var i = 0; i < results.length; i++) {
        var object = results[i];
      // alert(object.id + ' - ' + object.get('email') + "name" : object.get('name'));

        var myDiv = document.createElement("div");

        var t = document.createTextNode(object.get('center') + ' - ' + "\n Name : " + object.get('firstname'));

        // var centersend = object.get('center');
        // var namesend = object.get('name');

        var recom = document.createElement("button");

        recom.setAttribute("id", object.id);
        recom.innerHTML= 'Enter Recommendation';
        recom.setAttribute('onclick','recom(id);');
        recom.setAttribute('class', 'btn btn-default medium');
        recom.setAttribute("style","text-align: center", "margin = '50px auto'");


        var check = document.createElement('input');
        check.type = 'checkbox';
        check.id = 'recomDone';
        // check.disabled = true;
        check.setAttribute("onclick", "return false");

        var checker = seva + "recomcheck";
        if (object.get(checker) === true) {
            check.checked = true;   
        } else {
            check.checked = false;
        }

        var newlabel = document.createElement("label");
        newlabel.setAttribute("for","recomDone");
        newlabel.setAttribute("style","color:#6F84FF");
        newlabel.innerHTML = "Recommendation Complete";


        myDiv.appendChild(t);
        myDiv.appendChild(recom);
        myDiv.appendChild(check);
        myDiv.appendChild(newlabel);

        div.appendChild(myDiv);

    }
}

function recom(id) {
    (function(global) {
        global.localStorage.setItem("id", id);
    }(window));

    window.location="recom.html";
}


function rcLayout(results) {
    var div = document.getElementById("searchResults");

    for (var i = 0; i < results.length; i++) {
        var object = results[i];
      // alert(object.id + ' - ' + object.get('email') + "name" : object.get('name'));

        var myDiv = document.createElement("div");

        var t = document.createTextNode(object.get('center') + ' - ' + "\n Name : " + object.get('firstname'));

        var box = document.createElement("button");

        box.setAttribute("id", object.id);
        box.setAttribute('onclick','rc(id);');
        box.setAttribute('class', 'btn btn-default medium');
        box.setAttribute("style","text-align: center", "margin = '50px auto'");

        // for Sanch Recom check box
        var check = document.createElement('input');
        check.type = 'checkbox';
        check.id = 'SanchrecomDone';
        // check.disabled = true;
        check.setAttribute("onclick", "return false");

        var checker = seva + "Sanchrecomcheck";
        if (object.get(checker) === true) {
            check.checked = true;   
        } else {
            check.checked = false;
        }

        var newlabel = document.createElement("label");
        newlabel.setAttribute("for","SanchrecomDone");
        newlabel.setAttribute("style","color:#6F84FF");
        newlabel.innerHTML = "Sanch. Recommendation";

        // for RC Recom check box
        var check4 = document.createElement('input');
        check4.type = 'checkbox';
        check4.id = 'RCrecomDone';
        // check.disabled = true;
        check4.setAttribute("onclick", "return false");

        var checker4 = seva + "RCrecomcheck";
        if (object.get(checker4) === true) {
            check4.checked = true;   
        } else {
            check4.checked = false;
        }

        var newlabel4 = document.createElement("label");
        newlabel4.setAttribute("for","RCrecomDone");
        newlabel4.setAttribute("style","color:#6F84FF");
        newlabel4.innerHTML = "RC Recommendation";


        // for niyam check box
        var check2 = document.createElement('input');
        check2.type = 'checkbox';
        check2.id = 'niyamDone';
        // check2.disabled = true;
        check.setAttribute("onclick", "return false");

        var checker2 = seva + "niyamcheck";
        if (object.get(checker2) === true) {
            check2.checked = true;   
        } else {
            check2.checked = false;
        }

        var newlabel2 = document.createElement("label");
        newlabel2.setAttribute("for","niyamDone");
        newlabel2.setAttribute("style","color:#6F84FF");
        newlabel2.innerHTML = "Niyam";

         // for Bal Activity check box
        var check3 = document.createElement('input');
        check3.type = 'checkbox';
        check3.id = 'balactDone';
        // check3.disabled = true;
        check.setAttribute("onclick", "return false");

        var checker3 = seva + "balactcheck";
        if (object.get(checker3) === true) {
            check3.checked = true;   
        } else {
            check3.checked = false;
        }

        var newlabel3 = document.createElement("label");
        newlabel3.setAttribute("for","balactDone");
        newlabel3.setAttribute("style","color:#6F84FF");
        newlabel3.innerHTML = "Bal Activity";


        box.appendChild(t);
        myDiv.appendChild(box);
        myDiv.appendChild(check);
        myDiv.appendChild(newlabel);
        myDiv.appendChild(check4);
        myDiv.appendChild(newlabel4);
        myDiv.appendChild(check2);
        myDiv.appendChild(newlabel2);
        myDiv.appendChild(check3);
        myDiv.appendChild(newlabel3);


        div.appendChild(myDiv);

        

    }
}

function rc(id) {
    (function(global) {
        global.localStorage.setItem("id", id);
    }(window));

    window.location="rc.html";
}