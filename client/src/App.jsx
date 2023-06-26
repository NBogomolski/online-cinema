import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import './App.sass'
import Watchlist from './components/Watchlist';
import NoMatch from './components/NoMatch';
import Title from './components/Title';
import Movies from './components/Movies';

function App() {

  return (
	<BrowserRouter>
		<Routes>
			<Route index element={<Home/>} />
			<Route path="watchlist" element={<Watchlist />} />
			<Route path='movies' element={<Movies/>}>
				<Route path=':id' element={<Title/>}>
					
				</Route>
			</Route>
			<Route path='series'>
				<Route path=':id'element={<Title/>}/>
			</Route>
			<Route path="*" element={<NoMatch />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App
