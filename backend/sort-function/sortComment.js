const sortBy = {
    most_loved: "Most Loved",
    most_hated: "Most Hated",
    most_recent: "Most Recent",
    oldest_user: "Oldest User",
    controversial: "Controversial",
    trending: "Trending",
    net_usefule: "Net Useful"
}

export function sortComment(array, sortType) {
  if (sortType === sortBy.most_loved ) {
    array.sort((x, y) => x.upVotes - y.upVotes);
  }
  else if (sortType === sortBy.most_hated) {
    array.sort((x, y) => x.downVotes - y.downVotes);
  }
  else if (sortType === sortBy.most_recent) {
    array.sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt));
  }
  else if (sortType === sortBy.oldest_user) {
    array.sort((x, y) => x.user.createdAt - y.user.createdAt);
  }
  else if (sortType === sortBy.controversial){
    array.map((comment) => {
        let controversial_score = abs(1 - (comment.upVotes / comment.downVotes))
        comment.controversial = controversial_score
    })
    array.sort((x,y) => x.controversial - y.controversial)
  }
}
// jin: use elif/enum for conditional statements
// todo: check for api that shows trailer