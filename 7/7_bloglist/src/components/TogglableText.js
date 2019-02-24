import React from 'react'
import PropTypes from 'prop-types'

class TogglableText extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
        TogglableText.propTypes = {
            author: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const showWhenVisible = {
            display: this.state.visible ? 'inline-block' : 'none'
        }

        return (
            <div>
                <div className="nameDiv" onClick={this.toggleVisibility}>
                    <div >{this.props.author} {this.props.title}</div>
                </div>
                <div className="detailsDiv" style={showWhenVisible} >
                    <div >{this.props.children}</div>
                </div>
            </div>
        )
    }
}
export default TogglableText