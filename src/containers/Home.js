import React, { Component } from 'react';
import { Input, Row, Col } from 'reactstrap';

// Components
import PageWrapper from '../components/PageWrapper';

class Home extends Component {
  constructor(props) {
    super(props);

    this.emojis = [
      String.fromCodePoint(0x1F609), String.fromCodePoint(0x1F60E), String.fromCodePoint(0x1F911)
    ];

    this.state = {
      toEncrypt: '',
      encrypted: '',
    };
  }

  componentDidMount() {
    document.title = 'joecryptor';
  }

  /**
   * Handles the event change. Calls the encrypter function.
   * @param event
   */
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });

    //this.joecrypt(value);
  };

  /**
   * Handles the key press event. Calls the encrypter function.
   * @param event
   */
  handleKeyPress = event => {
    const { value } = event.target;

    if (event.key === 'Enter') {
      this.joecrypt(value);
    } 
  };

  /**
   * Returns an integer between the min value (inclusive) and the max value (exclusive)
   * @param min 
   * @param max 
   */
  getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Encrypts the string.
   */
  joecrypt = (string) => {
    if (string.length === 0) {
      this.setState({ encrypted: '' });
      return;
    }
    const emoji = this.emojis[this.getRandomNumber(0, 3)];
    const multiplier = this.getRandomNumber(1, 4);
    const encrypted = string + ' ' + emoji.repeat(multiplier);

    this.setState({ encrypted });
  };

  render() {
    return (
      <PageWrapper>
        <Input
          value={this.state.toEncrypt}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          type="text"
          name="toEncrypt"
          id="toEncrypt"
          placeholder="Please insert text to encrypt"
        />
        <Row className="text-left mt-3">
          <Col>Encrypted joeish: {this.state.encrypted}</Col>
        </Row>
      </PageWrapper>
    );
  }
}

export default Home;
