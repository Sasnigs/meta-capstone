import { GiDiamondsSmile } from "react-icons/gi";
import { AiFillDislike } from "react-icons/ai";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import './SortBar.css'
export default function SortBar() {
  return (
    <div className="sort-bar">
      <div className="sort-type">
        <GiDiamondsSmile />
        <span>Most upvoted</span>
      </div>

      <div className="sort-type">
        <AiFillDislike />
        <span>Least hated</span>
      </div>

      <div className="sort-type">
        <MdOutlineAccessTimeFilled />
        <span>Most recent</span>
      </div>
      <div className="sort-type">
        <FaHourglassHalf />
        <span>User tenure</span>
      </div>
      <div className="sort-type">
        <BsFillBookmarkCheckFill />
        <span>Net useful</span>
      </div>
    </div>
  );
}
