export const siteConfig = {
  name: "raonc/ui",
  url: "https://ui.raonc.dev",
  ogImage: "https://ui.raonc.dev/og.png",
  description:
    "Shadcn UI를 기반으로 확장한 raon-monorepo를 위한 UI 라이브러리 문서입니다.",
  links: {
    linkedIn: "https://www.linkedin.com/in/%EC%B5%9C%EC%9A%A9%EC%97%B4/",
    github: "https://github.com/dydfuf/raon-monorepo",
    blog: "https://blog.raonc.dev",
    cookieJelly: "https://cookie-jelly.vercel.app",
  },
  projects: {
    blog: {
      name: "Raonc/blog",
      description:
        "프론트엔드 개발자 Raon의 개발 블로그입니다. 주로 Front-end 관련 글을 작성합니다.",
      siteLink: "https://blog.raonc.dev",
      githubLink: "https://github.com/dydfuf/raondev",
    },
    cookieJelly: {
      name: "Raonc/Cookie-Jelly",
      description: "그룹간 사진 공유를 위한 서비스 입니다.",
      siteLink: "https://cookie-jelly.vercel.app",
      githubLink: "https://github.com/dydfuf/jelly",
    },
  },
};

export type SiteConfig = typeof siteConfig;
