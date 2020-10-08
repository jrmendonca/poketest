require('dotenv').config()


const {Pool} = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

//const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`


const connectionString = `postgres://phgxbmebjnvvgi:08d2c7466c3d8da8d0a914ddf949a1a0312769aff491dc462d23b04799753edc@ec2-54-160-161-214.compute-1.amazonaws.com:5432/d221qmnt20i8fq`
const pool = new Pool({
  connectionString,
  ssl: true,
})

module.exports = {pool}