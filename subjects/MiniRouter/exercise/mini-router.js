////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import PropTypes from 'prop-types'
import { createHashHistory } from 'history'

/*
// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

class Router extends React.Component {
  history = createHashHistory()

  state = {
    location: this.history.location
  }

  static childContextTypes = {
    router: PropTypes.shape({
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    })
  }

  getChildContext() {
    return {
      router: {
        location: this.state.location,
        history: this.history
      }
    }
  }

  componentDidMount() {
    this.history.listen(() => {
      this.setState({ location: this.history.location })
    })
  }

  render() {
    return this.props.children
  }
}



class Route extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    })
  }

  render() {
    const { path, render, component:Component } = this.props
    return this.context.router.location.pathname.startsWith(path) ? (
      Component ? <Component /> : render()
      ) : null
  }
}




class Link extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    this.context.router.history.push(this.props.to)
  }

  render() {
    return (
      <a
        href={`#${this.props.to}`}
        onClick={this.handleClick}
      >
        {this.props.children}
      </a>
    )
  }
}

class Redirect extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    })
  }

  componentDidMount() {
    this.context.router.history.replace(this.props.to)
  }

  render()  {
    return null
  }
}


export { Router, Route, Link, Redirect }
