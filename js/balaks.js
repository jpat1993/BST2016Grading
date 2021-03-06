

Parse.initialize("0Fb9B6wZHGmpjRTJUoRvyFSGQl2lTOhbYNnvazTv", "gHDjSNQtKWNaFlquz6QCvBWiIJHVQ3CqEezuS22r");
Parse.serverURL = 'https://parseapi.back4app.com';



var DB = "BST2016";
var centers;
var seva;
var region;

function changeCenter(){
    window.location= "centers.html";

}

function updateDB(){

    var searcher = Parse.Object.extend(DB);
    var query = new Parse.Query(searcher);

    query.equalTo("FINALSUBMIT", true);
    query.limit(1000);

    query.find({
        success: function(results) {
            // console.log(results);
            updateResults(results);

        },
        error: function(error) {
            errorAlert("Error: " + error.code + " " + error.message);
        }
    });

}


function updateResults(results) {

    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    for (var i = 0; i < results.length; i++) {
        var object = results[i];

        query.get(object.id, {
          success: function(details) {
              // SAVE Final values in DB - PArse

              var BA = parseInt(details.get('bs1'),10) + parseInt(details.get('bs2'),10);
              var SM = parseInt(details.get('sm'), 10);
              var NA = (parseInt(details.get('NAsum'), 10)) /75 * 100;

              if(details.get('se2') === "x") {
                  var SE = parseInt(details.get('se1'), 10);
              } else {
                  var SE = (parseInt(details.get('se1'), 10) + parseInt(details.get('se2'),10)) / 2 ;
              }
              
              var Rec = parseInt(details.get('recom'), 10);

              var score = (BA/10) * 16 + (SM/25) * 20 + ((NA/4)/25) * 20 + (SE/30) * 24 + (Rec/25) * 20;

              var BalSabha = "BalSabha";
              var SabhaMukpath = "SabhaMukpath";
              var SatsangExam = "SatsangExam";
              var NiyamAssess = "NiyamAssess";
              var SantRec = "SantRec";
              var TotalScore = "TotalScore";

              details.set(BalSabha,BA);
              details.set(SabhaMukpath,SM);
              details.set(SatsangExam,SE);
              details.set(NiyamAssess,NA);
              details.set(SantRec,Rec);
              details.set(TotalScore, score);

              details.save(null, {
                success: function(details) {
                  console.log("success" + name);
                  // alert("Your Recommendation has been submitted.");
                  window.location= "balaks.html";
                },
                error: function(details, error) {
                  // Execute any logic that should take place if the save fails.
                  // error is a Parse.Error with an error code and message.
                  errorAlert('Failed to add Final Score to Database - Update DB' + error.message);
                }
              });
          },
          error: function(object, error) {
              errorAlert("Error: " + error.code + " " + error.message);
          }

      });


    }

    successAlert('Database has been Updated!');

}



function cleanDB(){

    var searcher = Parse.Object.extend(DB);
    var query = new Parse.Query(searcher);

    query.equalTo("firstname", undefined);
    query.limit(1000);

    query.find({
        success: function(results) {
            // console.log(results);
            var length = results.length;
            cleanResults(results,length);

        },
        error: function(error) {
            errorAlert("Error: " + error.code + " " + error.message);
        }
    });

}


function cleanResults(results, length) {

    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    for (var i = 0; i < results.length; i++) {
        var object = results[i];

        query.get(object.id, {
          success: function(details) {
              //Delete in Parse
            // console.log(details.get('firstname'));

            details.destroy({
              success: function(details) {
                // The object was deleted from the Parse Cloud.
                // console.log('FOUND INVALID: ');
              },
              error: function(details, error) {
                // The delete failed.
                // error is a Parse.Error with an error code and message.
                errorAlert('Failed to Delete undefined balak - Update DB' + error.message);
              }
            });
               
              
                       

          },
          error: function(object, error) {
              errorAlert("Error: " + error.code + " " + error.message);
          }

      });


    }

    successAlert(length +' Bad Entries have been deleted. Database has been Cleaned!' );

}


function download(){

    var searcher = Parse.Object.extend(DB);
    var query = new Parse.Query(searcher);

    query.equalTo("submitted", true);
    // query.ascending("bkid, firstname");
    query.descending("profPic");

    var regionParse= '';
    if(region == "SE_BST_2016") {
        regionParse = 'SEcenter';
        query.notEqualTo("SEcenter", "Select an Option");
        query.ascending("SEcenter, firstname");
    } else if (region == "NE_BST_2016") {
        regionParse = 'NEcenter';
        query.notEqualTo("NEcenter", "Select an Option");
        query.ascending("NEcenter, firstname");
    } else if (region == "MW_BST_2016") {
        regionParse = 'MWcenter';
        query.notEqualTo("MWcenter", "Select an Option");
        query.ascending("MWcenter, firstname");
    } else if (region == "SW_BST_2016") {
        regionParse = 'SWcenter';
        query.notEqualTo("SWcenter", "Select an Option");
        query.ascending("SWcenter, firstname");
    } else if (region == "West_BST_2016") {
        regionParse = 'Wcenter';
        query.notEqualTo("Wcenter", "Select an Option");
        query.ascending("Wcenter, firstname");
    } else if (region == "Canada_BST_2016") {
        regionParse = 'Canadacenter';
        query.notEqualTo("Canadacenter", "Select an Option");
        query.ascending("Canadacenter, firstname");
    } else {
        regionParse = 'NEcenter';
        query.notEqualTo("NEcenter", "Select an Option");
        query.ascending("NEcenter, firstname");
    }
    

    query.limit(1000);

    query.find({
        success: function(results) {
            // console.log(results);


            var parsedData = results.map(function(a) {
                var keys = [a.attributes.bkid, a.attributes[regionParse], a.attributes.firstname, a.attributes.middlename, a.attributes.lastname, 
                a.attributes.birthday, a.attributes.grade, a.attributes.address, a.attributes.city, a.attributes.state, 
                a.attributes.zip, a.attributes.homephone, a.attributes.cell, a.attributes.email, a.attributes.father, a.attributes.fatherPhone, 
                a.attributes.fatherEmail, a.attributes.mother, a.attributes.motherPhone, a.attributes.motherEmail, a.attributes.BalSabha,
                a.attributes.SabhaMukpath, a.attributes.SatsangExam, a.attributes.NiyamAssess, a.attributes.SantRec, a.attributes.TotalScore];

                return keys;});

            downloadCSV({data:parsedData});

        },
        error: function(error) {
            errorAlert("Error: " + error.code + " " + error.message);
        }
    });

}

// function csv(results) {

//     // var csv = results.map(function(d){
//     //     return JSON.stringify(d);
//     // })
//     // .join('\n') 
//     // .replace(/(^\[)|(\]$)/mg, '');

//     var csvContent = "data:text/csv;charset=utf-8,";
//     console.log(results);
//     console.log(results[0].name);
//     results.forEach(function(infoArray, index){

//        dataString = infoArray.join(",");
//        csvContent += index < results.length ? dataString+ "\n" : dataString;

//     });

//     var encodedUri = encodeURI(csv);
//     var link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "my_data.csv");
//     document.body.appendChild(link); // Required for FF

//     link.click();

// }

function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    var jsonData = JSON.stringify(args.data);
    // console.log(jsonData);

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    var result = Papa.unparse({
        fields: ['BKID', 'Center', 'First Name', 'Middle Name', 'Last Name','Birthday', 'Grade', 'Address', 'City', 'State', 
                'Zip', 'Homephone', 'Cell', 'Email', 'Father', 'Father Phone', 'Father Email', 'Mother', 'Mother Phone', 'Mother Email',
                'Bal Sabha Score', 'Sabha Mukhpath Score', 'Satsang Exam Score', 'Niyam Assessment Score', 'Sant Recommendation Score', 'Total Score'], 
        data: jsonData

        });

    // columnDelimiter = args.columnDelimiter || ',';
    // lineDelimiter = args.lineDelimiter || '\n';

    // // console.log(Object.keys(data[0]));
    // // console.log(Object.keys(data[0].attributes));
    // keys = Object.keys(data[0].attributes);

    // result = '';
    // result += keys.join(columnDelimiter);
    // result += lineDelimiter;

    // // var count =0;
    // data.forEach(function(item) {
    //     ctr = 0;
    //     keys.forEach(function(key) {
    //         if (ctr > 0) result += columnDelimiter;
    //         // console.log(item.attributes[key]);
    //         var str = String(item.attributes[key]);
    //         var str2 = replaceAll(str,","," /comma/ ");
    //         var str3 = replaceAll(str2,"\r\n"," /newLine/ ");
    //         var res = replaceAll(str3,"\n"," /newLine/ ");
    //         result += res;
    //         ctr++;
    //     });
    //     // count++;
    //     result += lineDelimiter;
    // });
    // console.log(count);

    return result;
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function downloadCSV(args) {
    var data, filename, link;

    var csv = convertArrayOfObjectsToCSV({
        data: args.data,

    });
    if (csv == null) return;

    filename = 'export.csv';

    // if (!csv.match(/^data:text\/csv/i)) {
    //     csv = 'data:text/csv;charset=utf-8,' + csv;
    // }

    var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    //IE11 & Edge
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvData, filename);
    } else {
        //In FF link must be added to DOM to be clicked
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(csvData);
        link.setAttribute('download', filename);
        document.body.appendChild(link);    
        link.click();
        document.body.removeChild(link);    
    }

    // data = encodeURI(csv);

    // link = document.createElement('a');
    // link.setAttribute('href', data);
    // link.setAttribute('download', filename);
    // link.click();
}


function loadBalaks(){

    (function(global) {
        centers =  global.localStorage.getItem("centers");
        seva =  global.localStorage.getItem("seva");
        region = global.localStorage.getItem("region");
    }(window));

    var test = JSON.parse(centers);

    // console.log(test);


    var div = document.getElementById("searchResults");
    // if (seva ==="RC") {
        var header = document.getElementById("header");
        var elem = document.createElement("b");
        elem.innerHTML = "Click on the white boxes to the left to enter grading information for the selected balak.";
        elem.style.fontSize = "20px"
        header.appendChild(elem);
    // }

    // for(var input in test) {
        var searcher = Parse.Object.extend(DB);
        var query = new Parse.Query(searcher);

        // query.startsWith("center", test[input]);

        if(region == "SE_BST_2016") {
            query.containedIn("SEcenter", test);
            query.ascending("SEcenter, firstname");
        } else if (region == "NE_BST_2016") {
            query.containedIn("NEcenter", test);
            query.ascending("NEcenter, firstname");
        } else if (region == "MW_BST_2016") {
            query.containedIn("MWcenter", test);
            query.ascending("MWcenter, firstname");
        } else if (region == "SW_BST_2016") {
            query.containedIn("SWcenter", test);
            query.ascending("SWcenter, firstname");
        } else if (region == "West_BST_2016") {
            query.containedIn("Wcenter", test);
            query.ascending("Wcenter, firstname");
        } else if (region == "Canada_BST_2016") {
            query.containedIn("Canadacenter", test);
            query.ascending("Canadacenter, firstname");
        } else {
            query.containedIn("NEcenter", test);
            query.ascending("NEcenter, firstname");
        }


        query.limit(1000);

        // query.containedIn("center", test);
        // event.preventDefault();
        query.find({
            success: function(results) {

                layout(results);

                // if((seva ==="Grader1" || seva === "Grader2" || seva === "Grader3") && results.length > 0) {
                //     essayLayout(results);
                // } else if ((seva === "Sant") && results.length > 0) {
                //     recomLayout(results);
                // } else if ((seva === "RC") && results.length > 0 ){
                //     rcLayout(results);
                // }

            },
            error: function(error) {
                errorAlert("Error: " + error.code + " " + error.message);
            }
        });

    // }
    
    


}



function layout(results) {


    var div = document.getElementById("searchResults");
    // console.log(seva);

    for (var i = 0; i < results.length; i++) {
        var object = results[i];
      // alert(object.id + ' - ' + object.get('email') + "name" : object.get('name'));

        var myDiv = document.createElement("div");
        myDiv.setAttribute("class", 'balakRow');

        if(region == "SE_BST_2016") {
            var t = document.createTextNode(object.get('bkid') + ' : ' + object.get('SEcenter') + ' - ' + object.get('firstname') + ' ' + object.get('lastname'));
        } else if (region == "NE_BST_2016") {
            var t = document.createTextNode(object.get('bkid') + ' : ' + object.get('NEcenter') + ' - ' + object.get('firstname') + ' ' + object.get('lastname'));
        } else if (region == "MW_BST_2016") {
            var t = document.createTextNode(object.get('bkid') + ' : ' + object.get('MWcenter') + ' - ' + object.get('firstname') + ' ' + object.get('lastname'));
        } else if (region == "SW_BST_2016") {
            var t = document.createTextNode(object.get('bkid') + ' : ' + object.get('SWcenter') + ' - ' + object.get('firstname') + ' ' + object.get('lastname'));
        } else if (region == "West_BST_2016") {
            var t = document.createTextNode(object.get('bkid') + ' : ' + object.get('Wcenter') + ' - ' + object.get('firstname') + ' ' + object.get('lastname'));
        } else if (region == "Canada_BST_2016") {
            var t = document.createTextNode(object.get('bkid') + ' : ' + object.get('Canadacenter') + ' - ' + object.get('firstname') + ' ' + object.get('lastname'));
        } else {
            var t = document.createTextNode(object.get('bkid') + ' : ' + object.get('NEcenter') + ' - ' + object.get('firstname') + ' ' + object.get('lastname'));
        }


        // var t = document.createTextNode(object.get('bkid') + ' : ' + object.get('center') + ' - ' + object.get('firstname') + ' ' + object.get('lastname'));

        var box = document.createElement("button");

        box.setAttribute("id", object.id);

        if(seva ==="RC") {
            box.setAttribute('onclick','rc(id);');
        } else {
            box.setAttribute('onclick','sant(id);');
        }
        
        box.setAttribute('class', 'btn btn-default medium');
        box.setAttribute("style","text-align: center", "margin = '50px auto'");



        //~~~~~~~~~~~~~~~~For Bal Activities Total~~~~~~~~~~~~~~~~~~~~~

        var block = document.createElement("div");
        block.setAttribute("class", "form-group");


        var check = document.createElement('input');
        check.type = 'text';
        check.id = 'balSabha';
        check.disabled = true;
/*        check.setAttribute("onclick", "return false");
*/
        var checker = "balSabhaCheck";
        if (object.get(checker) === true) {
            var bstotal = parseInt(object.get('bs1'),10) + parseInt(object.get('bs2'),10);
            check.value = bstotal;
            check.style.background = "#68e466";   
        } else {
            check.style.background = "#ff8181";
            check.value = "N/A";
        }

        var newlabel = document.createElement("label");
        newlabel.setAttribute("for","balSabha");
        newlabel.setAttribute("style","color:#6F84FF");
        newlabel.innerHTML = "Bal Sabha";


        block.appendChild(newlabel);
        block.appendChild(check);


        //~~~~~~~~~~~~~~~~BAL Activities END~~~~~~~~~~~~~~~~~~~~~



        //~~~~~~~~~~~~~~~~For Sabha Mukhpath Total~~~~~~~~~~~~~~~~~~~~~

        var block2 = document.createElement("div");
        block2.setAttribute("class", "form-group");


        var check2 = document.createElement('input');
        check2.type = 'text';
        check2.id = 'sabhaMukh';
        check2.disabled = true;
/*        check.setAttribute("onclick", "return false");
*/
        var checker2 = "sabhaMukhCheck";
        if (object.get(checker2) === true) {
            check2.value = object.get('sm');
            check2.style.background = "#68e466";   
        } else {
            check2.style.background = "#ff8181";
            check2.value = "N/A";
        }

        var newlabel2 = document.createElement("label");
        newlabel2.setAttribute("for","sabhaMukh");
        newlabel2.setAttribute("style","color:#6F84FF");
        newlabel2.innerHTML = "Sabha Mukhpath";


        block2.appendChild(newlabel2);
        block2.appendChild(check2);


        //~~~~~~~~~~~~~~~~ Sabha Mukhpath END~~~~~~~~~~~~~~~~~~~~~~~~


        //~~~~~~~~~~~~~~~~For Satsang Exam Total~~~~~~~~~~~~~~~~~~~~~

        var block4 = document.createElement("div");
        block4.setAttribute("class", "form-group");


        var check4 = document.createElement('input');
        check4.type = 'text';
        check4.id = 'satsangExam';
        check4.disabled = true;
/*        check.setAttribute("onclick", "return false");
*/
        var checker4 = "satsangExamCheck";
        var se2check = "satsangExamCheck2"
        if (object.get(checker4) === true && object.get(se2check) === true) {

            if(object.get('se2') === "x") {

                check4.value = parseInt(object.get('se1'),10);
            } else {
                check4.value = (parseInt(object.get('se1'),10) +parseInt(object.get('se2'),10)) / 2 ;
            }

            check4.style.background = "#68e466";   
        } else {
            check4.style.background = "#ff8181";
            check4.value = "N/A";
        }

        var newlabel4 = document.createElement("label");
        newlabel4.setAttribute("for","sabhaMukh");
        newlabel4.setAttribute("style","color:#6F84FF");
        newlabel4.innerHTML = "Satsang Exam";


        block4.appendChild(newlabel4);
        block4.appendChild(check4);


        //~~~~~~~~~~~~~~~~ Satsang Exam END~~~~~~~~~~~~~~~~~~~~~




        //~~~~~~~~~~~~~~~~For Niyam Assessment Total~~~~~~~~~~~~~~~~~~~~~

        var block3 = document.createElement("div");
        block3.setAttribute("class", "form-group");


        var check3 = document.createElement('input');
        check3.type = 'text';
        check3.id = 'niyamAssess';
        check3.disabled = true;
/*        check.setAttribute("onclick", "return false");
*/

        // check3.value = object.get('NAsum');
        // check3.style.background = "#68e466";

        if (object.get('NAsum') !== undefined) {
            check3.value = (object.get('NAsum')/75 * 100) + "%";
            check3.style.background = "#68e466";   
        } else {
            check3.style.background = "#ff8181";
            check3.value = "N/A";
        }

        var newlabel3 = document.createElement("label");
        newlabel3.setAttribute("for","niyamAssess");
        newlabel3.setAttribute("style","color:#6F84FF");
        newlabel3.innerHTML = "Niyam Assessment";


        block3.appendChild(newlabel3);
        block3.appendChild(check3);


        //~~~~~~~~~~~~~~~~ Niyam Assessment  END~~~~~~~~~~~~~~~~~~~~~





        //~~~~~~~~~~~~~~~~For Sant REc Total~~~~~~~~~~~~~~~~~~~~~

        var block5 = document.createElement("div");
        block5.setAttribute("class", "form-group");


        var check5 = document.createElement('input');
        check5.type = 'text';
        check5.id = 'santRec';
        check5.disabled = true;
/*        check.setAttribute("onclick", "return false");
*/
        var checker5 = "santRecCheck";
        if (object.get(checker5) === true) {
            check5.value = object.get('recom');
            check5.style.background = "#68e466";   
        } else {
            check5.style.background = "#ff8181";
            check5.value = "N/A";
        }

        var newlabel5 = document.createElement("label");
        newlabel5.setAttribute("for","sabhaMukh");
        newlabel5.setAttribute("style","color:#6F84FF");
        newlabel5.innerHTML = "P. Sant Recommendation";


        block5.appendChild(newlabel5);
        block5.appendChild(check5);


        //~~~~~~~~~~~~~~~~ Sant REc END~~~~~~~~~~~~~~~~~~~~~


        //~~~~~~~~~~~~~~~~For Total Score~~~~~~~~~~~~~~~~~~~~~

        var block6 = document.createElement("div");
        block6.setAttribute("class", "form-group");


        var check6 = document.createElement('input');
        check6.type = 'text';
        check6.id = 'totalScore';
        check6.disabled = true;
/*        check.setAttribute("onclick", "return false");
*/
        // var checker6 = "santRecCheck";
        // if (object.get(checker5) === true) {
        //     check5.value = object.get('Santrecom');
        //     check5.style.background = "#68e466";   
        // } else {
        //     check5.style.background = "#ff8181";
        //     check5.value = "N/A";
        // }

        

        var BA = parseInt(object.get('bs1'),10) + parseInt(object.get('bs2'),10);
        var SM = parseInt(object.get('sm'), 10);
        var NA = (parseInt(object.get('NAsum'), 10)) /75 * 100;

        if(object.get('se2') === "x") {
            var SE = parseInt(object.get('se1'), 10);
        } else {
            var SE = (parseInt(object.get('se1'), 10) + parseInt(object.get('se2'),10)) / 2 ;
        }
        
        var Rec = parseInt(object.get('recom'), 10);

        var score = (BA/10) * 16 + (SM/25) * 20 + ((NA/4)/25) * 20 + (SE/30) * 24 + (Rec/25) * 20;

        check6.value = score;
        check6.style.background = "#6578d6";   

        var newlabel6 = document.createElement("label");
        newlabel6.setAttribute("for","totalScore");
        newlabel6.setAttribute("style","color:#6F84FF");
        newlabel6.innerHTML = "Total";


        block6.appendChild(newlabel6);
        block6.appendChild(check6);


        //~~~~~~~~~~~~~~~~ Total Score END~~~~~~~~~~~~~~~~~~~~~



        // // for RC Recom check box
        // var check4 = document.createElement('input');
        // check4.type = 'checkbox';
        // check4.id = 'RCrecomDone';
        // // check.disabled = true;
        // check4.setAttribute("onclick", "return false");

        // var checker4 = seva + "RCrecomcheck";
        // if (object.get(checker4) === true) {
        //     check4.checked = true;   
        // } else {
        //     check4.checked = false;
        // }

        // var newlabel4 = document.createElement("label");
        // newlabel4.setAttribute("for","RCrecomDone");
        // newlabel4.setAttribute("style","color:#6F84FF");
        // newlabel4.innerHTML = "RC Recommendation";


        // // for niyam check box
        // var check2 = document.createElement('input');
        // check2.type = 'checkbox';
        // check2.id = 'niyamDone';
        // // check2.disabled = true;
        // check.setAttribute("onclick", "return false");

        // var checker2 = seva + "niyamcheck";
        // if (object.get(checker2) === true) {
        //     check2.checked = true;   
        // } else {
        //     check2.checked = false;
        // }

        // var newlabel2 = document.createElement("label");
        // newlabel2.setAttribute("for","niyamDone");
        // newlabel2.setAttribute("style","color:#6F84FF");
        // newlabel2.innerHTML = "Niyam";

        //  // for Bal Activity check box
        // var check3 = document.createElement('input');
        // check3.type = 'checkbox';
        // check3.id = 'balactDone';
        // // check3.disabled = true;
        // check.setAttribute("onclick", "return false");

        // var checker3 = seva + "balactcheck";
        // if (object.get(checker3) === true) {
        //     check3.checked = true;   
        // } else {
        //     check3.checked = false;
        // }

        // var newlabel3 = document.createElement("label");
        // newlabel3.setAttribute("for","balactDone");
        // newlabel3.setAttribute("style","color:#6F84FF");
        // newlabel3.innerHTML = "Bal Activity";


        box.appendChild(t);
        myDiv.appendChild(box);
        myDiv.appendChild(block);
        myDiv.appendChild(block2);
        
        myDiv.appendChild(block4);

        myDiv.appendChild(block3);

        myDiv.appendChild(block5);
        myDiv.appendChild(block6);
        // myDiv.appendChild(check);
        // myDiv.appendChild(check4);
        // myDiv.appendChild(newlabel4);
        // myDiv.appendChild(check2);
        // myDiv.appendChild(newlabel2);
        // myDiv.appendChild(check3);
        // myDiv.appendChild(newlabel3);


        div.appendChild(myDiv);

      //   // ADD DATA TO DB
      //   var tester = Parse.Object.extend(DB);
      //   var query = new Parse.Query(tester);

      //   var BalSabha,SabhaMukpath,SatsangExam, NiyamAssess, SantRec, TotalScore;

      //   query.get(object.id, {
      //     success: function(details) {
                           
      //         details.set(BalSabha,BA);
      //         details.set(SabhaMukpath,SM);
      //         details.set(SatsangExam,SE);
      //         details.set(NiyamAssess,NA);
      //         details.set(SantRec,Rec);
      //         details.set(TotalScore, score);


      //         details.save(null, {
      //           success: function(details) {
      //             console.log("success" + name);
      //             // alert("Your Recommendation has been submitted.");
      //             // window.location= "balaks.html";
      //           },
      //           error: function(details, error) {
      //             // Execute any logic that should take place if the save fails.
      //             // error is a Parse.Error with an error code and message.
      //             errorAlert('Failed to add Final Score to Database: ' + error.message);
      //           }
      //         });          

      //     },
      //     error: function(object, error) {
      //         errorAlert("Error: " + error.code + " " + error.message);
      //     }

      // });


        

    }
}

function rc(id) {
    (function(global) {
        global.localStorage.setItem("id", id);
    }(window));

    window.location="rc.html";
}


function sant(id) {
    (function(global) {
        global.localStorage.setItem("id", id);
    }(window));

    window.location="recom.html";
}




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~OLD STUFF~~~~~~~~~~~~~~~~~~~~~~~~~//


// function essayLayout(results) {
//     var div = document.getElementById("searchResults");

//     for (var i = 0; i < results.length; i++) {
//         var object = results[i];
//       // alert(object.id + ' - ' + object.get('email') + "name" : object.get('name'));

//         var myDiv = document.createElement("div");

//         var t = document.createTextNode(object.get('center') + ' - ' + "\n Name : " + object.get('firstname'));

//         var essay = document.createElement("button");

//         essay.setAttribute("id", object.id);
//         essay.innerHTML= 'Grade Essay';
//         essay.setAttribute('onclick','essay(id);');
//         essay.setAttribute('class', 'btn btn-default small');
//         essay.setAttribute("style","text-align: center", "margin = '50px auto'");
        
//         var check = document.createElement('input');
//         check.type = 'checkbox';
//         check.id = 'gradedEssay';
//         // check.disabled = true;
//         check.setAttribute("onclick", "return false");

//         var checker = seva + "essaycheck";
//         if (object.get(checker) === true) {
//             check.checked = true;   
//         } else {
//             check.checked = false;
//         }

//         var newlabel = document.createElement("label");
//         newlabel.setAttribute("for","gradedEssay");
//         newlabel.setAttribute("style","color:#6F84FF");
//         newlabel.innerHTML = "Essay Graded";


//         myDiv.appendChild(t);
//         myDiv.appendChild(essay);
//         myDiv.appendChild(check);
//         myDiv.appendChild(newlabel);

//         div.appendChild(myDiv);

//     }
// }

// function essay(id) {
//     (function(global) {
//             global.localStorage.setItem("id", id);
//     }(window));

//     window.location="essay.html";
// }

// function recomLayout(results) {
//     var div = document.getElementById("searchResults");

//     for (var i = 0; i < results.length; i++) {
//         var object = results[i];
//       // alert(object.id + ' - ' + object.get('email') + "name" : object.get('name'));

//         var myDiv = document.createElement("div");

//         var t = document.createTextNode(object.get('center') + ' - ' + "\n Name : " + object.get('firstname'));

//         // var centersend = object.get('center');
//         // var namesend = object.get('name');

//         var recom = document.createElement("button");

//         recom.setAttribute("id", object.id);
//         recom.innerHTML= 'Enter Recommendation';
//         recom.setAttribute('onclick','recom(id);');
//         recom.setAttribute('class', 'btn btn-default medium');
//         recom.setAttribute("style","text-align: center", "margin = '50px auto'");


//         var check = document.createElement('input');
//         check.type = 'checkbox';
//         check.id = 'recomDone';
//         // check.disabled = true;
//         check.setAttribute("onclick", "return false");

//         var checker = seva + "recomcheck";
//         if (object.get(checker) === true) {
//             check.checked = true;   
//         } else {
//             check.checked = false;
//         }

//         var newlabel = document.createElement("label");
//         newlabel.setAttribute("for","recomDone");
//         newlabel.setAttribute("style","color:#6F84FF");
//         newlabel.innerHTML = "Recommendation Complete";


//         myDiv.appendChild(t);
//         myDiv.appendChild(recom);
//         myDiv.appendChild(check);
//         myDiv.appendChild(newlabel);

//         div.appendChild(myDiv);

//     }
// }

// function recom(id) {
//     (function(global) {
//         global.localStorage.setItem("id", id);
//     }(window));

//     window.location="recom.html";
// }