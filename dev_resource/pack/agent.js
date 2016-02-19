import React, {Component} from "react";
import {render, findDOMNode} from "react-dom";
import {createStore} from "redux";
import {addZero, getTime} from "../../util";
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
			<div className="input">
				<label htmlFor="logId">LogId</label>
				<input id="logId" placeholder="6-digit LogId number" maxLength="6" onChange={this.handleChange} />
			</div>
		);
	}
}
class Filter extends Component{
	constructor(props){
		super(props);
		const userClass = props.userClass,
			name = props.name;
		this.handleChange = (e) => {
			let _state = {
				logId : 0
			};
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
			<div className="select">
				<label htmlFor={this.props.name}>
					{this.props.label}
				</label>
				<select id={this.props.name} defaultValue={option[Object.getOwnPropertyNames(option)[0]]} onChange={this.handleChange}>
					{options}
				</select>
			</div>
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
			let filter = this.props.filterType[index];
			lists.push(
				<Filter userClass={this} option={list} key={index} name={filter.name} label={filter.label} />
			);
		});
		lists.push(
			<IdInput userClass={this} />
		);
		return (
			<div className="filters">
				<h2>Filters</h2>
				{lists}
			</div>
		);
	}
}
Filters.defaultProps = {
	filterType : [
		{
			name : "clientId",
			label : "Client"
		},
		{
			name : "systemId",
			label : "System"
		},
		{
			name : "browserId",
			label : "Browser"
		}
	]
};
class Result extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let data = this.props.data,
			id = `#${addZero(this.props.index + 1, 3)}.(LogId:${data.id})`;
		return (
			<p>
				<b>
					{id}
				</b>
				<strong>
					{data.agent}
				</strong>
				<em>{`ip:${data.ip}\tvisit time:${getTime(data.createTime)}`}</em>
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
				lists[0] = (
					<h3>found {results.length} items</h3>
				);
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
				<h2>Result</h2>
				{lists}
			</div>
		);
	}
}
Results.defaultProps = {
	initMsg : "Select or input the LogId to search.",
	noDataMsg : "Sorry, no result to show."
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
				<h1>HTTP访问头日志分析系统</h1>
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