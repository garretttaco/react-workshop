/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls <Form onSubmit>
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onSubmit> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class ResetButton extends React.Component {
  render() {
    return null
  }
}

class Form extends React.Component {
  static childContextTypes = {
    form: PropTypes.shape({
      submit: PropTypes.func.isRequired,
      values: PropTypes.object.isRequired
    }).isRequired
  }

  state = {
    values: {}
  }

  defaultValues = {}

  getChildContext() {
    return {
      form: {
        reset: () => {
          this.setState({ values: {} })
        },
        change: (name, value) => {
          console.log('--------------name', name)
          console.log('--------------value', value)
          this.setState({
            values: {
              ...this.state.values,
              [name]: value
            }
          })
        },
        setDefaultValue: (name, value) => {
          this.defaultValues[name] = value
        },
        submit: () => {
          if (this.props.onSubmit) {
            this.props.onSubmit(this.state.values)
          }
        },
        values: this.state.values
      }
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

class SubmitButton extends React.Component {
  static contextTypes = {
    form: PropTypes.shape({
      submit: PropTypes.func.isRequired,
    }).isRequired
  }

  render() {
    return <button onClick={this.context.form.submit}>{this.props.children}</button>
  }
}

class TextInput extends React.Component {
  static contextTypes = {
    form: PropTypes.shape({
      change: PropTypes.func.isRequired,
      submit: PropTypes.func.isRequired,
      values: PropTypes.object.isRequired
    }).isRequired
  }

  static defaultProps = {
    defaultValue: ''
  }

  componentWillMount() {
    this.context.form.change(this.props.name, this.props.defaultValue)
    this.context.form.setDefaultValue(this.props.name, this.props.defaultValue)
  }

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        value={this.context.form.values[this.props.name] || this.props.defaultValue}
        placeholder={this.props.placeholder}
        onChange={ev => {
          this.context.form.change(ev.target.name, ev.target.value)
        }}
        onKeyPress={e => e.key === 'Enter' && this.context.form.submit(e.target.value)}
      />
    )
  }
}

class App extends React.Component {

  handleSubmit = (values) => {
    // alert('YOU WON!')
    console.log('--------------values', values)
  }

  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name" defaultValue="Garrett"/> {' '}
            <TextInput name="lastName" placeholder="Last Name" defaultValue="Tacoronte"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </p>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
