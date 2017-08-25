//*********************************************************************
//This file encapsules interfaces for database given
//  1.list: list all objectid's
//  2.load: get the content of one objectid
//  3.addData(): write / overwrite the objectid with the new contents
//  4.delete: an objectid and its associated contents
//  5.
//*********************************************************************

function addUser(userName,passWord){
  var newUser=JSON.stringify({"username":userName,"password":passWord,"nickname":userName,"signature":"Please input your signature","headpic":null,"myTopics":[{topicId:"1"},{topicId:"2"}],"myPosts":[{postId:"1"},{postId:"2"}]});

  $.ajax({
    type: "POST",
    url: "http://introtoapps.com/datastore.php",
    data: {
      action: "append",
      appid: "216036612" ,
      objectid: "users",
      data: newUser
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}



function followTopic(currentUser,topicid){
  var dataChanged;
  $.ajax({
    type: "GET",
    url: "http://introtoapps.com/datastore.php",
    data: {
      action: "load",
      appid: "216036612" ,
      objectid: "users",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      var newMyTopics = null;
      for(var i=0; i < data.length; i++){
        if(data[i].username == currentUser.username){
            data[i].myTopics.push({"topicId":""+topicid+""});
        }
      }
      dataChanged = JSON.stringify(data);
    },
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });

  $.ajax({
    type: "POST",
    url: "http://introtoapps.com/datastore.php",
    data: {
      action: "save",
      appid: "216036612" ,
      objectid: "users",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}


function getUser(username){
  var currentUser;
  $.ajax({
    type: "GET",
    url: "http://introtoapps.com/datastore.php",
    data: {
      action: "load",
      appid: "216036612" ,
      objectid: "users",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].username == username){
          currentUser = data[i];
        }
      }
    },
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
  return currentUser;
}
