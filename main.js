
api = process.cwd()

var express = require('express');
var router = express.Router();
var { exec } = require('child_process')
var fetch = require('node-fetch')
var canvacord = require('canvacord').Canvas
var fs = require('fs')
const {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./lib/youtube");

var criador = ['pedrozz_Mods'];
var key = 'rayk'

resposta = {
    semkey: {
        status: false,
        criador: `${criador}`,
        código: 406,
        mensagem: 
        'Insira a apikey na url'
    },
    cdtxt: {
        status: false,
        criador: `${criador}`,
        código: 406,
        mensagem: 
        'insira o texto na url'
    },
    cdimg: {
        status: false,
        criador: `${criador}`,
        código: 406,
        mensagem: 
        'Insira a imagem na url'
    },
    nottext: {
        status: false,
        criador: `${criador}`,
        code: 406,
        message: 'insira o parâmetro text'
    },
    error: {
       status: false,
        criador: `${criador}`,
        mensagem: 
        'ops :/ deu erro no servidor interno'
    }
}

var keyinvalida = api + '/route/keysemresultado.html' // html key de invalida

async function getBuffer(url) {
  he = await fetch(url).then(c => c.buffer())
   return he
}
async function getJson(url) {
  he = await fetch(url).then(c => c.json())
   return he
}
function getRandom(nans) {
  he = nans[Math.floor(Math.random() * nans.length)]
   return he
}
 router.all('/loli', async (req, res) => {
   var cdapikey = req.query.apikey;
   try {
   if(!cdapikey) return res.json(resposta.semkey)
    if(cdapikey !== key) return res.sendFile(keyinvalida)
   json = JSON.parse(fs.readFileSync('lib/lolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send(resposta.error)
   }
   })
  router.get('/canvas/*', async (req, res) => {
  var cdapikey = req.query.apikey;
   let { url, texto } = req.query
   try {
   if(!cdapikey) return res.json(resposta.semkey)
    if(cdapikey !== key) return res.sendFile(keyinvalida)
  switch(req.path.replace(/\/canvas/, '').toLowerCase()) {
 case '/trigger':
 case '/trigger/':
  if (!url) return res.status(408).send(resposta.cdimg)
  res.type('gif')
  res.send(await canvacord.trigger(url))
 break
 case '/changemymind':
 case '/changemymind/':
  if (!texto) return res.status(408).send(resposta.cdimg)
  res.type('jpg')
  res.send(await canvacord.changemymind(texto))
  break
      
 case '/clyde':
 case '/clyde/':
  if (!texto) return res.status(408).send(resposta.cdimg)
  res.type('jpg')
  res.send(await canvacord.clyde(texto))
  break
 default: 
 res.status(404).json({
            status:404,
            error: 'A página que você está procurando não foi encontrada',
            endpoint: req.path
        })
 }
  } catch (e) {
  console.error(e) 
   res.type('text/json')
   res.status(400).send(resposta.error)
 }
 })

 router.get('/nsfw/hentai', async (req, res) => {
 var cdapikey = req.query.apikey;
 try {
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 end = getRandom([,"waifu", "neko"])
 let { url } = await getJson(`https://api.waifu.pics/nsfw/${end}`)
 let buffer = await getBuffer(url)
 res.type('png')
 res.send(buffer)
 } catch {
 res.type('text/json')
 res.status(400).send(resposta.error)
 }
 })
  
 router.get('/download/ytmp3', async(req, res, next) => {
 var cdapikey = req.query.apikey;
 link = req.query.link          
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o link"})
 ytDonlodMp3(link).then((akk) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: akk
})}).catch(e => {
res.sendFile(error)})})

 router.get('/download/ytmp4', async(req, res, next) => {
 var cdapikey = req.query.apikey;
 link = req.query.link          
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o link"})
 ytDonlodMp4(link).then((akk) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: akk
})}).catch(e => {
res.sendFile(error)})})

 router.get('/download/play', async(req, res, next) => {
 var cdapikey = req.query.apikey;
 nome = req.query.nome
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 if (!nome) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o nome"})
 ytPlayMp3(nome).then((akk) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: akk
})}).catch(e => {
res.sendFile(error)})})

 router.get('/download/playv', async(req, res, next) => {
 var cdapikey = req.query.apikey;
 nome = req.query.nome
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 if (!nome) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o nome"})
 ytPlayMp4(nome).then((akk) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: akk
})}).catch(e => {
res.sendFile(error)})})


////////////////(ia)//////////////////

router.get('/ia/gpt4', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  try {
    if (!cdapikey) return res.json(resposta.semkey);
    if (cdapikey !== key) return res.sendFile(keyinvalida);

    const text = req.query.text1;
    if (!text) return res.json("coloque sua perqunta na URL 🥰");

    fetch("https://aemt.me/gpt4?text=" + text)
      .then(response => response.json())
      .then(data => {
        res.json({
          status: true,
          code: 200,
          criador: `${criador}`,
          resultado: data.result
        });
      })
      .catch(error => {
        console.log(error);
        res.send(`Deu erro: ${error}`);
      });
  } catch (error) {
    console.log(error);
    res.send(`Deu erro: ${error}`);
  }
});


router.get('/ia/gemini', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  try {
    if (!cdapikey) return res.json(resposta.semkey);
    if (cdapikey !== key) return res.sendFile(keyinvalida);

    const text = req.query.text1;
     if (!text) return res.json("coloque sua perqunta na URL 🥰");

    fetch("https://aemt.me/gemini?text=" + text)
      .then(response => response.json())
      .then(data => {
        res.json({
          status: true,
          code: 200,
          criador: `${criador}`,
          resultado: data.result
        });
      })
      .catch(error => {
        console.log(error);
        res.send(`Deu erro: ${error}`);
      });
  } catch (error) {
    console.log(error);
    res.send(`Deu erro: ${error}`);
  }
});

router.get('/ia/turbo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  try {
    if (!cdapikey) return res.json(resposta.semkey);
    if (cdapikey !== key) return res.sendFile(keyinvalida);

    const text = req.query.text1;
     if (!text) return res.json("coloque sua perqunta na URL 🥰");

    fetch("https://aemt.me/turbo?text=" + text)
      .then(response => response.json())
      .then(data => {
        res.json({
          status: true,
          code: 200,
          criador: `${criador}`,
          resultado: data.result
        });
      })
      .catch(error => {
        console.log(error);
        res.send(`Deu erro: ${error}`);
      });
  } catch (error) {
    console.log(error);
    res.send(`Deu erro: ${error}`);
  }
});

router.get('/ia/bingia', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  try {
    if (!cdapikey) return res.json(resposta.semkey);
    if (cdapikey !== key) return res.sendFile(keyinvalida);

    const text = req.query.text1;
     if (!text) return res.json("coloque sua perqunta na URL 🥰)");

    fetch("https://aemt.me/bingai?text=" + text)
      .then(response => response.json())
      .then(data => {
        res.json({
          status: true,
          code: 200,
          criador: `${criador}`,
          resultado: data.result
        });
      })
      .catch(error => {
        console.log(error);
        res.send(`Deu erro: ${error}`);
      });
  } catch (error) {
    console.log(error);
    res.send(`Deu erro: ${error}`);
  }
});

//////////////////(ia)//////////////////

//////////////// +18 \\\\\\\\\\\\\\\\\\\\
router.all('/shota', async (req, res) => {
 var cdapikey = req.query.apikey;
   try {
   if(!cdapikey) return res.json(resposta.semkey)
    if(cdapikey !== key) return res.sendFile(keyinvalida)
   json = JSON.parse(fs.readFileSync('lib/shotas.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send(resposta.error)
   }
   })


router.post('/post/body', async (req, res) => {
  res.send(req.body)
})
   
   router.all('*', async (req, res) => {
   res.status(404).json({
            status:404,
            error: 'Esta página não esta presente na Rest Api',
            endpoint: req.path
        })
})


module.exports = router



router.get('/api/audiomenu', async(req, res, next) => {

  try {
    const text = req.query.text1;
    if (!text) return res.json("coloca o nome");

    fetch("https://api.sabapi.tech/api/audiomeme?query=" + text + "&apikey=@Luix1397")
      .then(response => response.json())
      .then(data => {
        res.json({
          status: true,
          code: 200,
          criador: `PedrozzMods`,
          resultado: data.resultado
        });
      })
      .catch(error => {
        console.log(error);
        res.send(`Deu erro: ${error}`);
      });
  } catch (error) {
    console.log(error);
    res.send(`Deu erro: ${error}`);
  }
});

router.get('/api/stalkytb', async (req, res, next) => {
  try {
    const text = req.query.text1;
    if (!text) return res.status(400).json({ error: "Por favor, forneça um nome de canal do YouTube." });
    const response = await fetch(`https://api.lolhuman.xyz/api/ytchannel?apikey=Gatadios&query=${text}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Erro ao acessar a API externa: ${response.statusText}`);
    }
    res.status(200).json({
      status: true,
      criador: `@ PedrozzMods`,
      resultado: data.result
    });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Ocorreu um erro durante o processamento da solicitação.' });
  }
});
