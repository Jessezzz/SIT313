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
    // showPrompt();

    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },
};

app.initialize();

function onPrompt(results) {
  if(results.buttonIndex == 2){
    navigator.notification.alert("You select to Exit");
    navigator.app.exitApp();
  }else{
    var lockpassword = sha256_digest(results.input1);
    if(lockpassword === window.localStorage.getItem("lockPassword")){
    }else{
      navigator.notification.alert(
        '"The password is not correct. Please input it again!"',  // message
        showPrompt,         // callback
        'Error',            // title
        'Done'                  // buttonName
      );
    }
  }
}

function showPrompt(){
  if(window.localStorage.getItem("lockPassword")!= null){
    navigator.notification.prompt(
      'Your app is locked. Please input password to unlock it',  // message
      onPrompt,                  // callback to invoke
      'Unlock',            // title
      ['Unlock','Exit'],             // buttonLabels
      ''                 // defaultText
    );
  }
}


/******************************************************************************************
BLOCK 1. app.xxx  - Action sheet
All of the functions below are related to the OnsenUI-actionsheet
Onsen UI provides <ons-action-sheet> and <ons-action-sheet-button> elements.
Use them to create a dialog that slides from the bottom of the screen to give user options.
It includes: Actions about comments + Actions about posts
******************************************************************************************/
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

/*******************************************************
There are 2 different action sheets
If the post is other's post (I cannot delete the post)
If the post is my post, I can delete, edit and reply
**********************************************************/
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
        check_Isfollowed_Islogined("addreply",id1,id2);
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
        check_Isfollowed_Islogined("editpost",id1,id2);
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
        check_Isfollowed_Islogined("addreply",id1,id2);
      }
    }
  )
};

/**********************************************************************************
BLOCK 3. login + logout + register
All of the functions below are related to user's frequent actions
It also will implement the function of caching common items in local storage
*************************************************************************************/

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
  window.localStorage.removeItem("Username");
  window.localStorage.removeItem("Password");
  window.localStorage.removeItem("Nickname");
  window.localStorage.removeItem("Signature");
  window.localStorage.removeItem("Headpic");
  window.localStorage.removeItem("RecentTopicId");
  window.localStorage.removeItem("RecentPostId");

  // myNavigator.pushPage('userPage.html');
  showUserpage();

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
      showMyteams();
    }else if(event.target.id === 'myposts'){
      showMyposts(event.target.data.currentuser);
    }else if(event.target.id === 'profile'){
      showProfile(event.target.data.currentuser);
    }else if(event.target.id === 'mainPage'){
      $("#allpostabstrcts").html(" ");
      showHotPostAbstracts();
    }else if(event.target.id === 'viewing'){
      showRecentviewing();
    }else if(event.target.id === 'userPage'){
      showUserpage();
    }else if(event.target.id === 'addareply'){
      showaAddReply(event.target.data.tid,event.target.data.pid);
    }else if(event.target.id === 'exception'){
      addException();
    }}catch(err){
      exception[exception.length] = err;
    }
  });


  /******************************************************************************************
  BLOCK 3. showUIComponents()
  functions in this part are all related to created UI components
  All these functions are called showXXX()
  The components only include dynamic nodes, all the toolbar are written in the html document
  The data are from cloud database  http://introtoapps.com/datastore.php
  Except the post page, all the other page has been created using a pattern(js/ui.js)
  The post page will be changed in future (time not enough)
  ********************************************************************************************/

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
    if(node.html() == "&nbsp;&nbsp;Join&nbsp;&nbsp;"){
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

  /*
  This function shows forum topics list
  All of the data from cloud database
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
    var join = $("<ons-button id='onsbutton1'>&nbsp;&nbsp;Join&nbsp;&nbsp;</ons-button>");
    //default join button

    //To judge if the user follow the topic
    for(myIndex in currentUser.myTopics){
      if(currentUser.myTopics[myIndex].topicId == topicId){
        join = $("<ons-button id='onsbutton2'>&nbsp;&nbsp;Joined&nbsp;&nbsp;</ons-button>");
      }
    }

    var topiclistNode = $("<ons-list-item/>").attr("id","topiclist");

    //Using topiclistNode i have created in ui.js to create the topiclist
    var leftitem = window.topiclist(
      topicTitle,
      topicPic
    );

    topiclistNode.append(leftitem);

    var buttonNode = $("<div/>").attr("class","right");
    buttonNode.append(join);

    topiclistNode.append(buttonNode);

    $("#onslist").append(topiclistNode);

    //Follow or Unfollow if the user click the button join/joined
    joinTeam(join,currentUser,topicId);

    //jump to each topic page when click different topic
    topicslistTOtopic(leftitem,topicId);
  }

  function showTopicListNoLogin(topicPic,topicTitle,subscribeNum,topicId){
    var join = $("<ons-button id='onsbutton1'> &nbsp;&nbsp;Join&nbsp;&nbsp; </ons-button>");

    var topiclistNode = $("<ons-list-item/>").attr("id","topiclist");

    //Using topiclistNode i have created in ui.js to create the topiclist
    var leftitem = window.topiclist(
      topicTitle,
      topicPic
    );

    topiclistNode.append(leftitem);

    var buttonNode = $("<div/>").attr("class","right");
    buttonNode.append(join);

    topiclistNode.append(buttonNode);

    $("#onslist").append(topiclistNode);

    buttonNode.on("click",function(){
      ons.notification.alert('You have to sign in');
    })
    if(navigator.onLine){
      topicslistTOtopic(leftitem,topicId);
    }
  }

  /*
  This function shows one topic
  All of the data from cloud database
  This function shows all topics that are in the "topics" variable.
  */
  function showTopic(topicID){
    //locate the topic in database
    var allTopics = getTopics();
    var topicindex;
    for(index in allTopics){
      if(allTopics[index].topicId == topicID){
        topicindex =  index;
      }
    }

    //Using topicNode i have created in ui.js to create the topic
    $("#topic_banner").append(
      window.topic(
        allTopics[topicindex].topicTitle,
        allTopics[topicindex].topicPic,
        allTopics[topicindex].subscribeNum,
        allTopics[topicindex].posts.length
      )
    );

    showPostAbstracts(topicID);
    //using the function to show postAbstracts

    var topicbartitle=$("<span>"+allTopics[topicindex].topicTitle+"</span>");
    $("#topicbar").append(topicbartitle);
    //Different topic display different title in the top bar

    var addpost = $("#addpost");
    //Get the addpost button

    addpost.on("click",function(){
      check_Isfollowed_Islogined("addpost",topicID,null);
    });
    //Only logined and followed topic can add post
  };

  /*
  This function shows all forum post abstracts
  All of the data from cloud database
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

      //Using postAbstractNode i have created in ui.js to create the postAbstract
      var postAbstract = window.postabstract(
        allTopics[topicindex].posts[index].postTitle,
        allTopics[topicindex].posts[index].postPic,
        allTopics[topicindex].topicTitle,
        allTopics[topicindex].posts[index].comments.length,
        currentAuthor.nickname
      )

      article.append(postAbstract);

      abstractsTOpost(postAbstract,topicID,allTopics[topicindex].posts[index].postId);
      $("#postabstrcts").append(article);
    }
  };

  /*
  This function shows HOT forum post abstracts into recommended page
  All of the data from cloud database
  This function shows all post abstracts that are in the "topics" variable.
  */
  function showHotPostAbstracts(){
    var allTopics = getTopics();

    //Choose the hottest post for each topic and find the position of them
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
      var article = $("<div id='articles'></div>");

      var currentAuthor = getUser(allTopics[topic].posts[post].postAuthor);

      //Using postAbstractNode i have created in ui.js to create the postAbstract
      var postAbstract = window.postabstract(
        allTopics[topic].posts[post].postTitle,
        allTopics[topic].posts[post].postPic,
        allTopics[topic].topicTitle,
        allTopics[topic].posts[post].comments.length,
        currentAuthor.nickname
      )

      article.append(postAbstract);

      abstractsTOpost(postAbstract,allTopics[topic].topicId,allTopics[topic].posts[post].postId);
      $("#allpostabstrcts").append(article);
    }
  }

  /*
  This function shows a add post page and finish the add post function
  All of the data from cloud database
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
    var addclick = $("<p class='addclick' >Add</p>");
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

      var today=new Date();
      var currentYear=today.getFullYear();
      var currentMonth=today.getMonth();
      var currentDay=today.getDate();
      var currentHours=today.getHours();

      var postdate  =
      {
        year : currentYear,
        month : currentMonth,
        day : currentDay,
        Hours: currentHours
      };

      // var postpic = "img/1.jpg";
      var postpic;
      if($("#postpic") == null){
        postpic = null;
      }else{
        // postpic = $("#postpic").attr("src");
        postpic = window.localStorage.getItem("postpic");
        // postpic = AesCtr.encrypt($("#postpic").attr("src"),"1",256);
      }
      // ons.notification.alert(postpic);

      showModal();

      setTimeout(function() {
        addPost(topicID,postid,posttitle,posttext,window.localStorage.getItem("Username"),postdate,postpic,postkeyword);
        addMyPost(window.localStorage.getItem("Username"),topicID,postid);
        var currentUser = getUser(window.localStorage.getItem("Username"));
        updatePages3(currentUser);
        updatePages2(parseInt(topicID));
        updatePages1();
        ons.notification.alert('Post successfully.');
        myNavigator.popPage();
      }, 300);
    })
  }

  /*
  This function shows a edit post page and finish the edit post function
  All of the data from cloud database
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

    var addclick = $("<p id='addclick'>Change</p>");
    $("#barofEditpost").append(addclick);

    $("#postTitle2").val(allTopics[topicindex].posts[postindex].postTitle);

    if(allTopics[topicindex].posts[postindex].postkeyword.length != 0){
      var text = AesCtr.decrypt(allTopics[topicindex].posts[postindex].postText,allTopics[topicindex].posts[postindex].postkeyword,256);
      $("#editor").html(text);
    }else{
      $("#editor").html(allTopics[topicindex].posts[postindex].postText);
    }

    richText();

    addclick.on("click",function(){
      var postid = postID;
      var posttitle = document.getElementById('postTitle2').value;
      var posttext = AesCtr.encrypt($('#editor').html(),allTopics[topicindex].posts[postindex].postkeyword,256);
      var postdate = allTopics[topicindex].posts[postindex].postDate;
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
  All of the data from cloud database
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
    var addclick = $("<p class='addclick'>Reply</p>");
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
  All of the data from cloud database
  This function shows all posts that are in the "topics" variable.
  */
  function showPost(topicID,postID){
    //GET the position of the post
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

    //Get the date gap of post date to current
    var postDate = allTopics[topicindex].posts[postindex].postDate;
    var postFormatedDate = new Date(postDate.year,postDate.month,postDate.day,postDate.Hours);

    var dateString = getDateGap(postFormatedDate);

    //the postauthor is the nickname stored in the database, firstly find this user of this author
    var currentAuthor = getUser(allTopics[topicindex].posts[postindex].postAuthor);

    //Show different action sheet on the top right corner
    var forMyPost = $("<ons-toolbar-button><ons-icon  style='color:#FFFFFF' icon='ion-more' onclick='app.myPost("+topicID+","+postID+")'></ons-icon></ons-toolbar-button>");
    var forOthersPost = $("<ons-toolbar-button><ons-icon  style='color:#FFFFFF' icon='ion-more' onclick='app.othersPost("+topicID+","+postID+")'></ons-icon></ons-toolbar-button>");

    if(window.localStorage.getItem("Nickname") == currentAuthor.nickname){
      $("#topicbar3").append(forMyPost);
    }else{
      $("#topicbar3").append(forOthersPost);
    }

    //show post page - writer + comments num
    var responsePage = $("<div id='response_page'></div>");
    var responseTitle = $("<div id='response_title'></div>");
    responsePage.append(responseTitle);
    responseTitle.append("<span>" + allTopics[topicindex].posts[postindex].postTitle + "</span><br/>");
    var counts = $("<div id='countss' style='margin-top:30px;'></div>");

    counts.append("<ons-icon icon='ion-chatbox-working'></ons-icon>&nbsp;");
    counts.append("<span>"+allTopics[topicindex].posts[postindex].comments.length+"</span>");
    responseTitle.append(counts);

    var responseWriter = $("<div id='response_writer'></div>");
    responsePage.append(responseWriter);
    var responsePic = $("<div id='response_pic'></div>");

    responsePic.append("<img src='"+currentAuthor.headpic+"'>");

    var responseUser = $("<div id='response_user'></div>");
    responseUser.append("<span style='font-size:18px;color:#0060AA;margin-bottm:20px;'>"+currentAuthor.nickname+"</span><br/>");

    responseUser.append("<span style='font-size:14px;'>"+dateString+"</span>");
    responseWriter.append(responsePic);
    responseWriter.append(responseUser);

    //show post page - post + pic + text(different if the post is encrypted)
    var responsePost = $("<div id='main_post'></div>");
    responsePage.append(responsePost);

    //show post page - polls
    var polls = $("<div id='polls'></div>");
    var poll1 = $("<ons-icon id='pollicon1' onclick='agreePost("+topicID+","+postID+")' icon='ion-thumbsup' size='35px'></ons-icon>");
    var poll2 = $("<ons-icon id='pollicon2' onclick='objectPost("+topicID+","+postID+")' icon='ion-thumbsdown' size='35px'></ons-icon><br>");
    polls.append(poll1);
    polls.append(poll2);
    polls.append("<span id='pollnum1'>"+allTopics[topicindex].posts[postindex].polls.numAgree+"</span>");
    polls.append("<span id='pollnum2'>"+allTopics[topicindex].posts[postindex].polls.numObject+"</span>");

    //show post page - post + pic + text (content)
    var postppic = null;

    if(allTopics[topicindex].posts[postindex].postkeyword.length == 0){
      //public post
      responsePost.append("<img style='width:94%;margin:12px;' src='"+postppic+"'>");
      responsePost.append("<div style='font-size:17px;margin-left: 20px;'>"+allTopics[topicindex].posts[postindex].postText+"</div>");
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
      //private post
      console.log("post before decrypting: "+allTopics[topicindex].posts[postindex].postText);
      var origText = AesCtr.decrypt(allTopics[topicindex].posts[postindex].postText, allTopics[topicindex].posts[postindex].postkeyword, 256);

      console.log("post after decrypting: "+origText);
      if(window.localStorage.getItem("Nickname") == currentAuthor.nickname){
        //My post
        responsePost.append("<img style='  width:94%;margin:12px;' src='"+postppic+"'>");
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
          responsePost.append("<img style='  width:94%;margin:12px;' src='"+postppic+"'>");
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

  /*
  This function shows user page
  All of the data from cloud database
  This function shows all data that are in the "users" variable.
  */
  function showUserpage(){
    var username = window.localStorage.getItem("Username");
    var currentUser = getUser(username);

    if(username != null){
      //user has logined before

      var nickname = window.localStorage.getItem("Nickname");
      var signature;
      if(window.localStorage.getItem("Signature") == "null"){
        signature = "Please input your signature (footer)"
      }else{
        signature = window.localStorage.getItem("Signature");
      }

      var headpic = window.localStorage.getItem("Headpic");

      var userTop = $("<div id='user_top'></div>");
      var userTopLeft = $("<div id='user_top_left' style='float:left' ><img style='width:100px;height:100px;' src='img/124.png'>");
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
      var bottomList5 = $("<div class='user_bottom_lists' ><ons-icon size='23px' class='iconthem' icon='ion-information-circled'></ons-icon>&nbsp;About<ons-icon size='23px' class='iconarrow' icon='ion-chevron-right'></ons-icon></div>");
      bottomList5.on("click",function(){
        myNavigator.pushPage("appinfo.html");
      })
      userBottom2.append(bottomList5);
      var userBottom3 = $("<div id='user_bottom'></div>");
      var bottomList6 = $("<div id='logb'  class='user_bottom_lists' >Log out</div>");
      userBottom3.append(bottomList6);
      $("#usermainpage").append(userTop);
      $("#usermainpage").append(userBottom1);
      $("#usermainpage").append(userBottom2);
      $("#usermainpage").append(userBottom3);
      bottomList6.on("click",function(){
        logout();
      })
    }else{
      $("#usermainpage").html("");
      var str = "After signing in, you can follow topic, add and reply to post. Besides, you can use more functions like voting, inputting rich text etc."
      var toSign = $("<span/>").attr("id","signnwo").html(str);
      $("#usermainpage").append(toSign);

      var onsBu = $("<ons-button/>").attr("id","onsb").html("Sign in for more functions");
      onsBu.attr("modifier","large");
      onsBu.on("click",function(){
        myNavigator.pushPage('login.html');
      });
      $("#usermainpage").append(onsBu);
    }
  }

  /*
  This function shows profile page
  All of the data from cloud database
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

    var head = $("<div id='user_top_left' style='margin:20px auto;' ><img style='width:100px;height:100px;' src='img/124.png'></div>");
    $("#contentofp").append(head);
    var changehead = $("<span id='changePho'>Change Profile Photo<span>");
    $("#contentofp").append(changehead);
    changehead.on("click",function(){

    });
    var userBottom = $("<div id='user_bottom'></div>");
    var bottomList1 = $("<div class='user_bottom_lists' font-size:20px;>&nbsp;&nbsp;&nbsp;Nickname:&nbsp;&nbsp;&nbsp;<input id='proin1'  style='line-height:30px;font-size:18px;border:none;' maxlength='15' type='text' value='"+nickname+"'></input></div>");
    var bottomList2 = $("<div class='user_bottom_lists' style='height:70px;'><div style='float:left;'>&nbsp;&nbsp;&nbsp;Signature:&nbsp;&nbsp;&nbsp;&nbsp;</div><textarea id='proin2' maxlength='55' type='text' style='border:none;float:left;font-size:15px;height:60px;line-height:30px;width:60%' >"+signature+"</textarea></div>");
    userBottom.append(bottomList1);
    userBottom.append(bottomList2);
    $("#contentofp").append(userBottom);

    var userBottom2 = $("<div id='user_bottom'></div>");
    var bottomList6 = $("<div id='savebu'  class='user_bottom_lists' >Save</div>");
    $("#contentofp").append(bottomList6);
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


  /*
  This function shows myteams page
  All of the data from cloud database
  This function shows all data that are in the "users" variable.
  */
  function showMyteams(){
    var allTopics = getTopics();
    var currentuser = getUser(window.localStorage.getItem("Username"));

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
  All of the data from cloud database
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
              //Get the date gap of post date to current
              var postDate = allTopics[index2].posts[index3].postDate;
var postFormatedDate = new Date(postDate.year,postDate.month,postDate.day,postDate.Hours);
              var dateString = getDateGap(postFormatedDate);
            }
          }
        }
      }

      var responseComment = $("<div style='background-color:white;' id='commentsss'></div>");
      responseComment.append("<p style='font-size:18px;padding-top:10px;'>"+postTitle+"");
      var commentWriter = $("<div style='margin-bottom:0px;' id='response_writer'></div>");
      responseComment.append(commentWriter);
      var commentPic = $("<div id='mypost_pic'></div>");
      commentPic.append("<img src='img/head.jpg'>");
      var commentUser = $("<div id='response_user'></div>");
      commentUser.append("<span style='font-size:17px;color:#0060AA;'>"+window.localStorage.getItem("Nickname")+"</span>&nbsp;&nbsp;&nbsp;");
      commentUser.append("<span style='font-size:14px;'>"+dateString+"</span>");
      commentWriter.append(commentPic);
      commentWriter.append(commentUser);
      $("#postofmine").append(responseComment);

      abstractsTOpost(responseComment,currentuser.myPosts[index].topicId,currentuser.myPosts[index].postId);
    }
  }

  /*
  This function shows my Recentviewing
  All of the data from cloud database
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
                //Get the date gap of post date to current
                var postDate = allTopics[index2].posts[index3].postDate;
var postFormatedDate = new Date(postDate.year,postDate.month,postDate.day,postDate.Hours);
                var dateString = getDateGap(postFormatedDate);
              }
            }
          }
        }
        var responseComment = $("<div style='background-color:white;' id='commentsss'></div>");
        responseComment.append("<p style='font-size:18px;padding-top:10px;'>"+postTitle+"");
        var commentWriter = $("<div style='margin-bottom:0px;' id='response_writer'></div>");
        responseComment.append(commentWriter);
        var commentPic = $("<div id='mypost_pic'></div>");
        commentPic.append("<img src='img/head.jpg'>");
        var commentUser = $("<div id='response_user'></div>");
        commentUser.append("<span style='font-size:17px;color:#0060AA;'>"+window.localStorage.getItem("Nickname")+"</span>&nbsp;&nbsp;&nbsp;");
        commentUser.append("<span style='font-size:14px;'>"+dateString+"</span>");
        commentWriter.append(commentPic);
        commentWriter.append(commentUser);
        $("#recentView").append(responseComment);

        abstractsTOpost(responseComment,topicId,postId);
      }
    }
  }


  /******************************************************************************************
  BLOCK 4. rich text
  All of the functions below are related to the text input and emoj append
  I created my own rich text (most advanced)
  The functions includes bold text, Itelic text, underline, bullet points, URL hyperlinks.
  It can also add emoj and include other languages but not English
  ******************************************************************************************/
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
      if (command == 'createlink') {
        url = prompt('Enter the link here: ', 'http:\/\/');
        document.execCommand($(this).data('command'), false, url);
      }
      else {
        document.execCommand($(this).data('command'), false, null);
      }
    });
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

  function getPic(){
    // Open the pic library
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: Camera.DestinationType.FILE_URI       // back file URI
    });

    function onSuccess(imageURI) {
      $('#postpic').append('<img id="postimg" width="100px" height:"60px" src='+imageURI+'>');

      upload(imageURI);

      //set the key of the postpic in datebase
      window.localStorage.setItem("postpic",imageURI.substr(imageURI.lastIndexOf('/')+1));
    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }

    function upload(fileURL){
      var success = function (r) {
        alert("upload success! Code = " + r.responseCode);
      }
      var fail = function (error) {
        alert("upload fail! Code = " + error.code);
      }

      var options = new FileUploadOptions();
      options.fileKey = "file1";
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      //options.mimeType = "text/plain";

      var params = {};
      params.value1 = "test";
      params.value2 = "param";
      options.params = params;

      var ft = new FileTransfer();

      var SERVER = "http://introtoapps.com/datastore.php?action=save&appid=216036612&objectid=pics";
      ft.upload(fileURL, encodeURI(SERVER), success, fail, options);
    }
  }

  /***************************************************************
  BLOCK 5. polls
  This app include Polls as discussion posts
  And all user's choices will be saved into the cloud DataStore.
  *****************************************************************/

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
          var myVotedDecoded = JSON.parse(myVoted);
          myVotedDecoded.push(thisVoted);
          var newMyVotedEncoded = JSON.stringify(myVotedDecoded);
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

  /********************************************************************************
  BLOCK 6. Encrypt a post & app
  This app can optionally lock & encrypt a post to those with a password key
  All key word will be encrypted with AES (library in js document)
  Besides, this app can optionally lock the app with a hashed password using SHA256
  **********************************************************************************/

  function addPasswordKey(){
    navigator.notification.prompt(
      'Input your post password key',  // message
      inputedPassword,                  // callback to invoke
      'Notification',            // title
      ['Submit','Cancel'],             // buttonLabels
      ''                 // defaultText
    );

    function inputedPassword(results) {
      if(results.buttonIndex == 1){
        $("#private").css("display","none");
        $("#public").css("display","block");
        $("#passwordKey").html(results.input1);
      }
    }
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

    showVerify();

    function showVerify(){
      navigator.notification.prompt(
        'Input post password key',  // message
        verifyPassword,                  // callback to invoke
        'Notification',            // title
        ['Unlock','Cancel'],             // buttonLabels
        ''                 // defaultText
      );
    }
    console.log(correctPassword.toString());
    function verifyPassword(results) {
      if(results.buttonIndex == 1){
        if(results.input1 === correctPassword.toString()){
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
          navigator.notification.alert(
            "Incorrect password key"
          );
        }
      }
    }
  }

  function setLockPassword(){
    function onSet(results) {
      if(results.buttonIndex == 1){
        var lockpassword = sha256_digest(results.input1);

        window.localStorage.setItem("lockPassword",lockpassword);
        navigator.notification.alert("Set password successfully!");
      }
    }

    function onConfirm(buttonIndex){
      if(buttonIndex == 1){
        window.localStorage.removeItem("lockPassword");
      }
    }

    if(window.localStorage.getItem("lockPassword")!= null){
      navigator.notification.confirm(
        'You have set the password before, do you want to cancel it?',  // message
        onConfirm,            // callback to invoke with index of button pressed
        'Notification',           // title
        ['Cancel','No']     // buttonLabels
      );
    }else{
      navigator.notification.prompt(
        'Please input the app unlock password in 4 digital numbers',  // message
        onSet,                  // callback to invoke
        'Notification',            // title
        ['Set','Cancel'],             // buttonLabels
        ''                 // defaultText
      );
    }
  }
  /********************************************************
  BLOCK 7. keywordSearch()
  Here is a huge function to implement the search function
  It includes both post and title retrieved
  It dosenot matter if the kew word is consistent
  Post includeing all key word will be responsed
  ********************************************************/

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

  /************************************************************************
  BLOCK 8. updatePages()
  All of the functions below are related to update pages when data changed
  There four different function since the paremeter is different
  *************************************************************************/

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
    showUserpage();
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

  function check_Isfollowed_Islogined(type,topicId,postId){
    var follow = isFollow(window.localStorage.getItem("Username"),topicId);
    //checked if the user followed this topic

    if(window.localStorage.getItem("Username") == null){
      //Check id the user has logined
      ons.notification.alert('You have to sign in');
    }else{
      if(follow){
        //user logined and followed this topic
        switch (type){
          case "addpost":
          myNavigator.pushPage('addapost.html',{data:{id:topicId}});
          break;

          case "addreply":
          myNavigator.pushPage("addareply.html",{data:{tid:topicId,pid:postId}});
          break;

          case "editpost":
          myNavigator.pushPage("editapost.html",{data:{topicId:topicId,postId:postId}});
          break;
        }
      }else{
        //user logined but not followed this topic
        ons.notification.alert('You have to follow this topic firstly.');
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

  function getDateGap(postDate){
    var date2=new Date();

    //date now
    var date3=date2.getTime()-postDate.getTime();
    //day gap
    var days=Math.floor(date3/(24*3600*1000));

    //hours gap
    var leave1=date3%(24*3600*1000);
    var hours=Math.floor(leave1/(3600*1000));

    if(days > 0){
      return days+" days ago";
    }else{
      if(hours == 0 ){
        return "Just now";
      }else{
        return hours + " hours ago";
      }
    }
  }

  // ****************************************
  //  WEB APPLICATION LOAD
  // ****************************************
  $(document).ready(function(){
    // window.localStorage.clear();
    if (navigator.onLine) {
      //connect to the internet
    } else {
      //No internet
      $("#usermainpage").html(" ");
      showUserpage();

      document.getElementById("beforelogin").style.display = "none";
      document.getElementById("usermainpage").style.display = "block";

      $("#onslist").html(" ");
      showTopicsList();
    }
  });
