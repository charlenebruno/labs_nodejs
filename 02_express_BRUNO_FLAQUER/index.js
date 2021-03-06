express = require('express')
app = express()
metrics = require('./metrics')

path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.set('port', 1338)
app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

app.get(
  '/', 
  (req, res) => res.send("Hello world <br><br> To test this application, pass a name in parameters and it will display 'Hello name', as well as a button 'bring the metrics' that, when clicked, will display two lines showing timestamps.<br>Example: localhost:/1338/hello/Laura")
)

app.get(
    '/hello/:name', 
    (req, res) => res.render('hello.ejs', {name: req.params.name})
  )

  app.get('/metrics.json', (req, res) => {
    metrics.get((err, data) => {
      if(err) throw err
      res.status(200).json(data)
    })
  })

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)