import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import './App.sass'

function App() {

  return (
	<BrowserRouter>
		<Routes>
			<Route index element={<Home/>} />
			{/* <Route path="dashboard" element={<Dashboard />} /> */}
			{/* <Route path="*" element={<NoMatch />} /> */}
		</Routes>
	</BrowserRouter>
  );
}

export default App
