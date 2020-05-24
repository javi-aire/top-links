import React, { useEffect, useState } from 'react';

const HomeTimelineContainer = ({ user }) => {
	return (
		<div>{Object.values(user).map(item => (
			<h1>{item}</h1>
			))}</div>
	);
}

export default HomeTimelineContainer;