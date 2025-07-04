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
      return array.sort((x, y) => y.upVotes - x.upVotes);

    case SORT_TYPE.MOST_HATED:
      return array.sort((x, y) => y.downVotes - x.downVotes);

    case SORT_TYPE.MOST_RECENT:
      return array.sort(
        (x, y) => new Date(y.createdAt) - new Date(x.createdAt)
      );

    case SORT_TYPE.OLDEST_USER:
      return array.sort(
        (x, y) => new Date(x.user.createdAt) - new Date(y.user.createdAt)
      );

    case SORT_TYPE.TRENDING:
      // TODO: implement trending sort logic
      return array;

    case SORT_TYPE.NET_USEFUL:
      // TODO: implement net useful sort logic
      return array;

    default:
      return array;
  }
}
