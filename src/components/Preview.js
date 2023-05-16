import { Component } from "react";

import { format, isThisMonth } from "date-fns";

const getValue = value => {
	const date = new Date(value);
	return !(date instanceof Date && !isNaN(date))
		? value
		: isThisMonth(date)
		? "Present"
		: format(date, "MMM. yyyy");
};

const Preview = ({ state }) => (
	<div className="preview">
		<Personal personal={state.personal} />
		<Employment employment={state.employment} />
		<Education education={state.education} />
		<Skills skills={state.skills} />
	</div>
);

const Personal = ({ personal }) => (
	<div className={personal.type}>
		<h1>
			{personal.data.firstName} {personal.data.lastName}
		</h1>
		<ul>
			<li>{personal.data.email} </li>
			<span>-</span>
			<li>{personal.data.phone}</li>
			<span>-</span>
			<li>
				{personal.data.city}, {personal.data.state}
			</li>
		</ul>
	</div>
);

const Employment = ({ employment }) => {
	const dataList =
		employment.dataList.length === 0
			? null
			: employment.dataList.map(item => {
					return (
						<div key={item.id}>
							<p>
								<span>{item.employer}</span>
								<span>
									{getValue(item.startDate)} -{" "}
									{getValue(item.endDate)}
								</span>
							</p>
							<p>
								<span>{item.jobTitle}</span>
								<span>
									{item.city}, {item.state}
								</span>
							</p>
							<ul>
								{item.describes.length === 0
									? null
									: createDescribe(item.describes)}
							</ul>
						</div>
					);
			  });

	return (
		<div className={employment.type}>
			<p>WORK EXPERIENCE</p>
			{dataList}
		</div>
	);
};

const Education = ({ education }) => {
	const dataList =
		education.dataList.length === 0
			? null
			: education.dataList.map(item => {
					return (
						<div key={item.id}>
							<p>
								<span>{item.school}</span>
								<span>
									Graduation {getValue(item.graduationDate)}
								</span>
							</p>
							<p>
								<span>{item.degreeMajors}</span>
								<span>
									{item.city}, {item.state}
								</span>
							</p>
							<ul>
								{item.describes.length === 0
									? null
									: createDescribe(item.describes)}
							</ul>
						</div>
					);
			  });
	return (
		<div className={education.type}>
			<p>EDUCATION</p>
			{dataList}
		</div>
	);
};

const Skills = ({ skills }) => (
	<div className={skills.type}>
		<p>SKILLS</p>
		<p>{skills.data.skill}</p>
	</div>
);

const createDescribe = list => {
	return list.map(describe => <li key={describe.id}>{describe.text}</li>);
};

export default Preview;
