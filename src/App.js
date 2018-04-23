import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import API from './Services/Api'
import FJSON from 'format-json'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import APIModal from './APIModal'
import {create} from 'apisauce'

const endpointsExample = [
  { label: 'Submit Event', endpoint: 'putVacations' }
]

class App extends Component {
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      message: '',
      show: false,
      apiValue: 'https://virtserver.swaggerhub.com/awaitingimage1/vacation-booking_process/0.0.1/vacations'
    }

    this.handleAPIChange = this.handleAPIChange.bind(this)
    this.api = API.create(this.state.apiValue)
  }

  handleAPIChange (e) {
    this.setState({ apiValue: e.target.value })
    this.api = API.create(this.state.apiValue)
  }

  getValidationState () {
    const length = this.state.apiValue.length
    if (length > 10) return 'success'
    else if (length > 5) return 'warning'
    else if (length > 0) return 'error'
    return null
  }

  showResult (response, title = 'Response') {
    if (response.ok) {
      console.log(response)
      this.setState({message: FJSON.plain(response), title: title, show: true})
    } else {
      this.setState({message: `${response.problem} - ${response.status}`, title: title, show: true})
    }
  }

  tryEndpoint (apiEndpoint) {
    const api = create({
      baseURL: this.state.apiValue,
      headers: {'Cache-Control': 'no-cache'}
    })
    api.setHeader('Authorization', '123')
    api.put().then((result) => {
      this.showResult(result)
    })

    // https://api.github.com/repos/skellock/apisauce/commits

    // const { label, endpoint, args = [''] } = apiEndpoint
    // this.api[endpoint].apply(this, args).then((result) => {
    //   this.showResult(result, label || `${endpoint}(${args.join(', ')})`)
    // })
  }

  renderButton (apiEndpoint) {
    const { label, endpoint, args = [''] } = apiEndpoint
    return (
      <Button bsStyle='primary' onClick={this.tryEndpoint.bind(this, apiEndpoint)} styles={{marginTop: 10}} key={`${endpoint}-${args.join('-')}`} > {label || `${endpoint}(${args.join(', ')})`}</Button>
    )
  }

  renderButtons () {
    return endpointsExample.map((endpoint) => this.renderButton(endpoint))
  }

  onClose = () => {
    this.setState({ show: false })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Platform Team example event creation</h1>
        </header>
        <p className='App-intro'>
          An exampe reactive app creating a new event
        </p>
        <form>
          <FormGroup
            controlId='formBasicText'
            validationState={'this.getValidationState()'}
          >
            <ControlLabel>Enter API URL to hit:</ControlLabel>
            <FormControl
              type='text'
              value={this.state.apiValue}
              placeholder='Enter text'
              onChange={this.handleAPIChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        {this.renderButtons()}
        <APIModal message={this.state.message} show={this.state.show} close={this.onClose} />
      </div>
    )
  }
}

export default App
