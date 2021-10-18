const Discord = require("discord.js")
require("dotenv").config()

const http = require("http");
setInterval(function() {
    http.get("http://dad--bot.herokuapp.com");
}, 300000); // every 5 minutes (300000)

//create a server object:
http.createServer(function (req, res) {
  res.write('dadBot!'); //write a response to the client
  res.end(); //end the response
}).listen(process.env.PORT); //the server object listens on port 8080 


const client = new Discord.Client()

client.on("ready", () => {
    console.log("This was a terrible idea")
})


const jokes = [
	["What do you call a deer with no eyes?", "No eye deer"], 
	["Did you hear about the baguette at the zoo?", "It was bread in captivity"], 
	["How can you tell if an elephant's been in your fridge?", "There's footprints in the butter"], 
	["My wife told me I look stupid acting like a flamingo, so I put my foot down"], 
	["Why did the man fall into a well?", "He couldn't see that well"], 
	["Did you hear about the Italian plumber?", "He pasta way"],
	["What kind of cheese do you use to attract bears?", "Camembert"],
	["What type of cheese do you use to hide a horse?", "Marscarpone"],
	["What's louder than one monster?", "Two monsters"],
	["Not to brag, but I finished a jigsaw puzzle in two weeks. It says 2-4 years on the box"],
	["I couldn't figure out why the brick was getting larger. Then it hit me."],
	["One day my wife asked me to get her lipstick but I accidentally got her glue stick. It's been a year and she won't talk to me."],
    ["I'm afraid for the calendar. Its days are numbered." ],
    ["Why do fathers take an extra pair of socks when they go golfing?", "In case they get a hole in one!"],
    ["My wife said I should do lunges to stay in shape. That would be a big step forward."],
    ["Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera."],
    ["What do a tick and the Eiffel Tower have in common?", "They're both Paris sites."],
    ["What did the ocean say to the beach?", "Nothing, it just waved."],
    ["How does the moon cut his hair?", "Eclipse it."]
    ["Why don't eggs tell jokes?", "They'd crack each other up." ]

]

let waitMessage = ""
client.on("message", (message) => {

    if (message.content && message.author.username != "dadBot") {

	    if (!(message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))) {
            return
        }
        if (waitMessage.length) {
		    message.reply(waitMessage);
		    waitMessage = ""
		    return
	    }
        const tokens = message.content.split(" ")
        let iterator = 0
        let index = 0
        let previ = false;
        let found = false;
        let lastTok = "";
        for (let i of tokens) {
            if (found === false) {
                if (["i'm", "im"].includes(i.toLowerCase())) {
                    //console.log(iterator)
                    found = true
                    index = iterator
                } else if (i.toLowerCase() === "i") {
                    previ = true
                } else if (previ && i.toLowerCase() === "am") {
                    //console.log(iterator)
                    found = true
                    index = iterator
                }
                
            } else {
                if (i.includes(".")) {
                    lastTok = " " + i.split(".")[0]
                    break
                }
            }
            iterator++;
            

        }
        if (found == true) {
            newMssg = tokens.slice(index+1, iterator).join(" ") + lastTok
            console.log(index)
            console.log(iterator);
            console.log(lastTok)
            console.log(newMssg)
            message.reply(`Hi, ${newMssg}, I'm dad`)
        } else if (message.content.toLowerCase().includes("joke")) {
            joke = jokes[Math.floor(Math.random() * jokes.length)]
	    message.reply(joke[0])
	    if (joke[1]) {
		    waitMessage = joke[1]
	    }
        }
        
    }
    
})

client.login(process.env.TOKEN)
