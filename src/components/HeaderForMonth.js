import React from 'react';

export default class HeaderForMonth extends React.Component {
  render() {
    return (
      <div className="row-month-header">
        <div className="column-month-header"><span>Sun</span></div>
        <div className="column-month-header"><span>Mon</span></div>
        <div className="column-month-header"><span>Tue</span></div>
        <div className="column-month-header"><span>Wed</span></div>
        <div className="column-month-header"><span>Thu</span></div>
        <div className="column-month-header"><span>Fri</span></div>
        <div className="column-month-header"><span>Sat</span></div>
      </div>
    );
  }
}
