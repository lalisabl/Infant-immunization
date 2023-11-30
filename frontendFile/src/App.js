import "./App.css";
import Common from "./component/home/Homepage";
import Admin from "./component/admin/AdminDashboard";
import HealthCareProvider from "./component/healthcareProvider/healthcareProviderDashboard";
function App() {
  return (
    <div className="App">
      <Common />
      {/* <Admin /> */}
      {/* <HealthCareProvider /> */}
    </div>
  );
}

export default App;
