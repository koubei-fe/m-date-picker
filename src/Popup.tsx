import React from 'react';
import IDatePickerProps from './IDatePickerProps';
import PopupPicker from './PopupPicker';
import { IPopupPickerProps } from './PopupPickerTypes';

export interface IPopupDatePickerProps extends IPopupPickerProps {
  datePicker: React.ReactElement<IDatePickerProps>;
  onChange?: (date?) => void;
  date?: any;
}
const PopupDatePicker = React.createClass<IPopupDatePickerProps, any>({
  getDefaultProps() {
    return {
      pickerValueProp: 'date',
      pickerValueChangeProp: 'onDateChange',
    } as any;
  },

  onOk(v) {
    const { onChange, onOk } = this.props;
    if (onChange) {
      onChange(v);
    }
    if (onOk) {
      onOk(v);
    }
  },

  render() {
    // console.log(this.props.datePicker);
    // console.log({...this.props});
    // picker={[this.props.datePicker, this.props.datePicker]}
    return (<PopupPicker
      picker={this.props.datePicker}
      value={this.props.date}
      {...this.props}
      onOk={this.onOk}
    />);
  },
});

export default PopupDatePicker;
