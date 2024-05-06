---
title: Next.js v13의 sitemap.js 및 metadata 적용하기
date: 2023-05-13
description: Next.js 13.4 버전을 기준으로 App Router를 활용한 기술블로그를 개발하며 겪은 경험을 공유합니다.
category: Next.js 13, App Router, sitemap, metadata
---

> Next.js 13.4 버전을 기준으로 App Router를 활용한 기술블로그를 개발하며 겪은 경험을 공유합니다.  
> 간단하게 sitemap.xml을 만드는 방법 및 App Router의 새로운 Metadata API를 살펴봅니다.

## 사이트맵이란?

사이트맵은 사이트에 있는 페이지에 대한 정보를 제공하는 파일 입니다. 다양한 검색 엔진(ex. Google, naver)은 이 파일을 읽고 사이트를 보다 효율적으로 크롤링 할 수 있습니다.  
따라서, 본인의 사이트가 더 잘 검색되기 위해서는 반드시 작성하는 것이 좋습니다.

![sitemap-info-google](/posts/nextjs-sitemap-metadata/sitemap-info-google.png)_google에서는 사이트맵 작성을 권장한다._

> 구글에서는 페이지가 500개 이하인 경우 사이트맵이 필요없다고 합니다.

### 사이트맵 작성하기

`app`디렉토리 아래에 `sitemap.ts`를 생성합니다.

```ts
`app/sitemap.ts`;

export default async function sitemap() {
  return [
    {
      url: 'https://blog.raonc.dev',
      lastModified: new Date(),
    },
  ];
}
```

위 파일은 아래와 같은 `sitemap.xml`파일을 생성해줍니다.

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <script/>
    <url>
        <loc>https://blog.raonc.dev</loc>
        <lastmod>2023-05-13T12:18:17.447Z</lastmod>
    </url>
</urlset>
```

### 정적 페이지 사이트맵 추가하기

먼저 정적인 페이지에 대한 사이트맵을 추가해봅시다. 현재 저의 블로그는 루트 페이지(`/`)와 aboutme 페이지(`/aboutme`) 페이지만 정적 페이지 입니다.  
URL을 상수로 지정하고 `['', '/aboutme']`라우트에 대해 url및 lastModified를 가지는 객체를 반환하도록 했습니다.

```ts
`app/sitemap.ts`;

const URL = 'https://blog.raonc.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/aboutme'].map(route => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return routes;
}
```

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <script/>
    <url>
        <loc>https://blog.raonc.dev</loc>
        <lastmod>2023-05-13T12:18:17.447Z</lastmod>
    </url>
    <url>
        <loc>https://blog.raonc.dev/aboutme</loc>
        <lastmod>2023-05-13T12:23:45.133Z</lastmod>
    </url>
</urlset>
```

### 동적 페이지 사이트맵 추가하기

이제 동적인 페이지에 대한 사이트맵을 추가해봅시다. 블로그에서 동적인 페이지는 포스트 페이지 입니다.  
저의 블로그에서는 `/posts/[postId]`라우트가 포스트에 대한 라우트이며, 동적입니다.

먼저, 포스트의 리스트를 불러옵니다. 추가적으로, 해당 포스트의 metadata에서 날짜를 추출하여 lastModified의 값에 추가해줍니다.  
마지막으로, 기존의 정적 라우트와 합쳐서 return 해줍니다.

```ts
`app/sitemap.ts`;

const URL = 'https://blog.raonc.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const postList = getPostNameList().map(postName => ({
    name: postName,
    content: getPostByName(postName),
  }));
  const postsRoute = postList.map(({ name, content }) => {
    const { date } = parseMarkdownMetadata(content);
    return {
      url: `${URL}/posts/${name}`,
      lastModified: date,
    };
  });

  const routes = ['', '/aboutme'].map(route => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...postsRoute];
}
```

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <script/>
    <url>
        <loc>https://blog.raonc.dev</loc>
        <lastmod>2023-05-13T12:23:45.133Z</lastmod>
    </url>
    <url>
        <loc>https://blog.raonc.dev/aboutme</loc>
        <lastmod>2023-05-13T12:23:45.133Z</lastmod>
    </url>
    <url>
        <loc>https://blog.raonc.dev/posts/appdir</loc>
        <lastmod>2023-05-15</lastmod>
    </url>
    <url>
        <loc>https://blog.raonc.dev/posts/appdir</loc>
        <lastmod>2023-05-15</lastmod>
    </url>
    <url>
        <loc>https://blog.raonc.dev/posts/todo</loc>
        <lastmod>2023-01-01</lastmod>
    </url>
</urlset>

```

> 저의 블로그는 따로 CMS를 사용하고 있지 않아 sitemap 함수가 Promise를 반환하지 않도록 했습니다.  
> 내부적으로 fetch를 하여 동적인 페이지 목록을 받아올 경우, sitemap을 async로 선언해주세요.

지금까지 간단하게 정적, 동적 페이지에 대한 사이트맵을 만드는 방법을 알아봤습니다.  
만들어진 사이트맵을 [Google Search Console](https://search.google.com/search-console?hl=ko)또는 [Naver Search Advisor](https://searchadvisor.naver.com/)에 제출할 수 있습니다!

## title 메타데이터

`<title>`태그는 해당 웹페이지의 제목을 나타냅니다. 해당 태그의 경우 일반적으로 해당 문서의 `<h1>` 태그와 일치시킵니다.  
또한, 해당 태그의 내용은 브라우저의 탭에 노출됩니다.

<img src="/posts/nextjs-sitemap-metadata/browser-title-tab-example.png" alt="browser-title-tab-example" style='width: 300px'/>

### title 설계하기

SEO를 위해서는 모든 페이지의 title이 unique해야합니다.  
따라서, 저는 `Raon.dev`라는 블로그이름이 먼저 나오고 `|` 뒤에 Sub page의 이름이 나왔으면 좋겠습니다.

예를들어 루트 페이지(`'/'`)는 `Raon.dev`,  
about me 페이지(`'/aboutme'`)는 `Raon.dev | About Me`,  
문서 제목이 '블로그 글'인 포스트의 페이지(`/posts/블로그_글`)는 `Raon.dev | 블로그 글`로 설정되면 좋을것 같습니다.

### title template 설정하기

Next.js v13.2 에서 공개된 [Metadata API](https://nextjs.org/blog/next-13-2#built-in-seo-support-with-new-metadata-api) app 디렉토리아래에서 metadata object를 export 하여 metadata를 설정할 수 있습니다.

루트디렉토리의 `layout.tsx`파일에서 metadata object를 export 해봅시다. title을 `BLOG_TITLE`로 설정하고 template을 설정해줍니다.  
아래 template의 의미는 하위 페이지에서 title을 설정하지 않으면 default를 title로 설정하고, title을 설정하면 `%s`의 위치에 타이틀을 삽입하여 설정해줍니다.

```tsx
`/app/layout.tsx`;

const BLOG_TITLE = 'Raon.dev';

export const metadata: Metadata = {
  title: {
    default: BLOG_TITLE,
    template: `${BLOG_TITLE} | %s`,
  },
};
```

이제 하위 페이지에서 title을 export 해봅시다.

```tsx
`/app/aboutme/page.tsx`;

export const metadata = {
  title: 'about me',
};
```

![browser-title-aboutme-tab](/posts/nextjs-sitemap-metadata/browser-title-aboutme-tab.png)_%s위치에 aboutme가 들어간 것을 볼 수있다._

### 동적인 metadata 생성하기

앞서 title에 template을 지정하는 방법을 알아봤습니다.  
이제, 포스트 페이지의 title을 설정할 차례인데, aboutme 페이지와는 달리 포스트 페이지의 title은 동적이라는것을 명심해야합니다.

Next.js에서는 동적인 metadata를 위해 `generateMetadata` API를 제공합니다.  
해당 함수 내에서 적절히 동적인 metadata를 생성한 뒤 return 해주면 동적으로 metadata가 생성됩니다.

```tsx
`/app/posts/[id]/page.tsx`;

// Dynamic metadata
export function generateMetadata({ params }): Metadata {
  const { id } = params;
  const post = getPostByName(id as string);
  const { title } = parseMarkdownMetadata(post);

  return { title };
}
```

## 마무리

지금까지, Next.js를 활용하여 Raon.dev 기술 블로그를 개발하면서 App Router에서 sitemap 및 metadata를 설정하는 방법을 알아봤습니다.  
pages router에서 app router로 변경하려는 사람 또는 app router로 최초 개발하려는 사람들에게 많은 도움이 되었으면 좋겠습니다.

### 참조

https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=ko
https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
https://nextjs.org/blog/next-13-2#built-in-seo-support-with-new-metadata-api
