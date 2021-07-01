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

controller.script = async (req, res) => {
  let pool;
  let recordset;
  res.header('Access-Control-Allow-Origin', '*');
  try {
      console.log('Connection Opening...');
      pool = await sql.connect(config);

      // DROP DATABASE
      recordset = await sql.query`IF EXISTS (SELECT * FROM sys.databases WHERE name = 'ayd1p1')
      BEGIN
        DROP TABLE carro_producto;
        DROP TABLE categoria;
        DROP TABLE producto;
        DROP TABLE factura; 
        DROP TABLE usuario;
        DROP TABLE carro_compras;                       
        DROP DATABASE ayd1p1;
      END;`;

      // CREATE DATABASE
      recordset = await sql.query`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ayd1p1')
      BEGIN
        CREATE DATABASE ayd1p1;
      END;`;
      config.database = 'ayd1p1'

      // CREATE TABLE categoria
      recordset = await sql.query`if not exists (select * from sysobjects where name='categoria' and xtype='U')
      CREATE TABLE categoria (
        id_categoria  INTEGER IDENTITY(1,1),
        descripcion   VARCHAR(100),
        PRIMARY KEY (id_categoria)
    );`;

      // CREATE TABLE producto
      recordset = await sql.query`if not exists (select * from sysobjects where name='producto' and xtype='U')
      CREATE TABLE producto (
        id_producto             INTEGER IDENTITY(1,1),
        nombre                  VARCHAR(50),
        imagen                  VARCHAR(MAX),
        precio                  NUMERIC(8,2),
        descripcion             VARCHAR(100),
        cantidad                INTEGER,
        estado                  VARCHAR(1),
        categoria_id_categoria  INTEGER NOT NULL,
        PRIMARY KEY (id_producto),
        FOREIGN KEY (categoria_id_categoria) REFERENCES categoria(id_categoria) ON DELETE CASCADE
    );`;

      // CREATE TABLE usuario
      recordset = await sql.query`if not exists (select * from sysobjects where name='tipo_reporte' and xtype='U')
      CREATE TABLE usuario (
        id_usuario          INTEGER IDENTITY(1,1),
        nombre              VARCHAR(50),
        dpi                 VARCHAR(20),
        correo_electronico  VARCHAR(50),
        contrasena          VARCHAR(50),
        direccion           VARCHAR(100),
        PRIMARY KEY (id_usuario)
    );`;

      // CREATE TABLE carro_compras
      recordset = await sql.query`if not exists (select * from sysobjects where name='carro_compras' and xtype='U')
      CREATE TABLE carro_compras (
        id_carro            INTEGER IDENTITY(1,1),
        total               NUMERIC(8,2),
        estado              VARCHAR(1),
        usuario_id_usuario  INTEGER NOT NULL,
        PRIMARY KEY (id_carro),
        FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
    );`;

      // CREATE TABLE carro_producto
      recordset = await sql.query`if not exists (select * from sysobjects where name='carro_producto' and xtype='U')
      CREATE TABLE carro_producto (
        cantidad                INTEGER,
        subtotal                INTEGER,
        estado                  VARCHAR(1),
        producto_id_producto    INTEGER NOT NULL,
        carro_compras_id_carro  INTEGER NOT NULL,
        FOREIGN KEY (producto_id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE,
        FOREIGN KEY (carro_compras_id_carro) REFERENCES carro_compras(id_carro) ON DELETE CASCADE
    );`;

      // CREATE TABLE factura
      recordset = await sql.query`if not exists (select * from sysobjects where name='factura' and xtype='U')
      CREATE TABLE factura (
        id_factura              INTEGER IDENTITY(1,1),
        fecha_compra            DATE,
        carro_compras_id_carro  INTEGER NOT NULL,
        PRIMARY KEY (id_factura),
        FOREIGN KEY (carro_compras_id_carro) REFERENCES carro_compras(id_carro) ON DELETE CASCADE
    );`;

      // INSERT categorias
      recordset = await sql.query`INSERT INTO categoria (descripcion) VALUES ('TV Y VIDEO');`;
      recordset = await sql.query`INSERT INTO categoria (descripcion) VALUES ('AUDIO');`;
      recordset = await sql.query`INSERT INTO categoria (descripcion) VALUES ('SEGURIDAD');`;
      recordset = await sql.query`INSERT INTO categoria (descripcion) VALUES ('COMPUTACION');`;

      recordset = await sql.query`INSERT INTO producto (nombre,imagen,precio,descripcion,cantidad,estado,categoria_id_categoria) VALUES ('TV Samsung','imagen',5000.0,'Tv marca samsung',5,1,1);`;


        
      res.send(recordset);
  } catch (err) {
       console.log(err)
  } finally {
      await pool.close();
  }

};

module.exports = controller;