import {useNavigate} from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-row justify-around w-full h-16 bg-black">
            <button className="hover:underline text-xl bg-black text-white flex-grow max-w-xs"
                onClick={() => navigate('/')}
            >
                Home
            </button>
            <button className="hover:underline text-xl bg-black text-white flex-grow max-w-xs"
                onClick={() => navigate('/movies')}
            >
                Movies
            </button>
            <button className="hover:underline text-xl bg-black text-white flex-grow max-w-xs"
                onClick={() => navigate('/series')}
            >
                Series
            </button>
            <button className="hover:underline text-xl bg-black text-white flex-grow max-w-xs"
                onClick={() => navigate('/watchlist')}
            >
                Watchlist
            </button>
        </div>
    );
}

export default Navbar;