import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../Button';
import FilterItem from './FilterItem';
import { Row } from '../Grid';

import * as causeActions from '../../actions/causeActions';
import * as filterActions from '../../actions/filterActions';
import "./cause-filters.scss";
import MutliSelect from '../MultiSelect';

class CauseFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: null,
      // description: null,
      // addCause: false,
      // displayForm: false,
      // formId: shortid.generate(),
      // currentView: 'Grid View'
    };
  }

  handleChange = (value, type) => {
    const { filterActions } = this.props;
    filterActions.setFilterValue(type, value);
    setTimeout(() => filterActions.performSearch());
  }

  render() {
    const {
      locations,
      selectedLocations,
      organizations,
      selectedOrganizations
    } = this.props;

    return(
      <Row className="xfilters">

        <div className="xfilters__col">
          <FilterItem
            title="Location"
            placeholder="Where?"
            options={locations && locations.toJS()}
            selected={selectedLocations && selectedLocations.toJS()}
            onChange={(value) => this.handleChange(value, "locations")}
          />
        </div>
        <div className="xfilters__col">
          <FilterItem
            title="Organization"
            placeholder="For who?"
            options={organizations && organizations.toJS()}
            selected={selectedOrganizations && selectedOrganizations.toJS()}
            onChange={(value) => this.handleChange(value, "organizations")}
          />
        </div>
        <div className="xfilters__col">
          <div className="xfilters__item">

          </div>
        </div>
        <div className="xfilters__col">
          <div className="xfilters__item">

          </div>
        </div>

        <div className="xfilters__col">
          <Button
            caseSensitive
            secondary
          >
            More Filters
          </Button>
        </div>
      </Row>
    );
  }
}

export default connect(
  state => ({
    // userInfo: state.get('user'),
    // email: state.getIn(['user', 'email']),
    // isAdmin: state.getIn(['user', 'isAdmin']),
    // causes: state.getIn(['causes', 'ALL']),
    // mobile: state.getIn(['app', 'mobile']),
    // filter: state.get('filter')
    locations: state.getIn(['causes', 'info', 'locations']),
    selectedLocations: state.getIn(['filter', 'locations']),
    organizations: state.getIn(['causes', 'info', 'organizations']),
    selectedOrganizations: state.getIn(['filter', 'organizations']),
  }),
  dispatch => ({
    // causeActions: bindActionCreators(causeActions, dispatch),
    filterActions: bindActionCreators(filterActions, dispatch)
  })
)(CauseFilters);
