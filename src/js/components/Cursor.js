import {Entity} from 'aframe-react';
import React from 'react';

export default props => {
  const components = {
    cursor: {
      fuse: true,
      timeout: 200
    },
    geometry: {
      primitive: 'ring',
      radiusInner: 0.01,
      radiusOuter: 0.016,
      segmentsTheta: 36
    },
    material: {
      color: '#FFF',
      shader: 'flat',
      opacity: 0.2,
      transparent: true
    },
    position: '0 0 -1'
  };
  return (
    <Entity {...components}/>
  );
}
