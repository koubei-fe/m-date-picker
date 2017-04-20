import React from 'react';
import classnames from 'classnames';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.less';
import DatePicker from './DatePicker';
import MultiPickerProps from './MultiDatePickerProps';
import moment from 'moment';
const minDate = moment([2015, 8, 15, 0, 0, 0]);
const maxDate = moment([2018, 1, 1, 23, 59, 59]);
const now = moment();
import zhCn from '../src/locale/zh_CN';
import enUs from '../src/locale/en_US';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const cn = location.search.indexOf('cn') !== -1;

function format(date) {
  return date.format('YYYY-MM-DD HH:mm');
}

class MultiPicker extends React.Component<MultiPickerProps, any> {
  static defaultProps = {
    locale: cn ? zhCn : enUs,
    prefixCls: 'rmc-multi-picker',
    pickerPrefixCls: 'rmc-picker',
    onValueChange: (value, i) => {},
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      minStartDate: moment([2015, 8, 15, 0, 0, 0]),
      maxStartDate: moment([2018, 1, 1, 23, 59, 59]),
      minEndDate: moment([2015, 8, 15, 0, 0, 0]),
      maxEndDate: moment([2018, 1, 1, 23, 59, 59]),
      startTime: now,
      endTime: now,
      mode: 'datetime',
    };
  }


  getValue = () => {
    const { startTime, endTime } = this.state;
    return [startTime, endTime];
  }
  onValueChange = (i, v) => {
    const value = this.getValue();
    console.log(i, v);
    value[i] = v;
    this.props.onValueChange && this.props.onValueChange(value, i);
  }

  render() {
    const props = this.props;
    const {
      prefixCls, pickerPrefixCls,
      className, rootNativeProps,
      disabled, pickerItemStyle,
      indicatorStyle,
      pure, children,
    } = props;

    const { startTime, endTime, minStartDate, maxStartDate, minEndDate, maxEndDate } = this.state;
    return (
      <div {...rootNativeProps} className={classnames(className, prefixCls)}>
        <div>开始时间</div>
        <DatePicker 
          rootNativeProps={{'data-xx': 'yy'}}
          defaultDate={startTime}
          mode="datetime"
          locale={props.locale}
          maxDate={maxStartDate}
          minDate={minStartDate}
          onDateChange={(time) => {
            console.log('startTime', format(time));
            console.log('minEndDate', format(time));
            this.setState({
              startTime: time,
              minEndDate: time,
            }, () => {
              this.onValueChange(0, time);
            });
          }}
        />
        <div>结束时间</div>
        <DatePicker 
          rootNativeProps={{'data-xx': 'yy'}}
          defaultDate={endTime}
          mode="datetime"
          locale={props.locale}
          maxDate={maxEndDate}
          minDate={minEndDate}
          onDateChange={(time) => {
            console.log('endTime', format(time));
            console.log('maxStartDate', format(time));
            this.setState({
              endTime: time,
              maxStartDate: time,
            }, () => {
              this.onValueChange(1, time);
            });
          }}
        />
      </div>
    );
  },
};

export default MultiPicker;
