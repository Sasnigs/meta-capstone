import { GiDiamondsSmile } from "react-icons/gi";
import { AiFillDislike } from "react-icons/ai";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import "./SortBar.css";

export default function SortBar({ setSortVal }) {
  const SORT_OBJ = {
    MOST_LOVED: "most_loved",
    LEAST_HATED: "least_hated",
    MOST_RECENT: "most_recent",
    OLDEST_USER: "oldest_user",
    CONTROVERSIAL: "controversial",
    TRENDING: "trending",
    NET_USEFUL: "net_useful",
  };

  const changeSort = (sortType) => {
    setSortVal(sortType);
  };

  return (
    <div className="sort-bar">
      <div
        className="sort-type"
        onClick={() => changeSort(SORT_OBJ.MOST_LOVED)}
      >
        <GiDiamondsSmile />
        <span>Most upvoted</span>
      </div>

      <div
        className="sort-type"
        onClick={() => changeSort(SORT_OBJ.LEAST_HATED)}
      >
        <AiFillDislike />
        <span>Least hated</span>
      </div>

      <div
        className="sort-type"
        onClick={() => changeSort(SORT_OBJ.MOST_RECENT)}
      >
        <MdOutlineAccessTimeFilled />
        <span>Most recent</span>
      </div>

      <div
        className="sort-type"
        onClick={() => changeSort(SORT_OBJ.OLDEST_USER)}
      >
        <FaHourglassHalf />
        <span>User tenure</span>
      </div>

      <div
        className="sort-type"
        onClick={() => changeSort(SORT_OBJ.NET_USEFUL)}
      >
        <BsFillBookmarkCheckFill />
        <span>Net useful</span>
      </div>
    </div>
  );
}
