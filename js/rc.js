Parse.initialize("0Fb9B6wZHGmpjRTJUoRvyFSGQl2lTOhbYNnvazTv", "gHDjSNQtKWNaFlquz6QCvBWiIJHVQ3CqEezuS22r");
Parse.serverURL = 'https://parseapi.back4app.com';



var DB = "BST2016";
var id;
var name;
var getter;
var region;

function loadRc() {

    (function(global) {
        id =  global.localStorage.getItem("id");
        seva =  global.localStorage.getItem("seva");
        region = global.localStorage.getItem("region");
    }(window));

    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    event.preventDefault();

    var values = $("#rcform").serializeArray();
    console.log(values);
    

    query.get(id, {
      success: function(details) {
        // name = details.get('firstname');
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

          getter = lookup;
          $("#"+lookup).val(details.get(getter));

          // details.set(lookup, "poop");
          // details.save();

        };

        // console.log(details.get('sm'));
        // console.log(details.get('se'));
        
        var smInput = details.get('sm');
        var seInput1 = details.get('se1');
        var seInput2 = details.get('se2');

        $('input:radio[name="sm"][value='+ smInput +']').attr('checked', true);
        $('input:radio[name="se1"][value='+ seInput1 +']').attr('checked', true);
        $('input:radio[name="se2"][value='+ seInput2 +']').attr('checked', true);

      },
      error: function(object, error) {
          errorAlert("Error: " + error.code + " " + error.message);
      }
      
    });

}


$(".rcsubmit").click(function(){

  (function(global) {
      id =  global.localStorage.getItem("id");
      seva =  global.localStorage.getItem("seva");
  }(window));

  var tester = Parse.Object.extend(DB);
  var query = new Parse.Query(tester);

  var values = $("#rcform").serializeArray();
  console.log(values);

  console.log(id);

  event.preventDefault();

  var name;
  var value;
  var check;
  var check2;
  var check3;
  var check4;




  query.get(id, {
      success: function(details) {
          var count = 0; // for BAs

          for (var prop in values) {

                var lookup = values[prop].name;
                console.log(lookup);
                console.log("#"+lookup);

                  name =  lookup;
                  value = values[prop].value;

                  details.set(name, value);

                  if (lookup === "bs1" || lookup === "bs2") {
                    count++;
                  } else if (lookup === "sm") {
                    check = "sabhaMukhCheck";
                    details.set(check, true);
                  } else if (lookup === "se1") {
                    check2 = "satsangExamCheck";
                    details.set(check2, true);
                  } else if (lookup === "se2") {
                    check3 = "satsangExamCheck2";
                    details.set(check3, true);
                  }

                  

          };

          if(count === 2) {
            check4 = "balSabhaCheck";
            details.set(check4, true);
          }
          
          
          details.save(null, {
            success: function(details) {
              console.log("success" + name);
              // alert("Your Recommendation has been submitted.");
              window.location= "balaks.html";
            },
            error: function(details, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              errorAlert('Failed to add Recommendation, Niyam, and Bal Activity, with error code: ' + error.message);
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