#!/bin/bash

FECHA=$(date +%Y%m%d_%H%M%S)
CARPETA="backups"

mkdir -p $CARPETA

echo "Creando backup de bd_ventas..."

sudo docker exec mariadb mysqldump -u root -proot bd_ventas > $CARPETA/backup_$FECHA.sql

echo "Backup creado en $CARPETA/backup_$FECHA.sql"