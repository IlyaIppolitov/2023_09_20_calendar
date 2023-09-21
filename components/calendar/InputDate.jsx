import { useContext, useState } from 'react';

import { LocaleContext } from './LocaleContext';
import CalendarSelector from './CalendarSelector';
import PopUpWindow from './PopUpWindow';

import style from './InputDate.module.css';


export default function InputDate({ startDate, result }) {
  const
    // Установка даты текущей или выбранной
    [date, setDate] = useState(new Date(startDate || Date.now())),
    // Открытие/закрытие всплывающего окна
    [openDialog, setOpen] = useState(false),
    // Получение текущей локализации из контекста
    locale = useContext(LocaleContext);
  return <>
    {/* div замаскированный под input date, при нажатии на него открывается всплывающее окно */}
    <div className={style['input-date']} onClick={_ => setOpen(true)}>
      {/* отображение переменной дата, в указанной локализации и по заданному формату */}
      {date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })}
    </div>
    {/* Открытие компонента всплывающего окна с передачей ему в качестве children компонента CalendatSelector */}
    {openDialog
      && <PopUpWindow>
        <CalendarSelector result={res => { setOpen(false); setDate(res); result(res); }} startDate={date} />
      </PopUpWindow>}
  </>;
}