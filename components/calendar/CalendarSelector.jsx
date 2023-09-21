import { useState, useCallback } from 'react';
import CalendarApp from './CalendarApp';

// промежуточная функия, где result - это функция, определяющая что делать с выбранной датой, она
// передаётся в самой верхней фунции
export default function CalendarSelector({ startDate = (new Date), result = () => {} }) {
  const
    [date, setDate] = useState(startDate),
    onClick = useCallback(res => { setDate(res); result(res); }, [result]);
  return <CalendarApp date={date} onClick={onClick} />;
}