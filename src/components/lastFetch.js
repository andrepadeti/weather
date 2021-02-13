import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import Context from '../context/context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

class LastFetch extends React.Component {
  static contextType = Context

  constructor(props) {
    super(props)
    this.state = { message: '', isStaleData: false }
    this.getMessage = this.getMessage.bind(this)
    this.handleOnClickRefresh = this.handleOnClickRefresh.bind(this)
  }

  handleOnClickRefresh() {
    const { searchData, setSearchData } = this.context
    setSearchData({ time: Date.now(), ...searchData })
  }

  getMessage() {
    const isStaleData = Date.now() - this.props.lastFetch >= 5 * 60 * 1000
    const message = formatDistanceToNow(this.props.lastFetch, {
      addSuffix: true,
    })
    this.setState({ message, isStaleData })
  }

  componentDidMount() {
    this.getMessage()
    this.interval = setInterval(() => this.getMessage(), 60 * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className='text-center fs-7'>
        {this.state.message}
        {this.state.isStaleData && (
          <FontAwesomeIcon
            icon={faSync}
            className='ms-3'
            onClick={this.handleOnClickRefresh}
          />
        )}
      </div>
    )
  }
}

export default LastFetch
