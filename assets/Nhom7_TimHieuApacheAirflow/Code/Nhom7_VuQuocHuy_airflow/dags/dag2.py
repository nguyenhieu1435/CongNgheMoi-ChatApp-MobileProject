from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator

dag =  DAG(
    'My_dag2',
    default_args={
        'email': ['vuquochuy.01012003@gmail.com'],
        'email_on_failure': True,
        'retries': 1,
        'retry_delay': timedelta(minutes=1),
    },
    description='simple DAG',
    schedule_interval="@once",
    start_date=datetime(2024, 4, 5), # Start date
    tags=['huyvu'],
)

t1 = BashOperator(
    task_id='print_date',
    bash_command='date',
    dag = dag
)

t2 = BashOperator(
    task_id='sleep',
    bash_command='sleep 5',
    retries=3,
    dag = dag
)
t3 = BashOperator(
    task_id='echo',
    bash_command='echo t3 running',
    dag = dag
)

[t1 , t2] >> t3