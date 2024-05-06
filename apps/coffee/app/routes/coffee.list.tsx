import { Link, json, useLoaderData, useSearchParams } from "@remix-run/react";
import { getCoffeeInfoList } from "../.server/notion/service";
import { CoffeeInfo, CoffeeInfoField } from "../types/coffee";
import NoteBadge from "../components/note-badge";
import {
  getAllNotesByCoffeeInfoList,
  getAllNationByCoffeeInfoList,
} from "../utils/coffee";
import { useEffect, useState } from "react";
import CoffeeFilter from "../components/coffee-filter";
import MobileCoffeeFilter from "../components/mobile-coffee-filter";
import { HeadersFunction, MetaFunction } from "@vercel/remix";
import { siteConfig } from "../constant/common";

export const headers: HeadersFunction = () => ({
  "Cache-Control": "public, max-age=1800, s-maxage=3600",
});

export async function loader() {
  const coffeeInfoList = await getCoffeeInfoList();
  return json(
    { coffeeInfoList },
    {
      headers: {
        "Cache-Control": "public, max-age=1800, s-maxage=3600",
      },
    }
  );
}

export const meta: MetaFunction<typeof loader> = ({ location, matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !("title" in meta))
    .filter((meta) => !("description" in meta));

  const nation = new URLSearchParams(location.search).get("nation");
  const nationTitle = nation ? `| 국가 : ${nation}` : "";
  const note = new URLSearchParams(location.search).get("note");
  const noteTitle = note ? `| 노트 : ${note}` : "";
  const SITE_NAME = siteConfig.name;

  return [
    ...parentMeta,
    {
      title: `${SITE_NAME} | 커피 리스트 ${nationTitle} ${noteTitle}`,
    },
    {
      name: "description",
      content: `${SITE_NAME}에서 제공하는 커피 리스트 입니다. 국가 : ${nation} 노트 : ${note}`,
    },
  ];
};

export default function CoffeeListPage() {
  const { coffeeInfoList } = useLoaderData<typeof loader>();
  const allNations = getAllNationByCoffeeInfoList(coffeeInfoList);

  const [allNotes, setAllNotes] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedNations = searchParams.get("nation")
    ? searchParams.get("nation")?.split(",") ?? []
    : [];
  const selectedNotes = searchParams.get("note")
    ? searchParams.get("note")?.split(",") ?? []
    : [];

  useEffect(() => {
    if (selectedNations.length === 0) {
      setAllNotes(getAllNotesByCoffeeInfoList(coffeeInfoList, allNations));
      return;
    }

    setAllNotes(getAllNotesByCoffeeInfoList(coffeeInfoList, selectedNations));
  }, [searchParams]);

  const filterByNations = (coffeeInfo: CoffeeInfo) => {
    const hasSelectedNations = selectedNations.length > 0;

    if (hasSelectedNations) {
      return selectedNations.includes(coffeeInfo[CoffeeInfoField.NATION]);
    }
    return true;
  };

  const filterByNotes = (coffeeInfo: CoffeeInfo) => {
    const hasSelectedNotes = selectedNotes.length > 0;

    if (hasSelectedNotes) {
      const coffeeNotes =
        coffeeInfo[CoffeeInfoField.NOTE_FOR_FILTER].split(",");
      return coffeeNotes.some((note) => selectedNotes.includes(note.trim()));
    }
    return true;
  };

  const filteredCoffeeInfoList = coffeeInfoList
    .filter(filterByNations)
    .filter(filterByNotes);

  const onSelectedNationsChange = (value: string[]) => {
    setSearchParams(
      { nation: value.join(",") },
      {
        replace: true,
      }
    );
  };
  const onSelectedNotesChange = (value: string[]) => {
    setSearchParams(
      (prev) => {
        prev.set("note", value.join(","));
        return prev;
      },
      {
        replace: true,
      }
    );
  };

  const filterProps = {
    allNations,
    allNotes,
    selectedNations,
    onSelectedNationsChange,
    selectedNotes,
    onSelectedNotesChange,
  };

  return (
    <div className="mx-auto px-8 pt-4 pb-8 flex flex-col gap-4 w-[1024px]">
      <CoffeeFilter {...filterProps} />
      <MobileCoffeeFilter {...filterProps} />
      {filteredCoffeeInfoList.map((coffeeInfo) => (
        <Link
          to={`/coffee/${coffeeInfo[CoffeeInfoField.ID].split("-")[1]}`}
          key={coffeeInfo[CoffeeInfoField.ID]}
          className="flex flex-col p-8 border-[1px] rounded-lg hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex flex-col">
            <p className="text-xl">{coffeeInfo[CoffeeInfoField.NAME_KR]}</p>
            <p className="text-sm text-muted-foreground">
              {coffeeInfo[CoffeeInfoField.NAME_EN]}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {coffeeInfo[CoffeeInfoField.NOTE].split(",").map((note) => (
                <NoteBadge key={note}>{note}</NoteBadge>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
