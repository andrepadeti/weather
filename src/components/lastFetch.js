import React from 'react'
import { formatDistanceToNow } from 'date-fns'

class LastFetch extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
    this.getMessage = this.getMessage.bind(this)
  }

  componentDidMount() {
    this.getMessage()
    this.interval = setInterval(() => this.getMessage(), 60 * 1000)
  } 

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getMessage() {
    const message = formatDistanceToNow(this.props.lastFetch, {addSuffix: true})
    this.setState({ message: message })
  }

  render() {
    return <div className='text-center fs-7'>{this.state.message}</div>
  }
}

export default LastFetch
