const Discord = require('discord.js')
const { floor, random } = Math
const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['leagueult'],
    description: 'Try to match the league champion with their ultimate name.',
    cooldown: 3,
    callback: async (message, arguments, text, client) => {
        const triviaMap = new Map()
        const selection = Math.ceil(Math.random() * 14)
        createTriviaMap(triviaMap, selection)

        const ultName = getRandomKey(triviaMap)
        const championName = triviaMap.get(ultName)

        const embed = new Discord.MessageEmbed()
            .setTitle('League Ultimate Abilities Trivia')
            .addFields({
                name: `__Ultimate Name__`,
                value: String(`\`${ultName}\``),
                inline: true
            },{
                name: `__Champion Name__`,
                value: `\`???\``,
                inline: true
            })
            .setDescription('_Guess the champion name based on their ultimate ability_')
            .setColor('#2E5EC6')
        
        message.channel.send({embeds: [embed]})
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
            })

        const filter = (m) => {
            !m.author.bot,
            m.content.toLowerCase() == championName.toLowerCase()
        }

        const collector = new Discord.MessageCollector(message.channel, filter)

        let answered = false
        setTimeout(() => {
            if (!answered) {
                collector.stop()
                const endEmbed = new Discord.MessageEmbed()
                    .setTitle('League Ultimate Abilities Trivia')
                    .setDescription(`You have ran out of time! The correct answer was ${championName}`)
                    .setColor('#2E5EC6')
                message.channel.send({embeds: [endEmbed]})
            }
        }, 15000)
        const timerEnd = new Date().getTime()

        collector.on('collect', async (m) => {
            if (m.content.toLowerCase() == championName.toLowerCase()) {
                const guessTime = Math.round((new Date().getTime() - timerEnd) / 1000)
                const moneyEarned = Math.round((((timerEnd + 15000) - new Date().getTime()) * 20) / 1000)
                const winnerEmbed = new Discord.MessageEmbed()
                    .setTitle('League Ultimate Abilities Trivia')
                    .setDescription(`${m.author.username} has guessed the champion first in ${guessTime} seconds and earned ${moneyEarned}! The correct answer was \`${championName}\`.`)
                    .setColor('#2E5EC6')
                collector.stop()
                answered = true
                economy.addMoney(m.guild.id, m.author.id, moneyEarned)
                return message.channel.send({embeds: [winnerEmbed]})
            }
        })
    }
}

function getRandomKey(triviaMap) {
    selection = Math.floor(Math.random() * triviaMap.size)
    let counter = 0
    for (let key of triviaMap.keys()) {
        if (counter++ === selection) {
            return key
        }
    }
}
 
function createTriviaMap(triviaMap, selection) {
    if (selection == 1) {
        triviaMap.set('World Ender', 'Aatrox')
        triviaMap.set('Spirit Rush', 'Ahri')
        triviaMap.set('Perfect Execution', 'Akali')
        triviaMap.set('Comeuppance', 'Akshan')
        triviaMap.set('Unbreakable Will', 'Alistar')
        triviaMap.set('Curse of the Sad Mummy', 'Amumu')
        triviaMap.set('Glacial Storm', 'Anivia')
        triviaMap.set('Summon: Tibbers', 'Annie')
        triviaMap.set('Moonlight Vigil', 'Aphelios')
        triviaMap.set('Enchanted Crystal Arrow', 'Ashe')
    } else if (selection == 2) {
        triviaMap.set('Voice of Light', 'Aurelion Sol')
        triviaMap.set('Emperor\'s Divide', 'Azir')
        triviaMap.set('Tempered Fate', 'Bard')
        triviaMap.set('Static Field', 'Blitzcrank')
        triviaMap.set('Pyroclasm', 'Brand')
        triviaMap.set('Glacial Fissure', 'Braum')
        triviaMap.set('Ace in the Hole', 'Caitlyn')
        triviaMap.set('Hextech Ultimatum', 'Camille')
        triviaMap.set('Petrifying Gaze', 'Cassiopeia')
        triviaMap.set('Feast', 'Cho\'Gath')
    } else if (selection == 3) {
        triviaMap.set('Missile Barrage', 'Corki')
        triviaMap.set('Noxian Guillotine', 'Darius')
        triviaMap.set('Moonfall', 'Diana')
        triviaMap.set('Maximum Dosage', 'Dr Mundo')
        triviaMap.set('Whirling Death', 'Draven')
        triviaMap.set('Chronobreak', 'Ekko')
        triviaMap.set('Spider Form|Human Form', 'Elise')
        triviaMap.set('Last Caress', 'Evelynn')
        triviaMap.set('Trueshow Barrage', 'Ezreal')
        triviaMap.set('Crowstorm', 'Fiddlesticks')
    } else if (selection == 4) {
        triviaMap.set('Grand Challenge', 'Fiora')
        triviaMap.set('Chum the Waters', 'Fizz')
        triviaMap.set('Hero\'s Entrance', 'Galio')
        triviaMap.set('Cannon Barrage', 'Gangplank')
        triviaMap.set('Demacian Justice', 'Garen')
        triviaMap.set('GNAR!', 'Gnar')
        triviaMap.set('Explosive Cask', 'Gragas')
        triviaMap.set('Collateral Damage', 'Graves')
        triviaMap.set('Needleword', 'Gwen')
        triviaMap.set('Onslaught of Shadows', 'Hecarim')
    } else if (selection == 5) {
        triviaMap.set('UPGRADE!!!', 'Heimerdinger')
        triviaMap.set('Leap of Faith', 'Illaoi')
        triviaMap.set('Vanguard\'s Edge', 'Irelia')
        triviaMap.set('Daisy!', 'Ivern')
        triviaMap.set('Monsoon', 'Janna')
        triviaMap.set('Cataclysm', 'Jarvan 4')
        triviaMap.set('Grandmaster\'s Might', 'Jax')
        triviaMap.set('Transform: Mercury Cannon/Hammer', 'Jayce')
        triviaMap.set('Curtain Call', 'Jhin')
        triviaMap.set('Super Mega Death Rocket', 'Jinx')
    } else if (selection == 6) {
        triviaMap.set('Killer Instinct', 'Kai\'sa')
        triviaMap.set('Fate\'s Call', 'Kalista')
        triviaMap.set('Mantra', 'Karma')
        triviaMap.set('Requiem', 'Karthus')
        triviaMap.set('Riftwalk', 'Kassadin')
        triviaMap.set('Death Lotus', 'Katarina')
        triviaMap.set('Divine Judgement', 'Kayle')
        triviaMap.set('Umbral Trespass', 'Kayn')
        triviaMap.set('Slicing Maelstrom', 'Kennen')
        triviaMap.set('Void Assault', 'Kha\'zix')
    } else if (selection == 7) {
        triviaMap.set('Lamb\'s Respite', 'Kindred')
        triviaMap.set('Chaaaaaaaarge!!!', 'Kled')
        triviaMap.set('Living Artillery', 'Kog\'maw')
        triviaMap.set('Mimic', 'Leblanc')
        triviaMap.set('Dragon\'s Rage', 'Lee Sin')
        triviaMap.set('Solar Flare', 'Leona')
        triviaMap.set('Lilting Lullaby', 'Lillia')
        triviaMap.set('Frozen Tomb', 'Lissandra')
        triviaMap.set('The Culling', 'Lucian')
        triviaMap.set('Wild Growth', 'Lulu')
    } else if (selection == 8) {
        triviaMap.set('Final Spark', 'Lux')
        triviaMap.set('Unstoppable Force', 'Malphite')
        triviaMap.set('Nether Grasp', 'Malzahar')
        triviaMap.set('Nature\'s Grasp', 'Maokai')
        triviaMap.set('Highlander', 'Master Yi')
        triviaMap.set('Bullet Time', 'Miss Fortune')
        triviaMap.set('Realm of Death', 'Mordekaiser')
        triviaMap.set('Soul Shackles', 'Morgana')
        triviaMap.set('Tidal Wave', 'Nami')
        triviaMap.set('Fury of the Sands', 'Nasus')
    } else if (selection == 9) {
        triviaMap.set('Depth Charge', 'Nautilus')
        triviaMap.set('Pop Blossom', 'Neeko')
        triviaMap.set('Aspect of the Cougar', 'Nidalee')
        triviaMap.set('Paranoia', 'Nocturne')
        triviaMap.set('Absolute Zero', 'Nunu and willump')
        triviaMap.set('Ragnarok', 'Olaf')
        triviaMap.set('Command: Shockwave', 'Orianna')
        triviaMap.set('Call of the Forge God', 'Ornn')
        triviaMap.set('Grand Starfall', 'Pantheon')
        triviaMap.set('Keeper\'s Verdict', 'Poppy')
    } else if (selection == 10) {
        triviaMap.set('Death From Below', 'Pyke')
        triviaMap.set('Supreme Display of Talent', 'Qiyana')
        triviaMap.set('Behind Enemy Lines|Skystrike', 'Quinn')
        triviaMap.set('The Quickness', 'Rakan')
        triviaMap.set('Soaring Slam', 'Rammus')
        triviaMap.set('Void Rush', 'Rek\'Sai')
        triviaMap.set('Magnet Storm', 'Rell')
        triviaMap.set('Dominus', 'Renekton')
        triviaMap.set('Thrill of the Hunt', 'Rengar')
        triviaMap.set('Blade of the Exile', 'Riven')
    } else if (selection == 11) {
        triviaMap.set('The Equalizer', 'Rumble')
        triviaMap.set('Realm Warp', 'Ryze')
        triviaMap.set('Inferno Trigger', 'Samira')
        triviaMap.set('Glacial Prison', 'Sejuani')
        triviaMap.set('Dawning Shadow', 'Senna')
        triviaMap.set('Encore', 'Seraphine')
        triviaMap.set('The Show Stopper', 'Sett')
        triviaMap.set('Hallucinate', 'Shaco')
        triviaMap.set('Stand United', 'Shen')
        triviaMap.set('Dragon\s Decent', 'Shyvana')
    } else if (selection == 12) {
        triviaMap.set('Insanity Potion', 'Singed')
        triviaMap.set('Unstoppable Onslaught', 'Sion')
        triviaMap.set('On the Hunt', 'Sivir')
        triviaMap.set('Impale', 'Skarner')
        triviaMap.set('Crescendo', 'Sona')
        triviaMap.set('Wish', 'Soraka')
        triviaMap.set('Demonic Ascension', 'Swain')
        triviaMap.set('Hijack', 'Sylas')
        triviaMap.set('Unleashed Power', 'Syndra')
        triviaMap.set('Devour|Regurgitate', 'Tahm Kench')
    } else if (selection == 13) {
        triviaMap.set('Weaver\'s Wall', 'Taliyah')
        triviaMap.set('Shadow Assault', 'Talon')
        triviaMap.set('Cosmic Radiance', 'Taric')
        triviaMap.set('Noxious Trap', 'Teemo')
        triviaMap.set('The Box', 'Thresh')
        triviaMap.set('Buster Shot', 'Tristana')
        triviaMap.set('Subjugate', 'Trundle')
        triviaMap.set('Undying Rage', 'Tryndamere')
        triviaMap.set('Destiny', 'Twisted Fate')
        triviaMap.set('Spray and Pray', 'Twitch')
    } else if (selection == 14) {
        triviaMap.set('Phoenix Stance', 'Udyr')
        triviaMap.set('Fear Beyond Death', 'Urgot')
        triviaMap.set('Chain of Corruption', 'Varus')
        triviaMap.set('Final Hour', 'Vayne')
        triviaMap.set('Primordial Burst', 'Veigar')
        triviaMap.set('Lifeform Disintegration Ray', 'Vel\'Koz')
        triviaMap.set('Shadow Surge', 'Vex')
        triviaMap.set('Cease and Desist', 'Vi')
        triviaMap.set('Heartbreaker', 'Viego')
        triviaMap.set('Chaos Storm', 'Viktor')
    } else if (selection == 15) {
        triviaMap.set('Hemoplague', 'Vladamir')
        triviaMap.set('Stormbringer', 'Volibear')
        triviaMap.set('Infinite Duress', 'Warwick')
        triviaMap.set('Cyclone', 'Wukong')
        triviaMap.set('Featherstorm', 'Xayah')
        triviaMap.set('Rite of the Arcane', 'Xerath')
        triviaMap.set('Crescent Guard', 'Xin Zhao')
        triviaMap.set('Last Breath', 'Yasuo')
        triviaMap.set('Fate Sealed', 'Yone')
        triviaMap.set('eulogy of the Isles', 'Yorick')
    } else if (selection == 16) {
        triviaMap.set('Final Chapter', 'Yuumi')
        triviaMap.set('Let\'s Bounce!', 'Zac')
        triviaMap.set('Death Mark', 'Zed')
        triviaMap.set('Mega Inferno Bomb', 'Ziggs')
        triviaMap.set('Chronoshift', 'Zilean')
        triviaMap.set('Portal Jump', 'Zoe')
        triviaMap.set('Stranglethorns', 'Zyra')
    }
}