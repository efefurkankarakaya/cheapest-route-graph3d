import './App.css';
import { D3Graph } from './components/';
import flightsData from './data/flights.json';

function App() {
  return <D3Graph flightsData={flightsData} />;
}

export default App;
