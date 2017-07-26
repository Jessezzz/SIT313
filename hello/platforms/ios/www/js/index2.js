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
    var section = $("<section style='margin-top: 10px;margin-left:20px;'></section>");
    section.append("<ons-button id='onsbutton' style='padding:0 8px;margin-left:4px;color:#0060AA;background-color:white;border:1px solid #3CA0EC'> &nbsp;&nbsp;Join&nbsp;&nbsp; </ons-button>");
    topicBannerContent.append(section);
    $("#topic_banner").append(topicBannerContent);

    showPostAbstracts(topicID);
};
