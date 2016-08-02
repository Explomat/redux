import React from 'react';

export default React.createClass({
	render() {
		console.log('App');
		return React.cloneElement(this.props.children);
	}
});