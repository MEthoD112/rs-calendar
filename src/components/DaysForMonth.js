import React from 'react';
import moment from 'moment';
import { PopUp } from './Popup';

export default class DaysForMonth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null, trainers: null, count: 0 };

    this.showPopup = this.showPopup.bind(this);
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
    const length = events.length;
    const eventElements = [];

    for (let i = 0; i < length; i++) {
      eventElements.push(<div className={ events[i].type }
                                          key={ events[i].id }
                                          data={ events[i].id }
                                          id="Popover1"
                                          onClick={ this.showPopup } >
                          { `${events[i].type}: ` + events[i].title }
                        </div>);
    }
    return eventElements;
  }
  getEventsByDay(day) {
    const arr = [];
    day = day.format().slice(0, 10);
    this.props.eventsForWeek.map((item) => {
      if (day == item.start.slice(0, 10) ||
          day == moment(item.start).add(+item.duration, 'ms').format().slice(0, 10)) {
        return arr.push(item);
      }
    });
    return arr;
  }

  showPopup(event) {
    const id = event.target.getAttribute('data');
    fetch(`http://128.199.53.150/events/${id}`)
      .then((response) => response.json())
      .then ((obj) => {
        const events = obj;
        const urls = obj.speakers.map((item) => {
          return `http://128.199.53.150/trainers/` + item;
        });
        Promise.all(urls.map(url =>
          fetch(url).then((response) => response.json())
        )).then((trainers) => {
          this.state.trainers = trainers;
          this.setState({ data: events, count: this.state.count + 1 });
        });
      });
  }
}
