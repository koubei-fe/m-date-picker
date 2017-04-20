import React from 'react';
import classnames from 'classnames';
import MultiPickerProps from './MultiDatePickerProps';
import moment from 'moment';
const minDate = moment([2015, 8, 15, 0, 0, 0]);
const maxDate = moment([2018, 1, 1, 23, 59, 59]);
const now = moment();

const MultiPicker = React.createClass<MultiPickerProps, any>({
  getDefaultProps() {
    return {
      prefixCls: 'rmc-multi-picker',
      pickerPrefixCls: 'rmc-picker',
      onValueChange() {
      },
      disabled: false,
    };
  },
  getValue() {
    const { children, selectedValue } = this.props;
    if (selectedValue && selectedValue.length) {
      return selectedValue;
    } else {
      if (!children) {
        return [];
      }
      return children.map(c => {
        console.log(c);
        const cc = c.props.children;
        return cc && cc[0] && cc[0].value;
      });
    }
  },
  onValueChange(i, v) {
    const value = this.getValue().concat();
    console.log(i, v);
    value[i] = v;
    this.props.onValueChange(value, i);
  },
  render() {
    const props = this.props;
    const {
      prefixCls, pickerPrefixCls,
      className, rootNativeProps,
      disabled, pickerItemStyle,
      indicatorStyle,
      pure, children,
    } = props;
    const selectedValue = this.getValue();
    const colElements = children.map((col, i) => {
      return (
        <div key={col.key || i} className={`${prefixCls}-item`}>
          {col}
        </div>
      );
    });
   
    console.log({...rootNativeProps});
    console.log({props});
    return (
      <div {...rootNativeProps} className={classnames(className, prefixCls)}>
        {colElements}
      </div>
    );
  },
});

export default MultiPicker;
