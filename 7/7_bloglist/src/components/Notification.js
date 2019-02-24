import { connect } from 'react-redux'
import React from 'react'

class Notification extends React.Component {

    render() {
        const notification = this.props.notification
        const setStyle = () => {
            const style = {
                margin: '10',
                marginLeft: '0',
                padding: '15',
                borderStyle: 'solid',
                borderWidth: '5',
                borderColor: 'black',
                fontSize: '25',
                backgroundColor: 'green'
            }
            const hidden = { display: 'none' }
            return notification === '' ? hidden : style
        }
        return (
            <div style={setStyle()}>
                {notification}
                <br></br>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { notification: state.notification }
}
export default connect(mapStateToProps)(Notification)