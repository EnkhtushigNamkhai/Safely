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


			// 	<div className="saved ui equal width center aligned padded grid">					
					  
			// 		  <div className="row">
			// 		  	<div className="olive column">
			// 		      Select
			// 		    </div>
			// 		    <div className="olive column">
			// 		      Name
			// 		    </div>
			// 		    <div className="olive column">
			// 		      Phone Number
			// 		    </div>
			// 		  </div>


			// 		  <div className="row">
			// 		   <div className="black column">
			// 		      <input type="checkbox" className="checkbox"/>
			// 		    </div>
			// 		    <div className="black column">
			// 		      Olive
			// 		    </div>
			// 		    <div className="black column">
			// 		      Black
			// 		    </div>
			// 		  </div>
			// 		  <div className="row">
			// 			  <div className="black column">
			// 			    <input type="checkbox" className="checkbox"/>
			// 		    </div>
			// 		    <div className="black column">
			// 		      Olive
			// 		    </div>
			// 		    <div className="black column">
			// 		      Black
			// 		    </div>
			// 		  </div>
			// 		  <div className="row">
			// 		  	<div className="black column">
			// 		      <input type="checkbox" className="checkbox"/>
			// 		    </div>
			// 		    <div className="black column">
			// 		      Olive
			// 		    </div>
			// 		    <div className="black column">
			// 		      Black
			// 		    </div>
			// 		  </div>
			// 		  <div className="row">
			// 		  	<div className="black column">
			// 		      <input type="checkbox" className="checkbox"/>
			// 		    </div>
			// 		    <div className="black column">
			// 		      Olive
			// 		    </div>
			// 		    <div className="black column">
			// 		      Black
			// 		    </div>
			// 		  </div>
			// </div>