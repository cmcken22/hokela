import React, { Component } from 'react';
import cx from 'classnames';
import { withRouter } from "react-router-dom";
import { AiFillHome } from '@react-icons/all-files/ai/AiFillHome';
import { BsChevronRight } from '@react-icons/all-files/bs/BsChevronRight';
import './bread-crumbs.scss';

class BreadCrumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCrumbs = () => {
    const { crumbs } = this.props;
    if (!crumbs) return null;

    return (
      <div className="bread-crumbs__container">
        {crumbs.map(crumb => {
          const { name, path } = crumb;
          return (
            <>
              <div className="bread-crumbs__arrow">
                <BsChevronRight size="17px" />
              </div>
              <p
                onClick={() => this.goToPath(path)}
                className={cx("bread-crumbs__crumb", {
                  "bread-crumbs__crumb--active": !!path
                })}
              >
                {name}
              </p>
            </>
          )
        })}
      </div>
    )
  }

  goToPath = (path) => {
    if (!path) return;
    const { history } = this.props;
    history.push(path);
  }

  render() {
    return (
      <div className="bread-crumbs">
        <div className="bread-crumbs__home">
          <AiFillHome size="17px" onClick={() => this.goToPath('/home')} />
        </div>
        {this.renderCrumbs()}
      </div>
    );
  }
}


export default withRouter(BreadCrumbs);
