const router = require('express').Router();

const dbController = require('../controllers/dbController');
const userController = require('../controllers/userController');
const productoController = require('../controllers/productoController');
const evidenciaController = require('../controllers/evidenciaController');
const carroComprasController = require('../controllers/carroComprasController');

// Script para iniciar la base
router.get('/script', dbController.script);

// Categorias
router.get('/categoria', userController.categoria);

//Usuario
router.get('/usuario', userController.usuario);
router.post('/usuario', userController.save);
router.delete('/usuario', userController.deleteAll);
router.post('/login', userController.login);

// Producto
router.get('/producto', productoController.producto);
router.post('/producto', productoController.saveProducto);
router.delete('/producto', productoController.deleteAll);
router.put('/producto', productoController.update);
//router.get('/reporte', reporteController.reporte);
//router.get('/reporte/:id_reporte', reporteController.reporteID);
//router.post('/reporte', reporteController.save);
//
//router.delete('/reporte', reporteController.deleteAll);

// Evidencia
router.get('/evidencia', evidenciaController.evidencia);
router.get('/evidencia/:id_reporte', evidenciaController.evidenciaId);
router.post('/evidencia', evidenciaController.save);
router.delete('/evidencia', evidenciaController.deleteAll);

// Notificación
router.get('/carroCompras', carroComprasController.carroCompras);
router.get('/carroCompras/:correo_electronico', carroComprasController.carroComprasCorreo);
router.get('/carroProducto', productoController.carroProducto);
router.post('/agregarProductoCarro', productoController.save);
router.post('/factura', carroComprasController.factura);
router.get('/factura/:id_factura', carroComprasController.facturaId);

module.exports = router;

