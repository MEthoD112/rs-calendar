import React from 'react';
import moment from 'moment';

import { DaysForMonth } from './DaysforMonth';
import { HeaderForMonth } from './HeaderForMonth';

export class Month extends React.Component {
  render() {
    if (this.props.mode === 'Month') {
      return (
        <div className="month">
          <HeaderForMonth />
          { this.renderWeeks() }

        </div>
      );
    } else {
      return null;
    }
  }

  renderWeeks() {
    let weeks = [],
      done = false,
      date = this.props.month.clone().startOf('month').day('Sunday'),
      monthIndex = date.month(),
      count = 0;

    while (!done) {
      let eventsForWeek = this.getEventsForWeek(date.clone(), date.clone().add(1, 'w'));

      weeks.push(<DaysForMonth key={ date.toString() }
                               date={ date.clone() }
                               month={ this.props.month }
                               eventsForWeek={ eventsForWeek } />);
      date.add(1, 'w');
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    return weeks;
  }

  getEventsForWeek(start, end) {
    const arr = [];

    this.props.eventsForMonth.map((item) => {
      // Make moment objects from Date
      let momentStart = moment(item.start);
      let momentEnd = momentStart.clone().add(+item.duration, 'ms');

      if (momentStart <= start && momentEnd >= start ||
        momentStart <= end && momentEnd >= end ||
        momentStart >= start && momentEnd <= end ||
        momentStart <= start && momentEnd >= end) {
        return arr.push(item);
      }
    });
    return arr;
  }
}
