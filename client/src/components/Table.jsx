import React from 'react';
import RowContents from './RowContents.jsx';

var Table = (props) => {
	return (
		<div className="saved ui equal width center aligned padded grid">
			  <div className="row">
			  	<div className="olive column">
			      Select
			    </div>
			    <div className="olive column">
			      Name
			    </div>
			    <div className="olive column">
			      Phone Number
			    </div>
			  </div>
			{
		    props.saved.map((row) => 
		      <RowContents row={row} checkBoxClicked={props.checkBoxClicked}/>
		    )
		  }

		</div>
	)
}

export default Table;