from airflow.models import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.email import EmailOperator
from airflow.operators.bash import BashOperator
import pendulum
import os


def careerlink_spider():
    from crawl_careerlink.crawl_careerlink.spiders.careerlink_spider import CareerlinkSpider

dag = DAG(
    dag_id="nhom7_scrapy_dag",
    schedule_interval="@daily",
    default_args = {
        'owner': 'hieurio',
        'email': ['hieurio12@gmail.com'],
        'email_on_failure': True,
        'email_on_retry': False,
        'start_date': pendulum.datetime(2022, 5, 31),
        'depends_on_past': False, 
    },  
    catchup=False,
)

crawl_job_task = BashOperator(
    task_id='crawl_job_task',
    bash_command='scrapy crawl careerlink_spider',
    dag=dag,
)
date_now = pendulum.now()

send_email_task = EmailOperator(
    task_id = 'send_email',
    to = ['<hieurio12@gmail.com>'], # The <> are important. Don't forget to include them. You can add more emails to the list
    subject = "Finish crawl job and clean expire job task",
    html_content = "Finish crawl job and clean expire job task at {}".format(date_now),
    dag = dag
)


crawl_job_task >> send_email_task