﻿const Discord = require('discord.js')

module.exports = {
    slash: false,                                   //false Değeri Komutun Prefixli Olduğunu Gösteriyor
    name: ['sadecetc'],                        //Komut İsmini Belirtiyor
    cooldown: 10,                                   //Komutun CoolDown Süresini(Saniye) Gösteriyor




    async execute(client, message, args) {          //Komut Handlerına Göre Tanımlama Yeri. Burayı Ellemeyin
        var adx = args[0]
        let ad2x = args[1]
        let soyadx = args[2]
        var mysql = require('mysql');
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "101m"
        });
        message.reply('Sorgulatdığınız kişi aranıyor.. lütfen sabırlı olunuz.')
            con.query(`SELECT * FROM 101m WHERE ADI="${adx} ${ad2x}" AND SOYADI="${soyadx}"`, function (err, result) {
              if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))

              console.log(result)
              /*let ckt = new Discord.MessageAttachment ({
                attachment: Buffer.from('helo'),
                name: 'helo.txt'
              })
            message.reply({  files: [ckt] })*/
              let as31 = data.map((o) => `TC ${o.TC} | ADI ${o.ADI} | DOGUMTARİHİ ${o.DOGUMTARIHI} | SOYADI ${o.SOYADI} | İL ${o.NUFUSIL} | İLÇE ${o.NUFUSILCE}`).join('\n')
              message.reply(`:tada: ${adx} ${soyadx} isminde **${data.length}** kişi bulundu.`)
              let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `dracocheck.txt`);
              message.reply({ files: [ dosyahazırla ] })
              message.channel.send(`${message.author.tag} tarafından ${adx} ${soyadx} kişisi sorgulandı.`)
            }); 
            
    }
}