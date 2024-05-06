---
title: Serverless SQL, Vercel Postgres 찍먹 해보기.
date: 2023-06-07
description: Vercel이 새롭게 선보인 Serverless database인 Vercel Postgres를 간단하게 알아봅니다.
category: Serverless, 서버리스, Vercel Postgres
---

> Vercel이 새롭게 선보인 Serverless database인 Vercel Postgres를 알아봅니다.

> Next.js v13.4, node 18 을 기준으로 작성하였습니다.

많은 웹 개발자가 Next.js를 통해서 개발하고 vercel을 통해서 자신이 만든 서비스를 배포합니다. ~~(저도)~~  
Vercel을 통해 배포하면, 따로 웹 서버를 관리할 필요 없이 서비스를 안정적으로 배포 및 유지보수할 수 있다는 장점이 있습니다.

Vercel을 통해 풀스택 Next.js 애플리케이션을 배포하더라도 데이터베이스는 따로 서버를 두거나, RDS 또는 Firebase와 같은 외부 서비스를 이용해야 했습니다.

하지만 이번에 Vercel에서 새로운 서버리스 스토리지를 공개했기 때문에, 웹서버와 데이터베이스를 한 곳에서 배포, 관리 할 수 있게 되었습니다.

## 4개의 서버리스 스토리지 솔루션

Vercel에서는 KV, Postgres, Blob, Edge Config 4가지 서버리스 스토리지를 공개했습니다. 각 스토리지의 설명은 아래와 같습니다.

- [Vercel KV](https://vercel.com/blog/vercel-storage#vercel-kv-a-durable-redis-database) : 서버리스 Redis 솔루션입니다.
- [Vercel Postgres](https://vercel.com/blog/vercel-storage#vercel-postgres-complex-data-made-easy) : 서버리스 PostgreSQL 데이터베이스 솔루션입니다.
- [Vercel Blob](https://vercel.com/blog/vercel-storage#vercel-blob-easy-file-storage-at-the-edge) : 파일을 업로드 하고, Edge에서 파일을 서빙할 수 있도록 하는 솔루션입니다.
- [Vercel Edge Config](https://vercel.com/docs/storage/edge-config) : feature flags, A/B 테스팅, Critical redirects, IP Blocking 등 을 할 수 있게 하는 global data store입니다.

## Vercel Postgres

다양한 서버리스 솔루션이 있지만, 이번 시간에는 Postgres를 간단하게 만들어보고, 연동까지 해보겠습니다.

> 프로젝트 생성관련해서는 다루지 않습니다. [링크](https://vercel.com/docs/concepts/projects/overview#creating-a-project)를 참조하여 프로젝트를 만들고 Vercel에 배포해보세요.

### 1. Storage 생성

먼저 본인의 프로젝트로 이동 후 상단의 네비게이션바에서 Storage를 클릭합니다.  
우리는 Postgres를 사용하고자 하므로 Postgres의 `Create` 버튼을 클릭합니다.

![vercel1](/posts/vercel-postgresql/vercel1.png)

Postgres를 선택하고 `Continue` 버튼을 클릭합니다.

![vercel2](/posts/vercel-postgresql/vercel2.png)

다음으로 Database name, region을 선택 후 `Create & Continue` 버튼을 클릭합니다.

![vercel3](/posts/vercel-postgresql/vercel3.png)

![vercel4](/posts/vercel-postgresql/vercel4.png)

이제 끝입니다! 상단 네비게이션 바에서 `Storage`를 선택해서 Postgres 데이터베이스가 생성된것을 확인할 수 있습니다.

### 2. 데이터베이스 연결

이제는 데이터베이스를 프로젝트와 연결할 차례입니다. 상단 네비게이션 바에서 `Storage`를 선택 후 왼쪽 사이드바에서 `Getting started`를 클릭합니다.  
이후 `Next.js`를 선택하고 `Connect Project`를 클릭합니다.

![vercel7](/posts/vercel-postgresql/vercel7.png)

다음으로 해당 데이터베이스를 사용할 프로젝트 및 환경을 선택합니다.  
저는 테스트를 위해 Development환경만 체크했습니다.  
이제 `Connect`버튼을 클릭하면 프로젝트에서 데이터베이스를 연결할 준비는 끝났습니다.

![vercel8](/posts/vercel-postgresql/vercel8.png)

### 3. 코드베이스에서 연동

이제 웹사이트에서 설정할것은 모두 끝났습니다.  
본인의 로컬환경으로 돌아와 터미널에서 아래 명령어를 순차적으로 실행합니다.

```bash
vercel link
vercel env pull .env.development.local
```

![vercel9](/posts/vercel-postgresql/vercel9.png)

![vercel10](/posts/vercel-postgresql/vercel10.png)

이제 연동을 위한 환경 변수 설정은 모두 끝이났습니다.  
프로젝트에서 데이터베이스와 연결하기 위한 라이브러리를 설치해봅시다.

```bash
npm install @vercel/postgres
```

설치가 완료되었다면 app 라우트 아래에 서버컴포넌트를 생성 후 Database에 직접 접근해봅니다.

```tsx
// app/hello/page.tsx

import { sql } from '@vercel/postgres';

interface Props {
  name: string;
}

export default async function Pets({ name }: Props) {
  const { rows } = await sql`SELECT * from PETS where pet_name=${name}`;

  return (
    <div>
      {rows.map(row => (
        <div key={row.id}>
          {row.id} - {row.quantity}
        </div>
      ))}
    </div>
  );
}
```

### 결론

지금까지 간단하게 Vercel의 서버리스 데이터베이스 솔루션 중 하나인 Vercel Postgres에 대해 간단히 살펴보고 Next.js 와 연동하는 것을 해보았습니다.  
이 외에도, Redis, Edge Config, Blob 등 다양한 솔루션을 제공하고 있는 만큼 앞으로 웹 애플리케이션을 개발할 때는 vercel을 이용하면 빠르고 손쉽게 개발할 수 있을 것 같습니다.  
사이드 프로젝트를 진행하거나, 프로덕션 환경이 아닌 단순 preview 또는 development 환경에 대해서 가볍게 생성 후 연동 테스트를 진행해 볼 수 있을것 같습니다.

추가적으로, 해당 [템플릿](https://vercel.com/templates/next.js/postgres-prisma)을 이용하면 더욱 손쉽게 프로토타이핑이 가능합니다!

많은 도움이 됐길 바랍니다.

### 참조

- https://vercel.com/blog/vercel-storage
