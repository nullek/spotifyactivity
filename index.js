const Discord = require("discord.js")
const client = new Discord.Client()
const { Client, MessageEmbed } = require("discord.js")

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {

    if (msg.content === "spotify") {
        let user
        if (msg.mentions.users.first()) {
            user = msg.mentions.users.first()
        } else {
            user = msg.author
        }
        
        const activity = user.presence.activities && user.presence.activities.find(
            u => u.assets && u.type === "LISTENING" && u.name === "Spotify")

                    if (activity) {
                        let image = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`
                        let url = `https://open.spotify.com/track/${activity.syncID}`
                        let name = activity.details
                        let artist = activity.state
                        let album = activity.assets.largeText
                        let timeStart = activity.timestamps.start
                        let timeEnd = activity.timestamps.end
                        let timeConvert = convert(timeEnd - timeStart)
                        
                        let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes
                        let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds      
                        let time = `${minutes}:${seconds}`

                        const embed = new MessageEmbed()
                            .setAuthor("Spotify Track Info")
                            .setColor("RANDOM")
                            .setThumbnail(image)
                            .addField("Name:", name, true)
                            .addField("Album:", album, true)
                            .addField("Artist:", artist, true)
                            .addField("Duration:", time, false)
                            .addField("Listen now on Spotify", `[\`${artist} - ${name}\`](${url})`, false)
                            .setTimestamp()
                    return msg.channel.send(embed)
                    }
                    msg.channel.send("*This user isn't listening to Spotify!*")
        
    }

})

client.login("token of your bot")

client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})