//****************************************
//  VARIABLES
//****************************************
var users = [
  {userId:"6",
  username:"6",
  password:"1",
  nickname:"timemachine1996",
  signature:"I am rocket's fans and Harden is my favourite player",
  headpic:"img/head.jpg",
  myTopics:[
    {"topicId":"1"},
    {"topicId":"2"},
  ],
  "myposts":[
    {"postId":"1"},
    {"postId":"2"},
  ]
},
{userId:"5",
username:"5",
password:"2",
nickname:"superman",
signature:"I am Lakers's fans and Kobe is my favourite player",
headpic:"",
myTopics:[
  {"topicId":"1"},
  {"topicId":"2"},
],
"myposts":[
  {"postId":"1"},
  {"postId":"2"},
]
},
{userId:"4",
username:"4",
password:"3",
nickname:"goodgoodstudy",
signature:"I am Lakers's fans and Kobe is my favourite player",
headpic:"",
myTopics:[
  {"topicId":"1"},
  {"topicId":"2"},
],
"myposts":[
  {"postId":"1"},
  {"postId":"2"},
]
}
]

var topics = [
  {"topicId":"1",
    "topicTitle":"Houston Rocket",
    "topicPic":"img/reckets.gif",
    "subscribeNum":"4397",
    "posts":[
      {"postId":"1","postTitle":"Carmelo Anthony to the Blazers? 'I think he's interested,' CJ McCollum says","postText":"Carmelo Anthony isn't interested in playing for the Knicks next season, but apparently there is a third team he's willing to waive his no-trade clause to join.","postAuthor":"Joe Rodgers","postDate":"1 hour ago","postPic":"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg","comments":[
        {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
        {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
        {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
        {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
        {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
      ]},
      {"postId":"2","postTitle":"Rockets are for sale, team CEO Tad Brown announces","postText":"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.","postAuthor":"Gabrielle McMille","postDate":"2 hours ago","postPic":"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg","comments":[
        {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
        {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
        {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
      ]},
      {"postId":"3","postTitle":"WATCH: James Harden's INSANE 2016/17 mixtape","postText":"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.","postAuthor":"NBA Australia","postDate":"4 hours ago","postPic":"img/harden_1kmoxm1tn0x291k045946trznp.jpg","comments":[
        {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
        {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
        {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
      ]}]
    },
    {"topicId":"2",
      "topicTitle":"Los Angeles Lakers",
      "topicPic":"img/lakers.png",
      "subscribeNum":"3217",
      "posts":[
        {"postId":"1","postTitle":"Former soldier reconnects with old pen pal Larry Nance Jr.","postText":"Long before he followed his father's footsteps to the NBA, Larry Nance Jr. was a 10-year-old kid sending letters to U.S. solders in Iraq as part of his school's pen pal program. ","postAuthor":"NBA Australia","postDate":"1 hour ago","postPic":"img/8.jpg","comments":[
          {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
          {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
          {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
          {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
          {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
        ]},
        {"postId":"2","postTitle":"WATCH: Lonzo Ball's Summer League highlight reel will make any Lakers fan swoon","postText":"In the minds of many, the Lakers rookie point guard and son of Big Baller Brand head honcho LaVar is destined to become the next Magic Johnson or at least Jason Kidd — or the biggest bust since Greg Oden. There's simply no gray area.","postAuthor":"Nick Birdsong","postDate":"2 hours ago","postPic":"img/10.jpg","comments":[
          {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
          {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
          {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
        ]},
        {"postId":"3","postTitle":"WATCH: James Harden's INSANE 2016/17 mixtape","postText":"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.","postAuthor":"NBA Australia","postDate":"4 hours ago","postPic":"img/harden_1kmoxm1tn0x291k045946trznp.jpg","comments":[
          {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
          {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
          {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
          {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
          {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
        ]}]
      },
      {"topicId":"3",
        "topicTitle":"Golden State Warrios",
        "topicPic":"img/warriors.png",
        "subscribeNum":"3890",
        "posts":[
          {"postId":"1","postTitle":"Wonder-ful: Kevin Durant's trip to India includes some fun at Taj Mahal","postText":"Sunday, Durant visited the Taj Mahal, where one of the NBA's wonders was definitely impressed by one of the New7Wonders of the World. Yet he still had the wits about him to do a perfect 'forced-perspective' photo of him holding the shrine's dome.","postAuthor":"Arthur Weinstein","postDate":"1 hour ago","postPic":"img/2.jpg","comments":[
            {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
            {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
            {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
            {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
            {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
          ]},
          {"postId":"2","postTitle":"Watch: Curry and Kryie mock LeBron workout video","postText":"That led to a bizarre video that surfaced today of Curry mocking James' moves in the video, while Irving eggs him on, as the two attended Harrison Barnes' wedding reception Sunday (AEDT).","postAuthor":"Arthur Weinstein","postDate":"2 hours ago","postPic":"img/3.jpg","comments":[
            {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
            {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
            {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
          ]},
          {"postId":"3","postTitle":"Report: JaVale McGee to stay with Golden State Warriors","postText":"McGee joins Kevin Durant, Stephen Curry, Zaza Pachulia, David West, Andre Iguodala and Shaun Livingston as players the Warriors were able to persuade to stay with the franchise in free agency.","postAuthor":"NBA Australia","postDate":"4 hours ago","postPic":"img/7.jpg","comments":[
            {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
            {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
            {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
          ]}]
        },
        {"topicId":"4",
          "topicTitle":"San Antonio Spurs",
          "topicPic":"img/san.png",
          "subscribeNum":"2337",
          "posts":[
            {"postId":"1","postTitle":"Mills using his experiences to educate the next generation, on and off the court","postText":"Fast-forward to 2017, with Duncan retired, Ginobili entering his 16th and likely final season and Parker in and out of the team with injury at 35 years-old, now it’s Mills handing out the advice and bringing along the Spurs’ new generation.","postAuthor":"Benyam Kidane","postDate":"1 hour ago","postPic":"img/4.jpg","comments":[
              {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
              {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
              {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
              {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
              {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
            ]},
            {"postId":"2","postTitle":"If this is end of road for Manu Ginobili, it's been a memorable ride","postText":"One is a sensuous city in South America, robust and rife with all the urban charms and evils. The other is flat South Texas, magnetized by a muddy creek in the middle of town, buoyed by the military and flavored by Tex-Mex. Not only are they not sister cities, they’re not even distant cousins.","postAuthor":"Shaun Powell","postDate":"2 hours ago","postPic":"img/6.jpg","comments":[
              {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
              {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
              {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
            ]},
            {"postId":"3","postTitle":"WATCH: James Harden's INSANE 2016/17 mixtape","postText":"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.","postAuthor":"NBA Australia","postDate":"4 hours ago","postPic":"img/harden_1kmoxm1tn0x291k045946trznp.jpg","comments":[
              {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
              {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
              {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
              {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
            ]}]
          },
          {"topicId":"5",
            "topicTitle":"Los Angeles Clippers",
            "topicPic":"img/clippers.png",
            "subscribeNum":"2492",
            "posts":[
              {"postId":"1","postTitle":"Blake Griffin claps back at Rockets GM for wanting to get rid of MVP","postText":"Blake Griffin didn't hold back when mocking Houston Rockets general manager Daryl Morey suggested NBA awards, such as MVP, gets scratch.After Russell Westbrook won the award over James Harden, Morey said it might be too hard for an MVP to be picked.","postAuthor":"Gabrielle","postDate":"1 hour ago","postPic":"img/1.jpg","comments":[
                {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
                {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
                {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
                {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
                {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
                {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
              ]},
              {"postId":"2","postTitle":"Florida native Marreese Speights always dreamed of playing for the Magic","postText":"Kimberly Speights, wife of the 6-foot-10, 255-pound power forward/center, was there when the call came in and she still vividly remembers her husband’s bright smile and child-like glee.","postAuthor":"NBA Australia","postDate":"2 hours ago","postPic":"img/5.jpg","comments":[
                {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
                {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
                {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
              ]},
              {"postId":"3","postTitle":"WATCH: James Harden's INSANE 2016/17 mixtape","postText":"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.","postAuthor":"NBA Australia","postDate":"4 hours ago","postPic":"img/harden_1kmoxm1tn0x291k045946trznp.jpg","comments":[
                {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
                {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
                {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
                {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
              ]}]
            },
            {"topicId":"6",
              "topicTitle":"Oklahoma thunder",
              "topicPic":"img/thunder.png",
              "subscribeNum":"1962",
              "posts":[
                {"postId":"1","postTitle":"Steven Adams' secret to successful free-throw practice is punch to gut","postText":"He plays one of the most physical styles of any NBA player. And he owns an unmatched, eccentric personality. So, when he’s working from the charity stripe, he has Thunder assistant coach Darko Rajaković come out of nowhere and, every once in a while, upper-cut him in the stomach just when he least expects it.","postAuthor":"Kirstie Chiappelli","postDate":"1 hour ago","postPic":"img/121.jpg","comments":[
                  {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
                  {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
                  {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
                  {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
                  {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
                ]},
                {"postId":"2","postTitle":"Rockets are for sale, team CEO Tad Brown announces","postText":"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.","postAuthor":"Gabrielle McMille","postDate":"2 hours ago","postPic":"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg","comments":[
                  {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
                  {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
                  {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
                ]},
                {"postId":"3","postTitle":"WATCH: James Harden's INSANE 2016/17 mixtape","postText":"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.","postAuthor":"NBA Australia","postDate":"4 hours ago","postPic":"img/harden_1kmoxm1tn0x291k045946trznp.jpg","comments":[
                  {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
                  {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
                  {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
                ]}]
              },
              {"topicId":"7",
                "topicTitle":"Memphis Grizzlies",
                "topicPic":"img/memphis.gif",
                "subscribeNum":"1962",
                "posts":[
                  {"postId":"1","postTitle":"Grizzlies sign free agent Mario Chalmers","postText":"Chalmers last played in the NBA during the 2015-2016 NBA season, where he was traded from the Miami Heat to the Grizzlies. In 55 games for Memphis Chalmers shot 41.7% from the floor and 32.6%.","postAuthor":"NBA Australia","postDate":"1 hour ago","postPic":"img/9.jpg","comments":[
                    {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
                    {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
                    {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
                    {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"},
                    {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
                  ]},
                  {"postId":"2","postTitle":"Rockets are for sale, team CEO Tad Brown announces","postText":"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.","postAuthor":"Gabrielle McMille","postDate":"2 hours ago","postPic":"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg","comments":[
                    {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
                    {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
                    {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
                  ]},
                  {"postId":"3","postTitle":"WATCH: James Harden's INSANE 2016/17 mixtape","postText":"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.","postAuthor":"NBA Australia","postDate":"4 hours ago","postPic":"img/harden_1kmoxm1tn0x291k045946trznp.jpg","comments":[
                    {"commentText":"Inspirational journey keeps Jonathon Simmons humble and hungry","commentAuthor":"abvj12812","commentDate":"23:21"},
                    {"commentText":"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.","commentAuthor":"Fakesrs","commentDate":"21:45"},
                    {"commentText":"Rockets are for sale","commentAuthor":"David","commentDate":"20:31"}
                  ]}]
                }]
