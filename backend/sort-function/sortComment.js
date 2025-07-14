import {
  MostRecent,
  LeastHated,
  MostLoved,
  NetUseful,
  OldestUser,
  Controversial,
} from "./commentSort.js";

const SORT_TYPE = {
  MOST_LOVED: "most_loved",
  LEAST_HATED: "least_hated",
  MOST_RECENT: "most_recent",
  OLDEST_USER: "oldest_user",
  CONTROVERSIAL: "controversial",
  TRENDING: "trending",
  NET_USEFUL: "net_useful",
};

export function sortComment(array, sortType) {
  let sorter;
  switch (sortType) {
    case SORT_TYPE.MOST_LOVED:
      sorter = new MostLoved();
      break;

    case SORT_TYPE.LEAST_HATED:
      sorter = new LeastHated();
      break;

    case SORT_TYPE.MOST_RECENT:
      sorter = new MostRecent();
      break;

    case SORT_TYPE.OLDEST_USER:
      sorter = new OldestUser();
      break;

    case SORT_TYPE.NET_USEFUL:
      sorter = new NetUseful();
      break;

    case SORT_TYPE.TRENDING:
      // TODO: implement trending sort logic
      break;

    case SORT_TYPE.CONTROVERSIAL:
      sorter = new Controversial();
      break;
  }
  return sorter ? sorter.sort(array) : array;
}
