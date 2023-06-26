import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import './App.sass'
import Watchlist from './components/Watchlist';

function App() {

  return (
	<BrowserRouter>
		<Routes>
			<Route index element={<Home/>} />
			<Route path="watchlist" element={<Watchlist />} />
			{/* <Route path="*" element={<NoMatch />} /> */}
		</Routes>
	</BrowserRouter>
  );
}

export default App
