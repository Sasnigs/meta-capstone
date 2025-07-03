export function sortComment(array, sortType) {
  if (sortType === "most loved") {
    array.sort((x, y) => x.upVotes - y.upVotes);
  }
  if (sortType === "most hated") {
    array.sort((x, y) => x.downVotes - y.downVotes);
  }
  if (sortType === "most recent") {
    array.sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt));
  }
  if (sortType === "oldest users") {
    array.sort((x, y) => x.user.createdAt - y.user.createdAt);
  }
}
