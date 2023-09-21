import { createContext } from 'react';

// Контекст позволяет компонентам передавать информацию глубоко вниз без явной передачи свойств.
export const LocaleContext = createContext('ru-RU');