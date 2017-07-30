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

function login () {
  var userName = document.getElementById('_account').value;
  var passWord = document.getElementById('_pwd').value;

  for(index in users){
    if(users[index].username === userName){
      if(users[index].password === passWord){
        showModal();
        setTimeout(function() {
          document.getElementById("beforelogin").style.display="none";
            $("#usermainpage").html(" ");
          showUserpage(index);
          document.getElementById("usermainpage").style.display="block";
          myNavigator.popPage();
        }, 1000);
        break;
      }else {
      }ons.notification.alert('Incorrect username or password.');
      break;
    }else{
      if(parseInt(index) === parseInt(users.length-1)){
        ons.notification.alert('Incorrect username or password.');
      }
    }
  }
};

function logout () {
  document.getElementById("beforelogin").style.display="block";
  document.getElementById("usermainpage").style.display="none";
};

function register(){
  var userName = document.getElementById('_accountt').value;
  var passWord = document.getElementById('_pwdd').value;
  for (index in users){
    if(users[index].username === userName){
      if(parseInt(index) === parseInt(users.length-1)){
        ons.notification.alert('Username has existed.');
        break;
      }
    }
    else if(parseInt(index) === parseInt(users.length-1)){
      users.push({username:userName,password:passWord,nickname:userName,signature:"Please input your signature",headpic:"",myTopics:""});
      ons.notification.alert('Register successfully.');
      setTimeout(function() {
        myNavigator.popPage();
      }, 1000);
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


/****************************************
JS below are created by Jesse
****************************************/


/****************************************
EventListener
****************************************/
document.addEventListener('init', function (event) {
  if (event.target.id === 'topicLists') {
    showTopicsList();
  }else if (event.target.id === 'topicmain') {
    showTopic(event.target.data.id);
  }else if(event.target.id === 'postpage'){
    showPost(event.target.data.topicid,event.target.data.postid);
  }else if(event.target.id === 'addapost'){
    showAddPost(event.target.data.id);
  }else if(event.target.id === 'myteams'){
    showMyteams(event.target.data.userid);
  }else if(event.target.id === 'myposts'){
    showMyposts(event.target.data.userid);
  }else if(event.target.id === 'subscribe'){
    showSubscribe(event.target.data.userid);
  }
  else if(event.target.id === 'userPage'){
    showUserpage(1);
  }
});


//****************************************
//  FUNCTIONS - 1
//****************************************

function topicslistTOtopic(node,topicID){
  node.on("click",function(){
    myNavigator.pushPage('topicmain.html',{data:{id:topicID}});
  })
};

function abstractsTOpost(node,topicID,postID){
  node.on("click",function(){
    myNavigator.pushPage('postpage.html',{data:{topicid:topicID,postid:postID}});
  })
};

function topicTOaddpost(node,topicID){
  node.on("click",function(){
    myNavigator.pushPage('addapost.html',{data:{id:topicID}});
  })
};

/*
This function shows forum topics list
In project 1, we are using static data.
This function shows all topics that are in the "topics" variable.
*/
function showTopicsList(){
  for(index in topics){
    var listitem = $(ons._util.createElement("<ons-list-item style='height:75px;'></ons-list-item>"));
    var listitemLeft = $(ons._util.createElement("<div class='left'></div>"));
    listitemLeft.append("<img class='list-item__thumbnail' src='"+topics[index].topicPic +"'>");
    var listitemCenter = $(ons._util.createElement("<div class='center'></div>"));
    listitemCenter.append("<span style='display:block;float:left;' class='list-item__title'>"+topics[index].topicTitle+"</span>");
    listitemCenter.append("<span class='list-item__subtitle'>"+ topics[index].subscribeNum+" members</span>");
    var listitemRight = $(ons._util.createElement("<div class='right'></div>"));
    var listitemRightSection = $(ons._util.createElement("<section style='margin: 4px;'></section>"));
    listitemRightSection.append("<ons-button id='onsbutton' onclick='joinSuc()' style='padding:0 4px;color:#0060AA;background-color:white;border:1px solid #3CA0EC'> &nbsp;&nbsp;Join&nbsp;&nbsp; </ons-button>");
    listitemRight.append(listitemRightSection);
    listitem.append(listitemLeft);
    listitem.append(listitemCenter);
    listitem.append(listitemRight);
    $("#onslist").append(listitem);

    topicslistTOtopic(listitem,topics[index].topicId);
  }
}

/*
This function shows one topic
In project 1, we are using static data.
This function shows all topics that are in the "topics" variable.
*/
function showTopic(topicID){
  var topicBannerContent = $("<div id='ban_con'></div>");
  topicBannerContent.append("<img src='"+topics[topicID-1].topicPic+"'>");
  var topicBannerWords = $("<div id='ban_words'></div>");
  topicBannerContent.append(topicBannerWords);
  topicBannerWords.append("<span id='topic'>"+topics[topicID-1].topicTitle+"</span><br/>");
  var lab = $("<div class='lab'></div>");
  topicBannerWords.append(lab);
  lab.append("<span style='font-weight:normal;'>Subscriber</span>&nbsp;"+topics[topicID-1].subscribeNum+"&nbsp;&nbsp;");
  lab.append("<span style='font-weight:normal;'>Posts</span>&nbsp;"+topics[topicID-1].postNum+"")
  // var section = $("<ons-button id='joinbutton' > +Join </ons-button>");
  // $("#topic_banner").append(section);
  $("#topic_banner").append(topicBannerContent);
  var addpost = $("<ons-toolbar-button ></ons-toolbar-button>");
  addpost.append("<ons-icon  style='color:#FFFFFF' icon='ion-compose'></ons-icon>");
  $("#addpostbutton").append(addpost);
  var topicbartitle=$("<span>"+topics[topicID-1].topicTitle+"</span>");
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
  var article = $("<div id='articles'></div>");
  for(index in topics[topicID-1].posts){
    var postAbstract = $("<div class='contents'></div>");
    var mainContent = $("<div class='bod'></div>");
    mainContent.append("<div class='title'>"+ topics[topicID-1].posts[index].postTitle +"</div>");
    mainContent.append("<div class='pics'><img src="+ topics[topicID-1].posts[index].postPic + "></div>");
    var footContent = $("<div class='footer'></div>");
    footContent.append("<a>"+ topics[topicID-1].posts[index].postAuthor +"&nbsp;</a>");
    footContent.append("<span>"+ topics[topicID-1].topicTitle +"</span>");
    var counts = $("<div style='margin-top:0px;' id='countss'></div>");
    counts.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;");
    counts.append("<span>159</span>&nbsp;&nbsp;&nbsp;");
    counts.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;");
    counts.append("<span>"+topics[topicID-1].posts[index].comments.length+"</span>");
    footContent.append(counts);
    // footContent.append("<div id='counts'></div>");
    // footContent.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;<span>257</span>&nbsp;&nbsp;&nbsp;")
    // footContent.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;<span>303</span>");
    postAbstract.append(mainContent);
    postAbstract.append(footContent);
    article.append(postAbstract);
    abstractsTOpost(postAbstract,topicID,topics[topicID-1].posts[index].postId);
  }
  $("#postabstrcts").append(article);
};


function showHotPostAbstracts(){
  var article = $("<div id='articles'></div>");
  for(index1 in topics){
    var hot = 0;
    var topic = 0;
    var post = 0;
    for (index2 in topics[index1].posts){
      if((topics[index1].posts[index2].comments.length)>hot){
        hot = topics[index1].posts[index2].comments.length;
        topic = index1;
        post = index2;
      }
    }
    var postAbstract = $("<div class='contents'></div>");
    var mainContent = $("<div class='bod'></div>");
    mainContent.append("<div class='title'>"+ topics[topic].posts[post].postTitle +"</div>");
    mainContent.append("<div class='pics'><img src="+ topics[topic].posts[post].postPic + "></div>");
    var footContent = $("<div class='footer'></div>");
    footContent.append("<a>"+ topics[topic].posts[post].postAuthor +"&nbsp;</a>");
    footContent.append("<span>"+ topics[topic].topicTitle +"</span>");
    var counts = $("<div style='margin-top:0px;' id='countss'></div>");
    counts.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;");
    counts.append("<span>159</span>&nbsp;&nbsp;&nbsp;");
    counts.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;");
    counts.append("<span>"+topics[topic].posts[post].comments.length+"</span>");
    footContent.append(counts);
    // footContent.append("<div id='counts'></div>");
    // footContent.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;<span>257</span>&nbsp;&nbsp;&nbsp;")
    // footContent.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;<span>303</span>");
    postAbstract.append(mainContent);
    postAbstract.append(footContent);
    article.append(postAbstract);
    abstractsTOpost(postAbstract,parseInt(topic)+1,parseInt(post)+1);
  }
  $("#allpostabstrcts").append(article);
}



// If last page can refresh itself, using back button from stack navigation

function showAddPost(topicID){
  console.log(topicID);
  var addclick = $("<ons-back-button style='margin-right:10px;width:40px;color:#3A9FED;'><span style='color:#FFFFFF;'>Add<span></ons-back-button>");
  $("#barofAddpost").append(addclick);
  addclick.on("click",function(){
    addPost(topicID);
  })
}

function addPost(topicID){
  console.log(topicID);
  // var postTitle = document.getElementById('postTitle').value;
  // var postText = document.getElementById('postText').value;
  // 添加 postTitle postText 到 jason
  showModal();
}

// click submit button - pushPage("topic.html")

// function showAddPost(topicID){
//   console.log(topicID);
//   var addclick = $("<p style='margin-right:10px;width:40px;color:balck'>Add</p>");
//   $("#barofAddpost").append(addclick);
//   addclick.on("click",function(){
//     addPost(topicID);
//     myNavigator.pushPage("topicmain.html",{data:{id:topicID}});
// })
// }
// function addPost(topicID){
//   console.log(topicID);
//   var postTitle = document.getElementById('postTitle').value;
//   var postText = document.getElementById('postText').value;
//   添加 postTitle postText 到 jason
//   showModal();
// }

/*
This function shows a post content page
In project 1, we are using static data.
This function shows all posts that are in the "topics" variable.
*/
function showPost(topicID,postID){
  var responsePage = $("<div id='response_page'></div>");
  var responseTitle = $("<div id='response_title'></div>");
  responsePage.append(responseTitle);
  responseTitle.append("<span>" + topics[topicID-1].posts[postID-1].postTitle + "</span><br/>");
  var counts = $("<div id='countss'></div>");
  counts.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;");
  counts.append("<span>159</span>&nbsp;&nbsp;&nbsp;");
  counts.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;");
  counts.append("<span>"+topics[topicID-1].posts[postID-1].comments.length+"</span>");
  responseTitle.append(counts);
  var responseWriter = $("<div id='response_writer'></div>");
  responsePage.append(responseWriter);
  var responsePic = $("<div id='response_pic'></div>");
  responsePic.append("<img src='"+topics[topicID-1].posts[postID-1].postPic+"'>");
  var responseUser = $("<div id='response_user'></div>");
  responseUser.append("<span style='font-size:18px;color:#0060AA;'>"+topics[topicID-1].posts[postID-1].postAuthor+"</span><br/>");
  responseUser.append("<span style='font-size:14px;'>"+topics[topicID-1].posts[postID-1].postDate+"</span>");
  var responseFollow = $("<div id='response_follow'></div>");
  responseWriter.append(responsePic);
  responseWriter.append(responseUser);
  responseWriter.append(responseFollow);
  var responsePost = $("<div id='main_post'></div>");
  responsePage.append(responsePost);
  responsePost.append("<img src='"+topics[topicID-1].posts[postID-1].postPic+"'>");
  responsePost.append("<p style='font-size:17px;'>"+topics[topicID-1].posts[postID-1].postText+"");

  for(index in topics[topicID-1].posts[postID-1].comments){
    var responseComment = $("<div id='comments'></div>");
    var commentWriter = $("<div id='response_writer'></div>");
    responseComment.append(commentWriter);
    var commentPic = $("<div id='response_pic'></div>");
    commentPic.append("<img src='img/head.jpg'>");
    var commentUser = $("<div id='response_user'></div>");
    commentUser.append("<span style='font-size:17px;color:#0060AA;'>"+topics[topicID-1].posts[postID-1].comments[index].commentAuthor+"</span><br/>");
    commentUser.append("<span style='font-size:14px;'>"+topics[topicID-1].posts[postID-1].comments[index].commentDate+"</span>");
    commentWriter.append(commentPic);
    commentWriter.append(commentUser);
    responseComment.append("<p style='font-size:16px;'>"+topics[topicID-1].posts[postID-1].comments[index].commentText+"");
    responsePage.append(responseComment);
  }
  $("#belowbar").append(responsePage);
  var topicbartitle=$("<span>"+topics[topicID-1].topicTitle+"</span>");
  $("#topicbar2").append(topicbartitle);
};

/*
This function shows user page
In project 1, we are using static data.
This function shows all data that are in the "users" variable.
*/
function showUserpage(index){
  var userTop = $("<div id='user_top'></div>");
  var userTopLeft = $("<div id='user_top_left' style='float:left' ><img style='width:80px;height:80px;' src='"+users[index].headpic+"'>");
  var userTopCenter = $("<div id='user_top_center'></div>");
  userTopCenter.append("<span style='font-weight:bold;font-size:24px;'>"+users[index].nickname+"</span><br/>");
  userTopCenter.append("<span style='display:block;margin-top:10px;font-size:17px;'>"+users[index].signature+"</span><br/>");
  var userTopicRight = $("<div id='user_top_right'><ons-icon icon='ion-chevron-right'></ons-icon></div>");
  userTop.append(userTopLeft);
  userTop.append(userTopCenter);
  userTop.append(userTopicRight);
  var userBottom1 = $("<div id='user_bottom'></div>");
  var bottomList1 = $("<div class='user_bottom_lists' ><ons-icon size='23px' class='iconthem' icon='ion-android-favorite'></ons-icon>My Teams<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
  bottomList1.on("click",function(){
    console.log(users[index].userId);
    myNavigator.pushPage("myteams.html",{data:{userid:users[index].userId}});
  })
  var bottomList2 = $("<div class='user_bottom_lists' ><ons-icon size='23px' class='iconthem' icon='ion-document-text'></ons-icon>&nbsp;&nbsp;My Posts<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
  bottomList2.on("click",function(){
    myNavigator.pushPage("myposts.html",{data:{userid:users[index].userId}});
  })
  var bottomList3 = $("<div class='user_bottom_lists' ><ons-icon size='23px' class='iconthem' icon='ion-star'></ons-icon>Subscribe<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
  bottomList3.on("click",function(){
    myNavigator.pushPage("subscribe.html",{data:{userid:users[index].userId}});
  })
  // var bottomList4 = $("<div class='user_bottom_lists' ><ons-icon size='23px' class='iconthem' icon='ion-android-notifications'></ons-icon>&nbsp;Messages<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
  // bottomList4.on("click",function(){
  //   myNavigator.pushPage("messages.html",{data:{userid:users[index].userId}});
  // })
  userBottom1.append(bottomList1);
  userBottom1.append(bottomList2);
  userBottom1.append(bottomList3);
  // userBottom1.append(bottomList4);
  var userBottom2 = $("<div id='user_bottom'></div>");
  var bottomList5 = $("<div class='user_bottom_lists' ><ons-icon size='23px' class='iconthem' icon='ion-information-circled'></ons-icon>&nbsp;App Info<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
  bottomList5.on("click",function(){
    myNavigator.pushPage("appinfo.html");
  })
  userBottom2.append(bottomList5);
  var userBottom3 = $("<div id='user_bottom'></div>");
  var bottomList6 = $("<div style='text-align:center;color:#247ABA;font-weight:bold;' class='user_bottom_lists' >Log out</div>");
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
This function shows myteams page
In project 1, we are using static data.
This function shows all data that are in the "users" variable.
*/
function showMyteams(id){
  for(index in users[id-1].myTopics){
    var listitem = $("<ons-list-item style='height:75px;'></ons-list-item>");
    var listitemLeft = $("<div class='left'></div>");
    listitemLeft.append("<img class='list-item__thumbnail' src='"+topics[parseInt(users[id-1].myTopics[index].topicId-1)].topicPic +"'>");
    var listitemCenter = $("<div class='center'></div>");
    listitemCenter.append("<span style='display:block;float:left;' class='list-item__title'>"+topics[parseInt(users[id-1].myTopics[index].topicId-1)].topicTitle+"</span>");
    listitemCenter.append("<span class='list-item__subtitle'>"+ topics[parseInt(users[id-1].myTopics[index].topicId-1)].subscribeNum+" members</span>");
    listitem.append(listitemLeft);
    listitem.append(listitemCenter);
    $("#tem").append(listitem);
    topicslistTOtopic(listitem,topics[parseInt(users[id-1].myTopics[index].topicId-1)].topicId);
  }
}

/*
This function shows myposts page
In project 1, we are using static data.
This function shows all data that are in the "users" variable.
*/
function showMyposts(id){
  for(index in users[id-1].myPosts){
    var responseComment = $("<div style='background-color:white;' id='comments'></div>");
    responseComment.append("<p style='font-size:18px;padding-top:10px;'>This function shows myposts page.In project 1, we are using static data.");
    var commentWriter = $("<div style='margin-bottom:0px;' id='response_writer'></div>");
    responseComment.append(commentWriter);
    var commentPic = $("<div id='mypost_pic'></div>");
    commentPic.append("<img src='img/head.jpg'>");
    var commentUser = $("<div id='response_user'></div>");
    commentUser.append("<span style='font-size:17px;color:#0060AA;'>noodles</span>&nbsp;&nbsp;&nbsp;");
    commentUser.append("<span style='font-size:14px;'>2017-9-8</span>");
    commentWriter.append(commentPic);
    commentWriter.append(commentUser);
    $("#postofmine").append(responseComment);
  }
}

/*
This function shows subscribe page
In project 1, we are using static data.
This function shows all data that are in the "users" variable.
*/
function showSubscribe(id){
  for(index in users[id-1].myPosts){
    var responseComment = $("<div style='background-color:white;' id='comments'></div>");
    responseComment.append("<p style='font-size:18px;padding-top:10px;'>This function shows subscribe page.In project 1, we are using static data.");
    var commentWriter = $("<div style='margin-bottom:0px;' id='response_writer'></div>");
    responseComment.append(commentWriter);
    var commentPic = $("<div id='mypost_pic'></div>");
    commentPic.append("<img src='img/denver.gif'>");
    var commentUser = $("<div id='response_user'></div>");
    commentUser.append("<span style='font-size:17px;color:#0060AA;'>yellowpie</span>&nbsp;&nbsp;&nbsp;");
    commentUser.append("<span style='font-size:14px;'>2017-9-8</span>");
    commentWriter.append(commentPic);
    commentWriter.append(commentUser);
    $("#postofsub").append(responseComment);
  }
}

// ****************************************
//  WEB APPLICATION LOAD
// ****************************************
$(document).ready(function(){
  showHotPostAbstracts();
});
