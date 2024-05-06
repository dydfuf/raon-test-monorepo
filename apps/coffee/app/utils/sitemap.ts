import { iteratePaginatedAPI } from "@notionhq/client";
import { CoffeeInfo, CoffeeInfoField } from "../types/coffee";
import {
  addNoteForFilterField,
  getCoffeeInfoByBlockProperties,
} from "../.server/notion/util";

export const getCoffeeInfoList = async () => {
  const coffeeInfoList: CoffeeInfo[] = [];

  for await (const block of iteratePaginatedAPI(notion.databases.query, {
    database_id: process.env.NOTION_DATABASE_ID ?? "",
  })) {
    if ("properties" in block) {
      const coffeeInfo = getCoffeeInfoByBlockProperties(block);
      const noteForFilterAddedCoffeeInfo = addNoteForFilterField(coffeeInfo);
      coffeeInfoList.push(noteForFilterAddedCoffeeInfo);
    }
  }

  const NotUserSubmittedCoffeeInfoList = coffeeInfoList.filter(
    (coffeeInfo) => !coffeeInfo[CoffeeInfoField.USER_SUBMITTED]
  );

  return NotUserSubmittedCoffeeInfoList;
};

import { Client } from "@notionhq/client";

const globalForNotion = globalThis as unknown as {
  notion: Client | undefined;
};

export const notion =
  globalForNotion.notion ??
  new Client({
    auth: process.env.NOTION_API_KEY,
  });
