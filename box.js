const login = require("facebook-chat-api");
const fs = require("fs");

//simple bot 

var email = "thanhluc2669@gmail.com"; //email vao day 
var pass = "hatrang"; //pass vao day 

//cach chay day : 
// Facebook now has an official API for chat bots here. This API is still the only way to automate chat functionalities on a user account. We do this by emulating the browser. This means doing the exact same GET/POST requests and tricking Facebook into thinking we're accessing the website normally. Because we're doing it this way, this API won't work with an auth token but requires the credentials of a Facebook account.

// Disclaimer: We are not responsible if your account gets banned for spammy activities such as sending lots of messages to people you don't know, sending messages very quickly, sending spammy looking URLs, logging in and out very quickly... Be responsible Facebook citizens.

// See below for projects using this API.
// Install


// If you just want to use facebook-chat-api, you should use this command:

//dau tien cai cai nay : https://www.google.com/search?client=ubuntu&channel=fs&q=install+nodejs+ubuntu+&ie=utf-8&oe=utf-8 
//sau do la chay cai nay : 
// npm install facebook-chat-api


// lop hoc nhi nho threadID : 962940187083110




var userId = "00005671029926"; //hien tai day la userId cua 

var tuanId = "00005671029926";

var lopHocNhiNhoId = "1242973682465020";
// var cuongCloneId = "100010514286764";



var sonName = "test";
var sonId = "100009744015154"; //id thang lanh`


login({
	email : email , password : pass 
} , function(err , api ){
	// if( err ) return console.error(err);



	// api.setOptions({listenEvents : true });


	// api.listen(function(err , mess){
	// 	api.sendMessage(mess.body , mess.threadId);
	// 	console.log("thread ID : " + mess.threadID  );


	// 	if( mess.threadID == currentThreadId ){

	// 		api.changeNickname({
	// 			 nickName, 
	// 			currentThreadId,
	// 			userId ,
	// 			function(error){
	// 				console.log("co loi xay ra khi rename ! ");
	// 				console.error(error);
	// 			}
	// 		});
	// 	}else{
	// 		console.log(" ko doi ten, currentThreadID : " + mess.threadID );
	// 	}


	// });



//test code 



 if(err) return console.error(err);

    api.setOptions({listenEvents: true});

    var stopListening = api.listen((err, event) => {
        if(err) return console.error(err);

        api.markAsRead(event.threadID, (err) => {
            if(err) console.error(err);
        });

        switch(event.type) {
            case "message":

                if(event.body === '/stop' || event.body === "/cút") {
                	if( event.type && event.senderID != tuanId ){
                		api.sendMessage("lêu lêu :V , méo cút đâu :)) ", event.threadID);
                	}
                    api.sendMessage(" :'( ", event.threadID);
                    return stopListening();
                }

                if( event.body.match(/\/threadColor:.+/)){
                	api.changeThreadColor(event.body.split(":")[1] , event.threadID , function(err){
                		console.log("error ! ");
                		console.log(err);
                		api.sendMessage("TEST BOT : " + err , event.threadID);
                	});
                }

                if( event.body === "/addCuong" ){
                    api.addUserToGroup(cuongCloneId , lopHocNhiNhoId , function(err){
                        console.log(err);
                    } );
                }

                if( event.body.match(/\/sonName:.+/) ){
                	if( event.type && event.senderID != sonId ){
	                	var sonName = event.body.split(":")[1];
	                	console.log(event);
						api.changeNickname(sonName , event.threadID  , sonId , function(err){
		            		console.log("loi change Name ");
		            		console.log(err);
		            	});

                	}else{
                		console.log(event.body); 
                	}
                }

                console.log(event);
                api.sendMessage(" lêu lêu: "  + event.body, event.threadID);



                break;


            case "event":
            	if( event.type && event.logMessageData &&  event.logMessageData.participant_id ){
            		// api.sendMessage("id của đứa vừa mới rep : " +  event.logMessageData.participant_id   , event.threadID);

            		if(  event.logMessageData.participant_id  === sonId ){
						api.changeNickname(sonName , event.threadID  , sonId , function(err){
		            		console.log("loi change Name ");
		            		console.log(err);
		            	});

            		}




            	}else{
            		console.log("ko co id @@ ");
            	}
                console.log(event);
                break;

                
            default : 

				// api.changeNickname({
				// 		 nickName, 
				// 		currentThreadId,
				// 		userId ,
				// 		function(error){
				// 			console.log("co loi xay ra khi rename ! ");
				// 			console.error(error);
				// 		}
				// 	});

				
            	console.log("event type : " + event.type)
        }
    });

});



