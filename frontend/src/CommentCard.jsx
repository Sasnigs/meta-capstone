import "./commentcard.css";

export default function CommentCard() {
  return (
    <div>
      <div className="comment-cont">
        <div className="user-area">
          <div>
            <p>@Username</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
              veritatis error quisquam id facere, incidunt ex nostrum
              distinctio, velit doloremque provident debitis delectus nesciunt
              dolore. Officia accusantium assumenda nemo esse.
            </p>
          </div>
        </div>
        <div className="up-down-vote">
          <p>⬆0</p>
          <p>⬇20</p>
        </div>
      </div>
    </div>
  );
}
