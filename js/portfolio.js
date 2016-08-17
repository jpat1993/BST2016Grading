Parse.initialize("0Fb9B6wZHGmpjRTJUoRvyFSGQl2lTOhbYNnvazTv", "gHDjSNQtKWNaFlquz6QCvBWiIJHVQ3CqEezuS22r");
Parse.serverURL = 'https://parseapi.back4app.com';



var DB = "BST2016";
var id;
var name;
var getter;
var region;


var myInput = document.getElementById('myPic');

function sendPic() {
    var inputFile = myInput.files[0];

    // var picSpot = document.getElementById("profPic");
    

    var file = window.URL.createObjectURL(inputFile);
    $('#profPic').attr('src' , file);

    $('#picButton').show();
    $('#myPic').hide();

    (function(global) {
        id =  global.localStorage.getItem("id");
        seva =  global.localStorage.getItem("seva");
        region = global.localStorage.getItem("region");
    }(window));

    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    query.get(id, {
      success: function(details) {
        var name = details.get('firstname');
        console.log(name);
        name += ".jpg";

        var parseFile = new Parse.File(name, inputFile);

        parseFile.save();

        details.set("profPic", parseFile);

        details.save();


      },
      error: function(object, error) {
          errorAlert("Failed to Save Pic to Parse" + error.code + " " + error.message);
      }
      
    });

}

myInput.addEventListener('change', sendPic, false);



function loadPortfolio() {

    (function(global) {
        id =  global.localStorage.getItem("id");
        seva =  global.localStorage.getItem("seva");
        region = global.localStorage.getItem("region");
    }(window));

    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    event.preventDefault();

    var values = $("#portfolio").serializeArray();
    console.log(values);
    

    query.get(id, {
      success: function(details) {
        name = details.get('firstname');
        console.log(name);
        // var div = document.getElementById("portTitle");

        // if(region == "SE_BST_2016") {
        //     var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('SEcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        // } else if (region == "NE_BST_2016") {
        //     var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('NEcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        // } else if (region == "MW_BST_2016") {
        //     var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('MWcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        // } else if (region == "SW_BST_2016") {
        //     var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('SWcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        // } else if (region == "West_BST_2016") {
        //     var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('Wcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        // } else if (region == "Canada_BST_2016") {
        //     var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('Canadacenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        // } else {
        //     var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('NEcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        // }


        // var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('center') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        // var t = document.createTextNode(name);
        
        // div.appendChild(t);

        // for (var prop in values) {
        //   var lookup = values[prop].name;
        //   console.log(details.get(lookup));
        //   console.log("#"+lookup);

        //   getter = seva + lookup;
        //   $("#"+lookup).val(details.get(getter));

        //   // details.set(lookup, "poop");
        //   // details.save();

        // };

        $("#bkidPort").append(details.get('bkid'));

        if(region == "SE_BST_2016") {
          $("#regionPort").append("Southeast");
        } else if (region == "NE_BST_2016") {
          $("#regionPort").append("Northeast");
        } else if (region == "MW_BST_2016") {
          $("#regionPort").append("Midwest");
        } else if (region == "SW_BST_2016") {
          $("#regionPort").append("Soutwest");
        } else if (region == "West_BST_2016") {
          $("#regionPort").append("West");
        } else if (region == "Canada_BST_2016") {
          $("#regionPort").append("Canada");
        } else {
          $("#regionPort").append("Canada");
        }


        if(region == "SE_BST_2016") {
          $("#centerPort").append(details.get('SEcenter'));
        } else if (region == "NE_BST_2016") {
          $("#centerPort").append(details.get('NEcenter'));
        } else if (region == "MW_BST_2016") {
          $("#centerPort").append(details.get('MWcenter'));
        } else if (region == "SW_BST_2016") {
          $("#centerPort").append(details.get('SWcenter'));
        } else if (region == "West_BST_2016") {
          $("#centerPort").append(details.get('Wcenter'));
        } else if (region == "Canada_BST_2016") {
          $("#centerPort").append(details.get('Canadacenter'));
        } else {
          $("#centerPort").append(details.get('Canadacenter'));
        }
        
        $("#gradePort").append(details.get('grade'));

        $("#fatherPort").append(details.get('father'));

        // check for Fatherparent occ
        if(details.get('fatherOcc') != undefined) {
          $("#fatherOccPort").append(details.get('fatherOcc'));
        } else {
          $("#fatherOccPort").append("N/A");
        }

        
        $("#motherPort").append(details.get('mother'));

        // check for Motherparent occ
        if(details.get('motherOcc') != undefined) {
          $("#motherOccPort").append(details.get('motherOcc'));
        } else {
          $("#motherOccPort").append("N/A");
        }


        

        $("#firstPort").append(details.get('firstname'));
        $("#middlePort").append(details.get('middlename'));
        $("#lastPort").append(details.get('lastname'));
        $("#dobPort").append(details.get('birthday'));

        $("#homephonePort").append(details.get('homephone'));
        $("#cellPort").append(details.get('cell'));


        $("#emailPort").append(details.get('email'));
        var addr = details.get('address') + " " + details.get('city') + ", " + details.get('state') + " " + details.get('zip');
        $("#addressPort").append(addr);

        //completed BST
        // console.log(details.get('compl'));
        if(details.get('compl') != undefined) {
          $("#complPort").append(details.get('compl'));
        } else {
          $("#complPort").append("N/A");
        }
        

        //picture 

        // ParseFile photo = new Parse.File(details.get("profPic"));
        var photo = details.get('profPic');
        // console.log(photo);
        // console.log(imgUrl);
        if(photo != undefined) {
          var imgUrl = photo.url();
          $("#profPic").attr('src', imgUrl);

          $('#picButton').show();
          $('#myPic').hide();

          var isMobile = window.matchMedia("only screen and (max-width: 760px)");

          if (!isMobile.matches) {
            $("#profPic").addClass('rotated');
          }
                



        }

        //se1 se2 na
        $("#se1").append(details.get('se1'));
        $("#se2").append(details.get('se2'));
        $("#na").append(details.get('NiyamAssess'));


        // BST Score  TODO
        $("#bs").append(details.get('bs'));
        
        

        // inputData(details);

      },
      error: function(object, error) {
          errorAlert("Error: " + error.code + " " + error.message);
      }
      
    });

}



$(".portSubmit").click(function(){

  (function(global) {
      id =  global.localStorage.getItem("id");
      seva =  global.localStorage.getItem("seva");
      region = global.localStorage.getItem("region");
  }(window));



  var tester = Parse.Object.extend(DB);
  var query = new Parse.Query(tester);

  // var topPort = $("#topPort").serializeArray();
  // var oneOn = $("#oneOn").serializeArray();

  // console.log(topPort);
  // console.log(oneOn);


  console.log(id);

  event.preventDefault();

  var name;
  var value;
  var check;
  query.get(id, {
      success: function(details) {

          var edu = $("#edu").val();
          var eduAction = $("#eduAction").val();

          
          var satsang = $("#satsang").val();
          var satsangAction = $("#satsangAction").val();

          var skills = $("#skills").val();
          var skillsAction = $("#skillsAction").val();
          var talents = $("#talents").val();


          // for (var prop in topPort) {
          //       var lookup = values[prop].name;
          //       console.log(lookup);
          //       // console.log("#"+lookup);

          //       // if(lookup === "recomcomment" || lookup === "recom") {

          //       //   console.log(prop);
          //       //   name = lookup;
          //       //   value = values[prop].value;
          //       //   details.set(name, value);
          //       //   count++;
                  
          //       // }

          //       // if (lookup === "recom" && value !== "0") {
          //       //     check = "santRecCheck";
          //       //     details.set(check, true);
          //       // }

          // };

          // if (count !== 2) {
          //   checker = false;
          // }
          // check = "santRecCheck";
          // details.set(check, checker);

          details.save(null, {
            success: function(details) {
              console.log("success" + name);
              // alert("Your Recommendation has been submitted.");
              // window.location= "portfolioList.html";
            },
            error: function(details, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              errorAlert('Failed to add Recommendation, with error code: ' + error.message);
            }
          });          

      },
      error: function(object, error) {
          errorAlert("Error: " + error.code + " " + error.message);
      }

  });


})

function edit(){

  (function(global) {
      id =  global.localStorage.getItem("id");
      seva =  global.localStorage.getItem("seva");
      region = global.localStorage.getItem("region");
  }(window));

  $("#myModal").modal('show');

  if(region == "SE_BST_2016") {
        var cent = document.getElementById("SEcenter");
        cent.classList.remove('hide');
    } else if (region == "NE_BST_2016") {
        var cent = document.getElementById("NEcenter");
        cent.classList.remove('hide');
    } else if (region == "MW_BST_2016") {
        var cent = document.getElementById("MWcenter");
        cent.classList.remove('hide');
    } else if (region == "SW_BST_2016") {
        var cent = document.getElementById("SWcenter");
        cent.classList.remove('hide');
    } else if (region == "West_BST_2016") {
        var cent = document.getElementById("Wcenter");
        cent.classList.remove('hide');
    } else if (region == "Canada_BST_2016") {
        var cent = document.getElementById("Canadacenter");
        cent.classList.remove('hide');
    }

    //add parse
    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    var values = $("#editPort").serializeArray();
    // console.log(values);

    event.preventDefault();

    query.get(id, {
        success: function(details) {
            for (var prop in values) {
                  var lookup = values[prop].name;
                  // console.log(details.get(lookup));

                  $("#"+lookup).val(details.get(lookup));
                  // console.log($("#"+lookup).val());

                  // $("#"+lookup).val(details.get(lookup));

                  // console.log(name);
                  // console.log(details.get(lookup));
                  // console.log("#"+lookup);
                  // console.log();

                  // var value = values[prop].value;
                  // console.log(value);
                  // console.log(ObjectID);
              };
            
            // if(pass === details.get("password")) {
            //     loadDetails(details.get("id"));
            // } else {
            //     alert("Your Password is Incorrect!")
            // }
        },
        error: function(object, error) {
            errorAlert("Error: " + error.code + " " + error.message);
        }
        
    });

}

$("#editSave").click(function(e){
  (function(global) {
      id =  global.localStorage.getItem("id");
      seva =  global.localStorage.getItem("seva");
  }(window));

  var tester = Parse.Object.extend(DB);
  var query = new Parse.Query(tester);

  var values = $("#editPort").serializeArray();
  // console.log(values);

  // console.log(id);

  event.preventDefault();

  query.get(id, {
      success: function(details) {
          for (var prop in values) {
            var lookup = values[prop].name;
            // console.log(lookup);

            name =  lookup;
            value = values[prop].value;

            details.set(name, value);           

          };
          
          details.save(null, {
            success: function(details) {
              console.log("success" + name);
              window.location= "portfolio.html";
            },
            error: function(details, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              errorAlert('Failed to update balak Portfolio: ' + error.message);
            }
          });          

      },
      error: function(object, error) {
          errorAlert("Error: " + error.code + " " + error.message);
      }

  });

  // loadPortfolio();

});

$(".back").click(function(e){
  e.preventDefault();
  window.location= "portfolioList.html";

});

$("#show_login").click(function(){
    showpopup();
});

$("#close_login").click(function(){
  hidepopup();
});

function showpopup()
{
   $("#loginform").fadeIn();
   $("#loginform").css({"visibility":"visible","display":"block"});
}

function hidepopup()
{
   $("#loginform").fadeOut();
   $("#loginform").css({"visibility":"hidden","display":"none"});
}