import React from 'react'
import { connect } from 'react-redux'


class Notification extends React.Component {
  render() {
    const setStyle = () => {
      const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
      }
      const hidden = {
        display: 'none'
      }
      return this.props.notification === '' ? hidden : style
    }

    const notification = this.props.notification
    return (
      <div style={setStyle()}>
        {notification}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { notification: state.notification }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
