const readdir = require('util').promisify(require('fs').readdir),
  mongoose = require("mongoose"),
  express = require('express'),
  http = require('http')

const client = new (require('./base/Client'))({ ws: { properties: { $browser: 'Discord iOS' } } })

const app = express()

const server = http.createServer(app)
const port = 5000

const dbl = new (require('dblapi.js'))(client.config.dblKey, { webhookServer: server, webhookAuth: client.config.dblSkey })

async function init() {
  try {
    const commandSections = await readdir('./commands')
    const events = await readdir('./events/discord');

    commandSections.forEach(async section => {
      const commands = await readdir('./commands/' + section + '/');

      commands
        .filter(cmd => cmd.split('.').pop() === 'js')
        .forEach(cmd => {
          client.loadCommand('./commands/' + section, cmd);
        });
    });

    events.forEach(event => {
      event = event.split('.');

      client.on(event[0], (...args) => {
        const Event = require(`./events/discord/${event[0]}.js`)
        const eventInstance = new Event(client)

        eventInstance.run(...args)
      });

      console.log(`[E] El evento ${event[0]} cargó con éxito`);
    });

    client.login(client.config.token)
      .then(() => {
        console.log('¡Iniciando sesión!')
      })
      .catch(err => {
        console.error(err)
      })

    mongoose.connect(client.config.mongo, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('¡Conectando con la base de datos!');
      })
      .catch(err => {
        console.error(err)
      })

    client.dbl = dbl;
    return 'La configuración inicial del bot ha cargado con éxito';
  } catch (e) {
    console.error(e);
  }
}

async function web() {
  try {
    const DBLEvents = await readdir('./events/dbl');

    DBLEvents.forEach(ev => {
      ev = ev.split('.');
      dbl.webhook.on(ev[0], (...args) => {
        const Event = require(`./events/dbl/${ev[0]}.js`)
        const eventInstance = new Event(client)

        eventInstance.run(...args)
      });
      console.log(`[D] El evento ${ev[0]}DBL cargó con éxito`);
    });

    app
      .set('view engine', 'ejs')
      .set('views', 'web/rutas')

      .use(express.static(__dirname + '/web')) // Carga el directorio raíz
      .use(express.static(__dirname + '/web/css')) // Carga el directorio que contiene los CSS

      .get('/', (req, res) => res.render('index', { client })) // Directorio principal
      .get('/support', (q, s) => s.redirect('https://discordapp.com/invite/wyVHNYc')) // Redirección support
      .get('/invite', (q, s) => s.redirect('https://discordapp.com/oauth2/authorize?client_id=477950798949646336&scope=bot&permissions=829811958&response_type=code&redirect_uri=https://noa.wwmon.xyz/support')) // Redirección invite
      .get('/dbl', (q, s) => s.redirect('https://top.gg/bot/477950798949646336')) // Redirección dbl
      .get('/vote', (q, s) => s.redirect('https://top.gg/bot/477950798949646336/vote')) // Redirección dbl vote
      .get('/github', (q, s) => s.redirect('https://github.com/wwmon/noa')) // Redirección github
      .get('/donate', (q, s) => s.redirect('https://buymeacoff.ee/noa')) // Redirección buymeacoffee
      .use((req, res, next) => res.status(404).render('404')); // 404 not found

    server.listen(port, () => {
      console.log(`Escuchando en ${port}`);
    });
    
    return 'La configuración de la web ha cargado con éxito';
  } catch (e) {
    console.error(e);
  }
}
init();
web();
