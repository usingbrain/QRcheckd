import React from 'react';
import Lottie from 'react-lottie';
import checkedAnimationData from '../../Assets/checkedAnimation.json';
import errorAnimationData from '../../Assets/errorAnimation.json';

interface Props {
  message: string;
}

const errorAnimOptions = {
  loop: true,
  autoplay: true,
  animationData: errorAnimationData,
  rendererSettings: {},
};
const checkedAnimOptions = {
  loop: true,
  autoplay: true,
  animationData: checkedAnimationData,
  rendererSettings: {},
};

const Result: React.FC<Props> = ({ message }) => {
  const positive =
    message === 'Q R Checkd!' || message === 'Register successfull' || false;
  return (
    <div className='w-3/4 h-3/4'>
      {positive ? (
        <Lottie options={checkedAnimOptions} height={'85%'} width={'100%'} />
      ) : (
        <Lottie options={errorAnimOptions} height={'85%'} width={'100%'} />
      )}
      <h2 className='font-bold text-2xl'>{message}</h2>
    </div>
  );
};

export default Result;
