#!/bin/bash

ARCHIVO=$1

if [ -z "$ARCHIVO" ]; then
    echo "Uso: ./restaurar_bd.sh backup.sql"
    exit 1
fi

echo "Restaurando base de datos bd_ventas..."

cat $ARCHIVO | sudo docker exec -i mariadb mysql -u root -proot bd_ventas

echo "Restauración completada."