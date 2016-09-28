


Parse.initialize("0Fb9B6wZHGmpjRTJUoRvyFSGQl2lTOhbYNnvazTv", "gHDjSNQtKWNaFlquz6QCvBWiIJHVQ3CqEezuS22r");
Parse.serverURL = 'https://parseapi.back4app.com';

var DB = "SEEBSTDB";



$(".register").click(function(e){



    // get values for next page
    var values = $(this).parent().serializeArray();
    console.log(values);

    var centers =[];
    // var password;
    // var username;
    // var email;
    // var seva;
    // var name;
    for (var prop in values) {
        console.log(values[prop].name);
        console.log(values[prop].value);

        if(values[prop].name.indexOf("center") >= 0) {
            console.log(values[prop].value);
            centers.push(values[prop].value);
        };

        // if(values[prop].name=== "center") {
        //     console.log(values[prop].value);
        //     centers.push(values[prop].value);
        // } ;

        // else if (values[prop].name=== "email") {
        //     username = values[prop].value;
        //     email = values[prop].value;
        // } else if (values[prop].name=== "password") {
        //     password = values[prop].value;
        // } else if (values[prop].name=== "seva") {
        //     seva = values[prop].value;
        // } else if (values[prop].name ==="name") {
        //     name = values[prop].value;
        // };

    };

    console.log(centers);

    e.preventDefault();

    

    var user = Parse.User.current();
    console.log(user);
    // user.set("username", username);
    // user.set("email", email);
    // user.set("password", password);
    // user.set("seva", seva);
    // user.set("name", name);

    // other fields can be set just like with Parse.Object
    user.set("centers", centers);

    (function(global) {
            global.localStorage.setItem("centers", JSON.stringify(centers));
        }(window));

    user.save(null, {
        success: function(user) {
        // Hooray! Let them use the app now.
        window.location="menu.html";
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        handleParseError(error);
        errorAlert("Error: " + error.code + " " + error.message);
      }


    });

    // user.signUp(null, {
    //   success: function(user) {
    //     // Hooray! Let them use the app now.
    //     window.location="../index.html";
    //   },
    //   error: function(user, error) {
    //     // Show the error message somewhere and let the user try again.
    //     handleParseError(error);
    //     alert("Error: " + error.code + " " + error.message);
    //   }
    // });
})

function handleParseError(err) {
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      Parse.User.logOut();
      window.location="index.html";
      break;
  }
}


$(".home").click(function(e){
    e.preventDefault();
    window.location="balaks.html";

})