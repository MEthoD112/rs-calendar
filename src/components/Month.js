import React from 'react';
import DaysForMonth from './DaysforMonth';
import HeaderForMonth from './HeaderForMonth';

export default class Month extends React.Component {
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
    start = start.format();
    end = end.format();

    this.props.eventsForMonth.map((item) => {
      if (start <= item.start && end >= item.start) {
        return arr.push(item);
      }
    });
    return arr;
  }
}
