import React, { Component } from 'react';

// Great work adding tabIndex = 0 to the items in the side menu but you need to add onKeyPress event listener to be able to use the keyboard and choose an item in the list

export default class ListItem extends Component {
	render() {
		return(
			<li role="listitem" className="listItem" onClick={() => this.props.handleListItemClick(this.props)}>
			<img src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix} alt={this.props.categories[0].name} />
				{this.props.name}
				{/* {this.props.location['address']}} */}
				{/* {this.props.category} */}

			</li>
		)
	}
}