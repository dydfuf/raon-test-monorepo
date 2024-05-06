---
title: 블로그에 Radix Themes 적용 후기
date: 2023-09-24
description: Raon.dev 기술 블로그에 Radix Themes를 적용한 후기를 공유합니다.
category: Radix UI, Radix Themes, Design System, Headless UI
---

> Raon.dev 기술 블로그에 Radix Themes를 적용한 후기를 공유합니다.  
> 해당 기술에 대해 자세히 살펴보지는 않고 단순 후기를 공유합니다.

지난 5월 Raon.dev 라는 기술 블로그를 만들었습니다.  
velog, 티스토리, medium 등 블로그를 운영할 수 있는 다양한 플랫폼이 있었지만, 저는 직접 블로그를 구축하고 개발하기로 결심 했습니다.

Next.js 13의 App Router를 사용해볼 수 있었고, 디자인 및 구현을 자유롭게 할 수 있다는 장점이 있었습니다.

하지만 너무 자유로웠던 걸까요. 최초 블로그 구현 후 두 개의 글을 쓰고는 다시 글을 쓰러 들어오지 않게 되었습니다.

일단 블로그가 너무 못생겼거든요.

당시 제 블로그 페이지의 모습 입니다.

![original-blog-main](/posts/radix-theme-review/original-blog-main.png)
_원래 블로그의 메인 페이지_

![original-blog-todo](/posts/radix-theme-review/original-blog-todo.png)
_원래 블로그의 TODO 페이지_

~~다시봐도 못생겼습니다.~~

TODO 에도 정해놨듯, 다크모드도 지원할 겸 전반적인 디자인을 한번 정리할 필요가 있어서 마음 먹고 개편을 진행 했습니다.

## 문제점 정의

우선 해결하고자 하는 디자인적 문제점을 정리했습니다.

1. 색상을 중구난방으로 사용한다. ( `bg-[#ffffff]`와 같이 hex값을 그대로 사용하고 있었습니다. )
2. 여백 및 크기가 중구난방이다.
3. 다크모드를 지원하지 않는다.
4. 메인 배너 이미지가 못생겼다.

### 해결

우선 1,2,3은 이번 주제인 [Radix-Themes](https://www.radix-ui.com/)를 사용하여 해결할 수 있습니다.  
해당 라이브러리는 [MUI](https://mui.com/) 또는 [Ant Design](https://ant.design/)과 같이 미리 디자인 되어있는 컴포넌트들을 제공합니다.

저는 이전에 Headless UI인 Radix-UI를 다양한 사이드 프로젝트에 적극적으로 활용하고 있었고, 이를 기반으로 만들어진 Radix-Themes를 언젠가는 써봐야 겠다는 생각이 들어서 선택했습니다.

### 색상

먼저 중구난방인 색상을 정리해보겠습니다.
Radix-UI 에서는 [Color 팔레트](https://www.radix-ui.com/colors)를 제공합니다.  
다양한 색상들이 정의되어 있고 당연히도 다크모드일때의 색상도 정의되어 있습니다.

우선, 저는 블로그의 브랜드 컬러를 `Jade` 색상으로 정했습니다.  
하나의 브랜드 컬러를 정해두면, 버튼, 강조색상 등을 고민없이 처리할 수 있습니다.

추가적으로, 프로젝트의 [accent-color](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color)도 `Jade` 색상으로 정의 했습니다.

accent-color은 Radix-Themes의 `<Theme />`컴포넌트에서 정의할 수 있습니다.

```tsx
// layout.tsx
<html suppressHydrationWarning>
  <Head />
  <body>
    <Theme accentColor="jade">
      <Layout>{children}</Layout>
    </Theme>
  </body>
</html>
```

### 여백 및 크기

Radix-Themes에는 Layout 컴포넌트들이 있습니다. `Box`, `Flex`, `Grid`와 같은 기본적인 레이아웃 컨데이너를 제공하고, 각 컴포넌트들의 props로 p, px, py, pt, m, mx, my, mt 등 패딩과 마진값에 대한 props를 제공합니다.  
해당 props들은 1~9까지의 값을 가질 수 있고 스케일은 아래와 같습니다.

![spacing scale](/posts/radix-theme-review/spacing-scale.png)

또한 문자를 렌더링하기 위한 Typography 컴포넌트또한 제공합니다. 해당 컴포넌트에는 size라는 props를 제공하고, 여백과 동일하게 1~9까지의 값을 가질 수 있고 스케일은 아래와 같습니다.

![type-scale](/posts/radix-theme-review/type-scale.png)

이렇게 정의된 값들을 사용함으로서 기존에 중구난방이었던 여백 및 크기가 통일감을 가지게 되었습니다. 이렇게 계층화된 여백 및 크기를 통해 컴포넌트 내에서 각 요소들의 계층화를 여백과 크기로 제어할 수 있게 되었습니다.

### 다크모드

Radix-Theme의 Color들은 모두 기본적으로 다크모드를 지원합니다. 기본적으로는 light모드이며, `<Theme />`컴포넌트의 props로 ` dark`를 넣어주면 다크모드로 변경됩니다. 추가적으로 저는 Next.js의 SSR을 사용중이므로, Hydration warning 제거를 위해 html 태그에 `suppressHydrationWarning`값을 추가해주었습니다.

```tsx
<Theme appearance="dark">
  <MyApp />
</Theme>
```

```tsx
// app/layout.jsx
export default function Layout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body>{children}</body>
    </html>
  );
}
```

추가로 저는 [next-thems](https://www.npmjs.com/package/next-themes) 라는 라이브러리를 사용해 테마 변경 관리를 했습니다. Radix-Themes에서 해당 라이브러리를 지원하고 있으니, 기존에 사용중이시라면 그대로 옮겨오셔도 괜찮을것 같습니다.

### 메인 배너 이미지

이제 마지막 문제점 입니다. 사실 이건 Radix-Themes를 사용한건 아니라 Unsplash의 이미지를 사용하여 노출하도록 변경한거라 자세한 설명은 생략하겠습니다.

## 정리

Radix-Themes를 통해 블로그의 디자인을 개편해보았습니다. 원체 디자인 자체에 소질이 없어서 아무런 가이드 없이 만들고 나니 만들때 너무 막막했는데, 크기, 여백, 색상등의 토큰이 정리되어있는 라이브러리를 사용하니 디자인이 이전보다 훨씬 더 간결하고 통일성있어 보입니다.  
다만, 종종 사이즈 8은 너무 작고 9는 너무 큰, 예를들어 포스트의 Title같은 경우가 있는데. 요런 부분은 어쩔 수 없이 감안하고 가야 할 것 같습니다.

디자인에 재능이 없거나, 디자인을 할 시간이 없이 빠르게 사이트를 구축해야할때 Radix-Themes 찍먹해보시는건 어떨까요?
