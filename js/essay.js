Parse.initialize("1dlfQyT8N0OrUJXzRWk9gtWz3fXHYNgKnZNOhWyY", "OTs8JFyPYJ3yrm03qc1jgY9NGCFJBXqsxsNCKT8E");

var DB = "SEEBSTDB";
var seva;
var id;

function loadEssay() {

  
    (function(global) {
        id =  global.localStorage.getItem("id");
        seva =  global.localStorage.getItem("seva");
    }(window));

    //add parse
    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    var values = $("#essay").serializeArray();
    console.log(values);

    console.log(id);

    event.preventDefault();

    query.get(id, {
        success: function(details) {
            for (var prop in values) {
                  var lookup = values[prop].name;
                  console.log(details.get(lookup));
                  console.log("#"+lookup);
                  $("#"+lookup).val(details.get(lookup));

                  if(lookup === "essay1grade" || lookup === "essay2grade" ||lookup === "essay3grade"|| lookup === "essay4grade") {
                  name = seva + lookup;
                  $("#"+lookup).val(details.get(name));
                }  
              };

        },
        error: function(object, error) {
            alert("Error: " + error.code + " " + error.message);
        }
        
    });
}

$(".essaysubmit").click(function(){


  (function(global) {
      id =  global.localStorage.getItem("id");
      seva =  global.localStorage.getItem("seva");
  }(window));

  var tester = Parse.Object.extend(DB);
  var query = new Parse.Query(tester);

  var values = $("#essay").serializeArray();
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




                if(lookup === "essay1grade" || lookup === "essay2grade" ||lookup === "essay3grade"|| lookup === "essay4grade") {


                  name = seva + lookup;
                  value = values[prop].value;
                  details.set(name, value);
                  count++
                  
                }

          };
          if (count !== 4) {
            checker =false;
          }
          check = seva + "essaycheck";
          details.set(check,checker);
          details.save(null, {
            success: function(details) {
              console.log("success" + name);
              // alert("Your Essay Grade has been submitted.");
              window.location= "balaks.html";
            },
            error: function(details, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              alert('Failed to add Grade object, with error code: ' + error.message);
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