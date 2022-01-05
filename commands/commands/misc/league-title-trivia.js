const Discord = require('discord.js')
const economy = require('../../../features/features/economy')
const levels = require('../../../features/features/levels')

module.exports = {
    commands: ['leaguetitle', 'lt'],
    cooldown: 3,
    callback: async (message) => {
        const triviaMap = new Map()
        const selection = Math.ceil(Math.random() * 14)
        createTriviaMap(triviaMap, selection)

        const ultName = getRandomKey(triviaMap)
        const championName = triviaMap.get(ultName)

        const embed = new Discord.MessageEmbed()
            .setTitle('League Champion Title Trivia')
            .addFields({
                name: `__Title__`,
                value: String(`\`${ultName}\``),
                inline: true
            },{
                name: `__Champion Name__`,
                value: `\`???\``,
                inline: true
            })
            .setDescription('_Guess the champion name based on their title_')
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
                    .setTitle('League Champion Title Trivia')
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
                    .setTitle('League Champion Title Trivia')
                    .setDescription(`${m.author.username} has guessed the champion first in ${guessTime} seconds and earned ${moneyEarned}! The correct answer was \`${championName}\`.`)
                    .setColor('#2E5EC6')
                collector.stop()
                answered = true
                await economy.addMoney(m.guild.id, m.author.id, moneyEarned)
                await levels.addXP(message.guild.id, message.member.id, 50, message, message.member.user.username)
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
        triviaMap.set('The Darkin Blade', 'Aatrox')
        triviaMap.set('The Nine-Tailed Fox', 'Ahri')
        triviaMap.set('The Rogue Assassin', 'Akali')
        triviaMap.set('The Rogue Sentinel', 'Akshan')
        triviaMap.set('The minotaur', 'Alistar')
        triviaMap.set('The Sad Mummy', 'Amumu')
        triviaMap.set('The Cryophoenix', 'Anivia')
        triviaMap.set('The Dark Child', 'Annie')
        triviaMap.set('The Weapon of the Faithful', 'Aphelios')
        triviaMap.set('The Frost Archer', 'Ashe')
    } else if (selection == 2) {
        triviaMap.set('The Star Forger', 'Aurelion Sol')
        triviaMap.set('The Emperor of the Sands', 'Azir')
        triviaMap.set('The Wandering Caretaker', 'Bard')
        triviaMap.set('The Great Steam Golem', 'Blitzcrank')
        triviaMap.set('The Burning Vengeance', 'Brand')
        triviaMap.set('The Heart of the Freljord', 'Braum')
        triviaMap.set('The Sheriff of Piltover', 'Caitlyn')
        triviaMap.set('The Steel Shadow', 'Camille')
        triviaMap.set('The Serpent\'s Embrace', 'Cassiopeia')
        triviaMap.set('The Terror of the Void', 'Cho\'Gath')
    } else if (selection == 3) {
        triviaMap.set('The Daring Bombardier', 'Corki')
        triviaMap.set('The Hand of Noxus', 'Darius')
        triviaMap.set('Scorn of the Moon', 'Diana')
        triviaMap.set('The Madman of Zaun', 'Dr Mundo')
        triviaMap.set('The Glorious Executioner', 'Draven')
        triviaMap.set('The Boy Who Shattered Time', 'Ekko')
        triviaMap.set('The Spider Queen', 'Elise')
        triviaMap.set('Agony\'s Embrace', 'Evelynn')
        triviaMap.set('The Prodigial Explorer', 'Ezreal')
        triviaMap.set('The Ancient Fear', 'Fiddlesticks')
    } else if (selection == 4) {
        triviaMap.set('The Grand Duelist', 'Fiora')
        triviaMap.set('The Tidal Trickster', 'Fizz')
        triviaMap.set('The Colossus', 'Galio')
        triviaMap.set('The Saltwater Scourge', 'Gangplank')
        triviaMap.set('The Might of Demacia', 'Garen')
        triviaMap.set('The Missing Link', 'Gnar')
        triviaMap.set('The Rabble Rouser', 'Gragas')
        triviaMap.set('The Outlaw', 'Graves')
        triviaMap.set('The Hallowed Seamstress', 'Gwen')
        triviaMap.set('The Shadow of War', 'Hecarim')
    } else if (selection == 5) {
        triviaMap.set('The Revered Inventor', 'Heimerdinger')
        triviaMap.set('The Kraken Priestess', 'Illaoi')
        triviaMap.set('The Blade Dancer', 'Irelia')
        triviaMap.set('The Green Father', 'Ivern')
        triviaMap.set('The Storm\'s Fury', 'Janna')
        triviaMap.set('The Exemplar of Demacia', 'Jarvan 4')
        triviaMap.set('Grandmaster at Arms', 'Jax')
        triviaMap.set('The Defender of Tomorrow', 'Jayce')
        triviaMap.set('The Virtuoso', 'Jhin')
        triviaMap.set('The Loose Cannon', 'Jinx')
    } else if (selection == 6) {
        triviaMap.set('Daughter of the Void', 'Kai\'sa')
        triviaMap.set('The Spear of Vengeance', 'Kalista')
        triviaMap.set('The Enlightened One', 'Karma')
        triviaMap.set('The Deathsinger', 'Karthus')
        triviaMap.set('The Void Walker', 'Kassadin')
        triviaMap.set('The Sinister Blade', 'Katarina')
        triviaMap.set('The Righteous', 'Kayle')
        triviaMap.set('The Shadow Reaper', 'Kayn')
        triviaMap.set('The Heart of the Tempest', 'Kennen')
        triviaMap.set('The Voidreaver', 'Kha\'zix')
    } else if (selection == 7) {
        triviaMap.set('The Eternal Hunters', 'Kindred')
        triviaMap.set('The Cantankerous Cavalier', 'Kled')
        triviaMap.set('The Mouth of the Abyss', 'Kog\'maw')
        triviaMap.set('The Deceiver', 'Leblanc')
        triviaMap.set('The Blind Monk', 'Lee Sin')
        triviaMap.set('The Radiant Dawn', 'Leona')
        triviaMap.set('The Bashful Bloom', 'Lillia')
        triviaMap.set('The Ice Witch', 'Lissandra')
        triviaMap.set('The Purifier', 'Lucian')
        triviaMap.set('The Fae Sorceress', 'Lulu')
    } else if (selection == 8) {
        triviaMap.set('The Lady of Luminosity', 'Lux')
        triviaMap.set('Shard of the Monolith', 'Malphite')
        triviaMap.set('The Prophet of the Void', 'Malzahar')
        triviaMap.set('The Twisted Treant', 'Maokai')
        triviaMap.set('The Wuju Bladesman', 'Master Yi')
        triviaMap.set('The Bounty Hunter', 'Miss Fortune')
        triviaMap.set('The Iron Revenant', 'Mordekaiser')
        triviaMap.set('The Fallen', 'Morgana')
        triviaMap.set('The Tidecaller', 'Nami')
        triviaMap.set('The Curator of the Sands', 'Nasus')
    } else if (selection == 9) {
        triviaMap.set('The Titan of the Depths', 'Nautilus')
        triviaMap.set('The Curious Chameleon', 'Neeko')
        triviaMap.set('The Bestial Huntress', 'Nidalee')
        triviaMap.set('The Eternal Nightmare', 'Nocturne')
        triviaMap.set('The Boy and his Yeti', 'Nunu and willump')
        triviaMap.set('The Berserker', 'Olaf')
        triviaMap.set('The Lady of Clockword', 'Orianna')
        triviaMap.set('The Fire Below the Mountain', 'Ornn')
        triviaMap.set('The Unbreakable Spear', 'Pantheon')
        triviaMap.set('Keeper of the Hammer', 'Poppy')
    } else if (selection == 10) {
        triviaMap.set('The Bloodharber Ripper', 'Pyke')
        triviaMap.set('Empress of the Elements', 'Qiyana')
        triviaMap.set('Demacia\'s Wings', 'Quinn')
        triviaMap.set('The Charmer', 'Rakan')
        triviaMap.set('The Armordillo', 'Rammus')
        triviaMap.set('The Void Burrower', 'Rek\'Sai')
        triviaMap.set('The Iron Maiden', 'Rell')
        triviaMap.set('The Butcher of the Sands', 'Renekton')
        triviaMap.set('The Pridestalker', 'Rengar')
        triviaMap.set('The Exile', 'Riven')
    } else if (selection == 11) {
        triviaMap.set('The Mechanized Menace', 'Rumble')
        triviaMap.set('The Rune Mage', 'Ryze')
        triviaMap.set('The Desert Rose', 'Samira')
        triviaMap.set('Fury of the North', 'Sejuani')
        triviaMap.set('The Redeemer', 'Senna')
        triviaMap.set('The Starry-Eyed Songstress', 'Seraphine')
        triviaMap.set('THE BOSS', 'Sett')
        triviaMap.set('The Demon Jester', 'Shaco')
        triviaMap.set('The Eye of Twilight', 'Shen')
        triviaMap.set('The Half-Dragon', 'Shyvana')
    } else if (selection == 12) {
        triviaMap.set('The Mad Chemist', 'Singed')
        triviaMap.set('The Undead Juggernaut', 'Sion')
        triviaMap.set('The Battle Mistress', 'Sivir')
        triviaMap.set('The Crystal Vanguard', 'Skarner')
        triviaMap.set('Maven of the Strings', 'Sona')
        triviaMap.set('The Starchild', 'Soraka')
        triviaMap.set('The Noxian Grand General', 'Swain')
        triviaMap.set('The Unshackled', 'Sylas')
        triviaMap.set('The Dark Sovereign', 'Syndra')
        triviaMap.set('The River King', 'Tahm Kench')
    } else if (selection == 13) {
        triviaMap.set('The Stoneweaver', 'Taliyah')
        triviaMap.set('The Blade\'s Shadow', 'Talon')
        triviaMap.set('The Shield of Valoran', 'Taric')
        triviaMap.set('The Swift Scout', 'Teemo')
        triviaMap.set('The Chain Warden', 'Thresh')
        triviaMap.set('The Yordle Gunner', 'Tristana')
        triviaMap.set('The Troll King', 'Trundle')
        triviaMap.set('The Barbarian King', 'Tryndamere')
        triviaMap.set('The Card Master', 'Twisted Fate')
        triviaMap.set('The Plague Rat', 'Twitch')
    } else if (selection == 14) {
        triviaMap.set('The Spirit Walker', 'Udyr')
        triviaMap.set('The Dreadnought', 'Urgot')
        triviaMap.set('The Arrow of Retribution', 'Varus')
        triviaMap.set('The Night Hunter', 'Vayne')
        triviaMap.set('The Tiny Master of Evil', 'Veigar')
        triviaMap.set('The Eye of the Void', 'Vel\'Koz')
        triviaMap.set('The Gloomist', 'Vex')
        triviaMap.set('The Piltover Enforcer', 'Vi')
        triviaMap.set('The Ruined King', 'Viego')
        triviaMap.set('The Machine Herald', 'Viktor')
    } else if (selection == 15) {
        triviaMap.set('The Crimson Reaper', 'Vladamir')
        triviaMap.set('The Relentless Storm', 'Volibear')
        triviaMap.set('The Uncaged Wrath of Zaun', 'Warwick')
        triviaMap.set('The Monkey King', 'Wukong')
        triviaMap.set('The Rebel', 'Xayah')
        triviaMap.set('The Magus Ascendant', 'Xerath')
        triviaMap.set('The Seneschal of Demacia', 'Xin Zhao')
        triviaMap.set('The Unforgiven', 'Yasuo')
        triviaMap.set('The Unforgotten', 'Yone')
        triviaMap.set('Shepherd of Souls', 'Yorick')
    } else if (selection == 16) {
        triviaMap.set('The Magical Cat', 'Yuumi')
        triviaMap.set('The Secret Weapon', 'Zac')
        triviaMap.set('The Master of Shadows', 'Zed')
        triviaMap.set('The Hexplosives Expert', 'Ziggs')
        triviaMap.set('The Chronokeeper', 'Zilean')
        triviaMap.set('The Aspect of Twilight', 'Zoe')
        triviaMap.set('Rise of the Thorns', 'Zyra')
    }
}