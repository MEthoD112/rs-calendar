import React from 'react';
import moment from 'moment';

import { constants } from './constants';
import { PopUp } from './Popup';

export class DaysForMonth extends React.Component {
  constructor(props) {
    super(props);

    this.showPopup = this.showPopup.bind(this);
    this.state = { data: null, trainers: null, count: 0 };
  }

  render() {
    let days = [],
      date = this.props.date,
      month = this.props.month;

    for (let i = 0; i < 7; i++) {
      const day = {
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), 'day'),
        date: date
      };

      days.push(<div className={ 'column-month' + (day.isToday ? ' today' : '') }
                     key={ day.date.toString() }>
                  <span key={ day.date.toString() }
                        className={ 'day' + (day.isCurrentMonth ? '' : ' not-current-month') }>
                     { day.number }
                  </span>
                  { this.renderEvents(day.date) }
                </div>);
      date = date.clone();
      date.add(1, 'd');
    }

    return (<div>
              <div className="row-month" key={ days[0].toString() }>
                { days }
              </div>
              <PopUp data={ this.state.data } trainers={ this.state.trainers } count={ this.state.count}/>
          </div>);
  }

  renderEvents(day) {
    const events = this.getEventsByDay(day);
    //const length = events.length;
    const eventElements = [];

    events.forEach((item) => {
      eventElements.push(<div className={ item.type }
                              key={ item.id }
                              data={ item.id }
                              id="Popover1"
                              onClick={ this.showPopup } >
                          { `${item.type}: ` + item.title }
                        </div>);
    });
    return eventElements;
  }
  getEventsByDay(day) {
    const arr = [];
    const starOfDay = day.clone();
    const endOfDay = starOfDay.clone().add(1, 'd');
    this.props.eventsForWeek.map((item) => {
      // Make moment objects from Date
      let momentStart = moment(item.start);
      let momentEnd = momentStart.clone().add(+item.duration, 'ms');

      if (momentStart <= starOfDay && momentEnd >= starOfDay ||
          momentStart <= endOfDay && momentEnd >= endOfDay ||
          momentStart <= starOfDay && momentEnd >= endOfDay ||
          momentStart >= starOfDay && momentEnd <= endOfDay) {
        return arr.push(item);
      }
    });
    return arr;
  }

  // Fetch event by id, then fetch for trainers and show popup
  showPopup(event) {
    const id = event.target.getAttribute('data');
    fetch(constants.urlForEvents + id)
      .then((response) => response.json())
      .then ((event) => {
        const Events = event;
        const urls = event.speakers.map((item) => {
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
}
