
// Defualt values, getting 
myVideo = document.getElementById("myvid");
var Name = "Ali";
var Email = "ALi@gmail.com";





//Function that will send a 'Start' Activity with userName,Email from Inputs
function SendActivity() {
  var statement = {
    actor: {
      name: Name,
      mbox: "mailto:" + Email,
      objectType: "Agent",
    },

    verb: {
      id: "http://adlnet.gov/expapi/verbs/Started",
      display: { "en-US": "Started" },
    },

    object: {
      objectType: "Activity",
      id: "http://vwf.adlnet.gov/xapi/virtual_world_sandbox",
      definition: {
        name: { "en-US": Name + " Just Started  on this course" },
        description: { "en-US": "SImple test for xAPI" },
      },
    },
  };
  console.log(statement);
  ADL.XAPIWrapper.sendStatement(statement);
}


// here 3 functions that will trigger upon Starting,Pausing and Finishing Video 
myVideo.onpause = function () {
    var time = Math.round(myVideo.currentTime);
    var statement = {
      actor: {
        name: Name,
        mbox: "mailto:" + Email,
        objectType: "Agent",
      },
  
      verb: {
        id: "http://adlnet.gov/expapi/verbs/paused",
        display: { "en-US": "Paused" },
      },
  
      object: {
        objectType: "Activity",
        id: "http://vwf.adlnet.gov/xapi/virtual_world_sandbox",
        definition: {
          name: { "en-US": Name + " Just Paused video At " + time },
          description: { "en-US": "SImple test for xAPI" },
        },
      },
    };
    console.log(statement);
    ADL.XAPIWrapper.sendStatement(statement);
  };
  
  myVideo.onplaying = function () {
    var statement = {
      actor: {
        name: Name,
        mbox: "mailto:" + Email,
        objectType: "Agent",
      },
  
      verb: {
        id: "http://adlnet.gov/expapi/verbs/played",
        display: { "en-US": "PLayed" },
      },
  
      object: {
        objectType: "Activity",
        id: "http://vwf.adlnet.gov/xapi/virtual_world_sandbox",
        definition: {
          name: { "en-US": Name + " Just Started Playing video  " },
          description: { "en-US": "SImple test for xAPI" },
        },
      },
    };
    console.log(statement);
    ADL.XAPIWrapper.sendStatement(statement);
  };
  
  myVideo.ontimeupdate = function () {
    let currenttime = myVideo.currentTime;
    let fulltime = myVideo.duration;
    if (currenttime == fulltime) {
      var statement = {
        actor: {
          name: Name,
          mbox: "mailto:" + Email,
          objectType: "Agent",
        },
  
        verb: {
          id: "http://adlnet.gov/expapi/verbs/completed",
          display: { "en-US": "completed" },
        },
  
        object: {
          objectType: "Activity",
          id: "http://vwf.adlnet.gov/xapi/virtual_world_sandbox",
          definition: {
            name: { "en-US": Name + " Just Completed The video  " },
            description: { "en-US": Name + " Just Completed The video" },
          },
        },
      };
      console.log(statement);
      ADL.XAPIWrapper.sendStatement(statement);
    }
  };
  



// here we can get the Data from the Scorm Cloud
function getData() {
    var myParams = createParams();
    var result = ADL.XAPIWrapper.getStatements(myParams);
  
    //printing result to Console
    if (result) {
      result.statements.forEach((element) => {
        console.log(element);
      });
    }
  }
  
  //specify what params you want ID,activity,Date...
  function createParams() {
    var myParams = ADL.XAPIWrapper.searchParams();
    //myParams['since']=''
    //myParams['verb']='http://adlnet.gov/expapi/verbs/played'
    //myParams['since']=''
    //myParams['since']=''
    return myParams;
  }




//functions to get Email,Name from the Inputs in Html
function saveName() {
  Name = document.getElementById("userName").value;
}

function saveEmail() {
  Email = document.getElementById("userEmail").value;
}
