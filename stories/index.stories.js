import React from 'react';
import IntersectionImage from '../src';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const IntersectionImageDemo = () => (
  <div style={{ paddingTop: '200vh' }}>
    <IntersectionImage
      src="https://user-images.githubusercontent.com/7850794/34434126-db688af8-ec7b-11e7-9527-a7a2c37edc3b.png"
      style={{ transition: 'opacity 1000ms linear' }}
    />
  </div>
);

const IntersectionImageDemo2 = () => (
  <div style={{ paddingTop: '200vh' }}>
    <IntersectionImage style={{ transition: 'opacity 1000ms linear' }} />
  </div>
);

storiesOf('React Intersection Image', module)
  .add('Demo', IntersectionImageDemo)
  .add('Demo - no src defined', IntersectionImageDemo2);
