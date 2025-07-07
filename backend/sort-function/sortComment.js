import {
  MostRecent,
  MostHated,
  MostLoved,
  NetUseful,
  OldestUser,
} from "./commentSort.js";

const SORT_TYPE = {
  MOST_LOVED: "most_loved",
  MOST_HATED: "most_hated",
  MOST_RECENT: "most_recent",
  OLDEST_USER: "oldest_user",
  CONTROVERSIAL: "controversial",
  TRENDING: "trending",
  NET_USEFUL: "net_useful",
};

export function sortComment(array, sortType) {
  switch (sortType) {
    case SORT_TYPE.MOST_LOVED:
      return MostLoved.sort(array);

    case SORT_TYPE.MOST_HATED:
      return MostHated.sort(array);

    case SORT_TYPE.MOST_RECENT:
      return MostRecent.sort(array);

    case SORT_TYPE.OLDEST_USER:
      return OldestUser.sort(array);

    case SORT_TYPE.NET_USEFUL:
      return NetUseful.sort(array);

    case SORT_TYPE.TRENDING:
    // TODO: implement trending sort logic
    
    case SORT_TYPE.CONTROVERSIAL:
    // TODO: implement controversial logic

    default:
      return array;
  }
}
