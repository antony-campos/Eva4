<?php

$host = "db";
$usuario = "root";
$password = "root";
$baseDatos = "bd_ventas";

$conexion = new mysqli($host, $usuario, $password, $baseDatos);

if ($conexion->connect_errno) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");