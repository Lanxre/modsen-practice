import pkg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user:'postgres',
    password: process.env.db_password,
    host: process.env.db_host,
    port: process.env.db_port,
    database:  process.env.db_name
});



export default pool;