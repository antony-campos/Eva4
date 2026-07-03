#!/bin/bash

echo "Deteniendo contenedores..."
sudo docker compose down

echo "Levantando contenedores..."
sudo docker compose up -d

echo "Servicios reiniciados correctamente."