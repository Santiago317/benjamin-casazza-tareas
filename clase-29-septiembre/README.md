# Elastic Search Logstash & Kibana

https://www.docker.elastic.co/



## Inicio
```bash
mkdir ELK-example
cd ELK-example
docker network create -d bridge mynetwork   
```



## ElasticSearch

```bash

docker run \
-p 9200:9200 -p 9300:9300 \
--net=mynetwork \
--name elasticsearch \
-e "discovery.type=single-node" \
docker.elastic.co/elasticsearch/elasticsearch:7.6.2
```

### Logstash 

```bash
docker run -it \
--rm \
--net=mynetwork \
--name logstash \
-v "$PWD/pipeline":/app \
--entrypoint bash \
docker.elastic.co/logstash/logstash:7.6.2 
```

```bash
logstash -f /app/logstash.conf
```



```bash
http://localhost:9200/
http://localhost:9200/_search?pretty&size=1000
```



### Kibana 

```bash
docker run --rm \
--name kibana \
--net=mynetwork \
-p 5601:5601 \
kibana:7.6.2
```

```bash
docker inspect mynetwork

curl http://localhost:9200/_cat/indices\?v

```

http://localhost:5601/status



# Informacíon en un CSV 

https://www.kaggle.com/ptoscano230382/air-bnb-ny-2019



```bash
docker run -it \
--rm \
--net=mynetwork \
--name logstash \
-v "$PWD/pipeline":/app \
--entrypoint bash \
docker.elastic.co/logstash/logstash:7.6.2 
```


```bash
docker run -it \
--rm \
--net=mynetwork \
--name logstash \
-v "$PWD/pipeline":/app \
--entrypoint bash \
docker.elastic.co/logstash/logstash:7.6.2 
```

```bash
input {
 	file{
		path => "/app/*.csv"
		start_position => "beginning"
		sincedb_path => "NULL"
	}
}


filter{
	csv{
		separator => ","
		columns => ["id","name","host_id","host_name","neighbourhood_group","neighbourhood","latitude","longitude","room_type","price","minimum_nights","number_of_reviews","last_review","reviews_per_month","calculated_host_listings_count","availability_365"]
	}
}


output {
  elasticsearch {
			    hosts => ["elasticsearch:9200"]
			    index => "ab_nyc_2019"
			  }
 stdout{}
 
}

```



License
----

MIT


**Free Software, Hell Yeah!**

