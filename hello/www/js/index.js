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
  }
};

app.initialize();

app.showFromObject = function (id1,id2) {
  ons.openActionSheet({
    cancelable: true,
    buttons: [
      'Reply',
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
          myNavigator.pushPage("addareply.html",{data:{tid:id1,pid:id2}});
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



function login () {
  var userName = document.getElementById('_account').value;
  var passWord = document.getElementById('_pwd').value;

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
        window.localStorage.setItem("Password",currentUser.password);
        window.localStorage.RecentTopicId = " ";
        window.localStorage.RecentPostId = " ";

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

  window.localStorage.clear();
  updatePages1();
};

function register(){
  var userName = document.getElementById('_accountt').value;
  var passWord = document.getElementById('_pwdd').value;

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
      showTopicsList();
    }else if (event.target.id === 'topicmain') {
      showTopic(event.target.data.id);
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

  function topicTOaddpost(node,topicID){
    var follow = isFollow(window.localStorage.getItem("Username"),topicID);

    if(window.localStorage.getItem("Username") == null){
      node.on("click",function(){
        ons.notification.alert('You have to sign in');
      })
    }else{
      node.on("click",function(){
        if(follow){
          myNavigator.pushPage('addapost.html',{data:{id:topicID}});
        }else{
          ons.notification.alert('You have to follow this topic firstly.');
        }
      })
    }
  };

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
    if(window.localStorage.getItem("Username") == null){
      for(index in allTopics){
        var listitem = $(ons._util.createElement("<ons-list-item style='height:75px;'></ons-list-item>"));
        var listitemLeft = $(ons._util.createElement("<div class='left'></div>"));
        listitemLeft.append("<img class='list-item__thumbnail' src='"+allTopics[index].topicPic +"'>");
        var listitemCenter = $(ons._util.createElement("<div class='center'></div>"));
        listitemCenter.append("<span style='display:block;float:left;' class='list-item__title'>"+allTopics[index].topicTitle+"</span>");
        listitemCenter.append("<span class='list-item__subtitle'>"+ allTopics[index].subscribeNum+" members</span>");
        var listitemRight = $(ons._util.createElement("<div class='right'></div>"));
        var listitemRightSection = $(ons._util.createElement("<section style='margin: 4px;'></section>"));
        var join = $("<ons-button id='onsbutton1' style='display:block; padding:0 4px;color:#0060AA;background-color:white;border:1px solid #3CA0EC'> &nbsp;&nbsp;Join&nbsp;&nbsp; </ons-button>");
        var joined = $("<ons-button id='onsbutton2' style='display:none; padding:0;color:#ADADAE;font-size:14px;background-color:white;border:1px solid #ADADAE'> &nbsp;&nbsp;Joined&nbsp;&nbsp; </ons-button>");
        listitemRight.append(listitemRightSection);
        listitemRightSection.append(join);
        listitemRightSection.append(joined);
        listitem.append(listitemLeft);
        listitem.append(listitemCenter);
        listitem.append(listitemRight);
        $("#onslist").append(listitem);
        join.on("click",function(){
          ons.notification.alert('You have to sign in');
        })
        topicslistTOtopic(listitemCenter,allTopics[index].topicId);
      }}else{
        var currentUser = getUser(window.localStorage.getItem("Username"));
        for(index in allTopics){
          var listitem = $(ons._util.createElement("<ons-list-item style='height:75px;'></ons-list-item>"));
          var listitemLeft = $(ons._util.createElement("<div class='left'></div>"));
          listitemLeft.append("<img class='list-item__thumbnail' src='"+allTopics[index].topicPic +"'>");
          var listitemCenter = $(ons._util.createElement("<div class='center'></div>"));
          listitemCenter.append("<span style='display:block;float:left;' class='list-item__title'>"+allTopics[index].topicTitle+"</span>");
          listitemCenter.append("<span class='list-item__subtitle'>"+ allTopics[index].subscribeNum+" members</span>");
          var listitemRight = $(ons._util.createElement("<div class='right'></div>"));
          var listitemRightSection = $(ons._util.createElement("<section style='margin: 4px;'></section>"));
          join = $("<ons-button id='onsbutton1' style='padding:0 4px;color:#0060AA;background-color:white;border:1px solid #3CA0EC'> &nbsp;&nbsp;Join&nbsp;&nbsp; </ons-button>");

          for(myIndex in currentUser.myTopics){
            if(currentUser.myTopics[myIndex].topicId == allTopics[index].topicId){
              join = $("<ons-button id='onsbutton1' style='padding:0;color:#ADADAE;font-size:14px;background-color:white;border:1px solid #ADADAE'> &nbsp;&nbsp;Joined&nbsp;&nbsp; </ons-button>");
            }
          }
          listitemRight.append(listitemRightSection);
          listitemRightSection.append(join);
          listitem.append(listitemLeft);
          listitem.append(listitemCenter);
          listitem.append(listitemRight);
          $("#onslist").append(listitem);

          joinTeam(join,currentUser,allTopics[index].topicId);
          topicslistTOtopic(listitemCenter,allTopics[index].topicId);
        }
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
      topicBannerContent.append("<img src='"+allTopics[topicID-1].topicPic+"'>");
      var topicBannerWords = $("<div id='ban_words'></div>");
      topicBannerContent.append(topicBannerWords);
      topicBannerWords.append("<span id='topic'>"+allTopics[topicID-1].topicTitle+"</span><br/>");
      var lab = $("<div class='lab'></div>");
      topicBannerWords.append(lab);
      lab.append("<span style='font-weight:normal;'>Members</span>&nbsp;"+allTopics[topicID-1].subscribeNum+"&nbsp;&nbsp;");
      lab.append("<span style='font-weight:normal;'>Posts</span>&nbsp;"+allTopics[topicID-1].posts.length+"")
      $("#topic_banner").append(topicBannerContent);
      var addpost = $("#addpost");
      var topicbartitle=$("<span>"+allTopics[topicID-1].topicTitle+"</span>");
      $("#topicbar").append(topicbartitle);
      showPostAbstracts(topicID);
      topicTOaddpost(addpost,topicID);
    };

    /*
    This function shows all forum post abstracts
    In project 1, we are using static data.
    This function shows all post abstracts that are in the "topics" variable.
    */
    function showPostAbstracts(topicID){
      var allTopics = getTopics();
      var article = $("<div id='articles'></div>");
      for(index in allTopics[topicID-1].posts){
        var currentAuthor = getUser(allTopics[topicID-1].posts[index].postAuthor);
        var postAbstract = $("<div class='contents'></div>");
        var mainContent = $("<div class='bod'></div>");
        mainContent.append("<div class='title'>"+ allTopics[topicID-1].posts[index].postTitle +"</div>");
        mainContent.append("<div class='pics'><img src="+ allTopics[topicID-1].posts[index].postPic + "></div>");
        var footContent = $("<div class='footer'></div>");
        footContent.append("<a>"+ currentAuthor.nickname +"&nbsp;</a>");
        footContent.append("<span>"+ allTopics[topicID-1].topicTitle +"</span>");
        var counts = $("<div style='margin-top:0px;' id='countss'></div>");
        counts.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;");
        counts.append("<span>159</span>&nbsp;&nbsp;&nbsp;");
        counts.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;");
        counts.append("<span>"+allTopics[topicID-1].posts[index].comments.length+"</span>");
        footContent.append(counts);
        // footContent.append("<div id='counts'></div>");
        // footContent.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;<span>257</span>&nbsp;&nbsp;&nbsp;")
        // footContent.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;<span>303</span>");
        postAbstract.append(mainContent);
        postAbstract.append(footContent);
        article.append(postAbstract);
        abstractsTOpost(postAbstract,topicID,allTopics[topicID-1].posts[index].postId);
      }
      $("#postabstrcts").append(article);
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
        abstractsTOpost(postAbstract,parseInt(topic)+1,parseInt(post)+1);
        $("#allpostabstrcts").append(article);
      }
    }

    /*
    This function shows a add post page and finish the add post function
    In project 1, we are using static data.
    This function shows all posts that are in the "topics" variable.
    */
    function showAddPost(topicID){
      var allTopics = getTopics();
      var addclick = $("<p style='margin-right:15px;margin-bottom:5px;font-weight:500;width:40px;'>Add</p>");
      $("#barofAddpost").append(addclick);
      addclick.on("click",function(){
        var postid = allTopics[parseInt(topicID-1)].posts.length+1;
        var posttitle = document.getElementById('postTitle').value;
        var posttext = document.getElementById('postText').value;
        var postdate = "10 minutes ago";
        var postpic = "";

        showModal();

        setTimeout(function() {
          addPost(topicID,postid,posttitle,posttext,window.localStorage.getItem("Username"),postdate,postpic);
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
    This function shows a add reply page and finish the add reply function
    In project 1, we are using static data.
    This function shows all posts that are in the "topics" variable.
    */
    function showaAddReply(topicID,postID){
      var allTopics = getTopics();
      var addclick = $("<p style='margin-right:15px;margin-bottom:5px;font-weight:500;width:40px;'>Reply</p>");
      $("#barofAddreply").append(addclick);
      addclick.on("click",function(){
        var commenttext = document.getElementById('commentText').value;
        var commentDate = "Just now"
        addReply(topicID,postID,commenttext,window.localStorage.getItem("Username"),commentDate);
        ons.notification.alert('Comment successfully.');
        setTimeout(function() {

          updatePages2(topicID);
          updatePages1();
          updatePages4(parseInt(topicID),parseInt(postID));

          myNavigator.popPage();
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
      var currentAuthor = getUser(allTopics[topicID-1].posts[postID-1].postAuthor);
      $("#topicbar3").append("<ons-toolbar-button><ons-icon  style='color:#FFFFFF' icon='ion-more' onclick='app.showFromObject("+topicID+","+postID+")'></ons-icon></ons-toolbar-button>");
      var responsePage = $("<div id='response_page'></div>");
      var responseTitle = $("<div id='response_title'></div>");
      responsePage.append(responseTitle);
      responseTitle.append("<span>" + allTopics[topicID-1].posts[postID-1].postTitle + "</span><br/>");
      var counts = $("<div id='countss'></div>");
      counts.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;");
      counts.append("<span>159</span>&nbsp;&nbsp;&nbsp;");
      counts.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;");
      counts.append("<span>"+allTopics[topicID-1].posts[postID-1].comments.length+"</span>");
      responseTitle.append(counts);
      var responseWriter = $("<div id='response_writer'></div>");
      responsePage.append(responseWriter);
      var responsePic = $("<div id='response_pic'></div>");
      responsePic.append("<img src='"+allTopics[topicID-1].posts[postID-1].postPic+"'>");
      var responseUser = $("<div id='response_user'></div>");
      responseUser.append("<span style='font-size:18px;color:#0060AA;margin-bottm:20px;'>"+currentAuthor.nickname+"</span><br/>");
      responseUser.append("<span style='font-size:14px;'>"+allTopics[topicID-1].posts[postID-1].postDate+"</span>");
      var responseDelete = $("<div style='margin-top:10px;margin:20px;color: #5C91C0;font-size: 15px;' id='response_delete'>Delete this post</div>");
      responseWriter.append(responsePic);
      responseWriter.append(responseUser);
      if(window.localStorage.getItem("Nickname") == currentAuthor.nickname){
        responsePage.append(responseDelete);
      }
      responseDelete.on("click",function(){
        ons.notification.confirm
        ({message: 'All comments will be deleted after deleting this post.'})
        .then(
          function (index) {
            if(index===1){
              showModal();

              setTimeout(function() {
                deleteMyPost(window.localStorage.getItem("Nickname"),topicID,postID);
                deletePost(topicID,postID);

                var currentUser = getUser(window.localStorage.getItem("Username"));
                updatePages2(topicID);
                updatePages1();
                updatePages3(currentUser);

                myNavigator.popPage();
              }, 300);
            }
          }
        )
      });

      var responsePost = $("<div id='main_post'></div>");
      responsePage.append(responsePost);
      responsePost.append("<img src='"+allTopics[topicID-1].posts[postID-1].postPic+"'>");

      responsePost.append("<p style='font-size:17px;'>"+allTopics[topicID-1].posts[postID-1].postText+"");
      responsePost.append("<p style='font-size:16px;color:#999999; margin-left:20px;'>"+currentAuthor.signature+"");



      for(index in allTopics[topicID-1].posts[postID-1].comments){
        var currentAuthor = getUser(allTopics[topicID-1].posts[postID-1].comments[index].commentAuthor);

        var responseComment = $("<div id='comments'></div>");
        var commentWriter = $("<div id='response_writer'></div>");

        responseComment.append(commentWriter);
        var commentPic = $("<div id='response_pic'></div>");
        commentPic.append("<img src='img/head.jpg'>");
        var commentUser = $("<div id='response_user'></div>");
        commentUser.append("<span style='float:left;font-size:17px;color:#0060AA;'>"+currentAuthor.nickname+"</span>");
        commentUser.append("<span style='float:right;margin-left:20px;font-size:16px;'>"+allTopics[topicID-1].posts[postID-1].comments[index].commentDate+"</span>");
        commentWriter.append(commentPic);
        commentWriter.append(commentUser);
        responseComment.append("<p style='font-size:16px; margin-left:60px;'>"+allTopics[topicID-1].posts[postID-1].comments[index].commentText+"");
        responseComment.append("<p style='font-size:12px;color:#999999; margin-left:60px;'>"+currentAuthor.signature+"");
        responsePage.append(responseComment);
      }
      $("#belowbar").append(responsePage);
      var topicbartitle=$("<span>"+allTopics[topicID-1].topicTitle+"</span>");
      $("#topicbar2").append(topicbartitle);
    };

    /*
    This function shows user page
    In project 1, we are using static data.
    This function shows all data that are in the "users" variable.
    */
    function showUserpage(currentUser){
      var nickname = window.localStorage.getItem("Nickname");
      var signature = window.localStorage.getItem("Signature");
      var headpic = window.localStorage.getItem("Headpic");

      var userTop = $("<div id='user_top'></div>");
      var userTopLeft = $("<div id='user_top_left' style='float:left' ><img style='width:80px;height:80px;' src='"+headpic+"'>");
      var userTopCenter = $("<div id='user_top_center'></div>");
      userTopCenter.append("<span style='font-weight:bold;font-size:24px;'>"+nickname+"</span><br/>");
      userTopCenter.append("<span style='display:block;margin-top:10px;font-size:17px;'>"+signature+"</span><br/>");
      var userTopicRight = $("<div id='user_top_right'><ons-icon icon='ion-chevron-right'></ons-icon></div>");
      userTop.append(userTopLeft);
      userTop.append(userTopCenter);
      userTop.append(userTopicRight);
      userTop.on("click",function(){
        myNavigator.pushPage("profile.html",{data:{currentuser:currentUser}});
      })

      var userBottom1 = $("<div id='user_bottom'></div>");
      var bottomList1 = $("<div class='user_bottom_lists' ><ons-icon size='25px' class='iconthem' icon='ion-android-favorite'></ons-icon>&nbsp;My Teams<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
      bottomList1.on("click",function(){
        myNavigator.pushPage("myteams.html",{data:{currentuser:currentUser}});
      })
      var bottomList2 = $("<div class='user_bottom_lists' ><ons-icon size='25px' class='iconthem' icon='ion-document-text'></ons-icon>&nbsp;&nbsp;My Posts<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
      bottomList2.on("click",function(){
        myNavigator.pushPage("myposts.html",{data:{currentuser:currentUser}});
      })
      var bottomList3 = $("<div class='user_bottom_lists' ><ons-icon size='21px' class='iconthem' icon='ion-eye'></ons-icon>&nbsp;Recent Viewing<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
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
      var bottomList6 = $("<div style='text-align:center;color:#247ABA;font-size:20px;font-weight:bold;' class='user_bottom_lists' >Log out</div>");
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
      var signature = window.localStorage.getItem("Signature");
      var username = window.localStorage.getItem("Username");

      var head = $("<div id='user_top_left' style='margin:20px auto;' ><img style='width:80px;height:80px;' src='"+currentuser.headpic+"'></div>");
      $("#contentofp").append(head);
      var changehead = $("<span style='text-align:center;font-size:17px;display:block;color:#3A9FED;margin:10px auto;'>Change Profile Photo<span>");
      $("#contentofp").append(changehead);
      changehead.on("click",function(){

      });
      var userBottom = $("<div id='user_bottom'></div>");
      var bottomList0 = $("<div class='user_bottom_lists' font-size:20px;>&nbsp;&nbsp;&nbsp;Username:&nbsp;&nbsp;&nbsp;<input style='line-height:30px;font-size:20px;' readOnly='true' placeholder='"+username+"'></input></div>");
      var bottomList1 = $("<div class='user_bottom_lists' font-size:20px;>&nbsp;&nbsp;&nbsp;Nickname:&nbsp;&nbsp;&nbsp;<input id='proin1' style='line-height:30px;font-size:20px;' placeholder='"+nickname+"'></input></div>");
      var bottomList2 = $("<div class='user_bottom_lists' style='height:70px;'><div style='float:left;'>&nbsp;&nbsp;&nbsp;Signature:&nbsp;&nbsp;&nbsp;&nbsp;</div><textarea type='text' id='proin2'  style='float:left;font-size:15px;height:60px;line-height:30px;width:60%' placeholder='"+signature+"'></textarea></div>");
      userBottom.append(bottomList0);
      userBottom.append(bottomList1);
      userBottom.append(bottomList2);
      $("#contentofp").append(userBottom);

      var userBottom2 = $("<div id='user_bottom'></div>");
      var bottomList6 = $("<div style='font-size:20px;text-align:center;color:#247ABA;font-weight:bold;' class='user_bottom_lists' >Save</div>");
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
      for(index in currentuser.myTopics){
        var listitem = $("<ons-list-item style='height:75px;'></ons-list-item>");
        var listitemLeft = $("<div class='left'></div>");
        listitemLeft.append("<img class='list-item__thumbnail' src='"+allTopics[parseInt(currentuser.myTopics[index].topicId-1)].topicPic +"'>");
        var listitemCenter = $("<div class='center'></div>");
        listitemCenter.append("<span style='display:block;float:left;' class='list-item__title'>"+allTopics[parseInt(currentuser.myTopics[index].topicId-1)].topicTitle+"</span>");
        listitemCenter.append("<span class='list-item__subtitle'>"+ allTopics[parseInt(currentuser.myTopics[index].topicId-1)].subscribeNum+" members</span>");
        listitem.append(listitemLeft);
        listitem.append(listitemCenter);
        $("#tem").append(listitem);
        topicslistTOtopic(listitem,allTopics[parseInt(currentuser.myTopics[index].topicId-1)].topicId);
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

    // ****************************************
    //  WEB APPLICATION LOAD
    // ****************************************
    $(document).ready(function(){
      var username = window.localStorage.getItem("Username");
      var password = window.localStorage.getItem("Password");

      if(username != null){
        var currentUser = getUser(username);
        var correctPassword = currentUser.password;
        if(password == correctPassword){
          updatePages3(currentUser);
          //updatePages1();

          document.getElementById("beforelogin").style.display = "none";
          document.getElementById("usermainpage").style.display = "block";
        }else{
          ons.notification.alert('Password has been changed, you have to sign in again.');
        }
      }
    });
