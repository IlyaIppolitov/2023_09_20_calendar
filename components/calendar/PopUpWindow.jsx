import style from './PopUpWindow.module.css';

// Компонент для реализации всплывающего окна
// в качестве children будет передан объект, который должен быть внутри всплывающего окна
export default function PopUpWindow({ children }) {
  return <div className={style['pop-up']}>{children}</div>;
}