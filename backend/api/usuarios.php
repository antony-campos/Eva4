<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "../config/conexion.php";

$sql = "SELECT * FROM usuarios";

$resultado = $conexion->query($sql);

$usuarios = [];

while ($fila = $resultado->fetch_assoc()) {
    $usuarios[] = $fila;
}

echo json_encode($usuarios);