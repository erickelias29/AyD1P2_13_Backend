const router = require('express').Router();

const dbController = require('../controllers/dbController');
const userController = require('../controllers/userController');
const productoController = require('../controllers/productoController');
const evidenciaController = require('../controllers/evidenciaController');
const notificacionController = require('../controllers/notificacionController');

// Script para iniciar la base
router.get('/', dbController.script);

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
router.delete('/producto', productoController.deleteAllTipoReporte);

//router.get('/reporte', reporteController.reporte);
//router.get('/reporte/:id_reporte', reporteController.reporteID);
//router.post('/reporte', reporteController.save);
//router.put('/reporte', reporteController.update);
//router.delete('/reporte', reporteController.deleteAll);

// Evidencia
router.get('/evidencia', evidenciaController.evidencia);
router.get('/evidencia/:id_reporte', evidenciaController.evidenciaId);
router.post('/evidencia', evidenciaController.save);
router.delete('/evidencia', evidenciaController.deleteAll);

// Notificación
router.get('/notificacion', notificacionController.notificacion);
router.get('/notificacion/:id_reporte', notificacionController.notificacionId);
router.post('/notificacion', notificacionController.save);
router.delete('/notificacion', notificacionController.deleteAll);

module.exports = router;

