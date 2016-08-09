


Parse.initialize("0Fb9B6wZHGmpjRTJUoRvyFSGQl2lTOhbYNnvazTv", "gHDjSNQtKWNaFlquz6QCvBWiIJHVQ3CqEezuS22r");
Parse.serverURL = 'https://parseapi.back4app.com';

// Parse.User.enableRevocableSession();
var DB = "BST2016";
var centers;
var region;

function regionClick(id){


    if(id == "southeast") {
        region = "SE_BST_2016";
    } else if (id == "northeast") {
        region = "NE_BST_2016";
    } else if (id == "midwest") {
        region = "MW_BST_2016";
    } else if (id == "southwest") {
        region = "SW_BST_2016";
    } else if (id == "west") {
        region = "West_BST_2016";
    } else if (id == "canada") {
        region = "Canada_BST_2016";
    }
  
    var cent = document.getElementById("loginform");
    cent.classList.remove('hide');

    var regionShow = document.getElementById("region");
    regionShow.classList.add('hide');;

    (function(global) {
      global.localStorage.setItem("DB", DB);
      global.localStorage.setItem("region", region);
    }(window));

};


$(".login").click(function(e){



    // get values for next page
    var values = $(this).parent().serializeArray();
    // console.log(values);

    var email;
    var password;
    var name;
    for (var prop in values) {
        // console.log(values[prop].name);
        // console.log(values[prop].value);

        if (values[prop].name=== "user") {
            name = values[prop].value;
        } else if (values[prop].name=== "email") {
            name = values[prop].value;
        } else if (values[prop].name=== "pass") {
            password = values[prop].value;
        };

    };


    Parse.User.logIn(name, password, {
      success: function(user) {
        // Do stuff after successful login.
        // console.log(user.get('centers'));
        centers = user.get('centers');
        // console.log(JSON.stringify(centers));
        var seva = user.get('seva');
        
        (function(global) {
            global.localStorage.setItem("centers", JSON.stringify(centers));
            global.localStorage.setItem("seva", seva);
        }(window));


        e.preventDefault();
        window.location="pages/menu.html";
        
        // if(seva === "Grader1" || seva === "Grader2" || seva === "Grader3" ) {
        //     e.preventDefault();
        //     window.location="pages/balaks.html";
        // } else if(seva === "P.Sant") {
        //     e.preventDefault();
        //     window.location="pages/recom.html";
        // }
        


        // alert("centers: " + centers);
        // console.log(centers);

      },
      error: function(user, error) {
        // The login failed. Check error to see why.

        handleParseError(error);
        errorAlert("Error: " + error.code + " " + error.message);
      }

    });
    

      e.preventDefault();

})

function handleParseError(err) {
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      Parse.User.logOut();
      window.location="index.html";
      break;
  }
}




$(".forgot").click(function(event){

    var email = prompt("Please enter your email!");

    event.preventDefault();

    Parse.User.requestPasswordReset(email, {
      success: function() {
      // Password reset request was sent successfully
        alert("Password Reset Email has been sent.")
      },
      error: function(error) {
        // Show the error message somewhere
        errorAlert("Error: " + error.code + " " + error.message);
      }
    });

})

