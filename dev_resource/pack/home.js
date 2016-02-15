import React, {Component} from "react";
import ReactDOM from "react-dom";
class Page extends Component{
	render(){
		return (
			<div className="page"></div>
		);
	}
}
const init = (data) => {
	ReactDOM.render(
		<Page />,
		document.querySelector(".main")
	);
};
export {
	Page,
	init
}