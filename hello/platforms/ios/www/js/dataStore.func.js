/******************************************************************************************
Ajax + Jquery to get data from cloud database  http://introtoapps.com/datastore.php
functions in this part are all related to created Newworking
save/load/edit users, posts, replies in the provided cloud storage (introtoapps DataStore).
********************************************************************************************/

window.baseUrl = "http://introtoapps.com/datastore.php";
window.baseAppid = "216036612";

function userExist(){
  var userExist = false;
  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "list",
      appid: baseAppid
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
  var newUser=JSON.stringify({"username":userName,"password":passWord,"nickname":userName,"signature":"I haven't input my signature","headpic":"img/33.JPG","myTopics":[],"myPosts":[]});

  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "append",
      appid: baseAppid ,
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
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
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
    type: "GET",
    url: baseUrl,
    data: {
      action: "save",
      appid: baseAppid ,
      objectid: "users",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}


function unFollowTopic(currentUser,topicid){
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
          for(var j=0; j<data[i].myTopics.length; j++){
            if(data[i].myTopics[j].topicId == topicid){
              data[i].myTopics.splice(j,1);
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
    type: "GET",
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


function isFollow(username,topicId){
  var follow = false;

  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid,
      objectid: "users"
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i = 0; i < data.length; i ++){
        if(data[i].username  == username){
          if(data[i].myTopics.length != 0){
            for(var j=0; j <data[i].myTopics.length;j++){
              if(data[i].myTopics[j].topicId == topicId){
                follow = true;
              }
            }
          }
        }
      }
    },
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
  return follow;
}

function getUser(username){
  var currentUser;
  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
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
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
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
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
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

function addPost(topicID,postid,posttitle,posttext,postauthor,postdate,postpic,postkeyword){
  var dataChanged;
  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
      objectid: "topics",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].topicId == topicID){
          data[i].posts.push({"postId":""+postid+"","postTitle":""+posttitle+"","postText":""+posttext+"","postAuthor":""+postauthor+"","postDate":postdate,"postkeyword":""+postkeyword+"","polls":{"numAgree":"0","numObject":"0"},"postPic":postpic,"comments":[]});
        }
      }
      dataChanged = JSON.stringify(data);
    },
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });

  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "save",
      appid: baseAppid ,
      objectid: "topics",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}

function AgreeOrObject(topicId,postId,m){
  var dataChanged;
  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
      objectid: "topics",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].topicId == topicId){
          for(var j=0;j<data[i].posts.length;j++){
            if(data[i].posts[j].postId == postId){
              switch (m) {
                case 1:
                data[i].posts[j].polls.numAgree ++;
                break;
                case 3:
                data[i].posts[j].polls.numObject ++;
                break;
              }
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
    type: "GET",
    url: baseUrl,
    data: {
      action: "save",
      appid: baseAppid ,
      objectid: "topics",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}


function editPost(topicID,postid,posttitle,posttext,postauthor,postdate,postpic,postkeyword,agree,object,comments){
  var dataChanged;
  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
      objectid: "topics",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].topicId == topicID){
          for(var j=0; j < data[i].posts.length; j++){
            if(data[i].posts[j].postId == postid){
              data[i].posts.splice(j,1);
              data[i].posts.push({"postId":""+postid+"","postTitle":""+posttitle+"","postText":""+posttext+"","postAuthor":""+postauthor+"","postDate":postdate,"postkeyword":""+postkeyword+"","polls":{"numAgree":agree,"numObject":object},"postPic":postpic,"comments":comments});
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
    type: "GET",
    url: baseUrl,
    data: {
      action: "save",
      appid: baseAppid ,
      objectid: "topics",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}

function addReply(topicID,postID,commentid,commenttext,commenauthor,commentDate){
  var dataChanged;
  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
      objectid: "topics",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].topicId == topicID){
          for(var j=0; j < data[i].posts.length ; j++){
            if(data[i].posts[j].postId == postID){
              data[i].posts[j].comments.push({"commentId":""+commentid+"","commentText":""+commenttext+"","commentAuthor":""+commenauthor+"","commentDate":commentDate});
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
    type: "GET",
    url: baseUrl,
    data: {
      action: "save",
      appid: baseAppid ,
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
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
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
    type: "GET",
    url: baseUrl,
    data: {
      action: "save",
      appid: baseAppid ,
      objectid: "topics",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}


function deleteCmt(topicID,postID,commentID){
  var dataChanged;
  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
      objectid: "topics",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].topicId == topicID){
          for(var j=0; j<data[i].posts.length; j++){
            if(data[i].posts[j].postId == postID){
              for(var k=0; k<data[i].posts[j].comments.length; k++){
                if(data[i].posts[j].comments[k].commentId == commentID){
                  data[i].posts[j].comments.splice(k,1);
                }
              }
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
    type: "GET",
    url: baseUrl,
    data: {
      action: "save",
      appid: baseAppid ,
      objectid: "topics",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}

function addMyPost(postauthor,topicid,postid){
  var dataChanged;
  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
      objectid: "users",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].username == postauthor){
          data[i].myPosts.push({"topicId":""+topicid+"","postId":""+postid+""});
        }
      }
      dataChanged = JSON.stringify(data);
    },
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });

  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "save",
      appid: baseAppid ,
      objectid: "users",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}

function deleteMyPost(postauthor,topicid,postid){
  var dataChanged;

  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
      objectid: "users",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].username == postauthor){
          for(var j=0; j < data[i].myPosts.length; j++){
            if((data[i].myPosts[j].topicId == topicid) && (data[i].myPosts[j].postId == postid)){
              data[i].myPosts.splice(j,1);
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
    type: "GET",
    url: baseUrl,
    data: {
      action: "save",
      appid: baseAppid ,
      objectid: "users",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}


function editProfile(currentuser,nickName,signature,headPic){
  var dataChanged;
  var newUser={"username":currentuser.username,"password":currentuser.password,"nickname":nickName,"signature":signature,"headpic":""+headPic+"","myTopics":currentuser.myTopics,"myPosts":currentuser.myPosts};

  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "load",
      appid: baseAppid ,
      objectid: "users",
    },
    dataType: "json",
    async : false,
    success: function(data) {
      for(var i=0; i < data.length; i++){
        if(data[i].username == currentuser.username){
          data.splice(i,1);
          data.push(newUser);
        }
      }
      dataChanged = JSON.stringify(data);
    },
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });

  $.ajax({
    type: "GET",
    url: baseUrl,
    data: {
      action: "save",
      appid: baseAppid ,
      objectid: "users",
      data: dataChanged
    },
    dataType: "json",
    fail: function(jqXHR){
      console.log(jqXHR.status);
    },
  });
}

function uploadPic(){
  if($('input[name=files]')[0].files[0] != null){
    var newdata = new FormData();
    newdata.append('files', $('input[name=files]')[0].files[0]);
    var fileType = $('input[name=files]')[0].files[0].type;
    fileType = fileType.replace("image/", "");
    var randomNum = (new Date()).valueOf();
    var fileName = randomNum+"."+fileType;
    console.log(fileName);
    $("#filename").html(fileName);

    $.ajax({
      url: 'http://introtoapps.com/datastore.php?appid=216036612&action=upload&objectid='+fileName,
      method: 'POST',
      data: newdata,
      contentType: false,
      processData: false,
      cache: false,
      success: function(data) {
        console.log("upload successfully!");
      },
      error: function (data) {
      }
    });
  }
}
