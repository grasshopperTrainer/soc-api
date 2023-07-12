ARG APP_PHASE=dev
FROM nginx:stable as nginx-base
# 첫 ARG 는 아래 FROM 절에서 쓰이고 두번째 ARG 는 ENV 에서 쓰임
# 아래 FROM 절은 두번째 ARG 보다도 뒤에 위치하지만
#   첫 FROM 절 이전에 ARG 가 있어야 이후의 모든 FROM 절에서 사용할 수 있는 듯 함
ARG APP_PHASE
ARG API_DOMAIN
ARG API_PORT
ENV APP_PHASE=${APP_PHASE}
ENV API_DOMAIN=${API_DOMAIN}
ENV API_PORT=${API_PORT}
ENV BASE_DIR=/root
# install linux common
RUN apt update \
    && apt install xz-utils
# configure base
WORKDIR /root
# node 설치
#   -L follow redirection
#   -o output as
# tar
#   -x extract
#   -f with file
RUN curl -Lo node.tar.xz https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz \
    && tar -xf node.tar.xz \
    && rm node.tar.xz \
    && echo "export PATH=\$PATH:/root/node-v18.16.0-linux-x64/bin" >>.bashrc
ENV PATH=$PATH:/root/node-v18.16.0-linux-x64/bin
# entrypoint
WORKDIR ${BASE_DIR}
COPY entrypoint.sh .
RUN envsubst < entrypoint.sh > /entrypoint.sh \
    && chmod 777 /entrypoint.sh
# nginx
WORKDIR ${BASE_DIR}
COPY nginx_conf nginx_conf
RUN envsubst < nginx_conf/nginx_${APP_PHASE}.conf | sed 's/%/$/g' > /etc/nginx/conf.d/default.conf

FROM nginx-base as run_dev
WORKDIR ${BASE_DIR}
# fastify
COPY soc-api soc-api

FROM ${APP_PHASE} AS final
ENTRYPOINT [ "/entrypoint.sh" ]