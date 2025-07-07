import { wilsonScore } from "./wilsonScore.js";

class CommentSorter {
  static sort(comments) {
    throw new Error("Child classes must implement the sort() method");
  }
}

class MostLoved extends CommentSorter {
  static sort(comments) {
    return comments.sort((a, b) => b.upVotes - a.upVotes);
  }
}
class MostHated extends CommentSorter {
  static sort(comments) {
    return comments.sort((a, b) => b.downVotes - a.downVotes);
  }
}

class MostRecent extends CommentSorter {
  static sort(comments) {
    return comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
}

class OldestUser extends CommentSorter {
  static sort(comments) {
    return comments.sort(
      (a, b) => new Date(b.user.createdAt) - new Date(a.user.createdAt)
    );
  }
}
class NetUseful extends CommentSorter {
  static sort(comments) {
    return comments.sort(
      (a, b) =>
        wilsonScore(b.upVotes, b.downVotes) -
        wilsonScore(a.upVotes, a.downVotes)
    );
  }
}

export { MostRecent, MostLoved, MostHated, OldestUser, NetUseful };
