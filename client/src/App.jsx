import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import './App.sass'
import Watchlist from './components/Watchlist';
import NoMatch from './components/NoMatch';
import Title from './components/Title';
import Movies from './components/Movies';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movies" element={<Movies />}/>
		<Route path="/movies/:id" element={<Title />} />
        {/* <Route path="/series" element={<Series />}> */}
          {/* <Route path=":id" element={<Title />} /> */}
        {/* </Route> */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App
