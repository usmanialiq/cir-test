import LiveComponent from "./views/Live";
import TrendsComponent from "./views/Trends";

function App() {
  return (
    <div className="container mt-3 mb-3">
      <h1 className="text-center">Patient Profile</h1>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" id="live-tab" data-bs-toggle="tab" href="#live" role="tab" aria-controls="live" aria-selected="true">Live</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="trends-tab" data-bs-toggle="tab" href="#trends" role="tab" aria-controls="trends" aria-selected="false">Trends</a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="live" role="tabpanel" aria-labelledby="live-tab">
          <LiveComponent />
        </div>
        <div className="tab-pane fade" id="trends" role="tabpanel" aria-labelledby="trends-tab">
          <TrendsComponent />
        </div>
      </div>
    </div>
  );
}

export default App;