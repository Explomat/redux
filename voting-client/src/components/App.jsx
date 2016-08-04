import React from 'react';

export default React.createClass({
	render() {
		return React.cloneElement(this.props.children);
	}
});