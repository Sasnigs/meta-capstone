const sortBy = {
    most_loved: "Most Loved",
    most_hated: "Most Hated",
    most_recent: "Most Recent",
    oldest_user: "Oldest User",
    controversial: "Controversial",
    trending: "Trending",
    net_useful: "Net Useful"
}

export function sortComment(array, sortType) {
  if (sortType === sortBy.most_loved ) {
    return array.sort((x, y) => y.upVotes - x.upVotes);
  }
  else if (sortType === sortBy.most_hated) {
   return  array.sort((x, y) => y.downVotes - x.downVotes);
  }
  else if (sortType === sortBy.most_recent) {
   return  array.sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt));
  }
  else if (sortType === sortBy.oldest_user) {
   return  array.sort((x, y) => y.user.createdAt - x.user.createdAt);
  }
  else if (sortType === sortBy.controversial){
    array.map((comment) => {
        let controversial_score = abs(1 - (comment.upVotes / comment.downVotes))
        comment.controversial = controversial_score
    })
   return  array.sort((x,y) => y.controversial - x.controversial)
  }
  // TODO: sort for trending and net-useful
}
// jin: use elif/enum for conditional statements
// todo: check for api that shows trailer