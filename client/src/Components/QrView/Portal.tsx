import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: any;
  className?: string;
  el?: string;
}

export const Portal: React.FC<Props> = ({
  children,
  className = 'root-portal',
  el = 'div',
}) => {
  const [container] = React.useState(() => {
    // This will be executed only on the initial render
    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    return document.createElement(el);
  });

  React.useEffect(() => {
    container.classList.add(className);
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  // @ts-ignore
  return ReactDOM.createPortal(children, container);
};
