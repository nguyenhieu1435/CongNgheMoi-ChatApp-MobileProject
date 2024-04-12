import scrapy
import logging
from crawl_careerlink.items import CrawlCareerlinkItem
from bs4 import BeautifulSoup
import re
from scrapy.crawler import CrawlerProcess

class CareerlinkSpiderSpider(scrapy.Spider):
    name = "careerlink_spider"
    allowed_domains = ["www.careerlink.vn"]
    start_urls = ["https://www.careerlink.vn/tim-viec-lam-tai/ho-chi-minh/HCM/c/cntt-phan-mem/19?page={}".format(i) for i in range(1, 6)]

    def parse(self, response):
        links = response.css("li a.job-link.clickable-outside::attr('href')").getall()
        for link in links:
            if "https" in link:
                yield scrapy.Request(link, callback=self.parse_detail)
            else:
                yield scrapy.Request("https://www.careerlink.vn" + link, callback=self.parse_detail)
            
    def parse_detail(self, response):
        soup = BeautifulSoup(response.text, "html.parser")

        url = response.request.url
        title = response.xpath('//*[@id="jd-col"]/div/div[2]/div[1]/div[1]/div[2]/div/h1//text()').get()
        company_name = response.xpath('//*[@id="jd-col"]/div/div[2]/div[1]/div[1]/div[2]/p/a/span//text()').get()
        address = response.xpath('//*[@id="jd-col"]/div/div[2]/div[1]/div[2]/div[1]/span/a//text()').get()
        salary = response.xpath('//*[@id="jd-col"]/div/div[2]/div[1]/div[2]/div[2]/span[1]//text()').get()
        experience_requirement = response.xpath('//*[@id="jd-col"]/div/div[2]/div[1]/div[2]/div[3]/span//text()').get()
        post_date = soup.select_one("div.date-from > span.d-flex").text
        requirements = response.xpath('//*[@id="section-job-skills"]/div[2]/p//text()').getall()
        level = response.xpath('//*[@id="section-job-summary"]/div[2]/div[1]/div/div/div[2]/div/div[2]//text()').get()
        job_descriptions = soup.select_one("div.raw-content.rich-text-content").text
        pattern = r'\d{2}-\d{2}-\d{4}'
        matches = re.findall(pattern, post_date)
        if matches:
            post_date = matches[0]

        item = CrawlCareerlinkItem()
        item["url"] = url
        item["title"] = title.strip()
        item["company_name"] = company_name
        item["address"] = address
        item["salary"] = salary.strip()
        item["experience_requirement"] = experience_requirement
        item["post_date"] = post_date
        item["requirements"] = requirements
        item["level"] = level.strip()
        item["job_descriptions"] = job_descriptions

        yield item


process = CrawlerProcess()
process.crawl(CareerlinkSpiderSpider)
process.start()


