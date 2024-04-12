# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

class CrawlCareerlinkPipeline:
    def process_item(self, item, spider):
        return item
    
class PipeSaveToMongoDB:
    def __init__(self):
        load_dotenv()
        uri = os.getenv("uri")
        client = MongoClient(uri, server_api=ServerApi("1"))
        db = client["careerlink_db"]
        self.db = db
    def process_item(self, item, spider):
        collections = self.db["careerlink_colls"]
        if item["url"] and item["title"] and item["company_name"] and item["address"] and item["salary"] and item["experience_requirement"] and item["post_date"] and item["requirements"] and item["level"] and item["job_descriptions"]:
            exist = collections.find_one({"url": item["url"]})
            if not exist:
                collections.insert_one(dict(item))
        return item