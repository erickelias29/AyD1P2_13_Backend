const controller = {};
const sql = require('mssql');

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

controller.evidencia = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let pool;
   try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const { recordset } = await sql.query`SELECT * FROM evidencia;`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
};

controller.evidenciaId = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { id_reporte } = req.params
  let pool;
   try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const { recordset } = await sql.query`SELECT * FROM evidencia WHERE id_reporte = ${id_reporte};`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
};


controller.save = async (req, res) => {
  const { detalle, id_reporte } = req.body;
  console.log(req.body)

  let pool;
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const recordset = await sql.query`INSERT INTO evidencia VALUES (${detalle}, ${id_reporte});`;
      res.send('ok');

      
  } catch (err) {
      res.send('fail id_reporte');
      console.log(err)
  } finally {
      await pool.close();
  }
  
};


controller.deleteAll = async (req, res) => {
  let pool;
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const recordset = await sql.query`DELETE FROM evidencia;`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
}

module.exports = controller;
