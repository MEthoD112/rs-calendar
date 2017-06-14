import React from 'react';

import { HeaderForWeek } from './HeaderForWeek';
import { DaysForWeek } from './DaysForWeek';

export class Week extends React.Component {
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

    // Set date hours and minutes to zero for rendering
    const date = this.props.week.clone().hour(0).minutes(0);

    for (let i = 0; i < 24; i++) {
      hours.push(<DaysForWeek key={ date.toString() }
                              date={ date.clone() }
                              week={ this.props.week }
                              eventsForWeek={ this.props.eventsForWeek } />);
      // Add one hour
      date.add(1, 'h');
    }
    return hours;
  }
}
