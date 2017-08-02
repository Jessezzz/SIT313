# NBA Bar (SIT313 Assignment1)

## GitHub

https://github.com/Jessezzz/SIT313.git
Username: Jessezzz
Email: 446346099@qq.com

## Introduction

This app is for NBA fans from different teams to discuss something about their common team. It inherited all features from forum: show topic, add posts and give comments to posts. By using this, people can always communicate with others who love the same team with them.
This app uses cordova to create. Also, it use onsen UI as font-end framwork. It is a cross-platform app. 
NBA Bar will achieve more functions in later.

## Code Samples

function showTopic(topicID){
  var topicBannerContent = $("<div id='ban_con'></div>");
  topicBannerContent.append("<img src='"+topics[topicID-1].topicPic+"'>");
  var topicBannerWords = $("<div id='ban_words'></div>");
  topicBannerContent.append(topicBannerWords);
  topicBannerWords.append("<span id='topic'>"+topics[topicID-1].topicTitle+"</span><br/>");
  var lab = $("<div class='lab'></div>");
  topicBannerWords.append(lab);
  lab.append("<span style='font-weight:normal;'>Members</span>&nbsp;"+topics[topicID-1].subscribeNum+"&nbsp;&nbsp;");
  lab.append("<span style='font-weight:normal;'>Posts</span>&nbsp;"+topics[topicID-1].posts.length+"")
  // var section = $("<ons-button id='joinbutton' > +Join </ons-button>");
  // $("#topic_banner").append(section);
  $("#topic_banner").append(topicBannerContent);
  var addpost = $("#addpost");
  var topicbartitle=$("<span>"+topics[topicID-1].topicTitle+"</span>");
  $("#topicbar").append(topicbartitle);
  showPostAbstracts(topicID);
  topicTOaddpost(addpost,topicID);
};

## Installation

This app is run for both Ios and Andriod platform cause it is a cross-platform app.
For IOS it is not available in App store now. It can only installed through X-Code.
For Andrios, you can download apk and just install it on your phone. 

