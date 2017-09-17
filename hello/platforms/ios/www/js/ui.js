/*************************************
Create patterns for each node
*************************************/

window.topic = function(title,pic,subnum,postsnum){
  var topicNode = $("<div/>").attr("id","ban_con");
  //pic + words

  var picNode = $("<img>").attr("src",pic);
  topicNode.append(picNode);
  var wordsNode = $("<div>").attr("id","ban_words");
  topicNode.append(wordsNode);
  //titlenode + label node

  var titleNode = $("<span/>").attr("id","topic").html(title);
  wordsNode.append(titleNode);

  var labelNode = $("<div/>").attr("class","lab");
  wordsNode.append(labelNode);
  //postsnum

  var postsnumNode = $("<span/>");
  postsnumNode.append("<span style='font-weight:normal;'>Posts</span>&nbsp;");
  postsnumNode.append(postsnum);
  labelNode.append(postsnumNode);

  return topicNode;
};


window.topiclist = function (title,pic){
  var topiclistNode = $("<div/>").attr("id","ddd");

  var picNode = $("<img>").attr("class","left");
  picNode.attr("id","topicimg");
  picNode.attr("src",pic);
  topiclistNode.append(picNode);

  var titleNode = $("<div/>").attr("class","center");
  titleNode.attr("id","topictitle");
  titleNode.html(title);
  topiclistNode.append(titleNode);

  return topiclistNode;
}


window.postabstract = function(posttitle,pic,topictitle,replynum,author){
  var postabstractNode = $("<div/>").attr("class","contents");
  //maincontent + footer

  var contentNode = $("<div/>").attr("class","bod");
  postabstractNode.append(contentNode);
  //post title +  post pic

  var posttitleNode = $("<div/>").attr("class","title");
  posttitleNode.html(posttitle);
  contentNode.append(posttitleNode);

  var picNode = $("<div/>").attr("class","pics");
  var pict = $("<img src='http://introtoapps.com/datastore.php?appid=216036612&action=load&objectid="+pic+"&type=binary'/>")
  if(pic!=""){
    picNode.append(pict);
    contentNode.append(picNode);
  }

  var footerNode = $("<div/>").attr("class","footer");
  postabstractNode.append(footerNode);
  //authorname + topic title + replynum

  var authorNode = $("<a/>");
  authorNode.html(author+"&nbsp;");
  footerNode.append(authorNode);

  var topictitleNode = $("<span/>");
  topictitleNode.html(topictitle);
  footerNode.append(topictitleNode);

  var replynumNode = $("<div/>").attr("id","countss");
  footerNode.append(replynumNode);
  //icon + num

  var replyiconNode = $("<ons-icon/>").attr("id","iconreply");
  replyiconNode.attr("icon","ion-chatbox-working");
  replynumNode.append(replyiconNode);

  var numNode = $("<span/>");
  numNode.html(replynum);
  replynumNode.append(numNode);

  return postabstractNode;
}
