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

controller.producto = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let pool;
   try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const { recordset } = await sql.query`SELECT * FROM producto;`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
};

/*controller.producto = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let pool;
   try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const { recordset } = await sql.query`SELECT * FROM producto;`;
      let result = []
      for(const element of recordset) {
        const categoria = await sql.query`SELECT descripcion FROM tipo_reporte WHERE id_categoria = ${element.id_categoria};`;
        const usuario = await sql.query`SELECT usuario FROM usuario WHERE id_usuario = ${element.id_usuario};`;
        delete element['id_usuario'];
        element['usuario'] = usuario.recordset[0].usuario;
        delete element['id_tipo_reporte'];
        element['categoria'] = tipo_reporte.recordset[0].descripcion;
      }
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
};*/

controller.reporteID = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { id_reporte } = req.params
  let pool;
   try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const { recordset } = await sql.query`SELECT * FROM reporte WHERE id_reporte = ${id_reporte};`;
      let result = []
      for(const element of recordset) {
        const tipo_reporte = await sql.query`SELECT descripcion FROM tipo_reporte WHERE id_tipo_reporte = ${element.id_tipo_reporte};`;
        const usuario = await sql.query`SELECT usuario FROM usuario WHERE id_usuario = ${element.id_usuario};`;
        delete element['id_usuario'];
        element['usuario'] = usuario.recordset[0].usuario;
        delete element['id_tipo_reporte'];
        element['tipo_reporte'] = tipo_reporte.recordset[0].descripcion;
      }
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
};

controller.save = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { tipo_reporte, zona, tipo_problema, hora_fecha_problema, estado, usuario } = req.body;
  console.log(req.body)

  let pool;
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const id_tipo_reporte = await sql.query`SELECT * FROM tipo_reporte WHERE descripcion = ${tipo_reporte};`;
      const id_usuario = await sql.query`SELECT * FROM usuario WHERE usuario = ${usuario};`;
      if(id_tipo_reporte.recordset.length == 0) {
        res.send('fail tipo_reporte');
      } else if(id_usuario.recordset.length == 0) {
        res.send('fail id_usuario');
      } else {
        const recordset = await sql.query`INSERT INTO reporte 
          VALUES (${id_tipo_reporte.recordset[0].id_tipo_reporte}, 
                  ${zona}, 
                  ${tipo_problema},
                  GETDATE(), 
                  CAST(${hora_fecha_problema} as DATE), 
                  ${estado},
                  ${id_usuario.recordset[0].id_usuario});`;

        const id_reporte = await sql.query`SELECT IDENT_CURRENT('reporte') AS id_reporte;`;

        res.send(id_reporte.recordset[0]);
      }

  } catch (err) {
       console.log(err)
       res.send('fail hora_fecha_problema');
  } finally {
      await pool.close();
  }
  
};

controller.update = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { id_reporte, estado } = req.body
  let pool;
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const recordset = await sql.query`UPDATE reporte
      SET estado = ${estado}
      WHERE id_reporte = ${id_reporte};`;
      res.send('ok');
  } catch (err) {
      res.send('fail');
      console.log(err)
  } finally {
      await pool.close();
  }
}

controller.deleteAll = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let pool;
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const recordset = await sql.query`DELETE FROM producto;`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
}

controller.saveProducto = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { nombre, imagen, precio, descripcion, cantidad, categoria } = req.body;
  
  let pool;
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const existe = await sql.query`SELECT * FROM producto WHERE nombre = ${nombre};`;
      if(existe.recordset.length == 0) {
        let recordset = await sql.query`SELECT * FROM categoria WHERE descripcion = ${categoria};`;
        if (recordset.recordset.length == 0) {
          res.send('categoría inexistente');
        } else {
          recordset = await sql.query`INSERT INTO producto VALUES (${nombre}, ${imagen}, ${precio}, ${descripcion}, ${cantidad}, '1', ${recordset.recordset[0].id_categoria});`;
          res.send('ok');
        }
      } else {
        res.send('producto existente');
      }
      
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
  
};

controller.deleteAllTipoReporte = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let pool;
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const recordset = await sql.query`DELETE FROM tipo_reporte;`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
}

module.exports = controller;
