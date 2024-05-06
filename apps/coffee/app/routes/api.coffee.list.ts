import { getCoffeeInfoList } from "../.server/notion/service";

export const loader = async ({}) => {
  const coffeeInfoList = await getCoffeeInfoList();

  return new Response(JSON.stringify({ coffeeInfoList }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
