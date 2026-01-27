import { POKE_API_BASE_URL } from "../constants";
import { parseJson } from "./helper";

export async function localStorageFetch({
  url,
  queryString,
  filterFunction,
}: {
  url: string;
  queryString?: string;
  filterFunction?: (json: any) => any;
}): Promise<any> {
  let fetchesObject: Record<string, string> = {};
  const fetches = localStorage.getItem("fetches");
  if (fetches) {
    fetchesObject = parseJson(fetches);

    if (fetchesObject[url]) {
      return fetchesObject[url];
    }
  }

  try {
    const response = await fetch(
      `${POKE_API_BASE_URL}${url}` + `${queryString ? `?${queryString}` : ""}`,
    );
    if (!response.ok) {
      throw new Error("Response failed");
    }
    let json = await response.json();

    if (filterFunction) {
      json = filterFunction(json);
    }

    fetchesObject[url] = json;
    localStorage.setItem("fetches", JSON.stringify(fetchesObject));
    return json;
  } catch (error) {
    console.error(`Error fetching`, error);
    throw error;
  }
}
