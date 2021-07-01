const controller = {};
const sql = require('mssql');
const fs = require('fs')

const config = {
    user: 'sa',
    password: 'Bet@1234',
    server: 'localhost',
    database: '',
    options: {
        enableArithAbort: true,
        trustServerCertificate: true
    }
}

controller.categoria = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let pool;
   try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const { recordset } = await sql.query`SELECT * FROM categoria;`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
};


controller.usuario = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let pool;
   try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const { recordset } = await sql.query`SELECT * FROM usuario;`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
};

controller.save = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { nombre, dpi, correo_electronico, contrasena, direccion } = req.body;
  console.log(req.body)

  let pool;
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const existe = await sql.query`SELECT * FROM usuario WHERE correo_electronico = ${correo_electronico};`;
      if(existe.recordset.length == 0) {
        const recordset = await sql.query`INSERT INTO usuario (nombre, dpi, correo_electronico, contrasena, direccion) VALUES (${nombre}, ${dpi}, ${correo_electronico}, ${contrasena}, ${direccion});`;
        res.send('ok');
      } else {
        res.send('fail');
      }
      
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
  
};

controller.deleteAll = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let pool;
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const recordset = await sql.query`DELETE FROM usuario;`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
}

controller.login = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { correo_electronico, contrasena } = req.body;
  let pool;
   try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const { recordset } = await sql.query`SELECT * FROM usuario WHERE correo_electronico = ${correo_electronico} AND contrasena = ${contrasena};`;
      if (recordset.length == 0) {
        res.send('fail');
      } else {        
        res.send(recordset[0]);
      }
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
};



module.exports = controller;
