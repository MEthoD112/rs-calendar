import React from 'react';

import HeaderForWeek from './HeaderForWeek';
import DaysForWeek from './DaysForWeek';

export default class Week extends React.Component {
  render() {
    if (this.props.mode === 'Week') {
      return (
        <div className="week">
          <HeaderForWeek week={ this.props.week } />
          <div className="week-overflow">
            { this.renderHours() }
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  renderHours() {
    let hours = [];
    const date = this.props.week.clone().hour(0).minutes(0);

    for (let i = 0; i < 24; i++) {
      hours.push(<DaysForWeek key={ date.toString() } date={ date.clone() } week={ this.props.week } />);
      date.add(1, 'h');
    }
    return hours;
  }
}
