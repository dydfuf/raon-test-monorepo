import { getPostNameList, getPostByName } from "../utils/post";
import { parseMarkdownMetadata } from "../utils/parseMarkdownMetadata";
import { MetadataRoute } from "next";
import { BLOG_URL } from "../constant/common";

export default function sitemap(): MetadataRoute.Sitemap {
  const postList = getPostNameList().map((postName) => ({
    name: postName,
    content: getPostByName(postName ?? ""),
  }));
  const postsRoute = postList.map(({ name, content }) => {
    const { date } = parseMarkdownMetadata(content);
    return {
      url: `${BLOG_URL}/posts/${name}`,
      lastModified: date,
    };
  });

  const routes = ["", "/aboutme"].map((route) => ({
    url: `${BLOG_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...postsRoute];
}
