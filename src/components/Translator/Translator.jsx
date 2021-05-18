import React, { Component } from 'react';
import axios from 'axios';

class Translator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedText: null
    };
  }

  componentDidMount() {
    // const { children: text } = this.props;
    // const authKey = process.env.DEEPL_API_KEY;
    // const targetLanguage = 'ES';
    // axios.get(`https://api-free.deepl.com/v2/translate?auth_key=${authKey}&text=${text}&target_lang=${targetLanguage}`)
    //   .then(res => {
    //     if (res.status === 200 && res.data) {
    //       const [translation] = res.data.translations;
    //       const { text: translatedText } = translation;
    //       this.setState({ translatedText });
    //     }
    //   });
  }

  render() {
    const { children } = this.props;
    const { translatedText } = this.state;

    return (
      <>
        {!!translatedText ? translatedText : children}
      </>
    );
  }
}


export default Translator;
