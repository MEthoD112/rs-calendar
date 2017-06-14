import React from 'react';

export class HeaderForWeek extends React.Component {
  render() {
    return (
      <div className="row-week-header">
        <div className="column-week-header"></div>
          { this.renderDays() }
        <div className="column-week-scroll"></div>
      </div>
    );
  }

  renderDays() {
    let days = [];
    const date = this.props.week.clone().startOf('week').day('Sunday');

    for (let i = 0; i < 7; i++) {
      days.push(<div className="column-week-header" key={ date.toString() }>
          <span key={ date.toString() }>{ date.format('ddd Do') }</span>
        </div>);
      date.add(1, 'd');
    }
    return days;
  }
}
