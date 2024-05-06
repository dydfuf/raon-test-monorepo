import { iteratePaginatedAPI } from "@notionhq/client";
import { notion } from "./client";
import { CoffeeInfo, CoffeeInfoField } from "../../types/coffee";
import { addNoteForFilterField, getCoffeeInfoByBlockProperties } from "./util";

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

export const getCoffeeInfoById = async (id: number) => {
  const data = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? "",
    filter: {
      property: "ID",
      unique_id: {
        equals: id,
      },
    },
  });

  const coffeeInfo: CoffeeInfo[] = data.results.map((block) => {
    if (!("properties" in block)) return;
    return getCoffeeInfoByBlockProperties(block);
  });

  return coffeeInfo[0] ? addNoteForFilterField(coffeeInfo[0]) : undefined;
};

export const createCoffeeInfo = async (
  coffeeInfo: Omit<CoffeeInfo, CoffeeInfoField.ID>
) => {
  const response = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID ?? "",
    },
    properties: {
      [CoffeeInfoField.NAME_KR]: {
        title: [
          {
            type: "text",
            text: {
              content: coffeeInfo[CoffeeInfoField.NAME_KR],
            },
          },
        ],
      },
      [CoffeeInfoField.NAME_EN]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: coffeeInfo[CoffeeInfoField.NAME_EN],
            },
          },
        ],
      },
      [CoffeeInfoField.NOTE]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: coffeeInfo[CoffeeInfoField.NOTE],
            },
          },
        ],
      },
      [CoffeeInfoField.REGION]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: coffeeInfo[CoffeeInfoField.REGION],
            },
          },
        ],
      },
      [CoffeeInfoField.FARM]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: coffeeInfo[CoffeeInfoField.FARM],
            },
          },
        ],
      },
      [CoffeeInfoField.VARIETY]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: coffeeInfo[CoffeeInfoField.VARIETY],
            },
          },
        ],
      },
      [CoffeeInfoField.PROCESS]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: coffeeInfo[CoffeeInfoField.PROCESS],
            },
          },
        ],
      },
      [CoffeeInfoField.SOURCE]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: coffeeInfo[CoffeeInfoField.SOURCE],
            },
          },
        ],
      },
      [CoffeeInfoField.USER_SUBMITTED]: {
        number: 1,
      },
    },
  });

  return response;
};
