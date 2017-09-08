////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import * as RainbowListDelegate from './utils/RainbowListDelegate'
import './styles'

class RainbowList extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  }

  state = {
    scrollTop: 0,
    availableHeight: window.innerHeight,
  }

  trackScroll = ev => {
    const scrollTop = ev.target.scrollTop
    this.setState({ scrollTop, availableHeight: ev.target.offsetHeight })
  }

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const totalHeight = numRows * rowHeight
    const { scrollTop, availableHeight } = this.state
    const startIndex = Math.floor(scrollTop / rowHeight)
    const endIndex = startIndex + Math.ceil(availableHeight / rowHeight)
    const items = []
    let index = startIndex
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }
    return (
      <div style={{ height: '100%', overflowY: 'scroll' }}
        onScroll={this.trackScroll}
      >
        <ol style={{ height: totalHeight, paddingTop: rowHeight * startIndex }}>
          {items}
        </ol>
      </div>
    )
  }
}

ReactDOM.render(
  <RainbowList
    numRows={50000}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
