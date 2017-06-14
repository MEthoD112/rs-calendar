import React from 'react';
import moment from 'moment';

import { Week } from './Week';
import { Month } from './Month';

export class Calendar extends React.Component {
  constructor(props) {
    super(props);

    // Bind all methods
    this.handleMode = this.handleMode.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.today = this.today.bind(this);
    this.renderLabel = this.renderLabel.bind(this);
    this.sortEventsByDate = this.sortEventsByDate.bind(this);

    // Get start and end of current month and week
    const startOfMonth = moment().startOf('month').day('Sunday');
    const endOfMonth = moment().endOf('month').day('Saturday');
    const startOfWeek = moment().startOf('week').day('Sunday');
    const endOfWeek = moment().endOf('week').day('Saturday');

    this.state = {
      mode: 'Month',
      month: moment(),
      week: moment(),
      data: this.props.data,
      eventsForMonth: null,
      eventsForWeek: null
    };
    this.state.eventsForMonth = this.sortEventsByDate(startOfMonth, endOfMonth);
    this.state.eventsForWeek = this.sortEventsByDate(startOfWeek, endOfWeek);
  }

  render() {
    return (
      <div className="app">
        <div className="toolbar">
          <div className="toolbar-right">
            <button onClick={ this.today }>Today</button>
            <button onClick={ this.previous }>Previous</button>
            <button onClick={ this.next }>Next</button>
          </div>
          { this.renderLabel() }
          <div className="toolbar-left">
            <button onClick={ this.handleMode }>Month</button>
            <button onClick={ this.handleMode }>Week</button>
          </div>
        </div>
        <Week mode={ this.state.mode } week={ this.state.week } eventsForWeek={ this.state.eventsForWeek }/>
        <Month mode={ this.state.mode } month={ this.state.month } eventsForMonth={ this.state.eventsForMonth } />
      </div>
    );
  }

  // Handle mode Month or Week
  handleMode(event) {
    if (event.target.innerHTML !== this.state.mode) {
      if (this.state.mode === 'Week') {
        const startOfMonth = this.state.month.clone().startOf('month').day('Sunday');
        const endOfMonth = this.state.month.clone().endOf('month').day('Saturday');
        this.setState({
          eventsForMonth: this.sortEventsByDate(startOfMonth, endOfMonth),
          month: this.state.month, mode: event.target.innerHTML
        });
      } else {
        const startOfWeek = this.state.week.clone().startOf('week').day('Sunday');
        const endOfWeek = this.state.week.clone().endOf('week').day('Saturday');
        this.setState({ eventsForWeek: this.sortEventsByDate(startOfWeek, endOfWeek),
          week: this.state.week, mode: event.target.innerHTML });
      }
    }
  }

  // Render previous Month or Week
  previous() {
    if (this.state.mode === 'Month') {
      const previousMonth = this.state.month.add(-1, 'M');
      const startOfMonth = this.state.month.clone().startOf('month').day('Sunday');
      const endOfMonth = this.state.month.clone().endOf('month').day('Saturday');
      this.setState({ eventsForMonth: this.sortEventsByDate(startOfMonth, endOfMonth),
                      month: previousMonth,
                      week: previousMonth });
    } else {
      const previousWeek = this.state.week.add(-1, 'w');
      const startOfWeek = this.state.week.clone().startOf('week').day('Sunday');
      const endOfWeek = this.state.week.clone().endOf('week').day('Saturday');
      this.setState({ eventsForWeek: this.sortEventsByDate(startOfWeek, endOfWeek),
                      week: previousWeek,
                      month: previousWeek });
    }
  }

  // Render next Month or Week
  next() {
    if (this.state.mode === 'Month') {
      const nextMonth = this.state.month.add(1, 'M');
      const startOfMonth = this.state.week.clone().startOf('month').day('Sunday');
      const endOfMonth = this.state.month.clone().endOf('month').day('Saturday');
      this.setState({ eventsForMonth: this.sortEventsByDate(startOfMonth, endOfMonth),
                      month: nextMonth,
                      week: nextMonth });
    } else {
      const nextWeek = this.state.week.add(1, 'w');
      const startOfWeek = this.state.week.clone().startOf('week').day('Sunday');
      const endOfWeek = this.state.week.clone().endOf('week').day('Saturday');
      this.setState({ eventsForWeek: this.sortEventsByDate(startOfWeek, endOfWeek),
                      week: nextWeek,
                      month: nextWeek});
    }
  }

  // Render today of Month or Week
  today() {
    if (this.state.month.format('MM Do YY') !== moment().format('MM Do YY')) {
      if (this.state.mode === 'Month') {
        const startOfMonth = moment().startOf('month').day('Sunday');
        const endOfMonth = moment().endOf('month').day('Saturday');
        this.setState({ eventsForMonth: this.sortEventsByDate(startOfMonth, endOfMonth),
                        month: moment(),
                        week: moment() });
      } else {
        const startOfWeek = moment().startOf('week').day('Sunday');
        const endOfWeek = moment().endOf('week').day('Saturday');
        this.setState({ eventsForWeek: this.sortEventsByDate(startOfWeek, endOfWeek),
                        month: moment(),
                        week: moment() });
      }
    }
  }

  // Render label dependes on mode
  renderLabel() {
    if (this.state.mode === 'Month') {
      return <span className="toolbar-label">{this.state.month.format('MMMM, YYYY')}</span>;
    } else {
      const startOfWeek = this.state.week.clone().startOf('week').day('Sunday').format('MMMM, Do');
      const endOfWeek = this.state.week.clone().endOf('week').day('Saturday').format('MMMM, Do');
      return <span className="toolbar-label">{startOfWeek + ` --- ` + endOfWeek}</span>;
    }
  }

  sortEventsByDate(start, end) {
    const arr = [];

    this.state.data.map((item) => {
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
