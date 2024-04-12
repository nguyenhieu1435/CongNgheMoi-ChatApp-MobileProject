# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class CrawlCareerlinkItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    url = scrapy.Field()
    title = scrapy.Field()
    company_name = scrapy.Field()
    address = scrapy.Field()
    salary = scrapy.Field()
    experience_requirement = scrapy.Field()
    post_date = scrapy.Field()
    requirements = scrapy.Field()
    level = scrapy.Field()
    job_descriptions = scrapy.Field()

    pass
