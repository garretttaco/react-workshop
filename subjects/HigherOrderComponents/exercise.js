////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMouse` a "higher-order component" that sends the mouse position
// to the component as props.
//
// Hint: use `event.clientX` and `event.clientY`
//
// Got extra time?
//
// Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import * as styles from './styles'

const withMouse = Component => class DecoratedClass extends React.Component {
  state = {
    mouse: { x: 0, y: 0 },
    cat: { x: 0, y: 0 }
  }

  handleMouseMove = ev => {
    this.setState({
      mouse: {
        x: ev.clientX,
        y: ev.clientY
      },
      cat: {
        ...this.state.mouse
      }
    })
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <div style={{ ...styles.cat, left: this.state.cat.x, top: this.state.cat.y }}/>
        <Component {...this.props} mouse={this.state.mouse}/>
      </div>
    )
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  }

  render() {
    const { mouse } = this.props

    return (
      <div style={styles.container}>
        {mouse ? (
          <h1>The mouse position is ({mouse.x}, {mouse.y})</h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    )
  }
}

const AppWithMouse = withMouse(App)

ReactDOM.render(<AppWithMouse/>, document.getElementById('app'))
