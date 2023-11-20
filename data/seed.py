import csv
from elasticsearch import Elasticsearch, helpers

es_host = "localhost"  
es_port = 9200         
index_name = "finalmusicmagnet"  

es = Elasticsearch([{'host': es_host, 'port': es_port, 'scheme': 'http'}])

def generate_es_actions(csv_file_path):
    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            yield {
                "_index": index_name,
                "_source": row
            }

csv_file_path = 'cleaned_data_final.csv'  

print(helpers.bulk(es, generate_es_actions(csv_file_path)))

print("Data indexed successfully")