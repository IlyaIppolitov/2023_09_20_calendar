import { memo, useContext, useMemo } from 'react';
import { LocaleContext } from './LocaleContext';

import styles from './CalendarApp.module.css';

export default memo(function CalendarApp({ date, onClick }) {
  const
    // получение локализации из контекста
    locale = useContext(LocaleContext),
    // получение коллекции кратких наименований дней недели нужной локализации; 
    // 2019-0-0 - это понедельник, поэтому эта дата выбрана начальной 
    // компонент будет перерисован при смене переменной локализации, хранящейся в контексте
    dayNames = useMemo(_=>[...Array(7)].map((_, i) => (new Date(2019, 0, i)).toLocaleDateString(locale, { weekday: 'short' })),[locale]),
    year = date.getFullYear(),
    month = date.getMonth(),
    monthName = date.toLocaleDateString(locale, { month: 'long' }),
    daysInMonth = (new Date(year, month + 1, 0)).getDate(), // число предшествующее 1 числу (нулевое) следующего месяца и есть число дней в текущем
    // получение текущего первого дня недели в текущем рассматриваемом месяце 
    firstDayOfWeek = (new Date(year, month, 1)).getDay(),   // ВС=0 ПН=1 ВТ=2 .. СБ=6 
    // определение сдвига для, корректного отображения дат и дня недели
    startShift = (-1 + firstDayOfWeek + 7) % 7;             //      ПН=0 ВТ=1 .. СБ=5 ВС=6

  return <table className={styles.calendar}>
    <caption>{monthName}, {year}</caption>
    <thead><tr>
      {/* Вывод дней недели */}
      {dayNames.map(day => <th key={day}>{day}</th>)}
    </tr>
    </thead>
    <tbody
      // при нажатии на поле с днями происходит определение конкретной выбранной даты,
      // задание нового значения переменной дата,
      // и вызов внешней(принятой) функции onclick
      onClick={evt => {
        const day = evt.target.closest('td').textContent;
        if (day && onClick) {
          const
            d = new Date(date.setDate(+day));
          onClick(d);
        }
      }}>
      <Month shift={startShift} max={daysInMonth} selected={date.getDate()} />
    </tbody>
  </table>;

});

// Функия отображения недели
// Отображается в виде строки таблицы
function Week({ start, max, selected }) {
  return <tr>
    {/* перебор от 0 до 7 */}
    {[...Array(7)].map((_, index) => +start + index).map(day =>
      <td key={day} className={+selected === day ? styles.selected : ''}>
        {day >=1 && day <= max && day}
      </td>)}
  </tr>;
}

// Функция отображения месяца
// принимает начальный день недели месяца, количество дней в месяце, и фунцию переопределения даты при её выборе (selected)
function Month({ shift, max, selected }) {
  const
    result = []; // коллекия недель
  for (let weekStart = 1 - shift; weekStart <= +max; weekStart += 7) {
    result.push(<Week key={weekStart} start={weekStart} {...{ max, selected }} />);
  }
  return <>{result}</>;
}