//*********************************************************************
//This file encapsules interfaces for database given
//  1.list: list all objectid's
//  2.load: get the content of one objectid
//  3.addData(): write / overwrite the objectid with the new contents
//  4.delete: an objectid and its associated contents
//  5.
//*********************************************************************

function userExist(){
  var userExist = false;
  $.ajax({
    type: "GET",
    url: "http://introtoapps.com/datastore.php",
    data: {
      action: "list",
      appid: "216036612" ,
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i = 0; i < data.length ; i ++){
        if(data[i]  = "users"){
          userExist = true;
        }
      }
    },
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
  return userExist;
}

function addUser(userName,passWord){
  var newUser=JSON.stringify({"username":userName,"password":passWord,"nickname":userName,"signature":"Please input your signature","headpic":null,"myTopics":[],"myPosts":[]});

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

function getUsers(){
  var allTopics;
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
      allUsers = data;
    },
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
  return allUsers;
}

function getTopics(){
  var allTopics;
  $.ajax({
    type: "GET",
    url: "http://introtoapps.com/datastore.php",
    data: {
      action: "load",
      appid: "216036612" ,
      objectid: "topics",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      allTopics = data;
    },
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
  return allTopics;
}

function addPost(topicID,postid,posttitle,posttext,postauthor,postdate,postpic){
  var dataChanged;
  $.ajax({
    type: "GET",
    url: "http://introtoapps.com/datastore.php",
    data: {
      action: "load",
      appid: "216036612" ,
      objectid: "topics",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].topicId == topicID){
          data[i].posts.push({"postId":""+postid+"","postTitle":""+posttitle+"","postText":""+posttext+"","postAuthor":""+postauthor+"","postDate":""+postdate+"","postPic":"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg","comments":[]});
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
      objectid: "topics",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}


function addReply(topicID,postID,commenttext,commenauthor,commentDate){
  var dataChanged;
  $.ajax({
    type: "GET",
    url: "http://introtoapps.com/datastore.php",
    data: {
      action: "load",
      appid: "216036612" ,
      objectid: "topics",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].topicId == topicID){
          for(var j=0; j < data[i].posts.length ; j++){
            if(data[i].posts[j].postId == postID){
              data[i].posts[j].comments.push({"commentText":""+commenttext+"","commentAuthor":""+commenauthor+"","commentDate":""+commentDate+""});
            }
          }
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
      objectid: "topics",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}

function deletePost(topicID,postID){
  var dataChanged;
  $.ajax({
    type: "GET",
    url: "http://introtoapps.com/datastore.php",
    data: {
      action: "load",
      appid: "216036612" ,
      objectid: "topics",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].topicId == topicID){
          for(var j=0; j<data[i].posts.length; j++){
            if(data[i].posts[j].postId == postID){
              data[i].posts.splice(j,1);
            }
          }
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
      objectid: "topics",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}
