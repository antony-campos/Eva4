<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "../config/conexion.php";

$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {

    case "GET":
        $sql = "SELECT * FROM usuarios";
        $resultado = $conexion->query($sql);

        $usuarios = [];

        while ($fila = $resultado->fetch_assoc()) {
            $usuarios[] = $fila;
        }

        echo json_encode($usuarios);
        break;

    case "POST":

    $datos = json_decode(file_get_contents("php://input"), true);

    $nombre = $datos["nombre"];
    $apePaterno = $datos["apePaterno"];
    $apeMaterno = $datos["apeMaterno"];
    $user = $datos["user"];
    $password = $datos["password"];
    $estado = $datos["estado"];

    $sql = "INSERT INTO usuarios(nombre, apePaterno, apeMaterno, user, password, estado)
            VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $conexion->prepare($sql);

    $stmt->bind_param(
        "sssssi",
        $nombre,
        $apePaterno,
        $apeMaterno,
        $user,
        $password,
        $estado
    );

    if ($stmt->execute()) {

        echo json_encode([
            "mensaje" => "Usuario registrado correctamente"
        ]);

    } else {

        http_response_code(500);

        echo json_encode([
            "mensaje" => "Error al registrar"
        ]);
    }

    break;

    case "PUT":

    $datos = json_decode(file_get_contents("php://input"), true);

    $id = $datos["id"];
    $nombre = $datos["nombre"];
    $apePaterno = $datos["apePaterno"];
    $apeMaterno = $datos["apeMaterno"];
    $user = $datos["user"];
    $password = $datos["password"];
    $estado = $datos["estado"];

    $sql = "UPDATE usuarios
            SET nombre = ?,
                apePaterno = ?,
                apeMaterno = ?,
                user = ?,
                password = ?,
                estado = ?
            WHERE id = ?";

    $stmt = $conexion->prepare($sql);

    $stmt->bind_param(
        "sssssii",
        $nombre,
        $apePaterno,
        $apeMaterno,
        $user,
        $password,
        $estado,
        $id
    );

    if ($stmt->execute()) {

        echo json_encode([
            "mensaje" => "Usuario actualizado correctamente"
        ]);

    } else {

        http_response_code(500);

        echo json_encode([
            "mensaje" => "Error al actualizar"
        ]);
    }

    break;

    case "DELETE":

    $datos = json_decode(file_get_contents("php://input"), true);

    $id = $datos["id"];

    $sql = "DELETE FROM usuarios WHERE id = ?";

    $stmt = $conexion->prepare($sql);

    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {

        echo json_encode([
            "mensaje" => "Usuario eliminado correctamente"
        ]);

    } else {

        http_response_code(500);

        echo json_encode([
            "mensaje" => "Error al eliminar"
        ]);
    }

    break;

    default:
        http_response_code(405);
        echo json_encode(["mensaje" => "Método no permitido"]);
}