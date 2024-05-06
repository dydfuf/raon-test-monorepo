---
title: Content Card에 fade-up 애니메이션 적용하기
date: 2023-11-09
description: 블로그의 컨텐츠 카드에 fade-up 애니메이션을 적용한 경험을 공유합니다.
category: Next.js, fadeup, animation, 애니메이션, Tailwindcss
---

> 블로그의 컨텐츠 카드에 페이드업 애니메이션을 적용한 경험을 공유합니다.  
> tailwindcss를 활용했습니다.

이번 블로그 글은 간단하게 작성해보려 합니다.

최근 블로그의 컨텐츠 카드에 fade-up 애니메이션을 적용했습니다. 먼저 적용된 결과물을 보시죠.

![content-card-animation](/posts/content-card-fade-up/animation.gif)

보시다시피 컨텐츠 카드가 살짝 아래쪽에 있다가 위로 올라오면서 opacity가 변화하는 애니메이션입니다. 간단하쥬? 🤓

간단하게 `tailwind.cofig.js` 에 `keyframe`을 등록해보겠습니다.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'none' },
        },
      },
    },
  },
};
```

keyframe의 이름을 `fade-up`으로 설정하고, `0%`, `100%`에서의 transition을 지정해줍니다.

이제 classname으로 animation을 사용할 수 있도록 animation도 추가해줍니다.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        'content-fade-up': 'fade-up .4s ease forwards',
      },
      keyframes: {
        // ...
      },
    },
  },
};
```

이제는 `content-fade-up`이라는 classname을 사용하면 fade-up css를 적용할 수 있습니다.

적용 해볼까요?  
`content-fade-up`이라는 애니메이션을 사용하기 위해서는 앞에 `animate-`를 붙여야 합니다.

```tsx
// ContentCard.tsx
<Card className={'animate-content-fade-up'}>
  {/* <CardTitle /> */}
  {/* <CardMeta /> */}
  {/* ... */}
</Card>
```

![content-card-animation2](/posts/content-card-fade-up/animation2.gif)

좋습니다! 우리가 원하던대로 아래에서 위로 올라오는 fadeup 애니메이션이 적용되었습니다.

하지만, 전체 카드가 동시에 올라오니 조금 어색한것 같은데요. 순차적으로 앞에서부터 먼저 올라올 수 있도록 각 카드별로 애니메이션에 딜레이를 주어보겠습니다.

```tsx
<Card
  className={'animate-content-fade-up'}
  style={{ animationDelay: `calc(${index} * 80ms)` }}
>
  {/* <CardTitle /> */}
  {/* <CardMeta /> */}
  {/* ... */}
</Card>
```

![content-card-animation3](/posts/content-card-fade-up/animation3.gif)

앗! 🫣 아직 애니메이션이 시작되지 않은 카드들이 보이고 있으니 오히려 더 어색해졌네요. 애니메이션이 시작되기 전에는 카드들이 노출되지 않도록 수정해 보겠습니다.

```tsx
<Card
  className={'opcity-0 animate-content-fade-up'}
  style={{ animationDelay: `calc(${index} * 80ms)` }}
>
  {/* <CardTitle /> */}
  {/* <CardMeta /> */}
  {/* ... */}
</Card>
```

![content-card-animation4](/posts/content-card-fade-up/animation4.gif)

완벽하네요! `opcaity-0`을 통해 원하던대로, 순차적으로 fadeup이 되면서 나타나는 애니메이션을 적용 했습니다.  
처음 저의 블로그를 들어왔을때 유저들의 시선을 끌 수 있었으면 좋겠네요 😄

지금까지 간단하게 저의 컨텐츠카드에 애니메이션을 적용한 경험을 공유해봤습니다.  
혹시 fade-up 애니메이션을 적용할 예정이라면 tailwindcss와 함께라면 아주 간단하니 츄라이 츄라이~
