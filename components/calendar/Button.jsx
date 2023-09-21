import { memo } from 'react';

export default memo(function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
});