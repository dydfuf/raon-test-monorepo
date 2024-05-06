import fs from "fs";
import { parseMarkdownMetadata } from "./parseMarkdownMetadata";
import { isBefore } from "date-fns";

export const getPostNameList = () => {
  try {
    return fs
      .readdirSync(`${process.cwd()}/posts`)
      .map((file) => file.split(".")[0])
      .map((postName) => {
        const { date } = parseMarkdownMetadata(getPostByName(postName ?? ""));
        return { postName, date };
      })
      .filter((postMetaData) => postMetaData.date !== undefined)
      .sort((a, b) => -isBefore(new Date(a.date!), new Date(b.date!)))
      .reverse()
      .map((postMetaData) => postMetaData.postName);
  } catch {
    return [];
  }
};

export const getPostByName = (fileName: string) => {
  try {
    return fs.readFileSync(`${process.cwd()}/posts/${fileName}.md`).toString();
  } catch {
    return "";
  }
};

export const getAdjacentPost = (fileName: string) => {
  const postNameList = getPostNameList();
  const idx = postNameList.findIndex((postName) => postName === fileName);

  return {
    prev: postNameList[idx + 1] ?? "",
    next: postNameList[idx - 1] ?? "",
  };
};
