---
title: 개인 프로젝트의 생산성 향상을 위한 모노레포 도입기 -2- w/브랜치 전략
date: 2024-02-25
description: 효율적인 모노레포 관리를 위한 TBD기반 브랜치 전략을 소개합니다.
category: 모노레포, TurboRepo, 브랜치 전략, TBD
---

> 효율적인 모노레포 관리를 위해서 수립한 브랜치 전략을 소개합니다.
>
> 고민하는 과정을 공유하며, Trunk Based Development 브랜치 전략을 기반으로 브랜치 전략을 수립했습니다.

안녕하세요! 모노레포와 관련한 두 번째 글 입니다.  
[이전 글](https://blog.raonc.dev/posts/raon-monorepo-1)에서는 패키지매니저 선택과 간단히 TurboRepo를 세팅해보고 Vercel에 배포해보았습니다.

이번 글에서는 모노레포에서의 브랜치 전략을 수립해보고 관련하여 배포 전략도 수립하여 효율적으로 개발을 진행할 수 있는 방법을 알아보겠습니다.

## 모노레포 파악

먼저 모노레포의 구조를 파악해봅시다.  
모노레포에서는 `apps` 디렉토리 하위에 존재하는 웹 애플리케이션과 `packages` 디렉토리 하위에 존재하는 라이브러리 형식의 패키지들이 존재합니다.

각각의 애플리케이션과 패키지들은 독립적으로 개발이 가능해야 하고, 독립적으로 배포가 가능해야 합니다.

## Git-Flow

![gitflow-graph](/posts/raon-monorepo-2/git-flow-graph.png)

Gitflow는 일반적인 개발 환경에서 널리 쓰이는 브랜치 전략입니다.  
master, develop, feature, release, hotfix 라는 5개의 기본적인 브랜치를 바탕으로 기능 개발, 버전 관리, 배포를 위한 명확하고 효율적인 브랜치 전략 입니다.

일반적인 Gitflow는 아래와 같은 작업흐름을 가집니다.

1. **feature 브랜치 생성** : develop 브랜치로부터 새 feature 브랜치를 생성하여 기능 개발 작업을 시작합니다.
2. **기능 개발** : feature 브랜치에서 코드 작성, 테스트 등 기능 개발 작업을 진행합니다.
3. **feature 브랜치 병합** : 기능 개발 완료 후, 코드 검토를 거쳐 develop 브랜치에 feature 브랜치를 병합합니다.
4. **릴리스 버전 생성** : 새로운 릴리스 버전을 준비하기 위해 develop 브랜치로부터 release 브랜치를 생성합니다.
5. **릴리스 버전 테스트** : release 브랜치에서 테스트를 진행하여 배포 준비를 완료합니다.
6. **릴리스 배포** : 테스트를 통과한 release 브랜치 코드를 배포하여 사용자에게 제공합니다.
7. **브랜치 업데이트** : 배포된 릴리스 버전 코드를 master 및 develop 브랜치에 병합하여 버전 히스토리를 유지합니다.
8. **핫픽스 브랜치 생성** : master 브랜치에서 발견된 버그를 수정하기 위해 hotfix 브랜치를 생성합니다.
9. **버그 수정** : hotfix 브랜치에서 버그 수정 작업을 진행하고 테스트를 수행합니다.
10. **핫픽스 브랜치 병합** : 버그 수정 완료 후, hotfix 브랜치를 master 및 develop 브랜치에 병합하여 안정성을 유지합니다.

해당 브랜치 전략은 하나의 레포에 하나의 프로젝트가 있는 경우 에는 아주 적합하지만, 모노레포에 도입하게 되면 develop 브랜치에 머지할때 많은 conflict를 해결해야 합니다.  
또한, 모든 프로젝트와 패키지 관련 코드가 하나의 브랜치에 머지되므로 특정 기능만 선별적으로 배포하기 어려울 수 있습니다.
그리고 가장 중요한 버전관리가 어렵다는 점이 있습니다.

위 문제점들을 해결하기 위해서 Feature Flag를 도입하여 기능을 선별적으로 배포하거나, 각 어플리케이션 패키지별로 Release 브랜치를 생성하여 독립적인 배포와 버저닝을 할 수 있도록 관리할 수 있습니다.

하지만 이런 방식을 추가하여 모노레포를 관리하기에는 유지보수가 힘들 것 같다는 생각이 드네요.

## Github-Flow

![github-flow-graph](/posts/raon-monorepo-2/github-flow-graph.png)

Github-Flow는 Git-Flow를 기반으로하여 Github에서 소개하는 브랜치 전략 입니다. 위에서 살펴 보셨다시피, Git-Flow는 복잡도가 높은편 입니다.  
따라서, Github-Flow는 복잡성을 줄이고 간소화 하여 협업 및 배포를 용이하게 하는데 초점을 맞추고 있습니다.

Github-Flow는 master, develop, feature 3개의 단순한 브랜치를 가집니다.

일반적인 Github-Flow는 아래와 같은 작업흐름을 가집니다.

1. **feature 브랜치 생성** : develop 브랜치로부터 새 feature 브랜치를 생성하여 기능 개발 작업을 시작합니다.
2. **기능 개발** : feature 브랜치에서 코드 작성, 테스트 등 기능 개발 작업을 진행합니다.
3. **Pull Request 생성** : 기능 개발 완료 후, 코드 검토를 위해 develop 브랜치에 Pull Request를 생성합니다.
4. **코드 검토 및 병합** : 팀원들이 Pull Request에 대한 코드 검토 및 의견을 제공합니다.
5. **Pull Request 승인** : 코드 검토 완료 후, Pull Request를 승인하여 develop 브랜치에 feature 브랜치를 병합합니다.
6. **릴리스 준비** : develop 브랜치 코드를 테스트하고 배포 준비를 완료합니다.
7. **릴리스 배포** : develop 브랜치 코드를 배포합니다.
8. **master 브랜치 업데이트** : 배포된 릴리스 버전 코드를 master 브랜치에 병합합니다.

해당 브랜치 전략도 Git-Flow와 비슷하게 conflict 해결의 문제와 기능의 선별적 배포에 문제가 있습니다.  
또한, 버전 관리가 어려울 수 있습니다.

앞서 살펴본 Git-Flow와 Github-Flow 모두 아주 좋은 브랜치 전략이지만 개인 개발과 모노레포에는 적합하지 않은 전략인것 같습니다.

마지막으로 Trunk Based Development 브랜치 전략을 알아보겠습니다.

### Trunk Based Development(TBD)

![trunk-based-development-graph](/posts/raon-monorepo-2/trunk-based-development-graph.png)

TBD는 여러개의 브랜치를 만들지 않고 단일 브랜치(일반적으로 main)만 사용하는 전략 입니다.

일반적으로 TBD는 아래와 같은 작업흐름을 가집니다.

1. **feature 브랜치 생성** : master 브랜치로부터 새 feature 브랜치를 생성하여 기능 개발 작업을 시작합니다.
2. **코드 병합** : feature 브랜치에서 코드 작성, 테스트 등 기능 개발 작업을 진행합니다.
3. **feature 브랜치 병합** : 기능 개발 완료 후, 코드 검토를 거쳐 main 브랜치에 feature 브랜치를 병합합니다.

끝입니다. TBD는 모든 브랜치가 master에서 단 한번만 분기됩니다. 그래서 feature 브랜치 병합시 conflict를 해결해야할 일이 적습니다.

하지만 이 브랜치 전략 또한 선별적 기능 배포에는 어려움이 있습니다.

### 브랜치 전략 선택

사실 일반적인 브랜치 전략만으로는 기능의 선별적 배포라는 목적을 이루기는 어렵습니다.  Feature Flag를 도입한다면 해결가능한 부분이지만, 효율적이고 "잘" 적용하기 위해서는 별도의 서버 및 관리가 필요합니다.

결론만 말씀드리자면 저는 TBD를 브랜치전략으로 가져가기로 했습니다. 무엇보다 다른 브랜치 전략에서 사용하는 `develop`브랜치, 즉 개발환경이 저는 크게 필요 없습니다.  
또한, 개인 개발이기 때문에 때로는 장시간 개발을 하지 못하는 경우가 생길 수 있습니다. 이때, long term 브랜치가 존재한다면 다시 개발을 하려고 돌아왔을때 컨텍스트를 알기 힘들다는 단점이 있기 때문에 TBD가 개인 개발자들에게 조금 더 효율적이라 생각 했습니다.

### 태그기반 배포

마지막으로 가볍게 태그기반 배포에 대해 알아보겠습니다.

TBD에 따르면 모든 main 브랜치에 들어가는 모든 commit은 배포가능한 상태여야 합니다.
그렇다면 자연스럽게 main 브랜치에 CI/CD 플로우가 도입되어야 겠죠.
Vercel을 활용하고 계시다면 프로젝트를 등록하는것 만으로 main 브랜치에 push가 되면 build와 deploy가 동작합니다.  
하지만 모든 commit을 배포하기에는 feature flag가 없기 때문에 완벽하지 않은 feature가 배포될 가능성이 있습니다.  
따라서, main 브랜치에서 Tag를 생성하여 해당 Tag를 기반으로 Production에 배포한다면 main 브랜치는 preview, Tag는 Production 환경으로 사용하면 아주 효율적 입니다.

### TurboRepo & Vercel 태그기반 

우선 Vercel은 태그 또는 릴리즈 기반 배포를 지원하지 않습니다. 따라서 Tag push 에 트리거 되는 Github Action을 기반으로 Vercel Deploy를 명시적으로 트리거 해주어야 합니다.

먼저, commit 기반 배포를 disable하기 위해 프로젝트 root 폴더에 `vercel.json` 파일을 추가해줍니다.

```json
{
  "git": {
    "deploymentEnabled": {
      "main": false
    }
  }
}
```

다음으로는 Vercel 배포를 트리거하기 위한 값들을 Github Secret에 추가해주어야 합니다.  
로컬에서 [Vercel CLI](https://vercel.com/cli)를 설치하고 `vercel login`을 실행합니다.  
다음으로 프로젝트 폴더에서 `vercel link` 명령어를 실행하여 Vercel 프로젝트와 연결해줍니다.  
생성된 `.vercel`폴더에서 `proejctId`, `orgId`를 확인합니다.
그리고 [Vercel Tokens](https://vercel.com/account/tokens)에 접근하여 VERCEL_TOKEN을 생성해줍니다. 
이제 Github에 접근하여, `레포지토리 > Settings > Secrets and variables > Actions` 에 접근합니다.  
`New repository secret`버튼을 클릭하여 아래와 같이 3개의 토큰을 생성해줍시다.

![github-action-secrets](/posts/raon-monorepo-2/github-action-secrets.png)

이제 준비는 끝났습니다. `.github/workflows` 위치에 yml 파일을 생성해줍시다.

```yml
name: Production Tag Deployment
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    tags:        
      - 'web-*.*.*'
jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v3
        with:
          version: 8
      - name: Install Vercel CLI
        run: pnpm install --global vercel@latest
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

이제, `web-*.*.*`라는 태그가 push 될 때마다 해당 action이 실행되고, Vercel의 배포를 트리거하여 배포가 진행됩니다.

### 마무리

지금까지 다양한 브랜치 전략을 찾아보고 저에게 맞는 브랜치전략을 선택했습니다.  
그리고, 태그기반 배포 전략도 수립하였고 실제로 배포를 가능하게 해보았습니다.

배포는 웹 애플리케이션은 Vercel을 통해 배포할 수 있지만 라이브러리성 패키지들은 Vercel에 배포할 수 없습니다.  
이에 대한 해결 방안으로 저는 github의 packages를 선택했는데요. 이에대한 내용은 다음 글에 다뤄보도록 하겠습니다!