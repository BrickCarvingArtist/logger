import React, {Component} from "react";
import {render, findDOMNode} from "react-dom";
import {createStore} from "redux";
const addZero = (num, length) => {
	let chars = num.toString().split(""),
		charsLen = chars.length;
	if(length - chars.length){
		for(let i = 0; i <= length - chars.length; i++){
			chars.unshift("0");
		}
	}
	return chars.join("");
};
let store = createStore((state = [], action) => {
	if(state[action.type]){
		for(let i in action){
			state[action.type][i] = action[i];
		}
	}else{
		state[action.type] = action;
	}
	return state;
});
class IdInput extends Component{
	constructor(props){
		super(props);
		const userClass = props.userClass;
		this.handleChange = (e) => {
			let value = e.target.value;
			if(value.length === 6){
				userClass.setState({
					logId : value
				});
			}
		};
	}
	render(){
		return (
			<input placeholder="logId" maxLength="6" onChange={this.handleChange} />
		);
	}
}
class Filter extends Component{
	constructor(props){
		super(props);
		const userClass = props.userClass,
			name = props.name;
		this.handleChange = (e) => {
			let _state = {};
			_state[name] = e.target.value;
			userClass.setState(_state);
		};
	}
	render(){
		let options = [],
			option = this.props.option;
		for(let i in option){
			options.push(
				<option value={option[i]} key={i}>
					{i}
				</option>
			);
		}
		return (
			<select onChange={this.handleChange}>
				{options}
			</select>
		);
	}
}
class Filters extends Component{
	constructor(props){
		super(props);
		this.state = {
			clientId : "0",
			systemId : "0",
			browserId : "0",
			logId : 0
		};
		this.search = (...args) => {
			$.ajax({
				url : `/api/log/visitorheader/search/${args.join("")}`,
				success(data){
					store.getState().result.component.setState({
						data : data
					});
				}
			});
		};
	}
	componentDidUpdate(){
		if(this.state.logId){
			this.search(this.state.logId);
		}else{
			this.search(addZero(this.state.clientId, 1), addZero(this.state.systemId, 2), addZero(this.state.browserId, 3));
		}
	}
	render(){
		let lists = [],
			filters = this.props.data;
		filters.map((list, index) => {
			lists.push(
				<Filter userClass={this} option={list} key={index} name={this.props.filterType[index]} />
			);
		});
		lists.push(
			<IdInput userClass={this} />
		);
		return (
			<div className="filters">
				<h1>Filters</h1>
				{lists}
			</div>
		);
	}
}
Filters.defaultProps = {
	filterType : ["clientId", "systemId", "browserId"]
};
class Result extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let data = this.props.data;
		return (
			<p>
				<strong>{`${this.props.index + 1}.${data.agent}`}</strong>
				<em>{Date(data.createTime)}</em>
			</p>
		)
	}
}
class Results extends Component{
	constructor(props){
		super(props);
		this.state = {
			data : props.initMsg
		};
	}
	render(){
		let lists = [],
			results = this.state.data;
		if(results.length){
			if(results instanceof Array){
				results.map((list, index) => {
					lists.push(
						<Result data={list} index={index} key={index} />
					);
				});
			}else{
				lists[0] = (
					<p>
						{results}
					</p>
				);
			}
		}else{
			lists[0] = (
				<p>
					{this.props.noDataMsg}
				</p>
			);
		}
		return (
			<div className="result">
				<h1>Result</h1>
				{lists}
			</div>
		);
	}
}
Results.defaultProps = {
	initMsg : "select or input to search",
	noDataMsg : "sorry, no result to show"
};
class Page extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		store.dispatch({
			type : "result",
			component : this.refs.result
		});
	}
	render(){
		return (
			<div className="page">
				<Filters data={this.props.filter} />
				<Results ref="result" />
			</div>
		);
	}
}
const init = (data) => {
	$.ajax({
		url : "/api/log/visitorheader/getfilter",
		success(data){
			render(
				<Page filter={data.filter} />,
				document.querySelector(".main")
			);
		}
	});
};
export {
	Page,
	init
}