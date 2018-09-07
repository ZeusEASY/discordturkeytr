const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Toplantı Zamanı') {
    msg.reply('https://giphy.com/gifs/southparkgifs-l3vR5yxvzx6tTTHlC Toplantı Zamanı!! @everyone ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'toplantı zamanı') {
    msg.reply('https://giphy.com/gifs/southparkgifs-l3vR5yxvzx6tTTHlC Toplantı Zamanı!! @everyone ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ^^');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'amk') {
    msg.reply('Küfür Etme!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'mk') {
    msg.reply('Küfür Etme!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'mq') {
    msg.reply('Küfür Etme!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sg') {
    msg.reply('Küfür Etme!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'siktir git') {
    msg.reply('Küfür Etme!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'piç') {
    msg.reply('Küfür Etme!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oç') {
    msg.reply('Küfür Etme!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oc') {
    msg.reply('Küfür Etme!');
  }
});

client.on('message', msg => {
  if (msg.content === 'ip') {
    msg.reply('ipmiz:185.184.27.235:27015');
  }
});

client.on('message', msg => {
  if (msg.content === 'el hareketi') {
    msg.reply('https://giphy.com/gifs/1LnQKc4eh8BP2');
  }
});

client.on('message', msg => {
  if (msg.content === 'dc') {
    msg.reply('Discord Sunucu Linki => https://discord.gg/bYTnVRe');
  }
});

client.on('message', msg => {
  if (msg.content === 'grup') {
    msg.reply('Steam Grup Linki => https://steamcommunity.com/groups/DarkSoldiersFun');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
