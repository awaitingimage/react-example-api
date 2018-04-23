import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

class APIModal extends Component {
  constructor (props, context) {
    super(props, context)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      show: this.props.show,
      message: this.props.message
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ show: nextProps.show })
  }

  handleClose () {
    this.setState({ show: false })
  }

  handleShow () {
    this.setState({ show: true })
  }

  render () {
    return (
      <div className='static-modal'>
        <Modal show={this.state.show} animation={false}>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>{this.props.message}</Modal.Body>

          <Modal.Footer>
            <Button bsStyle='primary' onClick={this.props.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default APIModal
