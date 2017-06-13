import React from 'react';

export default class DaysForWeek extends React.Component {
  render() {
    let days = [];
    let date = this.props.date;
    let week = this.props.week.startOf('week').day('Sunday');

    for (let i = 0; i < 8; i++) {
      const day = {
        hours: i === 0 ? date.format('LT') : '',
        isToday: week.isSame(new Date(), 'day'),
        date: date
      };

      days.push(<div className={ 'column-week' + (day.isToday ? ' today' : '') }
                     key={ day.date.toString() }>
                  <span key={ day.date.toString() }
                        className="time">
                     { day.hours }
                  </span>
      </div>);

      date = date.clone();
      date.add(1, 'h');
      week = week.clone();
      week.add(1, 'd');
    }

    return <div className="row-week" key={ days[0].toString() }>
      {days}
    </div>
  }
}
