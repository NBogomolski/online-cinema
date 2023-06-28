import React, { useState, useEffect } from 'react';
import YearPicker from './YearPicker';
function YearRangeSelector(props) {
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    
    return (
      <div className="px-9 flex justify-center items-center">
        Release date from
        <YearPicker
          placeholder="Min year"
          yearChange={setStartYear}
        ></YearPicker>
        to
        <YearPicker placeholder="Max year" yearChange={setEndYear}></YearPicker>
        <button
          className={`py-2 px-4 border-2 border-black ${
            startYear || endYear ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={() => {
            if (startYear && endYear) {
              //Probably best process that
            }
						if (startYear && startYear > 1900) {
							props.setStartYear(startYear);
							console.log(startYear);
						}
						// console.log(Number(new Date().getFullYear()));
            if (endYear && endYear < (new Date().getFullYear())) {
							props.setEndYear(endYear);
							console.log(endYear);
						}
          }}
        >
          Set
        </button>
      </div>
    );
}

export default YearRangeSelector;