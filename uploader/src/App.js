import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fileSelected: null, uploadmessage: '' };
    this.uploadFile = this.uploadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  uploadFile(event) {
    this.setState({ fileSelected: event.target.files[0] });
  }


  handleChange() {
    const data = new FormData();

    if (!this.state.fileSelected) {
      this.setState({ uploadmessage: "Please upload file" });
      return null;
    }
    data.append('file', this.state.fileSelected);

    //call api to send file
    axios.post('http://localhost:9000/upload', data).then(res => {
      if (res.status === 200)
        this.setState({ uploadmessage: "File uploaded", fileSelected: null });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.uploadFile}></input>
        <button type="button" onClick={this.handleChange}>Upload</button>
        <br /><span>{this.state.uploadmessage}</span>
      </div>
    );
  }
}

export default App;
