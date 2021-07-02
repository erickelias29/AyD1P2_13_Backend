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


controller.carroCompras = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let pool;
   try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const { recordset } = await sql.query`SELECT * FROM carro_compras;`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
};

controller.notificacionId = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { id_reporte } = req.params
  let pool;
   try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);
      const { recordset } = await sql.query`SELECT * FROM notificacion WHERE id_reporte = ${id_reporte};`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
};

controller.save = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { detalle, id_reporte } = req.body;
  console.log(req.body)

  let pool;
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);

      let id_usuario = await sql.query`SELECT * FROM usuario WHERE correo_electronico = ${correo_electronico};`;
      id_usuario = id_usuario.recordset[0].id_usuario;
      let id_carro = await sql.query`SELECT TOP 1 id_carro FROM carro_compras WHERE usuario_id_usuario = ${id_usuario} ORDER BY id_carro DESC;`; 
      id_carro = id_carro.recordset[0].id_carro;


      const recordset = await sql.query`INSERT INTO ca VALUES (${detalle}, ${id_reporte});`;
      res.send('ok');

      
  } catch (err) {
      res.send('fail id_reporte');
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
      const recordset = await sql.query`DELETE FROM notificacion;`;
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }
}

controller.factura = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { nombre, nit, telefono, forma_pago, correo_electronico, correo_electronico_logueado } = req.body;
    console.log(req.body)
  
    let pool;
    try {
        console.log('Connection Opening...');
        pool = await sql.connect(config);
        const id_usuario = await sql.query`SELECT id_usuario FROM usuario WHERE correo_electronico = ${correo_electronico_logueado};`;
        const id_carro = await sql.query`SELECT id_carro FROM carro_compras WHERE usuario_id_usuario = ${id_usuario.recordset[0].id_usuario};`; 
        let recordset = await sql.query`INSERT INTO factura 
          VALUES (${nombre}, 
                  ${nit}, 
                  ${telefono},
                  ${forma_pago}, 
                  ${correo_electronico}, 
                  ${id_carro.recordset[0].id_carro});`;
  
        recordset = await sql.query`INSERT INTO carro_compras VALUES (0.0, '1', ${id_usuario.recordset[0].id_usuario});`;
        
        const id_factura = await sql.query`SELECT IDENT_CURRENT('factura') AS id_factura;`;

        res.send(id_factura.recordset[0]);

    } catch (err) {
         console.log(err)
    } finally {
        await pool.close();
    }
    
  };

controller.facturaId = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { id_factura } = req.params;
    console.log(req.params)
  
    let pool;
    try {
        console.log('Connection Opening...');
        pool = await sql.connect(config);
        const { recordset } = await sql.query`SELECT nombre, nit, telefono, forma_pago, correo_electronico, total, id_carro FROM factura 
        JOIN carro_compras ON carro_compras_id_carro = id_carro
        WHERE id_factura = ${id_factura};`;

        const productos = await sql.query`SELECT * FROM carro_producto 
        JOIN producto ON producto_id_producto = id_producto
        WHERE carro_compras_id_carro = ${recordset[0].id_carro};`;
        
        res.send({informacion: recordset[0], productos: productos.recordset});

    } catch (err) {
         console.log(err)
    } finally {
        await pool.close();
    }
    
  };

module.exports = controller;
