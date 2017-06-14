import React from 'react';
import moment from 'moment';

import { constants } from './constants';
import { PopUp } from './Popup';

export class DaysForWeek extends React.Component {
  constructor(props) {
    super(props);

    this.showPopup = this.showPopup.bind(this);
    this.state = { data: null, trainers: null, count: 0 };
  }

  render() {
    let days = [];
    let date = this.props.date;

    // Start of current week
    let startOfWeek = this.props.week.startOf('week').day('Sunday');

    // Difference between current date and the beginng of the week
    let difference = Math.trunc((date - startOfWeek) / constants.milisecondsInDay);
    let Hours = date.clone().subtract(difference, 'days');

    // 8 times for each week column
    for (let i = 0; i < 8; i++) {
      const day = {
        hours: (i === 0) ? date.format('LT') : '',
        isToday: startOfWeek.isSame(moment().add(1, 'd'), 'day'),
        date: date,
        Hours: (i === 0) ? null : Hours
      };

      days.push(<div className={ 'column-week' + (day.isToday ? ' today' : '') }
                                  key={ day.date.toString() }>
                  <span className="time">
                     { day.hours }
                  </span>
                  { this.renderEvents(day.Hours)}
                </div>);

      date = date.clone().add(1, 'h');
      startOfWeek = startOfWeek.clone().add(1, 'd');
      Hours = (i === 0) ? Hours.clone() : Hours.clone().add(1, 'd')
    }
    return <div className="row-week" key={ days[0].toString() }>
             { days }
             <PopUp data={ this.state.data } trainers={ this.state.trainers } count={ this.state.count}/>
           </div>
  }

  // Render Events
  renderEvents(day) {
    const events = this.getEventsByDayAndHour(day);
    if (events) {
      const arr = [];
      events.forEach((item) => {
        arr.push(<div key={ item.id }
                      className={ item.type }
                      data={ item.id }
                      id="Popover1"
                      onClick={ this.showPopup }>
                   { `${item.type}: ` + item.title }
                 </div>);
      });
      return arr;
    }
  }

  // Fetch event by id, then fetch for trainers and show popup
  showPopup(event) {
    const id = event.target.getAttribute('data');
    fetch(constants.urlForEvents + id)
      .then((response) => response.json())
      .then ((events) => {
        const Events = events;
        const urls = events.speakers.map((item) => {
          return constants.urlForTrainers + item;
        });
        Promise.all(urls.map(url =>
          fetch(url).then((response) => response.json())
        )).then((trainers) => {
          this.state.trainers = trainers;
          this.setState({ data: Events, count: this.state.count + 1 });
        });
      });
  }

  // Get events by day and range of hours
  getEventsByDayAndHour(day) {
    if (day) {
      const arr = [];
      const startOfHour = day.clone();
      const endOfHour = day.clone().add(1, 'h');
      this.props.eventsForWeek.map((item) => {
        let momentStart = moment(item.start);
        let momentEnd = momentStart.clone().add(+item.duration, 'ms');

        if (momentStart <= startOfHour && momentEnd >= startOfHour ||
            momentStart <= endOfHour && momentEnd >= endOfHour ||
            momentStart >= startOfHour && momentEnd <= endOfHour ||
            momentStart <= startOfHour && momentEnd >= endOfHour) {
          return arr.push(item);
        }
      });
      return arr;
    }
  }
}
