IP: http://34.121.105.4/

// Producto
POST /producto
{ 
    "nombre": "Arma", 
    "imagen": "url...", 
    "precio": 3000.00,
    "descripcion": "Blanca", 
    "cantidad": 100, 
    "categoria": "SEGURIDAD" 
}
Correcto return
'ok'
Incorrecto return
'producto existente' or 'categoría inexistente'

DEL /producto


// Usuario
GET /usuario
return
[
    {
        "id_usuario": 1,
        "usuario": "nuevotest",
        "password": "pass",
        "id_tipo_usuario": 2
    },
    ...
]

POST /usuario
{
    "usuario": "",
    "password": "",
    "tipo_usuario": ""
}
Correcto, return
'ok'
Ya existe, return
'fail'

DEL /usuario


// Tipo_reporte
GET /tipo_reporte
[
    {
        "id_tipo_reporte": 1,
        "descripcion": "Luz"
    },
    ...
]

POST /tipo_reporte
{
    "descripcion": "Luz"
}
Correcto, return
'ok'
Ya existe, return
'fail'

DEL /tipo_reporte


// Reporte
GET /reporte
return
[
    {
        "id_reporte": 0,
        "zona": "",
        "tipo_problema": "y",
        "hora_fecha_reporte": "2021-06-22T00:00:00.000Z",
        "hora_fecha_problema": "2021-06-22T00:00:00.000Z",
        "estado": "",
        "usuario": "",
        "tipo_reporte": ""
    },
    ...
]

POST /reporte
{ 
    "tipo_reporte": "Luz", 
    "zona": "1", 
    "tipo_problema": "No hay",
    "hora_fecha_problema": "2021-06-22", 
    "estado": "En proceso", 
    "usuario": "nuevotest" 
}
return
{
    "id_reporte": 1
}

DEL /reporte


// Evidencia
GET /evidencia
return 
[
    {
        "id_evidencia": 2,
        "evidencia": "Descripcion",
        "id_reporte": 1
    },
    ...
]

GET /evidencia/:id_reporte
[
    {
        "id_evidencia": 2,
        "evidencia": "Descripcion",
        "id_reporte": 1
    },
    ...
]

POST /evidencia
{ 
    "detalle": "Descripcion", 
    "id_reporte": 43
}
Reporte no existente, return
'fail id_reporte'

DEL /evidencia


// Notificación
GET /notificacion
[
    {
        "id_notificacion": 2,
        "detalle": "Descripcion",
        "id_reporte": 1
    },
    ...
]

GET /notificacion/:id_reporte
[
    {
        "id_notificacion": 2,
        "detalle": "Descripcion",
        "id_reporte": 1
    },
    ...
]

POST /notificacion
{ 
    "detalle": "Descripcion", 
    "id_reporte": 1
}
Correcto, return 
'ok'
Reporte no existente, return
'fail id_reporte'

DEL /notificacion