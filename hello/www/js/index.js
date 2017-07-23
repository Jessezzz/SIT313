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


/****************************************
JS below are from onsen UI
****************************************/
document.addEventListener('init', function (event) {
  if (event.target.id === 'topic_page1') {
    var title = event.target.data && event.target.data.title ? event.target.data.title : 'Houston Rocket';
    event.target.querySelector('ons-toolbar div.center').textContent = title;
  }
  // if (event.target.id === 'user_following') {
  //   var title = event.target.data && event.target.data.title ? event.target.data.title : 'Custom Page';
  //   event.target.querySelector('ons-toolbar div.center').textContent = title;
  // }
  // if (event.target.id === 'user_followers') {
  //   var title = event.target.data && event.target.data.title ? event.target.data.title : 'Custom Page';
  //   event.target.querySelector('ons-toolbar div.center').textContent = title;
  // }
  // if (event.target.id === 'user_followingtopic') {
  //   var title = event.target.data && event.target.data.title ? event.target.data.title : 'Custom Page';
  //   event.target.querySelector('ons-toolbar div.center').textContent = title;
  // }
});


/****************************************
JS below are created by Jesse
****************************************/

//****************************************
//  VARIABLES
//****************************************

var topics = [
  // Topic1 - Houston Rocket
  {topicId:1,
  topicTitle:"Houston Rocket",
  topicPic:"img/reckets.gif",
  postNum:3,
  subscribeNum:4397,
  posts:[
    {postId:"1-1",postTitle:"Carmelo Anthony to the Blazers? 'I think he's interested,' CJ McCollum says",postText:"test",postAuthor:"Joe Rodgers",postDate:"1 hour ago",postPic:"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg",comments:[
      {commentText:"eee",commentAuthor:"eee",commentDate:121},
      {commentText:"e",commentAuthor:"e",commentDate:22},
      {commentText:"e",commentAuthor:"e",commentDate:12}
    ]},
    {postId:"1-2",postTitle:"Rockets are for sale, team CEO Tad Brown announces",postText:"test",postAuthor:"Gabrielle McMille",postDate:"2 hours ago",postPic:"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg",comments:[
      {commentText:"eee",commentAuthor:"eee",commentDate:121},
      {commentText:"e",commentAuthor:"e",commentDate:22},
      {commentText:"e",commentAuthor:"e",commentDate:12}
    ]},
    {postId:"1-3",postTitle:"WATCH: James Harden's INSANE 2016/17 mixtape",postText:"test",postAuthor:"NBA Australia",postDate:"4 hours ago",postPic:"img/harden_1kmoxm1tn0x291k045946trznp.jpg",comments:[
      {commentText:"eee",commentAuthor:"eee",commentDate:121},
      {commentText:"e",commentAuthor:"e",commentDate:22},
      {commentText:"e",commentAuthor:"e",commentDate:12}
    ]}],
  },
  // Topic2 - Los Angeles Lakers
  {topicId:2,
  topicTitle:"Los Angeles Lakers",
  topicPic:"img/lakers.png",
  postNum:1,
  subscribeNum:3217,
  posts:[
    {postId:"2-1",postTitle:"WATCH: Lonzo Ball's Summer League highlight reel will make any Lakers fan swoon",postText:"test",postAuthor:"Nick Birdsong",postDate:"3 hours ago",postPic:"img/lonzo_6cl46k9bbntg190ogp58zksbs.jpg",comments:[
      {commentText:"eee",commentAuthor:"eee",commentDate:121},
      {commentText:"e",commentAuthor:"e",commentDate:22},
      {commentText:"e",commentAuthor:"e",commentDate:12}
    ]}]
  },
  // Topic3 - Golden State Warrios
  {topicId:3,
  topicTitle:"Golden State Warrios",
  topicPic:"img/warriors.png",
  postNum:1,
  subscribeNum:3890,
  posts:[
    {postId:"3-1",postTitle:"WATCH: Lonzo Ball's Summer League highlight reel will make any Lakers fan swoon",postText:"test",postAuthor:"Nick Birdsong",postDate:"3 hours ago",postPic:"img/lonzo_6cl46k9bbntg190ogp58zksbs.jpg",comments:[
      {commentText:"eee",commentAuthor:"eee",commentDate:121},
      {commentText:"e",commentAuthor:"e",commentDate:22},
      {commentText:"e",commentAuthor:"e",commentDate:12}
    ]}]
  },
  // Topic4 - San Antonio Spurs
  {topicId:4,
  topicTitle:"San Antonio Spurs",
  topicPic:"img/san.png",
  postNum:1,
  subscribeNum:2337,
  posts:[
    {postId:"4-1",postTitle:"Report: Manu Ginobili finalising new contract with Spurs",postText:"test",postAuthor:"Andy Wittry",postDate:"2 hours ago",postPic:"img/manu-ginobili-052217-getty-ftr_4o4yo9iz081012huusncu1rsb.jpg",comments:[
      {commentText:"eee",commentAuthor:"eee",commentDate:121},
      {commentText:"e",commentAuthor:"e",commentDate:22},
      {commentText:"e",commentAuthor:"e",commentDate:12}
    ]}]
  },
  // Topic5 - Los Angeles Clippers
  {topicId:5,
  topicTitle:"Los Angeles Clippers",
  topicPic:"img/clippers.png",
  postNum:1,
  subscribeNum:2492,
  posts:[
    {postId:"5-1",postTitle:"Report: Manu Ginobili finalising new contract with Spurs",postText:"test",postAuthor:"Andy Wittry",postDate:"2 hours ago",postPic:"img/manu-ginobili-052217-getty-ftr_4o4yo9iz081012huusncu1rsb.jpg",comments:[
      {commentText:"eee",commentAuthor:"eee",commentDate:121},
      {commentText:"e",commentAuthor:"e",commentDate:22},
      {commentText:"e",commentAuthor:"e",commentDate:12}
    ]}]
  },
  // Topic6 - Oklahoma City
  {topicId:6,
  topicTitle:"Oklahoma thunder",
  topicPic:"img/thunder.png",
  postNum:1,
  subscribeNum:1962,
  posts:[
    {postId:"6-1",postTitle:"Report: Manu Ginobili finalising new contract with Spurs",postText:"test",postAuthor:"Andy Wittry",postDate:"2 hours ago",postPic:"img/manu-ginobili-052217-getty-ftr_4o4yo9iz081012huusncu1rsb.jpg",comments:[
      {commentText:"eee",commentAuthor:"eee",commentDate:121},
      {commentText:"e",commentAuthor:"e",commentDate:22},
      {commentText:"e",commentAuthor:"e",commentDate:12}
    ]}]
  },
  // Topic7 - Memphis Grizzlies
  {topicId:7,
  topicTitle:"Memphis Grizzlies",
  topicPic:"img/memphis.gif",
  postNum:1,
  subscribeNum:1962,
  posts:[
    {postId:"7-1",postTitle:"Report: Manu Ginobili finalising new contract with Spurs",postText:"test",postAuthor:"Andy Wittry",postDate:"2 hours ago",postPic:"img/manu-ginobili-052217-getty-ftr_4o4yo9iz081012huusncu1rsb.jpg",comments:[
      {commentText:"eee",commentAuthor:"eee",commentDate:121},
      {commentText:"e",commentAuthor:"e",commentDate:22},
      {commentText:"e",commentAuthor:"e",commentDate:12}
    ]}]
  },
  // Topic8 - Minnesota Timberwolves
  {topicId:8,
  topicTitle:"Minnesota Timberwolves",
  topicPic:"img/wolves.png",
  postNum:1,
  subscribeNum:3282,
  posts:[
    {postId:"8-1",postTitle:"Report: Manu Ginobili finalising new contract with Spurs",postText:"test",postAuthor:"Andy Wittry",postDate:"2 hours ago",postPic:"img/manu-ginobili-052217-getty-ftr_4o4yo9iz081012huusncu1rsb.jpg",comments:[
      {commentText:"eee",commentAuthor:"eee",commentDate:121},
      {commentText:"e",commentAuthor:"e",commentDate:22},
      {commentText:"e",commentAuthor:"e",commentDate:12}
    ]}]
  },
]


//****************************************
//  FUNCTIONS
//****************************************

function topicsTOtopic(node,topicid){
  node.on("click",function(){
    myNavigator.pushPage('topic_page.html');
  });
};

/*
This function shows all forum topics
In project 1, we are using static data.
This function shows all topics that are in the "topics" variable.
*/
function showTopics(){

  for(index in topics){
    var listitem = $("<ons-list-item></ons-list-item>");
    var listitemLeft = $("<div class='left'></div>");
    listitemLeft.append("<img class='list-item__thumbnail' src='"+topics[index].topicPic +"'>");
    var listitemCenter = $("<div class='center'></div>");
    listitemCenter.append("<span style='display:block;float:left;' class='list-item__title'>"+topics[index].topicTitle+"</span>");
    listitemCenter.append("<span class='list-item__subtitle'>"+ topics[index].subscribeNum+" members</span>");
    var listitemRight = $("<div class='right'></div>");
    var listitemRightSection = $("<section style='margin: 4px;'></section>");
    listitemRightSection.append("<ons-button id='onsbutton' onclick='joinSuc()' style='padding:0 4px;color:#0060AA;background-color:white;border:1px solid #3CA0EC'> &nbsp;&nbsp;Join&nbsp;&nbsp; </ons-button>");
    listitemRight.append(listitemRightSection);

    listitem.append(listitemLeft);
    listitem.append(listitemCenter);
    listitem.append(listitemRight);

    $("#onslist").append(listitem);

    topicsTOtopic(listitem,topics[index].topicId);
  }
}



/*
This function shows all forum post abstracts
In project 1, we are using static data.
This function shows all post abstracts that are in the "topics" variable.
*/
function showPostAbstracts(){
  var article = $("<div id='articles'></div>");

  for(index in topics[0].posts){
    var postAbstract = $("<div class='contents'></div>");

    var mainContent = $("<div class='bod'></div>");
    mainContent.append("<div class='title'>"+ topics[0].posts[index].postTitle +"</div>");
    mainContent.append("<div class='pics'><img src="+ topics[0].posts[index].postPic + "></div>");

    var footContent = $("<div class='footer'></div>");
    footContent.append("<a>"+ topics[0].posts[index].postAuthor +"&nbsp;</a>");
    footContent.append("<span>"+ topics[0].topicTitle +"</span>");
    // footContent.append("<div id='counts'></div>");
    // footContent.append("<ons-icon icon='ion-eye'></ons-icon>&nbsp;<span>257</span>&nbsp;&nbsp;&nbsp;")
    // footContent.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;<span>303</span>");

    postAbstract.append(mainContent);
    postAbstract.append(footContent);

    article.append(postAbstract);

    // createOnClick(postAbstract,topics[0].posts[index].postId);
  }

  $("#postabstrcts").append(article);
};

/*
This function shows a post content page
In project 1, we are using static data.
This function shows all posts that are in the "topics" variable.
*/

// function showPost(postId){
//   // $("#postToolbar").append("<div class='center' style='color:white;'>Houston rocket</div>");
//    var responsePage = $("<div id='response_page'></div>");
//
//    var responseTitle = $("<div id='response_title'></div>");
//    responseTitle.append("<span>" +  + "</span>");
// };





//****************************************
//  WEB APPLICATION LOAD
//****************************************
$(document).ready(function(){
  showPostAbstracts();
  showTopics();
});
