import { Client } from "@notionhq/client";

const globalForNotion = globalThis as unknown as {
  notion: Client | undefined;
};

export const notion =
  globalForNotion.notion ??
  new Client({
    auth: process.env.NOTION_API_KEY,
  });
