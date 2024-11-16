# 🎂 케이꾸

- 배포 URL : https://k-koo.kro.kr


<br>

## 프로젝트 소개

- 케이꾸는 생일날 생일편지가 오픈되는 롤링페이퍼 서비스입니다.
- 생일자는 자신만의 케이크를 만들어 SNS에 링크를 공유할 수 있습니다.
- 링크에 접속하면 자신만의 스타일로 꾸며낸 편지지에 축하 글을 작성할 수 있습니다.
- 축하글이 작성되면 생일자의 케이크에 추가되고, 생일 당일 날 공개됩니다. 
- 연도 별 편지함이 있어 매년 받은 편지를 보관 및 열람할 수 있습니다.
- 편지가 생성되면 사랑이나 우정과 같은 편지 내용을 암시하는 키워드가 같이 전송되어 궁금증을 유발합니다.

<br>

## 팀원 구성

<div align="center">

| **이은영** | **김예린** |
| :------: |  :------: | 
| [<img src="https://github.com/ieun32.png" height=150 width=150> <br/> @ieun32](https://github.com/ieun32) | [<img src="https://github.com/kyr4601.png" height=150 width=150> <br/> @kyr4601](https://github.com/kyr4601) | 
</div>

<br>

## 1. 개발 환경

- Front-end : React, Typescript, webpack, babel, eslint, prettier, styled-components, Zustand, React-query, jest, playwright, 
- Back-end : Express.js, Typescript, postgreSQL, Prisma 
- 프로젝트 관리 : Turborepo, Pnpm, Github

## 2. 아키텍쳐
```mermaid
flowchart TB
    subgraph Client["Client (Browser)"]
        React["React\n(TypeScript)"]
        Zustand["Zustand\n(State Management)"]
        ReactQuery["React Query\n(Server State)"]
        React --> Zustand
        React --> ReactQuery
    end

    subgraph BuildTools["Build & Tools"]
        Webpack["Webpack"]
        Babel["Babel"]
        TypeScript["TypeScript"]
        Jest["Jest/Playwright\n(Testing)"]
        StyleComp["styled-components"]
    end

    subgraph CICD["CI/CD Pipeline"]
        GHA["GitHub Actions"]
        Husky["Husky"]
        Docker["Docker"]
    end

    subgraph Server["Server Environment"]
        Nginx["Nginx\n(Reverse Proxy)"]
        Express["Express.js\n(TypeScript)"]
        Prisma["Prisma ORM"]
    end

    subgraph Cloud["AWS Cloud"]
        EC2["AWS EC2"]
        S3["AWS S3"]
        RDS["PostgreSQL\n(RDS)"]
    end

    subgraph Monitoring["Monitoring"]
        Sentry["Sentry"]
    end

    Client -->|API Requests| Nginx
    Nginx -->|Proxy| Express
    Express --> Prisma
    Prisma --> RDS
    
    BuildTools -->|Build| Client
    CICD -->|Deploy| EC2
    Client -->|Error Tracking| Sentry
    
    EC2 --> Nginx
    S3 -->|Static Assets| Nginx
```
