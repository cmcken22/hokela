import React, { Component } from 'react'
import cx from 'classnames';
import { Button, Input } from "antd";

import * as causeActions from '../../actions/causeActions';

class Causes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      addCause: false,
      list: []
    };
  }

  componentDidMount() {
    causeActions.getCauses().then(causes => {
      if (causes) {
        this.setState({ list: causes });
      }
    });
  }

  disaplyForm = () => {
    const { addCause } = this.state;
    this.setState({ addCause: !addCause });
  }

  handleChange = (e, fieldName) => {
    const { target: { value } } = e;
    this.setState({ [fieldName]: value });
  }

  checkDisabled = () => {
    const { name, description, addCause } = this.state;
    if (!addCause) return false;
    if (!name || !description) return true;
    return false;
  }

  handleAddCause = () => {
    const { list, name, description } = this.state;
    causeActions.addCause(name, description).then(newCause => {
      if (newCause) {
        const newList = [...list];
        newList.push(newCause);
        this.setState({
          name: null,
          description: null,
          addCause: false,
          list: newList
        });
      }
    });
  }

  handleDelete = (id) => {
    const { list } = this.state;
    causeActions.deleteCause(id).then(res => {
      if (res) {
        const newList = list.filter(item => item._id !== id);
        this.setState({ list: newList });
      }
    });
  }

  render() {
    const {
      en: { labels } 
    } = Causes.constants;
    const { list, name, description, addCause } = this.state;
    const { isAdmin, user } = this.props;

    return(
      <div className="causes"> 
        <div className="causes__list">
          {list && list.map(item => {
            const { created_by: { email } } = item;
            return (
              <div key={item._id} className="causes__item">
                <div className="causes__item-title">
                  <p>{item.name}</p>
                  {email === user ? (
                    <div className="causes__delete-btn" onClick={() => this.handleDelete(item._id)}>&times;</div>
                  ) : null}
                </div>
                <div className="causes__item-description">
                  <p>{item.description}</p>
                </div>
                {user ? (
                  <Button
                  type="primary"
                  className="causes__apply-btn"
                  // onClick={addCause ? this.handleAddCause : this.disaplyForm}
                  >
                    {labels.apply}
                  </Button>
                ) : null}
              </div>
            );
          })}
        </div>
        {isAdmin ? (
          <>
            <div className={cx("causes__form", {
              "causes__form--active": addCause
            })}>
              <Input
                placeholder="Name..."
                value={name}
                onChange={(e) => this.handleChange(e, "name")}
              />
              <Input
                placeholder="Description..."
                value={description}
                onChange={(e) => this.handleChange(e, "description")}
              />
            </div>
            <Button
              type="primary"
              onClick={addCause ? this.handleAddCause : this.disaplyForm}
              disabled={this.checkDisabled()}
            >
              {addCause ? labels.submit : labels.addCause}
            </Button>
          </>
        ) : null}
      </div>
    );
  }
}

Causes.constants = {
  en: {
    labels: {
      addCause: 'ADD CAUSE',
      submit: 'SUBMIT',
      apply: 'APPLY'
    }
  }
};

export default Causes;
