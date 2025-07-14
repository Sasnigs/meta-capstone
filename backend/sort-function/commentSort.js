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
// Attach a controversial score to each comment by dividing number of upvotes to downvotes,
//  get the absolute value from subracting the result from 1 in order to get which comment score closer to one.
// the closer to 1 the more controversial the comment is.
class Controversial extends CommentSorter {
  sort(comments) {
    comments.forEach((comment) => {
      if (comment.upVotes === 0) {
        comment.controversial = -1;
      } else {
        comment.controversial = Math.abs(
          1 - comment.upVotes / (comment.downVotes || 1)
        );
      }
    });
    return comments.sort((a, b) => b.controversial - a.controversial);
  }
}

export {
  MostRecent,
  MostLoved,
  LeastHated,
  OldestUser,
  NetUseful,
  Controversial,
};
