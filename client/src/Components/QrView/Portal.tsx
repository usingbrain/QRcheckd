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

// export class Portal extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     // STEP 1: create a container <div>
//     this.containerEl = document.createElement('div');
//     this.externalWindow = null;
//   }

//   render() {
//     // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
//     return ReactDOM.createPortal(this.props.children, this.containerEl);
//   }

//   componentDidMount() {
//     // STEP 3: open a new browser window and store a reference to it
//     this.externalWindow = window.open(
//       '',
//       '',
//       'width=600,height=400,left=200,top=200'
//     );

//     // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
//     this.externalWindow.document.body.appendChild(this.containerEl);
//   }

//   componentWillUnmount() {
//     // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
//     // So we tidy up by closing the window
//     this.externalWindow.close();
//   }
// }
