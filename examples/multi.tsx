/* tslint:disable:no-console */

import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.less';
import 'rmc-picker/assets/popup.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PopPicker from '../src/Popup';
import DatePicker from '../src/DatePicker';
import MultiPicker from '../src/MultiDatePicker';

import moment from 'moment';
import zhCn from '../src/locale/zh_CN';
import enUs from '../src/locale/en_US';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const cn = location.search.indexOf('cn') !== -1;

const minDate = moment([2015, 8, 1, 0, 0, 0]);
const maxDate = moment([2018, 1, 1, 22, 0, 0]);
const now = moment();

if (cn) {
  minDate.locale('zh-cn').utcOffset(8);
  maxDate.locale('zh-cn').utcOffset(8);
  now.locale('zh-cn').utcOffset(8);
} else {
  minDate.locale('en-gb').utcOffset(0);
  maxDate.locale('en-gb').utcOffset(0);
  now.locale('en-gb').utcOffset(0);
}

function format(date) {
  return date.format('YYYY-MM-DD HH:mm');
}

class Demo extends React.Component<any, any> {
  static defaultProps = {
    mode: 'datetime',
    locale: cn ? zhCn : enUs,
  };

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      startTime: null,
      endTime: null,
    };
  }

  onChange = (date) => {
    const { startTime, endTime } = this.state;
    debugger;
    // console.log('onChange', format(startTime));
    console.log('onChange', startTime);
    // console.log('onChange', format(endTime));
    console.log('onChange', endTime);
    
    this.setState({
      date,
    });
  }

  onDismiss = () => {
    console.log('onDismiss');
  }

  show = () => {
    console.log('my click');
  }

  render() {
    const props = this.props;
    const { date } = this.state;
    /*const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={minDate}
        maxDate={maxDate}
        defaultDate={now}
        mode={props.mode}
        locale={props.locale}
      />
    );*/

// datePicker={[datePicker, datePicker]}
// date={date}
    return (<div style={{ margin: '10px 30px' }}>
      <h2>popup multi date picker</h2>
      <div>
        <PopPicker
          datePicker={<MultiPicker>
            <DatePicker 
              rootNativeProps={{'data-xx': 'yy'}}
              defaultDate={now}
              mode="datetime"
              locale={props.locale}
              maxDate={maxDate}
              minDate={minDate}
              onDateChange={(time) => {
               console.log(time);
               debugger;
               this.setState({
                 startTime: time,
               });
              }}
            />
            <DatePicker 
              rootNativeProps={{'data-xx': 'yy'}}
              defaultDate={now}
              mode="datetime"
              locale={props.locale}
              maxDate={maxDate}
              minDate={minDate}
              onDateChange={(time) => {
                console.log(time);
                debugger;
                this.setState({
                 endTime: time,
               });
              }}
            />
          </MultiPicker>}
          transitionName="rmc-picker-popup-slide-fade"
          maskTransitionName="rmc-picker-popup-fade"
          title="Date picker"
          onDismiss={this.onDismiss}
          onChange={this.onChange}
        >
          <button onClick={this.show}>{this.state.startTime || 'open'}</button>
        </PopPicker>
      </div>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
