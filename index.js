import express from 'express';
const app = express()
const port = 3000

//pries visas nuorodas: klientas nori failu is tam tikro folderio:
app.use(express.static('public'))

//funkcijos vykdomos viena paskui kita is eiles. * turi buti paskutinis

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Express</title>
      <link rel="stylesheet" href="/css/main.css">
  </head>
  <body>
      <h1>first page</h1>
  </body>
  </html>`);
});

app.post('/', (req, res) => {
    res.send('Got a POST request');
  });

app.get('/about', (req, res) => {
    res.send('about page');
  });

app.get('/services?', (req, res) => { //raide pries ? tampa neprivaloma. vadinasi veiks service ir services
    res.send('service');
});

//vienas kelias, kuris apima visus metodus:
app.all('/secret', (req, res, next) => {
    console.log('Accessing the secret section ...');//spausdina i konsole
    res.send('Secret');
})

//error vartotojui, nes parase netinkama kelia:
  app.get('*', (req, res) => {
    res.send('404');
  });

//pagauna visas likusias kombinacijas, auksciau neparasytu metodu (pvz, put) - bet koks kitas request, kuris nera parasytas ir keliu:
app.use((req, res, next) => {
    res.status(404).send("sorry can't find that");
});


//gaudo technines nesamones:
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});