import React from 'react';
import moment from 'moment';

import { Popover, PopoverTitle, PopoverContent } from 'reactstrap';

export class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.renderTrainers = this.renderTrainers.bind(this);
    this.renderResources = this.renderResources.bind(this);
    this.state = { count: 0 };
  }
  render() {
    if (this.state.count !== this.props.count) {
      this.state.count = this.props.count;
      this.state.data = this.props.data;
    } else {
      this.state.data = null;
    }

    if (this.state.data) {
      const data = this.state.data;
      this.state.open = true;
      const type = 'Type of event: ' + data.type;
      const title = 'Title: ' + data.title;
      const description = data.description;
      const start = 'When: ' + moment(data.start).format('dddd, MMMM Do YYYY, h:mm:ss a');
      const end = ' --- ' + moment(data.start).add(+data.duration, 'ms').format('dddd, MMMM Do YYYY, h:mm:ss a');
      const location = 'Where: ' + data.location;
      return (
        <div>
          <Popover placement="top" isOpen={ this.state.open } target="Popover1" toggle={ this.toggle } >
            <h2>{ type }</h2>
            <PopoverTitle>{ title }</PopoverTitle>
            <PopoverContent>{ description }</PopoverContent>
            <div className="date">
              <span>{ start }{ end }</span>
            </div>
            <div className="location"><span>{ location }</span></div>
            <h3>Trainers</h3>
            <div className="trainers">{ this.renderTrainers() }</div>
            <h3>Resources</h3>
            <ul className="resources">{ this.renderResources() }</ul>
          </Popover>
        </div>
      );
    } else {
      return null;
    }

  }
  // Toggle popup
  toggle() {
     this.setState({ count: this.state.count++ });
  }

  renderTrainers() {
    const trainers = this.props.trainers || [];
    const trainersElements = [];
    trainers.forEach((item) => {
      trainersElements.push(<div className="trainer" key={ item.id }>
                              <img src={ item.avatar } ></img>
                              <span>{ item.name}</span>
                            </div>);
    });
    return trainersElements;
  }

  renderResources() {
    if (this.props.data) {
      const resources = this.props.data.resources || [];
      const resourceElements = [];
      resources.forEach((item, i) => {
        resourceElements.push(<li className="resource" key={ i }>
          <h4>{ `${i + 1}.` + item.type }</h4>
          <a className="link" href={ item.resource } >{ item.description }</a>
        </li>);
      });
      return resourceElements;
    }
  }
}
