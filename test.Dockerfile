FROM ghcr.io/marketsquare/robotframework-browser/rfbrowser-stable:19.1.1
RUN pip install robotframework robotframework-browser robotframework-requests tzlocal pyyaml robotframework-jsonlibrary robotframework-datadriver
RUN pip install pyaml pytest-custom_exit_code
USER root

RUN apt-get update \
    && apt-get install -y curl make gcc libsqlite3-dev python3.12 python3.12-venv python3.12-dev 
USER pwuser
RUN mkdir -p ~/.ssh/

RUN ssh-keyscan -T 10 -t rsa gitlab.acri-cwa.fr >> ~/.ssh/known_hosts || (echo "WARNING: ssh-keyscan failed, continuing anyway")