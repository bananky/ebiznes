FROM ubuntu:22.04

ENV TZ=Europe/Warsaw
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y python3.8 python3.8-distutils python3.8-venv

RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1

RUN apt-get update && apt-get install -y curl zip unzip git openjdk-8-jdk


RUN curl -s "https://get.sdkman.io" | bash && \
    bash -c "source \"$HOME/.sdkman/bin/sdkman-init.sh\" && \
    sdk install kotlin"


RUN /bin/bash -c "source /root/.sdkman/bin/sdkman-init.sh && java -version && kotlin -version" && \
    python3 --version