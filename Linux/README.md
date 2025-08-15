version: "3.9"

services:
  linux:
    image: ubuntu
    container_name: my-linux
    tty: true
    stdin_open: true
    command: /bin/bash

    
docker exec -it my-linux /bin/sh