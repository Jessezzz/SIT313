/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/****************************************
JS below are from onsen UI
****************************************/



var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },

  onPrompt:function (results) {
    console.log("121");
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
  },

  showPrompt:function(){
    console.log("1");
    navigator.notification.prompt(
      'Please enter your name',  // message
      onPrompt,                  // callback to invoke
      'Registration',            // title
      ['Ok','Exit'],             // buttonLabels
      'Jane Doe'                 // defaultText
    );
  }
};

app.initialize();

app.deleteComment = function (topicID,postID,commentID) {
  ons.openActionSheet({
    cancelable: true,
    buttons: [
      'Delete comment',
      'Reply comment',
      {
        label: 'Cancel',
      }
    ]
  }).then(
    function (index) {
      if(index===0){
        if(window.localStorage.getItem("Username") == null){
          ons.notification.alert('You have to sign in.');
        }else{
          showModal();
          setTimeout(function() {
            deleteCmt(topicID,postID,commentID);
            var currentUser = getUser(window.localStorage.getItem("Username"));
            updatePages2(topicID);
            updatePages1();
            updatePages3(currentUser);
            updatePages4(topicID,postID);
          }, 300);
        }
      }
    }
  )
};

app.replyComment = function (topicID,postID,index) {
  ons.openActionSheet({
    cancelable: true,
    buttons: [
      'Reply to comment',
      {
        label: 'Cancel',
      }
    ]
  })
};

app.othersPost = function (id1,id2) {
  ons.openActionSheet({
    cancelable: true,
    buttons: [
      'Reply to post',
      {
        label: 'Cancel',
      }
    ]
  }).then(
    function (index) {
      if(index===0){
        var follow = isFollow(window.localStorage.getItem("Username"),id1);

        if(window.localStorage.getItem("Username") == null){
          ons.notification.alert('You have to sign in.');
        }else{
          if(follow){
            myNavigator.pushPage("addareply.html",{data:{tid:id1,pid:id2}});
          }else{
            ons.notification.alert('You have to follow this topic firstly.');
          }
        }
      }
    }
  )
};

app.myPost = function (id1,id2) {
  ons.openActionSheet({
    cancelable: true,
    buttons: [
      'Edit post',
      'Delete post',
      'Reply to post',
      {
        label: 'Cancel',
      }
    ]
  }).then(
    function (index) {
      if(index == 0){
        var follow = isFollow(window.localStorage.getItem("Username"),id1);

        if(window.localStorage.getItem("Username") == null){
          ons.notification.alert('You have to sign in.');
        }else{
          if(follow){
            myNavigator.pushPage("editapost.html",{data:{topicId:id1,postId:id2}});
          }else{
            ons.notification.alert('You have to follow this topic firstly.');
          }
        }
      }
      else if(index==1){
        if(window.localStorage.getItem("Username") == null){
          ons.notification.alert('You have to sign in.');
        }else{
          ons.notification.confirm
          ({message: 'All comments will be deleted after deleting this post.'})
          .then(
            function (index) {
              if(index===1){
                showModal();

                setTimeout(function() {
                  deleteMyPost(window.localStorage.getItem("Nickname"),id1,id2);
                  deletePost(id1,id2);

                  var currentUser = getUser(window.localStorage.getItem("Username"));
                  updatePages2(id1);
                  updatePages1();
                  updatePages3(currentUser);

                  myNavigator.popPage();
                }, 300);
              }
            }
          )
        }
      }
      else if(index===2){
        var follow = isFollow(window.localStorage.getItem("Username"),id1);

        if(window.localStorage.getItem("Username") == null){
          ons.notification.alert('You have to sign in.');
        }else{
          if(follow){
            myNavigator.pushPage("addareply.html",{data:{tid:id1,pid:id2}});
          }else{
            ons.notification.alert('You have to follow this topic firstly.');
          }
        }
      }
    }
  )
};


/****************************************
JS below are created by Jesse
****************************************/

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
    type: "POST",
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


function keywordSearch(){
  var str = $("#search_input").val();
  $("#search-result").html("");
  document.getElementById("search-suggest").style.display = "block";

  var titleCheck = document.getElementById("checkTitle").checked;
  var textCheck = document.getElementById("checkText").checked;

  if(str.length != 0 ){
    var input = str.trim().split(" ");
    // array to store all keywords
    var results = new Array();
    // each array[index] to store all results for each keyword
    var allTopics = new Array();

    for(index in input){
      results[index] = new Array();

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
          for(var i=0; i< data.length; i++){
            for(var j=0;j<data[i].posts.length;j++){
              if(titleCheck && !textCheck){
                // only title search
                if(data[i].posts[j].postTitle.indexOf(input[index])!=(-1)){
                  results[index].push([data[i].topicId,data[i].posts[j].postId]);
                }
              }
              if(!titleCheck && textCheck){
                // only text search
                var posttext;
                if(data[i].posts[j].postkeyword.length==0){
                  posttext = data[i].posts[j].postText;
                }else{
                  posttext = AesCtr.decrypt(data[i].posts[j].postText,data[i].posts[j].postkeyword,256);
                  //Decrypt post with a postkeyword
                }
                posttext = posttext.replace(/<.*?>/ig,"");
                // Delete the html tag from rich text
                if(posttext.indexOf(input[index])!=(-1)){
                  results[index].push([data[i].topicId,data[i].posts[j].postId]);
                }
              }
              if(titleCheck && textCheck){
                // both title and text search
                var posttext;
                if(data[i].posts[j].postkeyword.length==0){
                  posttext = data[i].posts[j].postText;
                }else{
                  posttext = AesCtr.decrypt(data[i].posts[j].postText,data[i].posts[j].postkeyword,256);
                  //Decrypt post with a postkeyword
                }
                posttext = posttext.replace(/<.*?>/ig,"");
                // Delete the html tag from rich text
                if((data[i].posts[j].postTitle.indexOf(input[index])!=(-1))||(posttext.indexOf(input[index])!=(-1))){
                  results[index].push([data[i].topicId,data[i].posts[j].postId]);
                }
              }
              if(!titleCheck && !textCheck){
                // no search
                break;
              }

            }
          }
        },
        fail: function(jqXHR){
          console.log(jqXHR.status);
        },
      });
    }

    function findPostTitle(topicId,postId){
      for(var i=0; i< allTopics.length; i++){
        if(allTopics[i].topicId == topicId){
          for(var j=0;j<allTopics[i].posts.length;j++){
            if(allTopics[i].posts[j].postId == postId){
              postTitle = allTopics[i].posts[j].postTitle;
              return postTitle;
            }
          }
        }
      }
    }

    function findTopicPic(topicId){
      for(var i=0; i< allTopics.length; i++){
        if(allTopics[i].topicId == topicId){
          topicPic = allTopics[i].topicPic;
          return topicPic;
        }
      }
    }

    if(input.length == 1){
      // only one key word inputted by user
      for(index in results[0]){
        var topicId = results[0][index][0];
        var postId = results[0][index][1];
        var topicPic = findTopicPic(topicId);
        var postTitle = findPostTitle(topicId,postId);

        var hint = $("<li onclick='searchTopost("+topicId+","+postId+")'><img style='height:40px;width:40px;' src='"+topicPic +"'><label style='height:40px;'>"+postTitle+"</label></li>");
        $("#search-result").append(hint);
      }
    }

    //Find the common post of different results
    //Start 2
    //End (total num of words)-1   results[]
    if(input.length >=2 ){
      var duplicate = new Array();
      duplicate[0] = new Array();
      for(index1 in results[0]){
        for(index2 in results[1]){
          if(results[0][index1][0] == results[1][index2][0]){
            if(results[0][index1][1] == results[1][index2][1]){
              // console.log("Finding first 2 " + results[0][index1]);
              duplicate[0].push(results[0][index1]);
            }
          }
        }
      }

      var resultsThanTwo = new Array();
      for(var i=2; i <= input.length -1; i++){
        duplicate[i-1] = new Array();
        for(index1 in duplicate[i-2]){
          for(index2 in results[i]){
            if(duplicate[i-2][index1][0] == results[i][index2][0]){
              if(duplicate[i-2][index1][1] == results[i][index2][1]){
                // console.log("Finding 3 common " + duplicate[i-2][index1]);
                duplicate[i-1].push(duplicate[i-2][index1]);
                resultsThanTwo = duplicate[i-1];
              }
            }
          }
        }
      }


      if(input.length == 2){
        for(index in duplicate[0]){
          var topicId = duplicate[0][index][0];
          var postId = duplicate[0][index][1];
          var topicPic = findTopicPic(topicId);
          var postTitle = findPostTitle(topicId,postId);

          var hint = $("<li onclick='searchTopost("+topicId+","+postId+")'><img style='height:40px;width:40px;' src='"+topicPic +"'><label style='height:40px;'>"+postTitle+"</label></li>");
          $("#search-result").append(hint);
        }
      }else{
        if(resultsThanTwo.length == 0){
          console.log("No results");
        }else{
          for(index in resultsThanTwo){
            var topicId = resultsThanTwo[index][0];
            var postId = resultsThanTwo[index][1];
            var postTitle = findPostTitle(topicId,postId);

            var hint = $("<li onclick='searchTopost("+topicId+","+postId+")'>"+postTitle+"</li>");
            $("#search-result").append(hint);
          }
        }
      }
    }
  }
}


var  showEmoj = function(target) {
  document
  .getElementById('popover')
  .show(target);
};

var hidePopover = function() {
  document
  .getElementById('popover')
  .hide();
};

function addEmoj(str){
  document.getElementById('popover').hide();
  $('#editor').append('<img width="20px" src='+str+'>');
  $('#commentText').append('<img width="20px" src='+str+'>');
}

function clearEditor(){
  if($("#editor").html() == "you can input comment here..."){
    $("#editor").html("");
  }
}

function clearComment(){
  if($("#commentText").html() == "you can input your reply here..."){
    $("#commentText").html("");
  }
}

function login () {
  var userName = document.getElementById('_account').value;
  var passWord = sha256_digest(document.getElementById('_pwd').value);
  console.log("Input password after encrypting: " + passWord);

  var currentUser = getUser(userName);

  if(currentUser != null){
    var passwordCorrect = currentUser.password;

    if(passWord === passwordCorrect){
      showModal();

      setTimeout(function() {
        document.getElementById("beforelogin").style.display="none";
        document.getElementById("usermainpage").style.display="block";

        window.localStorage.setItem("Username",currentUser.username);
        window.localStorage.setItem("Password",currentUser.password);
        window.localStorage.setItem("Nickname",currentUser.nickname);
        window.localStorage.setItem("Signature",currentUser.signature);
        window.localStorage.setItem("Headpic",currentUser.headpic);
        window.localStorage.RecentTopicId = " ";
        window.localStorage.RecentPostId = " ";
        window.localStorage.topicPic=" ";
        window.localStorage.topicTitle=" ";
        window.localStorage.subscribeNum = " ";
        window.localStorage.topicId = " ";
        if(window.localStorage.getItem("myVoted") == null){
          //haven't voted any post
          window.localStorage.setItem("myVoted","[]");
        }
        if(window.localStorage.getItem("myInputed") == null){
          //haven't Inputed any post password key
          window.localStorage.setItem("myInputed","[]");
        }

        updatePages1();
        updatePages3(currentUser);
        myNavigator.popPage();
      }, 500);
    }else{
      ons.notification.alert('Incorrect password.');
    }
  }else {
    ons.notification.alert("Username does not exist");
  }
}

function logout () {
  document.getElementById("beforelogin").style.display="block";
  document.getElementById("usermainpage").style.display="none";

  window.localStorage.removeItem("Username");
  window.localStorage.removeItem("Password");
  window.localStorage.removeItem("Nickname");
  window.localStorage.removeItem("Signature");
  window.localStorage.removeItem("Headpic");
  window.localStorage.removeItem("RecentTopicId");
  window.localStorage.removeItem("RecentPostId");

  updatePages1();
};


function register(){
  var userName = document.getElementById('_accountt').value;
  var passWord = sha256_digest(document.getElementById('_pwdd').value);

  console.log("password after encrypting is : "+passWord);

  var emptyUser = userExist();

  if(emptyUser){
    addUser(userName,passWord);

    ons.notification.alert('Register successfully.');

    setTimeout(function() {
      myNavigator.popPage();
    }, 1000);
  }else{
    var allUsers = getUsers();

    for (index in allUsers){
      if(allUsers[index].username === userName){
        if(parseInt(index) === parseInt(allUsers.length-1)){
          ons.notification.alert('Username has existed.');
          break;
        }
      }
      else if(parseInt(index) === parseInt(allUsers.length-1)){
        addUser(userName,passWord);

        ons.notification.alert('Register successfully.');
        setTimeout(function() {
          myNavigator.popPage();
        }, 1000);
      }
    }
  }
}

function showModal() {
  var modal = document.querySelector('ons-modal');

  modal.show();
  setTimeout(function() {
    modal.hide();
  }, 1000);
}

var exception = [];
function throwException(){
  try {
    throw "Test exception";
  } catch (err) {
    exception[exception.length] = err;
  }
}

function addException(){
  if(exception.length==0){
    var items = $("<ons-list-item>No Exception</ons-list-item>");
    $("#exceptio").append(items);
  }
  for (index in exception){
    var items = $("<ons-list-item>ex"+parseInt(index+1)+"&nbsp;"+exception[index]+"</ons-list-item>");
    $("#exceptio").append(items);
  }
}

/****************************************
EventListener
****************************************/
document.addEventListener('init', function (event) {
  try {
    if (event.target.id === 'topicLists') {
      $("#onslist").html(" ");
      showTopicsList();
    }else if (event.target.id === 'topicmain') {
      showTopic(event.target.data.id);
    }else if (event.target.id === 'editapost') {
      showEditPost(event.target.data.topicId,event.target.data.postId);
    }else if(event.target.id === 'postpage'){
      showPost(event.target.data.topicid,event.target.data.postid);
    }else if(event.target.id === 'addapost'){
      showAddPost(event.target.data.id);
    }else if(event.target.id === 'myteams'){
      showMyteams(event.target.data.currentuser);
    }else if(event.target.id === 'myposts'){
      showMyposts(event.target.data.currentuser);
    }else if(event.target.id === 'profile'){
      showProfile(event.target.data.currentuser);
    }else if(event.target.id === 'mainPage'){
      $("#allpostabstrcts").html(" ");
      showHotPostAbstracts();
    }else if(event.target.id === 'viewing'){
      showRecentviewing();
    }else if(event.target.id === 'addareply'){
      showaAddReply(event.target.data.tid,event.target.data.pid);
    }else if(event.target.id === 'exception'){
      addException();
    }}catch(err){
      exception[exception.length] = err;
    }
  });


  //****************************************
  //  FUNCTIONS
  //****************************************

  function topicslistTOtopic(node,topicID){
    node.on("click",function(){
      myNavigator.pushPage('topicmain.html',{data:{id:topicID}});
    })
  };

  function abstractsTOpost(node,topicID,postID){

    node.on("click",function(){
      window.localStorage.RecentTopicId = ""+topicID+" "+window.localStorage.RecentTopicId+"";
      window.localStorage.RecentPostId = ""+postID+" "+window.localStorage.RecentPostId+"";
      myNavigator.pushPage('postpage.html',{data:{topicid:topicID,postid:postID}});
    })
  };

  function searchTopost(topicId,postId){
    myNavigator.pushPage('postpage.html',{data:{topicid:topicId,postid:postId}})
  }

  function joinTeam(node,currentUser,topicId) {
    if(node.html() == " &nbsp;&nbsp;Join&nbsp;&nbsp; "){
      node.on("click",function(){
        followTopic(currentUser,topicId);
        ons.notification.alert('You have joined this topic');
        currentUser = getUser(currentUser.username);
        updatePages3(currentUser);
        updatePages1();
      })
    }else{
      node.on("click",function(){
        unFollowTopic(currentUser,topicId);
        ons.notification.alert('You have unfollow this topic');
        currentUser = getUser(currentUser.username);
        updatePages3(currentUser);
        updatePages1();
      })
    }
  }

  function deleteMyComment(node,topicID,postID,commentID){
    node.on("click",function(){
      app.deleteComment(topicID,postID,commentID);
    });
  }

  function replyOtherComment(node,topicID,postID,index){
    node.on("click",function(){
      app.replyComment(topicID,postID,index);
    });
  }

  //Refresh pages which do not need parameters
  function updatePages1(){
    $("#onslist").html(" ");
    showTopicsList();
    $("#allpostabstrcts").html(" ");
    showHotPostAbstracts();
  }

  //Refresh pages which only need topicId
  function updatePages2(topicId){
    $("#topic_banner").html(" ");
    $("#postabstrcts").html(" ");
    $("#topicbar").html(" ");
    showTopic(topicId);
  }

  //Refresh pages which only need object-currentUser
  function updatePages3(currentUser){
    $("#usermainpage").html(" ");
    showUserpage(currentUser);
    $("#postofmine").html(" ");
    showMyposts(currentUser);
  }

  //Refresh pages which only need both id of topic and post
  function updatePages4(topicId,postId){
    $("#belowbar").html(" ");
    $("#topicbar3").html(" ");
    $("#topicbar2").html(" ");
    showPost(topicId,postId);
  }

  /*
  This function shows forum topics list
  In project 1, we are using static data.
  This function shows all topics that are in the "topics" variable.
  */
  function showTopicsList(){
    var join;
    var allTopics = getTopics();
    //Cache current list of topics in local storage


    if(window.localStorage.topicPic == " "){
      for(index in allTopics){
        window.localStorage.topicPic = window.localStorage.topicPic + " " + allTopics[index].topicPic;
        window.localStorage.topicTitle = window.localStorage.topicTitle+" "+allTopics[index].topicTitle
        window.localStorage.subscribeNum = window.localStorage.subscribeNum+" " + allTopics[index].subscribeNum;
        window.localStorage.topicId = window.localStorage.topicId+" " + allTopics[index].topicId;
      }
    }

    //cache in localStorage
    if(window.localStorage.topicPic != null){
      //cache exist
      console.log("Topic List From cache");
      var topicPic = new Array();
      topicPic = window.localStorage.topicPic.trim().split(" ");
      var topicTitle = new Array();
      topicTitle = window.localStorage.topicTitle.trim().split(" ");
      var subscribeNum = new Array();
      subscribeNum = window.localStorage.subscribeNum.trim().split(" ");
      var topicId = new Array();
      topicId = window.localStorage.topicId.trim().split(" ");

      if(window.localStorage.getItem("Username") == null){
        for(index in topicPic){
          showTopicListNoLogin(topicPic[index],topicTitle[index],subscribeNum[index],topicId[index]);
        }
      }else{
        if(navigator.onLine){
          var currentUser = getUser(window.localStorage.getItem("Username"));
          for(index in allTopics){
            showTopicListLogined(allTopics[index].topicPic,allTopics[index].topicTitle,allTopics[index].subscribeNum,allTopics[index].topicId,currentUser);
          }
        }else{
          for(index in topicPic){
            showTopicListNoLogin(topicPic[index],topicTitle[index],subscribeNum[index],topicId[index]);
          }
        }
      }
    }
    else{
      //No cache before
      console.log("Topic List From Database");
      if(window.localStorage.getItem("Username") == null){
        for(index in allTopics){
          showTopicListNoLogin(allTopics[index].topicPic,allTopics[index].topicTitle,allTopics[index].subscribeNum,allTopics[index].topicId);
        }
      }else{
        if(navigator.onLine){
          var currentUser = getUser(window.localStorage.getItem("Username"));
          for(index in allTopics){
            showTopicListLogined(allTopics[index].topicPic,allTopics[index].topicTitle,allTopics[index].subscribeNum,allTopics[index].topicId,currentUser);
          }
        }else{
          for(index in allTopics){
            showTopicListNoLogin(allTopics[index].topicPic,allTopics[index].topicTitle,allTopics[index].subscribeNum,allTopics[index].topicId);
          }
        }
      }
    }
  }

  function showTopicListLogined(topicPic,topicTitle,subscribeNum,topicId,currentUser){
    var listitem = $(ons._util.createElement("<ons-list-item style='margin:12px;width:94%;background-color:white;height:85px;border-radius:8px;'></ons-list-item>"));
    var listitemLeft = $(ons._util.createElement("<div class='left'></div>"));
    listitemLeft.append("<img class='list-item__thumbnail' style='height:60px;width:60px;' src='"+topicPic +"'>");
    var listitemCenter = $(ons._util.createElement("<div style='margin-left:10px;' class='center'></div>"));
    listitemCenter.append("<span style='display:block;float:left;font-size:18px;font-size:18px;' class='list-item__title'>"+topicTitle+"</span>");
    listitemCenter.append("<span class='list-item__subtitle'>"+ subscribeNum+" members</span>");
    var listitemRight = $(ons._util.createElement("<div class='right'></div>"));
    var listitemRightSection = $(ons._util.createElement("<section style='margin: 4px;'></section>"));
    var join = $("<ons-button id='onsbutton1' style='padding:0 4px;color:#0060AA;background-color:white;border:1px solid #3CA0EC'> &nbsp;&nbsp;Join&nbsp;&nbsp; </ons-button>");

    for(myIndex in currentUser.myTopics){
      if(currentUser.myTopics[myIndex].topicId == topicId){
        join = $("<ons-button id='onsbutton1' style='padding:0;color:#ADADAE;font-size:14px;background-color:white;border:1px solid #ADADAE'> &nbsp;&nbsp;Joined&nbsp;&nbsp; </ons-button>");
      }
    }
    listitemRight.append(listitemRightSection);
    listitemRightSection.append(join);
    listitem.append(listitemLeft);
    listitem.append(listitemCenter);
    listitem.append(listitemRight);
    $("#onslist").append(listitem);

    joinTeam(join,currentUser,topicId);
    topicslistTOtopic(listitemCenter,topicId);
  }

  function showTopicListNoLogin(topicPic,topicTitle,subscribeNum,topicId){
    var listitem = $(ons._util.createElement("<ons-list-item style='margin:12px;width:94%;background-color:white;height:85px;border-radius:8px;'></ons-list-item>"));
    var listitemLeft = $(ons._util.createElement("<div class='left'></div>"));
    listitemLeft.append("<img class='list-item__thumbnail' style='height:60px;width:60px;' src='"+topicPic +"'>");
    var listitemCenter = $(ons._util.createElement("<div class='center' style='margin-left:10px;'></div>"));
    listitemCenter.append("<span style='display:block;float:left;' class='list-item__title'>"+topicTitle+"</span>");
    listitemCenter.append("<span class='list-item__subtitle'>"+ subscribeNum+" members</span>");
    var listitemRight = $(ons._util.createElement("<div class='right'></div>"));
    var listitemRightSection = $(ons._util.createElement("<section style='margin: 4px;'></section>"));
    var join = $("<ons-button id='onsbutton1' style='display:block; padding:0 4px;color:#0060AA;background-color:white;border:1px solid #3CA0EC'> &nbsp;&nbsp;Join&nbsp;&nbsp; </ons-button>");
    listitemRight.append(listitemRightSection);
    listitemRightSection.append(join);
    listitem.append(listitemLeft);
    listitem.append(listitemCenter);
    listitem.append(listitemRight);
    $("#onslist").append(listitem);
    join.on("click",function(){
      ons.notification.alert('You have to sign in');
    })
    if(navigator.onLine){
      topicslistTOtopic(listitemCenter,topicId);
    }
  }

  /*
  This function shows one topic
  In project 1, we are using static data.
  This function shows all topics that are in the "topics" variable.
  */
  function showTopic(topicID){

    var allTopics = getTopics();
    var topicBannerContent = $("<div id='ban_con'></div>");
    var topicindex;
    for(index in allTopics){
      if(allTopics[index].topicId == topicID){
        topicindex = index;
        break;
      }
    }
    topicBannerContent.append("<img src='"+allTopics[topicindex].topicPic+"'>");
    var topicBannerWords = $("<div id='ban_words'></div>");
    topicBannerContent.append(topicBannerWords);
    topicBannerWords.append("<span id='topic'>"+allTopics[topicindex].topicTitle+"</span><br/>");
    var lab = $("<div class='lab'></div>");
    topicBannerWords.append(lab);
    lab.append("<span style='font-weight:normal;'>Members</span>&nbsp;"+allTopics[topicindex].subscribeNum+"&nbsp;&nbsp;");
    lab.append("<span style='font-weight:normal;'>Posts</span>&nbsp;"+allTopics[topicindex].posts.length+"")
    $("#topic_banner").append(topicBannerContent);
    var addpost = $("#addpost");
    var topicbartitle=$("<span>"+allTopics[topicindex].topicTitle+"</span>");
    $("#topicbar").append(topicbartitle);
    showPostAbstracts(topicID);

    var follow = isFollow(window.localStorage.getItem("Username"),topicID);

    if(window.localStorage.getItem("Username") == null){
      addpost.on("click",function(){
        ons.notification.alert('You have to sign in');
      })
    }else{
      addpost.on("click",function(){
        if(follow){
          myNavigator.pushPage('addapost.html',{data:{id:topicID}});
        }else{
          ons.notification.alert('You have to follow this topic firstly.');
        }
      })
    }
  };

  /*
  This function shows all forum post abstracts
  In project 1, we are using static data.
  This function shows all post abstracts that are in the "topics" variable.
  */
  function showPostAbstracts(topicID){
    var allTopics = getTopics();
    var topicindex;
    for(index in allTopics){
      if(allTopics[index].topicId == topicID){
        topicindex = index;
        break;
      }
    }

    for(index in allTopics[topicindex].posts){
      var article = $("<div id='articles'></div>");
      var currentAuthor = getUser(allTopics[topicindex].posts[index].postAuthor);
      var postAbstract = $("<div class='contents'></div>");
      var mainContent = $("<div class='bod'></div>");
      mainContent.append("<div class='title'>"+ allTopics[topicindex].posts[index].postTitle +"</div>");
      mainContent.append("<div class='pics'><img src="+ allTopics[topicindex].posts[index].postPic + "></div>");
      var footContent = $("<div class='footer'></div>");
      footContent.append("<a>"+ currentAuthor.nickname +"&nbsp;</a>");
      footContent.append("<span>"+ allTopics[topicindex].topicTitle +"</span>");
      var counts = $("<div style='margin-top:0px;' id='countss'></div>");
      counts.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;");
      counts.append("<span>159</span>&nbsp;&nbsp;&nbsp;");
      counts.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;");
      counts.append("<span>"+allTopics[topicindex].posts[index].comments.length+"</span>");
      footContent.append(counts);
      // footContent.append("<div id='counts'></div>");
      // footContent.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;<span>257</span>&nbsp;&nbsp;&nbsp;")
      // footContent.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;<span>303</span>");
      postAbstract.append(mainContent);
      postAbstract.append(footContent);
      article.append(postAbstract);
      abstractsTOpost(postAbstract,topicID,allTopics[topicindex].posts[index].postId);
      $("#postabstrcts").append(article);
    }
  };

  /*
  This function shows HOT forum post abstracts into recommended page
  In project 1, we are using static data.
  This function shows all post abstracts that are in the "topics" variable.
  */
  function showHotPostAbstracts(){
    var allTopics = getTopics();

    for(index1 in allTopics){
      var hot = 0;
      var topic = 0;
      var post = 0;

      if(allTopics[index1].posts.length == 0){
        continue;
      }else if(allTopics[index1].posts.length == 1){
        topic = index1;
        post = 0;
      }else{
        for (index2 in allTopics[index1].posts){
          if((allTopics[index1].posts[index2].comments.length)>=hot){
            hot = allTopics[index1].posts[index2].comments.length;
            topic = index1;
            post = index2;
          }
        }
      }
      var currentUser = getUser(allTopics[topic].posts[post].postAuthor);

      var article = $("<div id='articles'></div>");
      var postAbstract = $("<div class='contents'></div>");
      var mainContent = $("<div class='bod'></div>");
      mainContent.append("<div class='title'>"+ allTopics[topic].posts[post].postTitle +"</div>");
      mainContent.append("<div class='pics'><img src="+ allTopics[topic].posts[post].postPic + "></div>");
      var footContent = $("<div class='footer'></div>");
      //footContent.append("<a>"+ currentUser.nickname +"&nbsp;</a>");
      footContent.append("<span>"+ allTopics[topic].topicTitle +"</span>");
      var counts = $("<div style='margin-top:0px;' id='countss'></div>");
      counts.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;");
      counts.append("<span>159</span>&nbsp;&nbsp;&nbsp;");
      counts.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;");
      counts.append("<span>"+allTopics[topic].posts[post].comments.length+"</span>");
      footContent.append(counts);
      // footContent.append("<div id='counts'></div>");
      // footContent.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;<span>257</span>&nbsp;&nbsp;&nbsp;")
      // footContent.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;<span>303</span>");
      postAbstract.append(mainContent);
      postAbstract.append(footContent);
      article.append(postAbstract);
      abstractsTOpost(postAbstract,allTopics[topic].topicId,allTopics[topic].posts[post].postId);
      $("#allpostabstrcts").append(article);
    }
  }

  function richText(){
    $('.toolbar a').click(function(e) {
      var command = $(this).data('command');
      document.getElementById("editor").focus();
      if (command == 'bold' || command == 'italic'|| command == 'italic' || command == 'underline' || command == 'insertUnorderedList' || command == 'insertOrderedList') {
        if($(this).css("color") == "rgb(30, 136, 229)"){
          $(this).css("color","#adb5b9");
        }else{
          $(this).css("color","#1E88E5");
        }
      }
      if (command == 'createlink' || command == 'insertimage') {
        url = prompt('Enter the link here: ', 'http:\/\/');
        document.execCommand($(this).data('command'), false, url);
      }
      else {
        document.execCommand($(this).data('command'), false, null);
      }
    });

  }

  /*
  This function shows a add post page and finish the add post function
  In project 1, we are using static data.
  This function shows all posts that are in the "topics" variable.
  */
  function showAddPost(topicID){
    var allTopics = getTopics();
    var topicindex;
    for(index in allTopics){
      if(allTopics[index].topicId == topicID){
        topicindex = index;
        break;
      }
    }
    var addclick = $("<p style='margin-right:15px;margin-bottom:5px;font-weight:500;width:40px;'>Add</p>");
    $("#barofAddpost").append(addclick);

    richText();

    addclick.on("click",function(){
      //If the biggest id of post is a, and the new id is a+1
      var max = 0;
      for(var i=0; i < allTopics[parseInt(topicindex)].posts.length; i ++){
        if(parseInt(allTopics[parseInt(topicindex)].posts[i].postId) > max){
          max = parseInt(allTopics[parseInt(topicindex)].posts[i].postId);
        }
      }
      var postid = max+1;
      var posttitle = document.getElementById('postTitle').value;
      var posttext = document.getElementById('editor').innerHTML;

      var postkeyword = document.getElementById('passwordKey').innerHTML;

      if(postkeyword.length!=0){
        // encrypt with AES
        console.log("post before encrypting: "+posttext);
        var posttext = AesCtr.encrypt(posttext, postkeyword, 256);
        console.log("post after encrypting: "+posttext);
      }

      var postdate = "10 minutes ago";
      var postpic = "";

      showModal();

      setTimeout(function() {
        addPost(topicID,postid,posttitle,posttext,window.localStorage.getItem("Username"),postdate,postpic,postkeyword);
        ons.notification.alert('Post successfully.');
        addMyPost(window.localStorage.getItem("Username"),topicID,postid);
        var currentUser = getUser(window.localStorage.getItem("Username"));
        updatePages3(currentUser);
        updatePages2(parseInt(topicID));
        updatePages1();
        myNavigator.popPage();
      }, 300);
    })
  }




  /*
  This function shows a edit post page and finish the edit post function
  In project 1, we are using static data.
  This function shows all posts that are in the "topics" variable.
  */
  function showEditPost(topicID,postID){
    var allTopics = getTopics();
    var topicindex;
    for(index in allTopics){
      if(allTopics[index].topicId == topicID){
        topicindex = index;
        break;
      }
    }

    var postindex;
    for(index in allTopics[topicindex].posts){
      if(allTopics[topicindex].posts[index].postId == postID){
        postindex = index;
        break;
      }
    }

    var addclick = $("<p style='margin-right:35px;margin-bottom:5px;font-weight:500;width:40px;'>Change</p>");
    $("#barofEditpost").append(addclick);
    $("#postTitle2").val(allTopics[topicindex].posts[postindex].postTitle);
    var text = AesCtr.decrypt(allTopics[topicindex].posts[postindex].postText,allTopics[topicindex].posts[postindex].postkeyword,256);
    $("#editor").html(text);

    richText();

    addclick.on("click",function(){
      var postid = postID;
      var posttitle = document.getElementById('postTitle2').value;
      var posttext = AesCtr.encrypt($('#editor').html(),allTopics[topicindex].posts[postindex].postkeyword,256);
      var postdate = "10 minutes ago";
      var postpic = "";
      var postkeyword = allTopics[topicindex].posts[postindex].postkeyword;
      var agree = allTopics[topicindex].posts[postindex].polls.numAgree;
      var object = allTopics[topicindex].posts[postindex].polls.numObject;
      var comment = allTopics[topicindex].posts[postindex].comments;

      showModal();

      setTimeout(function() {
        editPost(topicID,postid,posttitle,posttext,window.localStorage.getItem("Username"),postdate,postpic,postkeyword,agree,object,comment);
        ons.notification.alert('Edit successfully.');
        var currentUser = getUser(window.localStorage.getItem("Username"));
        updatePages3(currentUser);
        updatePages2(parseInt(topicID));
        updatePages1();
        updatePages4(topicID,postid);
        myNavigator.popPage();
      }, 300);
    })
  }

  /*
  This function shows a add reply page and finish the add reply function
  In project 1, we are using static data.
  This function shows all posts that are in the "topics" variable.
  */
  function showaAddReply(topicID,postID){
    var allTopics = getTopics();
    var topicindex;
    for(index in allTopics){
      if(allTopics[index].topicId == topicID){
        topicindex = index;
        break;
      }
    }
    var addclick = $("<p style='margin-right:15px;margin-bottom:5px;font-weight:500;width:40px;'>Reply</p>");
    $("#barofAddreply").append(addclick);
    addclick.on("click",function(){

      var postindex;
      for(index in allTopics[topicindex].posts){
        if(allTopics[topicindex].posts[index].postId == postID){
          postindex = index;
          break;
        }
      }

      //If the biggest id of comment is a, and the new id is a+1
      var max = 0;
      for(var i=0; i < allTopics[topicindex].posts[postindex].comments.length; i ++){
        if(parseInt(allTopics[topicindex].posts[postindex].comments[i].commentId) > max){
          max = parseInt(allTopics[parseInt(topicindex)].posts[postindex].comments[i].commentId);
        }
      }
      var commentid = max+1;
      var commenttext = document.getElementById('commentText').innerHTML;
      var commentDate = "Just now"
      addReply(topicID,postID,commentid,commenttext,window.localStorage.getItem("Username"),commentDate);

      showModal();
      setTimeout(function() {
        updatePages2(topicID);
        updatePages1();
        updatePages4(parseInt(topicID),parseInt(postID));
        myNavigator.popPage();
        ons.notification.alert('Comment successfully.');
      }, 500);
    })
  }

  /*
  This function shows a post content page
  In project 1, we are using static data.
  This function shows all posts that are in the "topics" variable.
  */
  function showPost(topicID,postID){

    var allTopics = getTopics();
    var topicindex;
    for(index in allTopics){
      if(allTopics[index].topicId == topicID){
        topicindex = index;
        break;
      }
    }

    var postindex;
    for(index in allTopics[topicindex].posts){
      if(allTopics[topicindex].posts[index].postId == postID){
        postindex = index;
        break;
      }
    }
    var currentAuthor = getUser(allTopics[topicindex].posts[postindex].postAuthor);
    var forMyPost = $("<ons-toolbar-button><ons-icon  style='color:#FFFFFF' icon='ion-more' onclick='app.myPost("+topicID+","+postID+")'></ons-icon></ons-toolbar-button>");
    var forOthersPost = $("<ons-toolbar-button><ons-icon  style='color:#FFFFFF' icon='ion-more' onclick='app.othersPost("+topicID+","+postID+")'></ons-icon></ons-toolbar-button>");

    if(window.localStorage.getItem("Nickname") == currentAuthor.nickname){


      $("#topicbar3").append(forMyPost);
    }else{
      $("#topicbar3").append(forOthersPost);
    }

    var responsePage = $("<div id='response_page'></div>");
    var responseTitle = $("<div id='response_title'></div>");
    responsePage.append(responseTitle);
    responseTitle.append("<span>" + allTopics[topicindex].posts[postindex].postTitle + "</span><br/>");
    var counts = $("<div id='countss'></div>");
    counts.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;");
    counts.append("<span>159</span>&nbsp;&nbsp;&nbsp;");

    counts.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;");
    counts.append("<span>"+allTopics[topicindex].posts[postindex].comments.length+"</span>");
    responseTitle.append(counts);

    var responseWriter = $("<div id='response_writer'></div>");
    responsePage.append(responseWriter);
    var responsePic = $("<div id='response_pic'></div>");
    responsePic.append("<img src='"+allTopics[topicindex].posts[postindex].postPic+"'>");
    var responseUser = $("<div id='response_user'></div>");
    responseUser.append("<span style='font-size:18px;color:#0060AA;margin-bottm:20px;'>"+currentAuthor.nickname+"</span><br/>");
    responseUser.append("<span style='font-size:14px;'>"+allTopics[topicindex].posts[postindex].postDate+"</span>");
    responseWriter.append(responsePic);
    responseWriter.append(responseUser);

    var responsePost = $("<div id='main_post'></div>");
    responsePage.append(responsePost);

    var polls = $("<div id='polls'></div>");
    var poll1 = $("<ons-icon id='pollicon1' onclick='agreePost("+topicID+","+postID+")' icon='ion-thumbsup' size='35px'></ons-icon>");
    var poll2 = $("<ons-icon id='pollicon2' onclick='objectPost("+topicID+","+postID+")' icon='ion-thumbsdown' size='35px'></ons-icon><br>");
    polls.append(poll1);
    polls.append(poll2);
    polls.append("<span id='pollnum1'>"+allTopics[topicindex].posts[postindex].polls.numAgree+"</span>");
    polls.append("<span id='pollnum2'>"+allTopics[topicindex].posts[postindex].polls.numObject+"</span>");

    if(allTopics[topicindex].posts[postindex].postkeyword.length == 0){
      responsePost.append("<img style='  width:94%;margin:12px;' src='"+allTopics[topicindex].posts[postindex].postPic+"'>");
      responsePost.append("<div style='font-size:17px;margin-left: 20px;'>"+allTopics[topicindex].posts[postindex].postText+"</div>");
      responsePost.append("<p style='font-size:16px;color:#999999;'>"+currentAuthor.signature+"</p>");
    }else{
      //private post
      console.log("post before decrypting: "+allTopics[topicindex].posts[postindex].postText);
      var origText = AesCtr.decrypt(allTopics[topicindex].posts[postindex].postText, allTopics[topicindex].posts[postindex].postkeyword, 256);

      console.log("post after decrypting: "+origText);
      if(window.localStorage.getItem("Nickname") == currentAuthor.nickname){
        //My post
        responsePost.append("<img style='  width:94%;margin:12px;' src='"+allTopics[topicindex].posts[postindex].postPic+"'>");
        responsePost.append("<div style='font-size:17px;margin-left: 20px;'>"+origText+"</div>");
        responsePost.append("<p style='font-size:16px;color:#999999;'>"+currentAuthor.signature+"</p>");

        var str = '{"user":"'+window.localStorage.getItem("Nickname")+'","topicId":"'+topicID+'","postId":"'+postID+'"';
        if(window.localStorage.getItem("myVoted").indexOf(str) != (-1)){
          //if i have voted
          var strAgree = '{"user":"'+window.localStorage.getItem("Nickname")+'","topicId":"'+topicID+'","postId":"'+postID+'","vote":"1"';
          if(window.localStorage.getItem("myVoted").indexOf(strAgree) != (-1)){
            //I agreed
            var polls = $("<div id='polls'></div>");
            var poll1 = $("<ons-icon id='pollicon1' onclick='haveVoted()' style='color:#3A9FED' icon='ion-thumbsup' size='35px'></ons-icon>");
            polls.append(poll1);
            responsePost.append(polls);
          }
          else{
            // I objected
            var polls = $("<div id='polls'></div>");
            var poll2 = $("<ons-icon id='pollicon2' onclick='haveVoted()' icon='ion-thumbsdown' size='35px'></ons-icon><br>");
            polls.append(poll2);
            responsePost.append(polls);
          }
        }else{
          //Else i haven't voted
          responsePost.append(polls);
        }

      }else{
        //not my post
        var str = '{"user":"'+window.localStorage.getItem("Nickname")+'","topicId":"'+topicID+'","postId":"'+postID+'"';
        if(window.localStorage.getItem("myInputed").indexOf(str) == (-1)){
          //I haven't input password before
          var lockpost = $("<div id='lockPost'></div>");
          lockpost.append("<ons-icon id='lockIcon' icon='ion-locked' size='17px'></ons-icon>");
          lockpost.append("This is a private post, you have to input the password to see all contents");
          lockpost.append("<span style='color:#3A9FED;' onclick='inputPostkey("+allTopics[topicindex].posts[postindex].postkeyword+","+topicID+","+postID+")'> Unlock</span>");
          responsePost.append(lockpost);
        }else{
          //I have input the password
          responsePost.append("<img style='  width:94%;margin:12px;' src='"+allTopics[topicindex].posts[postindex].postPic+"'>");
          responsePost.append("<div style='font-size:17px;margin-left: 20px;'>"+origText+"</div>");
          responsePost.append("<p style='font-size:16px;color:#999999;'>"+currentAuthor.signature+"</p>");
          responsePost.append(lockpost);
          var str = '{"user":"'+window.localStorage.getItem("Nickname")+'","topicId":"'+topicID+'","postId":"'+postID+'"';
          if(window.localStorage.getItem("myVoted").indexOf(str) != (-1)){
            //if i have voted
            var strAgree = '{"user":"'+window.localStorage.getItem("Nickname")+'","topicId":"'+topicID+'","postId":"'+postID+'","vote":"1"';
            if(window.localStorage.getItem("myVoted").indexOf(strAgree) != (-1)){
              //I agreed
              var polls = $("<div id='polls'></div>");
              var poll1 = $("<ons-icon id='pollicon1' onclick='haveVoted()' style='color:#3A9FED' icon='ion-thumbsup' size='35px'></ons-icon>");
              polls.append(poll1);
              responsePost.append(polls);
            }
            else{
              // I objected
              var polls = $("<div id='polls'></div>");
              var poll2 = $("<ons-icon id='pollicon2' onclick='haveVoted()' icon='ion-thumbsdown' size='35px'></ons-icon><br>");
              polls.append(poll2);
              responsePost.append(polls);
            }
          }else{
            //Else i haven't voted
            responsePost.append(polls);
          }
        }
      }
    }

    for(index in allTopics[topicindex].posts[postindex].comments){
      var currentAuthor = getUser(allTopics[topicindex].posts[postindex].comments[index].commentAuthor);
      var commentID = allTopics[topicindex].posts[postindex].comments[index].commentId;
      var responseComment = $("<div id='comments'></div>");
      var commentWriter = $("<div id='response_writer'></div>");

      responseComment.append(commentWriter);
      var commentPic = $("<div id='response_pic'></div>");
      commentPic.append("<img src='img/head.jpg'>");
      var commentUser = $("<div id='comment_user'></div>");
      commentUser.append("<span style='font-size:17px;color:#0060AA;'>"+currentAuthor.nickname+"</span>");
      var deleteIcon = $("<ons-icon style='float:right;margin-right:15px;' size='22px' icon='ion-more' ></ons-icon><br>")
      var replyIcon = $("<ons-icon style='float:right;margin-right:15px;' size='22px' icon='ion-more' ></ons-icon><br>")
      if(window.localStorage.getItem("Nickname") == currentAuthor.nickname){
        commentUser.append(deleteIcon);
        deleteMyComment(deleteIcon,topicID,postID,commentID);
      }else{
        commentUser.append(replyIcon);
        replyOtherComment(replyIcon,topicID,postID,index);
      }
      commentUser.append("<span style='font-size:14px;'>"+allTopics[topicindex].posts[postindex].comments[index].commentDate+"</span>");
      commentWriter.append(commentPic);
      commentWriter.append(commentUser);
      responseComment.append("<p style='font-size:16px; margin-left:60px;'>"+allTopics[topicindex].posts[postindex].comments[index].commentText+"");
      responseComment.append("<p style='font-size:12px;color:#999999; margin-left:60px;'>"+currentAuthor.signature+"");
      responsePage.append(responseComment);

    }
    $("#belowbar").append(responsePage);
    var topicbartitle=$("<span>"+allTopics[topicindex].topicTitle+"</span>");
    $("#topicbar2").append(topicbartitle);
  };

  function haveVoted(){
    ons.notification.alert('You have voted before.');
  }

  function agreePost(id1,id2){
    var follow = isFollow(window.localStorage.getItem("Username"),id1);

    if(window.localStorage.getItem("Username") == null){
      ons.notification.alert('You have to sign in.');
    }else{
      if(follow){
        if($("#pollicon1").css("color") == "rgb(153, 153, 153)"){
          //Have't clicked agree - agree
          var thisVoted = {"user":""+window.localStorage.getItem("Nickname")+"","topicId":""+id1+"","postId":""+id2+"","vote":"1"};

          var myVoted = window.localStorage.getItem("myVoted");
          var myVotedDecoded = JSON.parse(myVoted);
          myVotedDecoded.push(thisVoted);
          var newMyVotedEncoded = JSON.stringify(myVotedDecoded);
          window.localStorage.setItem("myVoted",newMyVotedEncoded);

          AgreeOrObject(id1,id2,1);
          $("#pollicon1").css("color","#3A9FED");
          $("#pollicon2").css("display","none");
          $("#pollnum1").css("display","none");
          $("#pollnum2").css("display","none");
        }
      }else{
        ons.notification.alert('You have to follow this topic firstly.');
      }
    }
  }

  function objectPost(id1,id2){
    var follow = isFollow(window.localStorage.getItem("Username"),id1);

    if(window.localStorage.getItem("Username") == null){
      ons.notification.alert('You have to sign in.');
    }else{
      if(follow){
        if($("#pollicon2").css("color") == "rgb(153, 153, 153)"){
          var thisVoted = {"topicId":""+id1+"","postId":""+id2+"","vote":"0"};
          var myVoted = window.localStorage.getItem("myVoted");
          console.log(myVoted);
          var myVotedDecoded = JSON.parse(myVoted);
          console.log(myVotedDecoded);
          myVotedDecoded.push(thisVoted);
          var newMyVotedEncoded = JSON.stringify(myVotedDecoded);
          console.log(newMyVotedEncoded);
          window.localStorage.setItem("myVoted",newMyVotedEncoded);

          AgreeOrObject(id1,id2,3);
          $("#pollicon2").css("color","#3A9FED");
          $("#pollicon1").css("display","none");
          $("#pollnum1").css("display","none");
          $("#pollnum2").css("display","none");
        }
      }else{
        ons.notification.alert('You have to follow this topic firstly.');
      }
    }
  }

  /*
  This function shows user page
  In project 1, we are using static data.
  This function shows all data that are in the "users" variable.
  */
  function showUserpage(currentUser){
    var nickname = window.localStorage.getItem("Nickname");
    var signature;
    if(window.localStorage.getItem("Signature") == "null"){
      signature = "Please input your signature (footer)"
    }else{
      signature = window.localStorage.getItem("Signature");
    }

    var headpic = window.localStorage.getItem("Headpic");

    var userTop = $("<div id='user_top'></div>");
    var userTopLeft = $("<div id='user_top_left' style='float:left' ><img style='width:80px;height:80px;' src='"+headpic+"'>");
    var userTopCenter = $("<div id='user_top_center'></div>");
    userTopCenter.append("<span style='font-weight:bold;font-size:24px;'>"+nickname+"</span><br/>");
    userTopCenter.append("<div style='display:block;margin-top:10px;font-size:16px;'>"+signature+"</div><br/>");
    var userTopicRight = $("<div id='user_top_right'><ons-icon icon='ion-chevron-right'></ons-icon></div>");
    userTop.append(userTopLeft);
    userTop.append(userTopCenter);
    userTop.append(userTopicRight);
    var userBottom1 = $("<div id='user_bottom'></div>");
    var bottomList1 = $("<div class='user_bottom_lists' ><ons-icon size='25px' class='iconthem' icon='ion-android-favorite'></ons-icon>&nbsp;My Teams<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
    var bottomList2 = $("<div class='user_bottom_lists' ><ons-icon size='25px' class='iconthem' icon='ion-document-text'></ons-icon>&nbsp;&nbsp;My Posts<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
    var bottomList3 = $("<div class='user_bottom_lists' ><ons-icon size='21px' class='iconthem' icon='ion-eye'></ons-icon>&nbsp;Recent Viewing<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
    if(navigator.onLine){
      userTop.on("click",function(){
        myNavigator.pushPage("profile.html",{data:{currentuser:currentUser}});
      })
      bottomList1.on("click",function(){
        myNavigator.pushPage("myteams.html",{data:{currentuser:currentUser}});
      })
      bottomList2.on("click",function(){
        myNavigator.pushPage("myposts.html",{data:{currentuser:currentUser}});
      })
    }
    bottomList3.on("click",function(){
      myNavigator.pushPage("viewing.html");
    })
    userBottom1.append(bottomList1);
    userBottom1.append(bottomList2);
    userBottom1.append(bottomList3);
    var userBottom2 = $("<div id='user_bottom'></div>");
    var bottomList5 = $("<div class='user_bottom_lists' ><ons-icon size='23px' class='iconthem' icon='ion-information-circled'></ons-icon>&nbsp;App Info<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
    bottomList5.on("click",function(){
      myNavigator.pushPage("appinfo.html");
    })
    userBottom2.append(bottomList5);
    var userBottom3 = $("<div id='user_bottom'></div>");
    var bottomList6 = $("<div style='height:50px;line-height:50px;text-align:center;color:#247ABA;font-size:20px;font-weight:bold;' class='user_bottom_lists' >Log out</div>");
    userBottom3.append(bottomList6);
    $("#usermainpage").append(userTop);
    $("#usermainpage").append(userBottom1);
    $("#usermainpage").append(userBottom2);
    $("#usermainpage").append(userBottom3);
    bottomList6.on("click",function(){
      logout();
    })
  }

  /*
  This function shows profile page
  In project 1, we are using static data.
  This function shows all data that are in the "users" variable.
  */
  function showProfile(currentuser){
    var nickname = window.localStorage.getItem("Nickname");
    var signature;
    if(window.localStorage.getItem("Signature") == "null"){
      signature = ""
    }else{
      signature = window.localStorage.getItem("Signature");
    }
    var username = window.localStorage.getItem("Username");

    var head = $("<div id='user_top_left' style='margin:20px auto;' ><img style='width:80px;height:80px;' src='"+currentuser.headpic+"'></div>");
    $("#contentofp").append(head);
    var changehead = $("<span style='text-align:center;font-size:17px;display:block;color:#3A9FED;margin:10px auto;'>Change Profile Photo<span>");
    $("#contentofp").append(changehead);
    changehead.on("click",function(){

    });
    var userBottom = $("<div id='user_bottom'></div>");
    var bottomList0 = $("<div class='user_bottom_lists' font-size:20px;>&nbsp;&nbsp;&nbsp;Username:&nbsp;&nbsp;&nbsp;<input style='line-height:30px;font-size:20px;' readOnly='true' placeholder='"+username+"'></input></div>");
    var bottomList1 = $("<div class='user_bottom_lists' font-size:20px;>&nbsp;&nbsp;&nbsp;Nickname:&nbsp;&nbsp;&nbsp;<input id='proin1'  style='line-height:30px;font-size:18px;' maxlength='15' type='text' value='"+nickname+"'></input></div>");
    var bottomList2 = $("<div class='user_bottom_lists' style='height:70px;'><div style='float:left;'>&nbsp;&nbsp;&nbsp;Signature:&nbsp;&nbsp;&nbsp;&nbsp;</div><textarea id='proin2' maxlength='55' type='text' style='float:left;font-size:15px;height:60px;line-height:30px;width:60%' >"+signature+"</textarea></div>");
    userBottom.append(bottomList0);
    userBottom.append(bottomList1);
    userBottom.append(bottomList2);
    $("#contentofp").append(userBottom);

    var userBottom2 = $("<div id='user_bottom'></div>");
    var bottomList6 = $("<div style='height:50px;line-height:50px;font-size:20px;text-align:center;color:#247ABA;font-weight:bold;' class='user_bottom_lists' >Save</div>");
    userBottom2.append(bottomList6);
    $("#contentofp").append(userBottom2);
    bottomList6.on("click",function(){
      showModal();
      setTimeout(function() {
        var nickName = document.getElementById('proin1').value;
        var signature = document.getElementById('proin2').value;
        window.localStorage.setItem("Nickname",nickName);
        window.localStorage.setItem("Signature",signature);
        editProfile(currentuser,nickName,signature);

        ons.notification.alert('Save successfully.');
        updatePages3(currentuser);
        myNavigator.popPage();
      }, 500);
    })
  }


  function editProfile(currentuser,nickName,signature){
    var dataChanged;
    var newUser={"username":currentuser.username,"password":currentuser.password,"nickname":nickName,"signature":signature,"headpic":null,"myTopics":currentuser.myTopics,"myPosts":currentuser.myPosts};

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
      type: "POST",
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

  /*
  This function shows myteams page
  In project 1, we are using static data.
  This function shows all data that are in the "users" variable.
  */
  function showMyteams(currentuser){
    var allTopics = getTopics();

    for(index1 in currentuser.myTopics){
      var topicindex;
      for(index2 in allTopics){
        if(parseInt(allTopics[index2].topicId) == parseInt(currentuser.myTopics[index1].topicId)){
          topicindex = index2;
          break;
        }
      }
      var listitem = $("<ons-list-item style='margin:12px;width:94%;background-color:white;height:85px;border-radius:8px;'></ons-list-item>");
      var listitemLeft = $("<div class='left'></div>");
      listitemLeft.append("<img class='list-item__thumbnail' style='height:60px;width:60px;' src='"+allTopics[parseInt(topicindex)].topicPic +"'>");
      var listitemCenter = $("<div class='center'></div>");
      listitemCenter.append("<span style='display:block;float:left;font-size:18px;' class='list-item__title'>"+allTopics[parseInt(topicindex)].topicTitle+"</span>");
      listitem.append(listitemLeft);
      listitem.append(listitemCenter);
      $("#tem").append(listitem);
      topicslistTOtopic(listitem,allTopics[parseInt(topicindex)].topicId);
    }
  }

  /*
  This function shows myposts page
  In project 1, we are using static data.
  This function shows all data that are in the "users" variable.
  */
  function showMyposts(currentuser){
    var allTopics = getTopics();
    var postTitle;
    var postDate;
    var currentuser = getUser(window.localStorage.getItem("Username"));

    for(index in currentuser.myPosts){
      for(index2 in allTopics){
        if(allTopics[index2].topicId == currentuser.myPosts[index].topicId){
          for(index3 in allTopics[index2].posts){
            if(allTopics[index2].posts[index3].postId == currentuser.myPosts[index].postId){
              postTitle = allTopics[index2].posts[index3].postTitle;
              postDate = allTopics[index2].posts[index3].postDate;
            }
          }
        }
      }

      var responseComment = $("<div style='background-color:white;' id='comments'></div>");
      responseComment.append("<p style='font-size:18px;padding-top:10px;'>"+postTitle+"");
      var commentWriter = $("<div style='margin-bottom:0px;' id='response_writer'></div>");
      responseComment.append(commentWriter);
      var commentPic = $("<div id='mypost_pic'></div>");
      commentPic.append("<img src='img/head.jpg'>");
      var commentUser = $("<div id='response_user'></div>");
      commentUser.append("<span style='font-size:17px;color:#0060AA;'>"+window.localStorage.getItem("Nickname")+"</span>&nbsp;&nbsp;&nbsp;");
      commentUser.append("<span style='font-size:14px;'>"+postDate+"</span>");
      commentWriter.append(commentPic);
      commentWriter.append(commentUser);
      $("#postofmine").append(responseComment);

      abstractsTOpost(responseComment,currentuser.myPosts[index].topicId,currentuser.myPosts[index].postId);
    }
  }

  /*
  This function shows my Recentviewing
  In project 1, we are using static data.
  This function shows all data that are in the "users" variable.
  */
  function showRecentviewing(){
    var allTopics = getTopics();
    var postTitle;
    var postDate;

    var topicId = window.localStorage.getItem("RecentTopicId").trim().split(" ");
    var postId = window.localStorage.getItem("RecentPostId").trim().split(" ");
    if(topicId[0] != ""){
      for(index1 in topicId){
        for(index2 in allTopics){
          if(allTopics[index2].topicId == topicId[index1]){
            for(index3 in allTopics[index2].posts){
              if(allTopics[index2].posts[index3].postId == postId[index1]){
                postTitle = allTopics[index2].posts[index3].postTitle;
                postDate = allTopics[index2].posts[index3].postDate;
              }
            }
          }
        }
        var responseComment = $("<div style='background-color:white;' id='comments'></div>");
        responseComment.append("<p style='font-size:18px;padding-top:10px;'>"+postTitle+"");
        var commentWriter = $("<div style='margin-bottom:0px;' id='response_writer'></div>");
        responseComment.append(commentWriter);
        var commentPic = $("<div id='mypost_pic'></div>");
        commentPic.append("<img src='img/head.jpg'>");
        var commentUser = $("<div id='response_user'></div>");
        commentUser.append("<span style='font-size:17px;color:#0060AA;'>"+window.localStorage.getItem("Nickname")+"</span>&nbsp;&nbsp;&nbsp;");
        commentUser.append("<span style='font-size:14px;'>"+postDate+"</span>");
        commentWriter.append(commentPic);
        commentWriter.append(commentUser);
        $("#recentView").append(responseComment);

        abstractsTOpost(responseComment,topicId,postId);
      }
    }
  }

  function addPasswordKey(){
    ons.notification.prompt({message: 'Input your post password key'})
    .then(function(password) {
      $("#private").css("display","none");
      $("#public").css("display","block");
      $("#passwordKey").html(password);
    });
  }

  function deletePasswordKey(){
    $("#private").css("display","block");
    $("#public").css("display","none");
    $("#passwordKey").html("");
  }

  function inputPostkey(correctPassword,topicID,postID){
    var allTopics = getTopics();
    var topicindex;
    for(index in allTopics){
      if(allTopics[index].topicId == topicID){
        topicindex = index;
        break;
      }
    }

    var postindex;
    for(index in allTopics[topicindex].posts){
      if(allTopics[topicindex].posts[index].postId == postID){
        postindex = index;
        break;
      }
    }

    var currentAuthor = getUser(allTopics[topicindex].posts[postindex].postAuthor);

    ons.notification.prompt({message: 'Input post password key'})
    .then(function(password) {
      if(correctPassword == password){
        console.log("post before decrypting: "+allTopics[topicindex].posts[postindex].postText);
        var origText = AesCtr.decrypt(allTopics[topicindex].posts[postindex].postText, allTopics[topicindex].posts[postindex].postkeyword, 256);
        console.log("post after decrypting: "+origText);
        $("#lockPost").css("display","none");
        $("#main_post").append("<img style='  width:94%;margin:12px;' src='"+allTopics[topicindex].posts[postindex].postPic+"'>");
        $("#main_post").append("<div style='font-size:17px;margin-left: 20px;'>"+origText+"</div>");
        $("#main_post").append("<p style='font-size:16px;color:#999999; '>"+currentAuthor.signature+"</p>");
          var str = '{"user":"'+window.localStorage.getItem("Nickname")+'","topicId":"'+topicID+'","postId":"'+postID+'"';
        if(window.localStorage.getItem("myVoted").indexOf(str) != (-1)){
          //if i have voted
          var strAgree = '{"user":"'+window.localStorage.getItem("Nickname")+'","topicId":"'+topicID+'","postId":"'+postID+'","vote":"1"';
          if(window.localStorage.getItem("myVoted").indexOf(strAgree) != (-1)){
            //I agreed
            var polls = $("<div id='polls'></div>");
            var poll1 = $("<ons-icon id='pollicon1' onclick='haveVoted()' style='color:#3A9FED' icon='ion-thumbsup' size='35px'></ons-icon>");
            polls.append(poll1);
            $("#main_post").append(polls);
            }
          else{
            // I objected
            var polls = $("<div id='polls'></div>");
            var poll2 = $("<ons-icon id='pollicon2' onclick='haveVoted()' icon='ion-thumbsdown' size='35px'></ons-icon><br>");
            polls.append(poll2);
            $("#main_post").append(polls);
          }
        }else{
          //Else i haven't voted
          var polls = $("<div id='polls'></div>");
          var poll1 = $("<ons-icon id='pollicon1' onclick='agreePost("+topicID+","+postID+")' icon='ion-thumbsup' size='35px'></ons-icon>");
          var poll2 = $("<ons-icon id='pollicon2' onclick='objectPost("+topicID+","+postID+")' icon='ion-thumbsdown' size='35px'></ons-icon><br>");
          polls.append(poll1);
          polls.append(poll2);
          polls.append("<span id='pollnum1'>"+allTopics[topicindex].posts[postindex].polls.numAgree+"</span>");
          polls.append("<span id='pollnum2'>"+allTopics[topicindex].posts[postindex].polls.numObject+"</span>");
          $("#main_post").append(polls);
        }
        var thisInputed = {"user":""+window.localStorage.getItem("Nickname")+"","topicId":""+topicID+"","postId":""+postID+""};

        var myInputed = window.localStorage.getItem("myInputed");
        var myInputedDecoded = JSON.parse(myInputed);
        myInputedDecoded.push(thisInputed);
        var newMyInputedEncoded = JSON.stringify(myInputedDecoded);
        window.localStorage.setItem("myInputed",newMyInputedEncoded);
      }else{
        ons.notification.alert('Incorrect password key');
      }
    });
  }

  // ****************************************
  //  WEB APPLICATION LOAD
  // ****************************************
  $(document).ready(function(){
    // showPrompt();

    var username = window.localStorage.getItem("Username");
    var password = window.localStorage.getItem("Password");

    if(username != null){
      if (navigator.onLine) {
        //Connect to the Internet
        var currentUser = getUser(username);
        var correctPassword = currentUser.password;
        if(password == correctPassword){
          updatePages3(currentUser);

          document.getElementById("beforelogin").style.display = "none";
          document.getElementById("usermainpage").style.display = "block";
        }else{
          ons.notification.alert('Password has been changed, you have to sign in again.');
        }
      } else {
        //No internet
        $("#usermainpage").html(" ");
        showUserpage(currentUser);

        document.getElementById("beforelogin").style.display = "none";
        document.getElementById("usermainpage").style.display = "block";

        $("#onslist").html(" ");
        showTopicsList();
      }
    }
  });
