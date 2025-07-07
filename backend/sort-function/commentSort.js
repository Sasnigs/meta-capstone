import { wilsonScore } from "./wilsonScore.js";

class CommentSorter {
  sort(comments) {
    throw new Error("Child classes must implement the sort() method");
  }
}

class MostLoved extends CommentSorter {
  sort(comments) {
    return comments.sort((a, b) => b.upVotes - a.upVotes);
  }
}
class LeastHated extends CommentSorter {
  sort(comments) {
    return comments.sort((a, b) => a.downVotes - b.downVotes);
  }
}

class MostRecent extends CommentSorter {
  sort(comments) {
    return comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
}

class OldestUser extends CommentSorter {
  sort(comments) {
    return comments.sort(
      (a, b) => new Date(b.user.createdAt) - new Date(a.user.createdAt)
    );
  }
}
class NetUseful extends CommentSorter {
  sort(comments) {
    return comments.sort(
      (a, b) =>
        wilsonScore(b.upVotes, b.downVotes) -
        wilsonScore(a.upVotes, a.downVotes)
    );
  }
}

export { MostRecent, MostLoved, LeastHated, OldestUser, NetUseful };
