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
      {postId:"1",postTitle:"Carmelo Anthony to the Blazers? 'I think he's interested,' CJ McCollum says",postText:"Carmelo Anthony isn't interested in playing for the Knicks next season, but apparently there is a third team he's willing to waive his no-trade clause to join.",postAuthor:"Joe Rodgers",postDate:"1 hour ago",postPic:"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg",comments:[
        {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
        {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
        {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"},
        {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
      ]},
      {postId:"2",postTitle:"Rockets are for sale, team CEO Tad Brown announces",postText:"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.",postAuthor:"Gabrielle McMille",postDate:"2 hours ago",postPic:"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg",comments:[
        {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
        {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
        {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
      ]},
      {postId:"3",postTitle:"WATCH: James Harden's INSANE 2016/17 mixtape",postText:"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.",postAuthor:"NBA Australia",postDate:"4 hours ago",postPic:"img/harden_1kmoxm1tn0x291k045946trznp.jpg",comments:[
        {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
        {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
        {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
      ]}],
    },
    // Topic2 - Los Angeles Lakers
    {topicId:2,
      topicTitle:"Los Angeles Lakers",
      topicPic:"img/lakers.png",
      postNum:1,
      subscribeNum:3217,
      posts:[
        {postId:"1",postTitle:"Carmelo Anthony to the Blazers? 'I think he's interested,' CJ McCollum says",postText:"Carmelo Anthony isn't interested in playing for the Knicks next season, but apparently there is a third team he's willing to waive his no-trade clause to join.",postAuthor:"Joe Rodgers",postDate:"1 hour ago",postPic:"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg",comments:[
          {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
          {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
          {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
        ]},
        {postId:"2",postTitle:"Rockets are for sale, team CEO Tad Brown announces",postText:"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.",postAuthor:"Gabrielle McMille",postDate:"2 hours ago",postPic:"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg",comments:[
          {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
          {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
          {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
        ]},
        {postId:"3",postTitle:"WATCH: James Harden's INSANE 2016/17 mixtape",postText:"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.",postAuthor:"NBA Australia",postDate:"4 hours ago",postPic:"img/harden_1kmoxm1tn0x291k045946trznp.jpg",comments:[
          {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
          {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
          {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"},
          {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"},
          {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
        ]}],
      },
      // Topic3 - Golden State Warrios
      {topicId:3,
        topicTitle:"Golden State Warrios",
        topicPic:"img/warriors.png",
        postNum:1,
        subscribeNum:3890,
        posts:[
          {postId:"1",postTitle:"Carmelo Anthony to the Blazers? 'I think he's interested,' CJ McCollum says",postText:"Carmelo Anthony isn't interested in playing for the Knicks next season, but apparently there is a third team he's willing to waive his no-trade clause to join.",postAuthor:"Joe Rodgers",postDate:"1 hour ago",postPic:"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg",comments:[
            {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
            {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
            {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
          ]},
          {postId:"2",postTitle:"Rockets are for sale, team CEO Tad Brown announces",postText:"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.",postAuthor:"Gabrielle McMille",postDate:"2 hours ago",postPic:"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg",comments:[
            {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
            {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
            {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
          ]},
          {postId:"3",postTitle:"WATCH: James Harden's INSANE 2016/17 mixtape",postText:"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.",postAuthor:"NBA Australia",postDate:"4 hours ago",postPic:"img/harden_1kmoxm1tn0x291k045946trznp.jpg",comments:[
            {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
            {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
            {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
          ]}],
        },
        // Topic4 - San Antonio Spurs
        {topicId:4,
          topicTitle:"San Antonio Spurs",
          topicPic:"img/san.png",
          postNum:1,
          subscribeNum:2337,
          posts:[
            {postId:"1",postTitle:"Carmelo Anthony to the Blazers? 'I think he's interested,' CJ McCollum says",postText:"Carmelo Anthony isn't interested in playing for the Knicks next season, but apparently there is a third team he's willing to waive his no-trade clause to join.",postAuthor:"Joe Rodgers",postDate:"1 hour ago",postPic:"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg",comments:[
              {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
              {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
              {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
            ]},
            {postId:"2",postTitle:"Rockets are for sale, team CEO Tad Brown announces",postText:"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.",postAuthor:"Gabrielle McMille",postDate:"2 hours ago",postPic:"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg",comments:[
              {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
              {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
              {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
            ]},
            {postId:"3",postTitle:"WATCH: James Harden's INSANE 2016/17 mixtape",postText:"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.",postAuthor:"NBA Australia",postDate:"4 hours ago",postPic:"img/harden_1kmoxm1tn0x291k045946trznp.jpg",comments:[
              {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
              {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
              {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"},
              {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
            ]}],
          },
          // Topic5 - Los Angeles Clippers
          {topicId:5,
            topicTitle:"Los Angeles Clippers",
            topicPic:"img/clippers.png",
            postNum:1,
            subscribeNum:2492,
            posts:[
              {postId:"1",postTitle:"Carmelo Anthony to the Blazers? 'I think he's interested,' CJ McCollum says",postText:"Carmelo Anthony isn't interested in playing for the Knicks next season, but apparently there is a third team he's willing to waive his no-trade clause to join.",postAuthor:"Joe Rodgers",postDate:"1 hour ago",postPic:"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg",comments:[
                {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
              ]},
              {postId:"2",postTitle:"Rockets are for sale, team CEO Tad Brown announces",postText:"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.",postAuthor:"Gabrielle McMille",postDate:"2 hours ago",postPic:"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg",comments:[
                {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
              ]},
              {postId:"3",postTitle:"WATCH: James Harden's INSANE 2016/17 mixtape",postText:"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.",postAuthor:"NBA Australia",postDate:"4 hours ago",postPic:"img/harden_1kmoxm1tn0x291k045946trznp.jpg",comments:[
                {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"},
                {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
              ]}],
            },
            // Topic6 - Oklahoma City
            {topicId:6,
              topicTitle:"Oklahoma thunder",
              topicPic:"img/thunder.png",
              postNum:1,
              subscribeNum:1962,
              posts:[
                {postId:"1",postTitle:"Carmelo Anthony to the Blazers? 'I think he's interested,' CJ McCollum says",postText:"Carmelo Anthony isn't interested in playing for the Knicks next season, but apparently there is a third team he's willing to waive his no-trade clause to join.",postAuthor:"Joe Rodgers",postDate:"1 hour ago",postPic:"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg",comments:[
                  {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                  {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                  {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
                ]},
                {postId:"2",postTitle:"Rockets are for sale, team CEO Tad Brown announces",postText:"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.",postAuthor:"Gabrielle McMille",postDate:"2 hours ago",postPic:"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg",comments:[
                  {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                  {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                  {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
                ]},
                {postId:"3",postTitle:"WATCH: James Harden's INSANE 2016/17 mixtape",postText:"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.",postAuthor:"NBA Australia",postDate:"4 hours ago",postPic:"img/harden_1kmoxm1tn0x291k045946trznp.jpg",comments:[
                  {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                  {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                  {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
                ]}],
              },
              // Topic7 - Memphis Grizzlies
              {topicId:7,
                topicTitle:"Memphis Grizzlies",
                topicPic:"img/memphis.gif",
                postNum:1,
                subscribeNum:1962,
                posts:[
                  {postId:"1",postTitle:"Carmelo Anthony to the Blazers? 'I think he's interested,' CJ McCollum says",postText:"Carmelo Anthony isn't interested in playing for the Knicks next season, but apparently there is a third team he's willing to waive his no-trade clause to join.",postAuthor:"Joe Rodgers",postDate:"1 hour ago",postPic:"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg",comments:[
                    {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                    {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                    {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
                  ]},
                  {postId:"2",postTitle:"Rockets are for sale, team CEO Tad Brown announces",postText:"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.",postAuthor:"Gabrielle McMille",postDate:"2 hours ago",postPic:"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg",comments:[
                    {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                    {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                    {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
                  ]},
                  {postId:"3",postTitle:"WATCH: James Harden's INSANE 2016/17 mixtape",postText:"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.",postAuthor:"NBA Australia",postDate:"4 hours ago",postPic:"img/harden_1kmoxm1tn0x291k045946trznp.jpg",comments:[
                    {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                    {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                    {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
                  ]}],
                },
                // Topic8 - Minnesota Timberwolves
                {topicId:8,
                  topicTitle:"Minnesota Timberwolves",
                  topicPic:"img/wolves.png",
                  postNum:1,
                  subscribeNum:3282,
                  posts:[
                    {postId:"1",postTitle:"Carmelo Anthony to the Blazers? 'I think he's interested,' CJ McCollum says",postText:"Carmelo Anthony isn't interested in playing for the Knicks next season, but apparently there is a third team he's willing to waive his no-trade clause to join.",postAuthor:"Joe Rodgers",postDate:"1 hour ago",postPic:"img/anthony-carmelo-usnews-getty-ftr_zoj1q7021ij81uu3jw475t8tr.jpg",comments:[
                      {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                      {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                      {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"},
                      {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
                    ]},
                    {postId:"2",postTitle:"Rockets are for sale, team CEO Tad Brown announces",postText:"Speaking to reporters Wednesday at Damian Lillard's basketball camp, Trail Blazers teammate CJ McCollum said Portland is indeed in the mix for Anthony just as ESPN's Adrian Wojnarowksi reported on Saturday.",postAuthor:"Gabrielle McMille",postDate:"2 hours ago",postPic:"img/leslie-alexander_1smvhjmtxno4b18lq12oivon3y.jpg",comments:[
                      {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                      {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                      {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
                    ]},
                    {postId:"3",postTitle:"WATCH: James Harden's INSANE 2016/17 mixtape",postText:"Lillard and McCollum also said Wednesday they each have personally reached out to Anthony in an effort to sell him on the Blazers, which would still need to send ample talent back to New York in a trade for the 10-time All-Star.",postAuthor:"NBA Australia",postDate:"4 hours ago",postPic:"img/harden_1kmoxm1tn0x291k045946trznp.jpg",comments:[
                      {commentText:"Inspirational journey keeps Jonathon Simmons humble and hungry",commentAuthor:"abvj12812",commentDate:"23:21"},
                      {commentText:"It may be hard to picture Anthony on the West Coast, but McCollum can see it now.",commentAuthor:"Fakesrs",commentDate:"21:45"},
                      {commentText:"Rockets are for sale",commentAuthor:"David",commentDate:"20:31"}
                    ]}],
                  }
                ]
