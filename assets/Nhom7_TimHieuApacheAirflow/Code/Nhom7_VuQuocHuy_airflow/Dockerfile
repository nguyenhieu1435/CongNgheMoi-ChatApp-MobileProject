# Sử dụng hình ảnh Airflow chính thức làm cơ sở
FROM apache/airflow:latest

# Đặt biến môi trường AIRFLOW_HOME
ENV AIRFLOW_HOME=/usr/local/airflow

# Chuyển sang người dùng root
USER root

# Tạo thư mục AIRFLOW_HOME và thay đổi quyền sở hữu thành người dùng airflow
RUN mkdir -p ${AIRFLOW_HOME} && chown -R airflow: ${AIRFLOW_HOME}

# Chuyển lại thành người dùng airflow
USER airflow

# Khởi tạo cơ sở dữ liệu Airflow
RUN airflow db init

# Tùy chỉnh tệp airflow.cfg
RUN echo "[core]" > ${AIRFLOW_HOME}/airflow.cfg && \
    echo "airflow_home = ${AIRFLOW_HOME}" >> ${AIRFLOW_HOME}/airflow.cfg && \
    echo "executor = LocalExecutor" >> ${AIRFLOW_HOME}/airflow.cfg && \
    echo "" >> ${AIRFLOW_HOME}/airflow.cfg && \
    echo "[webserver]" >> ${AIRFLOW_HOME}/airflow.cfg && \
    echo "base_url = http://localhost:8080" >> ${AIRFLOW_HOME}/airflow.cfg && \
    echo "web_server_host = 0.0.0.0" >> ${AIRFLOW_HOME}/airflow.cfg && \
    echo "web_server_port = 8080" >> ${AIRFLOW_HOME}/airflow.cfg
