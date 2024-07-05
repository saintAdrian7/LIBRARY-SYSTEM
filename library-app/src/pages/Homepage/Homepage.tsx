import { BookOfTheWeek, UpComingEvents } from "../../Features/Landing";

export default function Homepage(): JSX.Element {
  return (
    <div className="page">
      <div className="home-page-container">
        <div className="home-page-left">
          <BookOfTheWeek />
          <UpComingEvents />

        </div>
        <div className="home-page-right">
          
          </div>

      </div>
    </div>
  );
}