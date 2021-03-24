import { NextPage } from 'next';
import { Calendar } from 'antd';
import moment from 'moment';
import { useState } from "react";

interface CalendarProps {
    setParent?: Function;
}

const CalendarWidget: NextPage<CalendarProps> = (props) => {
    const { setParent } = props
    const [dateMode, setdateMode] = useState('month' as 'month' | 'year')

    const disabledDate = (date) => {
        if (dateMode === 'year') {
            return date && date > moment().endOf('month');
        }
        return date && date > moment().endOf('day');
    }

    const panelChange = (_date, mode: 'month' | 'year') => {
        setdateMode(mode)
    }

    const selectDate = (date: moment.Moment) => {
        console.log(11111);
        let inputDateMoment: [moment.Moment, moment.Moment];
        if (dateMode === 'year') {
          const start = moment(date.startOf('month'));
          const end = moment(date.endOf('month'));
          inputDateMoment = [start, end];
        } else {
          inputDateMoment = [date, date];
        }
        window.scrollTo(0, 0);
        setParent(inputDateMoment);
    }

    return (
        <div className="widget-container">
            <div className="widget-header">
                博客日历
            </div>
            <Calendar
                fullscreen={false}
                disabledDate={disabledDate}
                onPanelChange={panelChange}
                onSelect={selectDate}
            />
        </div>
    )
}

export default CalendarWidget;