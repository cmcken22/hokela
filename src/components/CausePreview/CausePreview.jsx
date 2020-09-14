import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { DatePicker, Input, Select } from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;
// import { Editor, EditorState, RichUtils } from 'draft-js';
// import 'draft-js/dist/Draft.css';

import * as causeActions from '../../actions/causeActions';
import * as bannerActions from '../../actions/bannerActions';
import Editor from '../Editor';

class CausePreview extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      location: 'London',
      eventType: 'single',
      aboutPosition: ''
    };
    this.state = {
      ...this.defaultState
    };
  }

  renderSidebar = () => {
    const { cause } = this.props;
    return (
      <div className="cause-preview__sidebar">
        <div className="cause-preview__sidebar__section">
          <h1>Overview</h1>
          <div className="cause-preview__sidebar__content">
            <p>{cause && cause.get('location')}</p>
            <p></p>
            <p>{cause && cause.get('event_type')}</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { cause } = this.props;

    return(
      <div className="cause-preview">

        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="cause-preview__main-content">

                {cause && cause.get('position_info') && (
                  <div className="cause-preview__section">
                    <h1>About the Position</h1>
                    <Editor
                      value={cause.get('position_info')}
                      readOnly
                    />
                  </div>
                )}

                {cause && cause.get('requirements') && (
                  <div className="cause-preview__section">
                    <h1>Requirements</h1>
                    <Editor
                      value={cause.get('requirements')}
                      readOnly
                    />
                  </div>
                )}

                {cause && cause.get('organization_info') && (
                  <div className="cause-preview__section">
                    <h1>About the Organization</h1>
                    <Editor
                      value={cause.get('organization_info')}
                      readOnly
                    />
                  </div>
                )}

                {cause && cause.get('impact') && (
                  <div className="cause-preview__section">
                    <h1>Impact</h1>
                    <Editor
                      value={cause.get('impact')}
                      readOnly
                    />
                  </div>
                )}

              </div>
            </div>
            <div className="col-sm-3">
              {this.renderSidebar()}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

CausePreview.constants = {
  en: {
    labels: {

    }
  }
};

export default connect(
  (state, props) => ({
    cause: state.getIn(['causes', props.id])
  }),
  dispatch => ({
    bannerActions: bindActionCreators(bannerActions, dispatch),
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(CausePreview));
