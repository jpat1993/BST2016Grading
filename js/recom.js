Parse.initialize("0Fb9B6wZHGmpjRTJUoRvyFSGQl2lTOhbYNnvazTv", "gHDjSNQtKWNaFlquz6QCvBWiIJHVQ3CqEezuS22r");
Parse.serverURL = 'https://parseapi.back4app.com';



var DB = "BST2016";
var id;
var name;
var getter;
var region;

function loadRecom() {

    (function(global) {
        id =  global.localStorage.getItem("id");
        seva =  global.localStorage.getItem("seva");
        region = global.localStorage.getItem("region");
    }(window));

    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    event.preventDefault();

    var values = $("#recomform").serializeArray();
    console.log(values);
    

    query.get(id, {
      success: function(details) {
        name = details.get('firstname');
        console.log(name);
        var div = document.getElementById("searchResults");

        if(region == "SE_BST_2016") {
            var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('SEcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        } else if (region == "NE_BST_2016") {
            var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('NEcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        } else if (region == "MW_BST_2016") {
            var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('MWcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        } else if (region == "SW_BST_2016") {
            var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('SWcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        } else if (region == "West_BST_2016") {
            var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('Wcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        } else if (region == "Canada_BST_2016") {
            var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('Canadacenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        } else {
            var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('NEcenter') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        }


        // var t = document.createTextNode(details.get('bkid') + ' : ' + details.get('center') + ' - ' + details.get('firstname') + ' ' + details.get('lastname'));
        // var t = document.createTextNode(name);
        div.appendChild(t);

        for (var prop in values) {
          var lookup = values[prop].name;
          console.log(details.get(lookup));
          console.log("#"+lookup);

          getter = seva + lookup;
          $("#"+lookup).val(details.get(getter));

          // details.set(lookup, "poop");
          // details.save();

        };

      },
      error: function(object, error) {
          errorAlert("Error: " + error.code + " " + error.message);
      }
      
    });



    



}


$(".recomsubmit").click(function(){

  (function(global) {
      id =  global.localStorage.getItem("id");
      seva =  global.localStorage.getItem("seva");
  }(window));



  var tester = Parse.Object.extend(DB);
  var query = new Parse.Query(tester);

  var values = $("#recomform").serializeArray();

  console.log(values);

  // check if recomment is filled out
  if(values[0].value == "Select an Option") {
    errorAlert("Please fill out the P.Sant Recommendation Score.");
    return;
  }

  // check if recomment is filled out
  if(values[1].value == "") {
    errorAlert("Please fill out the P.Sant Comment.");
    return;
  }






  console.log(id);

  event.preventDefault();

  var name;
  var value;
  var check;
  query.get(id, {
      success: function(details) {
        var checker = true;
        var count = 0;
          for (var prop in values) {
                var lookup = values[prop].name;
                console.log(lookup);
                console.log("#"+lookup);

                if(lookup === "recomcomment" || lookup === "recom") {

                  console.log(prop);
                  name = lookup;
                  value = values[prop].value;
                  details.set(name, value);
                  count++;
                  
                }

                if (lookup === "recom" && value !== "0") {
                    check = "santRecCheck";
                    details.set(check, true);
                }

          };

          // if (count !== 2) {
          //   checker = false;
          // }
          // check = "santRecCheck";
          // details.set(check, checker);

          details.save(null, {
            success: function(details) {
              console.log("success" + name);
              // alert("Your Recommendation has been submitted.");
              window.location= "balaks.html";
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

$(".back").click(function(e){
  e.preventDefault();
  window.location= "balaks.html";

})