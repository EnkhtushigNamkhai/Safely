import React from 'react';
// an object that represents a row will be passed in
var RowContents = (props) => {
	return (
		<div className="row">
	   <div className="black column">
	      <input type="checkbox" name='checkboxes' value={props.row.phoneNumber} className="checkbox" onChange={props.checkBoxClicked}/>
	    </div>
	    <div className="black column">
	      {props.row.name}
	    </div>
	    <div className="black column">
	      {props.row.phoneNumber}
	    </div>
	  </div>
	)
}

export default RowContents;