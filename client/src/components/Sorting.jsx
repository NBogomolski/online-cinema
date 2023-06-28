import React, { useState } from "react";

function Sorting({setSortOrder}) {
	const selectOption = (e) => {
		console.log(e.target.value)
		if (e.target.value === "null") setSortOrder(null)
		else setSortOrder(e.target.value)
	}

  return (
    <div className="text-center p-2">
			Sort by
      <select name="sorting" id="sorting" onChange={selectOption} className="p-2 ml-2 border-2 border-black">
				<option value="null">None</option>
        <option value="year.decr">
          Year descending
        </option>
        <option value="year.incr">Year ascending</option>
      </select>
    </div>
  );
}

export default Sorting;
