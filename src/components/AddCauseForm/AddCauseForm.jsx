import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { DatePicker, Input, Select, Button } from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;
// import { Editor, EditorState, RichUtils } from 'draft-js';
// import 'draft-js/dist/Draft.css';

import * as causeActions from '../../actions/causeActions';
import * as bannerActions from '../../actions/bannerActions';
import Editor from '../Editor';
import CausePreview from '../CausePreview/CausePreview';

class AddCauseForm extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      location: '',
      event_type: '',
      event_type: '',
      impact: '',
      location: '',
      name: '',
      organization_info: '',
      position_info: '',
      requirements: '',
      displayRequirements: false,
      displayOrgInfo: false,
      displayImpact: false
    };
    this.state = {
      ...this.defaultState,
    };
  }

  renderBasicInput = (title, fieldName) => {
    const { [fieldName]: value } = this.state;
    return (
      <div className="add-cause-form__input">
        <p>{title}</p>
        <Input
          value={value}
          onChange={(e) => this.handleChange(fieldName, e.target.value)}
        />
      </div>
    );
  }

  handleChange = (fieldName, value) => {
    const { causeActions } = this.props;
    this.setState({ [fieldName]: value }, () => {
      causeActions.updateTempCause(fieldName, value);
    });
  }

  handleEditorChange = (fieldName, value) => {
    const { causeActions } = this.props;
    this.setState({ [fieldName]: value }, () => {
      causeActions.updateTempCause(fieldName, value);
    });
  }

  openSection = (section) => {
    this.setState({ [section]: true });
  }

  renderSectionToggle = (section, title) => {
    return (
      <div
        onClick={() => this.openSection(section)}
        className="add-cause-form__section-toggle"
      >
        &#43;&nbsp;{title}
      </div>
    );
  }

  createCause = () => {
    const { causeActions, cause } = this.props;
    causeActions.addCause(cause).then(newCause => {
      this.closeForm();
    });
  }

  closeForm = () => {
    const { onClose, causeActions } = this.props;
    this.setState({ ...this.defaultState });
    causeActions.deleteTempCause();
    if (onClose) onClose();
  }

  render() {
    const {
      en: { labels } 
    } = AddCauseForm.constants;

    const { display } = this.props;
    if (!display) return null;
    const {
      event_type,
      displayRequirements,
      displayOrgInfo,
      displayImpact
    } = this.state;

    return(
      <div className="add-cause-form">
        <div className="add-cause-form__close-btn" onClick={this.closeForm}>
          &times;
        </div>

        <div className="add-cause-form__left">
          <div className="container">

            <div className="add-cause-form__section">
              <div className="row">
                <div className="col-sm-12">
                  <h1>{labels.overview}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  {this.renderBasicInput('Name', 'name')}
                </div>
                <div className="col-lg-6">
                  {this.renderBasicInput('Location', 'location')}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="add-cause-form__input">
                    <p>{labels.eventType}</p>
                    <Select
                      defaultValue={event_type}
                      style={{ width: `100%` }}
                      onChange={(value) => this.handleChange('event_type', value)}
                    >
                      <Option value="single">{labels.single}</Option>
                      <Option value="recurring">{labels.recurring}</Option>
                    </Select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="add-cause-form__input">
                    <p>{labels.date}</p>
                    <RangePicker showTime />
                  </div>
                </div>
              </div>
            </div>

            <div className="add-cause-form__section">
              <div className="row">
                <div className="col-sm-12">
                  <h1>{labels.aboutThePosition}</h1>
                  <p>{labels.aboutThePositionInfo}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <Editor
                    onChange={(value) => this.handleEditorChange('position_info', value)}
                  />
                </div>
              </div>
            </div>

            <div className="add-cause-form__section">
              <div className="row">
                <div className="col-sm-12">
                  <h1>{labels.requirement}</h1>
                  <p>List some requirements.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  {displayRequirements ? (
                    <Editor
                      onChange={(value) => this.handleEditorChange('requirements', value)}
                    />
                  ) : (
                    this.renderSectionToggle('displayRequirements', 'Add Requirements')
                  )}
                </div>
              </div>
            </div>

            <div className="add-cause-form__section">
              <div className="row">
                <div className="col-sm-12">
                  <h1>{labels.aboutTheOrganization}</h1>
                  <p>{labels.aboutTheOrganizationInfo}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  {displayOrgInfo ? (
                    <Editor
                      onChange={(value) => this.handleEditorChange('organization_info', value)}
                    />
                  ) : (
                    this.renderSectionToggle('displayOrgInfo', 'Add Organization Info')
                  )}
                </div>
              </div>
            </div>

            <div className="add-cause-form__section">
              <div className="row">
                <div className="col-sm-12">
                  <h1>{labels.impact}</h1>
                  <p>{labels.impactInfo}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  {displayImpact ? (
                    <Editor
                      onChange={(value) => this.handleEditorChange('impact', value)}
                    />
                  ) : (
                    this.renderSectionToggle('displayImpact', 'Add Impact Info')
                  )}
                </div>
              </div>
            </div>

            <Button onClick={this.createCause}>
              {labels.save}
            </Button>
          </div>
        </div>

        <div className="add-cause-form__right">
          <div className="container">
            <div className="add-cause-form__section">
              <div className="row">
                <div className="col-sm-12">
                  <CausePreview id="TEMP_ID" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddCauseForm.constants = {
  en: {
    labels: {
      overview: "Overview",
      eventType: "Event Type",
      single: "Single",
      recurring: "Recurring",
      date: "Date",
      aboutThePosition: "About the Position",
      aboutThePositionInfo: "Include 1-2 paragraphs to summarize the position.",
      requirements: "Requirements",
      requirementsInfo: "List some requirements.",
      aboutTheOrganization: "About the Organization",
      aboutTheOrganizationInfo: "Include 1-2 paragraphs to summarize your organization.",
      impact: "Impact",
      impactInfo: "Include 1-2 paragraphs to summarize the impact.",
      save: "Save",
    }
  }
};

export default connect(
  state => ({
    active: state.getIn(['banner', 'active']),
    message: state.getIn(['banner', 'message']),
    status: state.getIn(['banner', 'status']),
    actions: state.getIn(['banner', 'actions']),
    cause: state.getIn(['causes', 'TEMP_ID'])
  }),
  dispatch => ({
    bannerActions: bindActionCreators(bannerActions, dispatch),
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(AddCauseForm));
