import React, { useState } from "react";

const YearPicker = (props) => {
  const [selectedYear, setSelectedYear] = useState('');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    props.yearChange(Number(event.target.value))
  };

  return (
    <input
    className="p-2 border-1 border-black"
      placeholder={props.placeholder || ''}
      type="number"
      min="1900"
      max={new Date().getFullYear()}
      value={selectedYear}
      onChange={handleYearChange}
    />
  );
};

export default YearPicker;
