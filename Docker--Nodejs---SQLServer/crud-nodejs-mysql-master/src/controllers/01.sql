CREATE DATABASE ayd1p1;
USE ayd1p1;

CREATE TABLE tipo_usuario
(
    id_tipo_usuario INTEGER IDENTITY(1,1),
    descripcion VARCHAR(50),
    PRIMARY KEY (id_tipo_usuario)
);
 
CREATE TABLE usuario
(
    id_usuario INTEGER IDENTITY(1,1),
    usuario VARCHAR(50) UNIQUE,
    password VARCHAR(50),
    id_tipo_usuario INTEGER NOT NULL,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario) ON DELETE CASCADE
);
 
CREATE TABLE tipo_reporte
(
    id_tipo_reporte INTEGER IDENTITY(1,1),
    descripcion VARCHAR(100),
    PRIMARY KEY (id_tipo_reporte)
);
 
CREATE TABLE reporte
(
    id_reporte INTEGER IDENTITY(1,1),
    id_tipo_reporte INTEGER NOT NULL,
    zona VARCHAR(10),
    tipo_problema VARCHAR(250),
    hora_fecha_reporte DATE,
    hora_fecha_problema DATE,
    estado VARCHAR(50),
    id_usuario INTEGER NOT NULL,
    PRIMARY KEY (id_reporte),
    FOREIGN KEY (id_tipo_reporte) REFERENCES tipo_reporte(id_tipo_reporte) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);
 
 
CREATE TABLE evidencia
(
    id_evidencia INTEGER IDENTITY(1,1),
    evidencia VARCHAR(MAX),
    id_reporte INTEGER NOT NULL,
    PRIMARY KEY (id_evidencia),
    FOREIGN KEY (id_reporte) REFERENCES reporte(id_reporte) ON DELETE CASCADE
);
 
CREATE TABLE notificacion
(
    id_notificacion INTEGER IDENTITY(1,1),
    detalle VARCHAR(100),
    id_reporte INTEGER NOT NULL,
    PRIMARY KEY (id_notificacion),
    FOREIGN KEY (id_reporte) REFERENCES reporte(id_reporte) ON DELETE CASCADE
);

INSERT INTO tipo_usuario (descripcion) VALUES ('admin');
