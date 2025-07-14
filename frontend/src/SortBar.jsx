import { GiDiamondsSmile } from "react-icons/gi";
import { AiFillDislike } from "react-icons/ai";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { GiCrossedSwords } from "react-icons/gi";
import "./SortBar.css";

export default function SortBar({ setSortVal }) {
  const SORT_TYPE = {
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
        onClick={() => changeSort(SORT_TYPE.MOST_LOVED)}
      >
        <GiDiamondsSmile />
        <span>Most loved</span>
      </div>

      <div
        className="sort-type"
        onClick={() => changeSort(SORT_TYPE.LEAST_HATED)}
      >
        <AiFillDislike />
        <span>Least hated</span>
      </div>

      <div
        className="sort-type"
        onClick={() => changeSort(SORT_TYPE.MOST_RECENT)}
      >
        <MdOutlineAccessTimeFilled />
        <span>Most recent</span>
      </div>

      <div
        className="sort-type"
        onClick={() => changeSort(SORT_TYPE.OLDEST_USER)}
      >
        <FaHourglassHalf />
        <span>User tenure</span>
      </div>

      <div
        className="sort-type"
        onClick={() => changeSort(SORT_TYPE.NET_USEFUL)}
      >
        <BsFillBookmarkCheckFill />
        <span>Net useful</span>
      </div>

      <div
        className="sort-type"
        onClick={() => changeSort(SORT_TYPE.CONTROVERSIAL)}
      >
        <GiCrossedSwords />
        <span>Controversial</span>
      </div>
    </div>
  );
}
