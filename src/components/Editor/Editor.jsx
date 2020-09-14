import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { DatePicker, Input, Select } from "antd";
import { Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import * as causeActions from '../../actions/causeActions';
import * as bannerActions from '../../actions/bannerActions';
import isEqual from 'lodash.isequal';

class CustomEditor extends Component {
  constructor(props) {
    super(props);
    const { value, readOnly } = props;
    let initialEditorState = null;
    if (value && readOnly) {
      console.clear();
      console.log('value:', value);
      const data = convertFromRaw(JSON.parse(value));
      console.log('data:', data);
      initialEditorState = EditorState.createWithContent(data);
    } else {
      initialEditorState = EditorState.createEmpty();
    }

    this.state = {
      editorState: initialEditorState
    };
  }

  componentDidUpdate(prevProps) {
    const { value: prevValue } = prevProps;
    const { value, readOnly } = this.props;
    if (readOnly) {
      if (!isEqual(value, prevValue)) {
        const data = convertFromRaw(JSON.parse(value));
        const nextState = EditorState.createWithContent(data);
        this.setState({ editorState: nextState });
      }
    }
  }

  handleChange = (editorState) => {
    const { onChange, readOnly } = this.props;
    let raw = convertToRaw(editorState.getCurrentContent());
    console.clear();
    console.log('RAW:', raw);
    if (!readOnly) {
      this.setState({ editorState }, () => {
        if (onChange) onChange(JSON.stringify(raw));
      });
    }
  }

  onBoldClick = () => {
    const { editorState } = this.state;
    this.handleChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  onItalicClick = () => {
    const { editorState } = this.state;
    this.handleChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }

  onUnderlineClick = () => {
    const { editorState } = this.state;
    this.handleChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }

  render() {
    const { readOnly } = this.props;
    const { editorState } = this.state;
    return(
      <div className={cx("editor", {
        "editor--read-only": readOnly
      })}>
        <div className="editor__header">
          <button
            className="editor__action editor__action--bold"
            onClick={this.onBoldClick}
          >
            B
          </button>
          <button
            className="editor__action editor__action--italic"
            onClick={this.onItalicClick}
          >
            I
          </button>
          <button
            className="editor__action editor__action--underline"
            onClick={this.onUnderlineClick}
          >
            U
          </button>
        </div>
        <Editor editorState={editorState} onChange={this.handleChange} />
      </div>
    );
  }
}

CustomEditor.constants = {
  en: {
    labels: {

    }
  }
};

export default connect(
  state => ({
    active: state.getIn(['banner', 'active']),
    message: state.getIn(['banner', 'message']),
    status: state.getIn(['banner', 'status']),
    actions: state.getIn(['banner', 'actions'])
  }),
  dispatch => ({
    bannerActions: bindActionCreators(bannerActions, dispatch),
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(CustomEditor));
