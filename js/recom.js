Parse.initialize("1dlfQyT8N0OrUJXzRWk9gtWz3fXHYNgKnZNOhWyY", "OTs8JFyPYJ3yrm03qc1jgY9NGCFJBXqsxsNCKT8E");


var DB = "SEEBSTDB";
var id;
var name;
var getter;

function loadRecom() {

    (function(global) {
        id =  global.localStorage.getItem("id");
        seva =  global.localStorage.getItem("seva");
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
        var t = document.createTextNode(name);
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
          alert("Error: " + error.code + " " + error.message);
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

                  name = seva + lookup;
                  value = values[prop].value;
                  details.set(name, value);
                  count++;
                  
                }

          };

          if (count !== 2) {
            checker = false;
          }
          check = seva + "recomcheck";
          details.set(check, checker);
          details.save(null, {
            success: function(details) {
              console.log("success" + name);
              // alert("Your Recommendation has been submitted.");
              window.location= "balaks.html";
            },
            error: function(details, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              alert('Failed to add Recommendation, with error code: ' + error.message);
            }
          });          

      },
      error: function(object, error) {
          alert("Error: " + error.code + " " + error.message);
      }

  });


})

$(".back").click(function(e){
  e.preventDefault();
  window.location= "balaks.html";

})