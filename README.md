# 구성
fastify api 단일 서버 포함
# 구조
nginx reverse proxy - node(fastify) 를 통해 제공됨

# 빌드
## 개발 run dev
환경 격리와 실시간 업데이트를 동시에 사용하기 위해 docker 내부에서 `npm run dev` 후 로컬 src 를 컨테이너에 마운팅하도록 함.
- 빌드/실행:
```bash
# -d: detached; 백그라운드에서 실행
# --build: 이미지가 존재해도 빌드 후 실행 
docker compose -f compose.run_dev.yml up --build -d
```

## 테스트 dev
배포 환경을 로컬에서 테스트하기 위한 빌드. 모든 구성 요소는 배포한 상태와 같이 작동하는 중에 localhost 를 통해 접근하기 위함
- 빌드/실행:  
```bash
# -d: detached; 백그라운드에서 실행
# --build: 이미지가 존재해도 빌드 후 실행 
docker compose -f compose.dev.yml up --build -d 
```

## 배포 prod
배포에 사용하기 위한 빌드

# 배포