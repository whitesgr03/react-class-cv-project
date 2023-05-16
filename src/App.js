import { Component } from "react";

import Preview from "./components/Preview";
import Resume from "./components/Resume";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			personal: {
				type: "personal",
				data: {
					firstName: "Your",
					lastName: "Name",
					email: "example@gmail.com",
					phone: "(555) 555-5555",
					city: "City",
					state: "ST",
				},
			},
			employment: {
				type: "employment",
				data: {
					id: null,
					jobTitle: "Job Title",
					employer: "Company Name",
					startDate: "Month Year",
					endDate: "Month Year",
					city: "City",
					state: "ST",
					describes: [{ id: 1, text: "Core responsibility" }],
				},
				dataDescribe: "Core responsibility",
				dataList: [
					{
						id: 1,
						jobTitle: "Job Title",
						employer: "Company Name",
						startDate: "Month Year",
						endDate: "Month Year",
						city: "City",
						state: "ST",
						describes: [{ id: 1, text: "Core responsibility" }],
					},
				],
			},
			education: {
				type: "education",
				data: {
					id: 1,
					school: "University Name",
					degreeMajors: "Degree, Majors",
					graduationDate: "Month, Year",
					city: "City",
					state: "ST",
					describes: [{ id: 1, text: "Honors or fun stuff" }],
				},
				dataDescribe: "Honors or fun stuff",
				dataList: [
					{
						id: 1,
						school: "University Name",
						degreeMajors: "Degree, Majors",
						graduationDate: "Month, Year",
						city: "City",
						state: "ST",
						describes: [{ id: 1, text: "Honors or fun stuff" }],
					},
				],
			},
			skills: {
				type: "skills",
				data: {
					skill: "Important skills or abilities required to fulfill the task role.",
				},
			},
		};
		this.handleDataChange = this.handleDataChange.bind(this);
		this.handleDataListChange = this.handleDataListChange.bind(this);
		this.handleDescribeChange = this.handleDescribeChange.bind(this);
		this.onAddNewForm = this.onAddNewForm.bind(this);
		this.onRemoveForm = this.onRemoveForm.bind(this);
		this.onAddNewDescribe = this.onAddNewDescribe.bind(this);
		this.onRemoveDescribe = this.onRemoveDescribe.bind(this);
	}

	handleDataChange = (type, name, value) => {
		this.setState({
			[type]: {
				...this.state[type],
				data: {
					...this.state[type].data,
					[name]: value,
				},
			},
		});
	};

	handleDataListChange = (type, id, name, value) => {
		this.setState({
			[type]: {
				...this.state[type],
				dataList: this.state[type].dataList.map(data =>
					data.id === id ? { ...data, [name]: value } : data
				),
			},
		});
	};

	handleDescribeChange = (type, dataId, describeId, value) => {
		this.setState({
			[type]: {
				...this.state[type],
				dataList: this.state[type].dataList.map(data =>
					data.id === dataId
						? {
								...data,
								describes: data.describes.map(describe =>
									describe.id === describeId
										? {
												...describe,
												text: value,
										  }
										: describe
								),
						  }
						: data
				),
			},
		});
	};

	onAddNewForm = type => {
		this.setState({
			[type]: {
				...this.state[type],
				dataList: [
					...this.state[type].dataList,
					{
						...this.state[type].data,
						id:
							this.state[type].dataList.length === 0
								? 1
								: this.state[type].dataList.at(-1).id + 1,
					},
				],
			},
		});
	};

	onRemoveForm = (type, id) => {
		this.setState({
			[type]: {
				...this.state[type],
				dataList: this.state[type].dataList.filter(
					data => data.id !== id
				),
			},
		});
	};

	onAddNewDescribe = (type, id) => {
		this.setState({
			[type]: {
				...this.state[type],
				dataList: this.state[type].dataList.map(data =>
					data.id === id
						? {
								...data,
								describes: [
									...data.describes,
									{
										id:
											data.describes.length === 0
												? 1
												: data.describes.at(-1).id + 1,
										text: this.state[type].dataDescribe,
									},
								],
						  }
						: data
				),
			},
		});
	};

	onRemoveDescribe = (type, dataId, describeId) => {
		this.setState({
			[type]: {
				...this.state[type],
				dataList: this.state[type].dataList.map(data =>
					data.id === dataId
						? {
								...data,
								describes: data.describes.filter(
									describe => describe.id !== describeId
								),
						  }
						: data
				),
			},
		});
	};

	render() {
		return (
			<div>
				<Resume
					state={this.state}
					handleDataChange={this.handleDataChange}
					handleDataListChange={this.handleDataListChange}
					handleDescribeChange={this.handleDescribeChange}
					onAddNewForm={this.onAddNewForm}
					onRemoveForm={this.onRemoveForm}
					onAddNewDescribe={this.onAddNewDescribe}
					onRemoveDescribe={this.onRemoveDescribe}
				/>
				<Preview state={this.state} />
			</div>
		);
	}
}
