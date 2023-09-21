import { useState } from 'react';
import CalendarApp from '../components/calendar/CalendarApp';
import InputDate from '../components/calendar/InputDate';
import PopUpWindow from '../components/calendar/PopUpWindow';
import CalendarSelector from '../components/calendar/CalendarSelector';
import { LocaleContext } from '../components/calendar/LocaleContext';
import styles from '../styles/calendar-demo.module.sass';


export default function CalendarDemoPage() {
  const
    [date, setDate] = useState(new Date),
    [locale, setLocale] = useState('ru-RU');

  return <div className={styles['calendar-demo']}>
    <h1>InputDate</h1>
    <label> locale:
      {/* Выбор локализации в соответствии с которой будет выводиться дата */}
      <select value={locale} onChange={evt => setLocale(evt.target.value)}>
        {['ru-RU', 'en-US', 'ar', 'zh', 'ko', 'ja'].map(l =>
          <option key={l} value={l}>{l}</option>)}
      </select>
    </label>
    <hr />
    {/* LocaleContext.Provider - Обёртка, которая даёт понять, что переменная внутри контекста может быть использована для всех объектов внутри */}
    <LocaleContext.Provider value={locale}>
      <section>
        <fieldset>
          <h2>InputDate</h2>
          {/* Преобразование даты в читаемый вид */}
          Дата = {date.toLocaleString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
          {/* Вызов компонента с передачей ему начальной даты и функции задания даты */}
          <InputDate startDate={date} result={res => setDate(res)} />
        </fieldset>
      </section>
    </LocaleContext.Provider>
  </div>;
}