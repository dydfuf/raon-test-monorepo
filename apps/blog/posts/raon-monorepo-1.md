---
title: 개인 프로젝트의 생산성 향상을 위한 모노레포 도입기 -1- w/TurboRepo
date: 2024-02-24
description: 개인 프로젝트 생산성 향상을 위해 TurboRepo를 도입한 경험을 소개합니다.
category: 모노레포, TurboRepo, 생산성
---

> 개인 프로젝트 생산성 향상을 위해 TurboRep를 활용한 모노레포를 도입한 경험을 소개합니다.  
> 모노레포를 도입하게된 계기 및 도입하며 고민한 흔적을 공유합니다.

안녕하세요! 오랜만에 글을 작성하는것 같습니다. 
그동안 개인적인 공부도 하고, 몇개의 사이드 프로젝트 개발을 하느라 글을 쓰는것을 미뤄왔습니다.  
~~변명입니다~~

## 느꼈던 불편함

사이드 프로젝트를 진행하고 코드를 작성하면서 느꼈던 몇 가지 불편한 점이 있었습니다.  
- 분명히 이전에 개발했던 컴포넌트 같은데 왜 다시 만들고 있지?  
- 이전 프로젝트는 yarn을 쓰고 있는데, 이 프로젝트는 npm을 사용해서 패키지가 꼬였네 😭  
- 이 프로젝트는 컨벤션을 어떻게 가져가기로 했더라...?

등 여러개의 레포로 여러개의 프로젝트를 진행하면 많은 불편함이 있습니다.

이렇게 불편함을 느끼던 중에, 모노레포를 도입하면 어떨까 생각했고, Turborepo를 활용하여 모노레포를 구축한 경험을 간단히 공유해볼까 합니다.

## 고민했던 사항

모노레포를 도입하는 목적은 개발 생산성 증대 입니다.  
이 목적을 이루기 위해 달성해야할 목표를 정해봤습니다.
1. 내가 관리하는 모든 프로젝트는 모노레포에서 작업할 수 있어야 한다.
2. 빌드, 테스트, 배포가 용이해야 한다.
3. 새로운 프로젝트를 개발할 때 빠르게 시작할 수 있어야 한다.

그럼 위 목표를 달성하기 위해 진행했던 액션 플랜을 알아볼까요?

### 1. 모노레포 툴 선택

내가 관리하는 모든 프로젝트를 하나의 레포지토리에서 작업하고, 빌드, 테스트, 배포를 용이하게 하기 위해 모노레포 툴 중 하나인 Turborepo를 사용하기로 했습니다.  
Turborepo이외에도 Yarn (workspace), Lerna, Nx등 여러 모노레포 툴이 있지만, Turborepo를 선택한 이유는 캐싱을 통해 빌드, 테스트, 린트 등의 중복되는 작업의 시간을 단축시킬 수 있고, 이런 작업들을 병렬로 진행하여 반복되는 작업의 속도가 빨라진다는 장점이 있어서 입니다.  
또한, 이후 배포를 설명할때도 나오겠지만, TurboRepo를 Vercel에서 인수하여 해당 플랫폼을 통해 배포를 할때 조금 더 설정이 간단하고 에러를 마주칠 확률이 적습니다.

> 모노레포 툴들에 대한 설명은 아래 링크를 참고해 주세요.
> https://d2.naver.com/helloworld/7553804

### 2. Pnpm 설치

다음으로는 패키지 매니저를 선택 해봅시다.  
npm, yarn, pnpm, bun 등의 선택지가 있고 저는 그 중 pnpm을 선택 했습니다.  
저는 npm이 이미 설치되어 있어 아래의 명령어로 설치를 했습니다.

```shell
npm install -g pnpm
```

> 이 외의 방법으로 설치를 하고 싶다면 아래 링크를 참고해 주세요.
> https://pnpm.io/ko/installation

### 3. TurboRepo 세팅

자 이제 본격적으로 TurboRepo를 세팅할 시간 입니다. 아래 명령어를 실행해봅시다.

```shell
pnpm dlx create-turbo@latest
```

패키지 이름을 입력해주고 workspace를 pnpm workspace로 설정해주면 끝입니다!  
NextJs를 기반으로한 web, docs라는 웹 애플리케이션이 `apps`디렉토리 아래에 생성되었고, 공통으로 사용할 lint, typescript 세팅 그리고 ui 패키지가 `packages` 디렉토리 아래에 생성되었습니다.

![create-turbo](/posts/raon-monorepo/create-turbo.png)

아래 명령어를 통해 각 웹 애플리케이션을 실행해봅시다.

```shell
pnpm run dev --filter=web # web 애플리케이션의 dev 명령어를 실행합니다.
pnpm run dev --filter=docs # docs 애플리케이션의 dev 명령어를 실행합니다.
pnpm run dev # 모든 apps의 dev 명령어를 실행합니다.
```

### 4. Vercel을 통한 배포

간단하게 모노레포 세팅 및 애플리케이션이 동작하는것을 확인 했으니, 이제 배포세팅을 해봅시다.  
먼저 해당 프로젝트를 github에 올려둔 뒤, vercel에 접속합니다.  
[대시보드](https://vercel.com/dashboard)에서 Add New > Project 클릭하여 추가해봅시다.  
이후 본인의 레포지토리를 선택 후 `Import` 버튼을 클릭합니다.

![create-new-button](/posts/raon-monorepo/create-new-button.png)

특별히 세팅을 추가할 필요는 없습니다. 대부분의 세팅은 기본적으로 되으므로 `Deploy` 버튼을 클릭해줍시다.

![configure-project](/posts/raon-monorepo/configure-project.png)

잠깐의 빌드 시간이 지나면 배포가 완료됩니다. 🎉  
이후 아래에 `Deploy another Project from this repo`를 보시면 `docs`애플리케이션을 추가로 배포하라는 영역이 노출됩니다.  
`Deploy` 버튼을 클릭하여 동일하게 배포를 진행해줍니다.

![deploy-done](/posts/raon-monorepo/deploy-done.png)

이제 `main` 브랜치에 push가 되면 `web`, `docs` 애플리케이션이 배포 됩니다!

## 마무리

여기까지 위 `고민했던 사항`에서 나열한 고민들을 해결하기 위해 Turborepo를 도입하고, Vercel을 통해 간단하게 배포를 진행했습니다.  
이제 관리하는 모든 프로젝트를 모노레포안에서 작업할 수 있고, TurboRepo의 증분빌드, 캐싱등을 사용하여 빌드, 테스트를 쉽게 했습니다.  
또한, Vercel을 통해 배포가 용이해졌고, 빠르게 시작할 수 있게 되었습니다.

사실 모노레포를 조금 더 효율적으로 사용하려면 조금 더 많은 개선이 필요합니다.  
아직 TurboRepo의 기능들은 거의 사용하지도 않았구요.

다음 글에는 아래와 같은 내용을 추가로 공유하고자 합니다.
- 효율적인 모노레포 개발을 위한 브랜치 전략 ( [Trunk Based Development](https://trunkbaseddevelopment.com/) 기반 )
- 태그 기반 애플리케이션 배포
- packages 하위의 라이브러리성 패키지들의 버저닝 및 배포 ( Github packages 사용 )
- 환경변수 관리
- 공통화된 ui 라이브러리 사용 ( [shadcn/ui](https://ui.shadcn.com/) 사용 )
- 공통화된 도메인 사용 ( 2차 도메인 활용 및 Vercel 배포와 연동 )

위 나열한 내용들 말고도 추가로 공유하고 싶은 내용이 많으니 조금만 기다려주세요!