# Elastic Search Logstash & Kibana
## Logstash
Crear una red 
```bash
docker network create -d bridge elk
```
Revisar si fue creada nuestrared **elk** er las redes 
```bash
 docker network ls 
```
Inspeccionar su configuración
```bash
	docker inspect elk
```
### Logstash - Enviar desde la terminal
```bash
docker run -it \
--net=elk \
--name logstash \
--rm docker.elastic.co/logstash/logstash:7.6.2 \
-e 'input { stdin { } } output { stdout { codec => rubydebug } }'
```

```bash
watch docker ps 
mkdir pipeline
vi pipeline/logstash.conf
```
## Logstash - Enviar desde un archivo

```bash
#logstash.conf
input {
  file {
    path => "/app/input.log"
  }
}
output {
  file {
    path => "/app/output.log"
  }
}
```
### ::::::::::TERMINAL 1:::::::::::::::::::
Imagen de docker de logstash
```bash
 docker run -it \
 --rm \
 --net=elk \
 --name logstash \
 -v "$PWD/pipeline":/app \
 --entrypoint bash \
 docker.elastic.co/logstash/logstash:7.6.2 
```

```bash
logstash -f /app/logstash.conf
```

### :::::::::::::::TERMINAL 2:::::::::::::::::
```bash
docker exec -it logstash bash
```
```bash
 touch /app/output.log; tail -f /app/output.log
```

### :::::::::::::::TERMINAL 3:::::::::::::::::
```bash
docker exec -it logstash bash

```
```bash
echo "hola mundo desde logstash" >> /app/input.log
```


License
----

MIT


**Free Software, Hell Yeah!**

