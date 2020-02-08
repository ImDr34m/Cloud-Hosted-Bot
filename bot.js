const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login(token);

client.on('ready', () => {
    console.log('Ready!');
    let channel = client.channels.get("675412320016662530");  
    channel.fetchMessage('675768767636045864')
    .then(message => console.log(message.content))
    .catch(console.error);
    

  
})

client.on('message', message => {
    if(message.content == "!test") {
        if(message.channel.id === '675412320016662530') {
            
            client.channels.get('675412320016662530');
            message.channel.send("React/unreact 👮 for at gå on/off duty.").then(sentMessage => {
                sentMessage.react('👮')
            })
            
            message.delete(message);

        }
    }
})

//on duty
client.on('messageReactionAdd', (messageReaction, user) =>  {
    if(user.bot) {
        console.log("Fejl!");
        return;
    }
    if (messageReaction.emoji.name === '👮') {
        if(messageReaction.message.channel.id === '675412320016662530') {
            var member = messageReaction.message.guild.members.find(member => member.id === user.id);
            if (member)
            {
                member.addRole('675724575610372136');
                console.log("Succes!");
            } 
            console.log("Added " + user.username + " to a role.");
        } else {
            console.log("Fejl!4");
        }
    } else {
        
        console.log("Fejl!1");
    }
});


//off duty
client.on('messageReactionRemove', (messageReaction, user) =>  {
    if(user.bot)
        return;
    
    if (messageReaction.emoji.name === '👮') {
        if(messageReaction.message.channel.id === '675412320016662530') {
            var member = messageReaction.message.guild.members.find(member => member.id === user.id);
            if (member)
            {
                member.removeRole('675724575610372136');
                console.log("Succes!");
            } 
            console.log("Removed " + user.username + " from a role.");
        }  else {
            console.log("Fejl!2");
        }
    } else {
        console.log("Fejl!3");
    }
});

//Clear chatten
client.on('message', function(message) {
    if (message.content == "!clear") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        }
    }

});