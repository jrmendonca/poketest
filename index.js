const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://phgxbmebjnvvgi:08d2c7466c3d8da8d0a914ddf949a1a0312769aff491dc462d23b04799753edc@ec2-54-160-161-214.compute-1.amazonaws.com:5432/d221qmnt20i8fq',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();


const path = require('path');


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())



const getTrocas = (request, response) => {
	client.query('SELECT * FROM "tblRegistroTroca"', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
		}

const addRegistroTroca = (request, response) => {
  const {strListaPokemonOrigem, strListaPokemonDestino} = request.body

  client.query(
    'INSERT INTO "public"."tblRegistroTroca" ("strListaPokemonOrigem", "strListaPokemonDestino") VALUES ($1, $2);',
    [strListaPokemonOrigem, strListaPokemonDestino],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Registro adicionado'})
    },
  )
}
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/listar', function(req, res) {
  res.sendFile(path.join(__dirname + '/registro.html'));
});
app
  .route('/registro')
  // GET endpoint
  .get(getTrocas)
  // POST endpoint
  .post(addRegistroTroca)
  
// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
  console.log(process.env.NODE_ENV === 'production')
})  