import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { DEFAULT_FIELD_VALUE } from "./constant";
import { CoffeeInfo, CoffeeInfoField } from "../../types/coffee";
import { COFFEE_NOTE_DICT } from "../../constant/coffee";

export const getCoffeeInfoByBlockProperties = (
  block:
    | PageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
) => {
  const coffeeInfo = Object.entries(block.properties).map(([key, value]) => {
    let fieldValue = DEFAULT_FIELD_VALUE;
    if (value.type === "title") {
      fieldValue = value.title[0]?.plain_text;
    } else if (value.type === "rich_text") {
      fieldValue = value.rich_text[0]?.plain_text;
    } else if (value.type === "unique_id") {
      const { prefix, number } = value.unique_id;
      fieldValue = `${prefix}-${number}`;
    } else if (value.type === "number") {
      fieldValue = value.number;
    } else if (value.type === "last_edited_time") {
      fieldValue = value.last_edited_time;
    } else {
      fieldValue = JSON.stringify(value);
    }
    return { [key]: fieldValue ?? DEFAULT_FIELD_VALUE };
  });

  return Object.assign({}, ...coffeeInfo);
};

export const addNoteForFilterField = (coffeeInfo: CoffeeInfo) => {
  const notes = coffeeInfo[CoffeeInfoField.NOTE]
    .split(",")
    .map((note) => note.trim());
  const noteForFilter = notes
    .map((note) => {
      return COFFEE_NOTE_DICT[note] ?? note;
    })
    .map((note) => note.trim())
    .join(", ");
  coffeeInfo[CoffeeInfoField.NOTE_FOR_FILTER] = noteForFilter;
  return coffeeInfo;
};