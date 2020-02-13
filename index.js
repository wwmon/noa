let readdir = require('util').promisify(require('fs').readdir),
  client = new (require('./base/Client'))({ ws: { properties: { $browser: 'Discord iOS' } } }),
  express = require('express'),
  http = require('http'),
  app = express(),
  server = http.createServer(app),
  port = 5000,
  dbl = new (require('dblapi.js'))(client.config.dblKey, { webhookServer: server, webhookAuth: client.config.dblSkey }),
  init = async () => {
    try {
      let Commands = await readdir('./commands'),
        Events = await readdir('./events/discord');
      Commands.forEach(async cmds => {
        let commands = await readdir('./commands/' + cmds + '/');
        commands
          .filter(cmd => cmd.split('.').pop() === 'js')
          .forEach(cmd => {
            let response = client.loadCommand('./commands/' + cmds, cmd);
            if (response) console.log(response);
          });
      });
      Events.forEach(ev => {
        ev = ev.split('.');
        client.on(ev[0], (...args) => new (require(`./events/discord/${ev[0]}.js`))(client).run(...args));
        console.log(`[E] El evento ${ev[0]} cargó con éxito`);
      });
      let login = await client.login(client.config.token),
        connect = await require('mongoose').connect(client.config.mongo, { useNewUrlParser: true, useUnifiedTopology: true });
      if (login) console.log('¡Iniciando sesión!');
      else console.log('Ha ocurrido un error iniciando sesión');
      if (connect) console.log('¡Conectando con la base de datos!');
      else console.log('Ha ocurrido un error conectando con la base de datos');
      client.dbl = dbl;
      return 'La configuración inicial del bot ha cargado con éxito';
    } catch (e) {
      console.error(e);
    }
  },
  web = async () => {
    try {
      let DBLEvents = await readdir('./events/dbl');
      DBLEvents.forEach(ev => {
        ev = ev.split('.');
        dbl.webhook.on(ev[0], (...args) => new (require(`./events/dbl/${ev[0]}.js`))(client).run(...args));
        console.log(`[D] El evento ${ev[0]}DBL cargó con éxito`);
      });
      app
        .set('view engine', 'ejs')
        .set('views', 'web/rutas')
        .use(express.static(__dirname + '/web')) // Carga el directorio raíz
        .use(express.static(__dirname + '/web/css')) // Carga el directorio que contiene los CSS
        .get('/', (req, res) => res.render('index', { client })) // Directorio principal
        .get('/support', (q, s) => s.redirect('https://discordapp.com/invite/wyVHNYc')) // Redirección support
        .get('/invite', (q, s) => s.redirect('https://discordapp.com/oauth2/authorize?client_id=477950798949646336&scope=bot&permissions=2146958847')) // Redirección invite
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
  };
init();
web();
