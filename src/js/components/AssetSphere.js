import {Entity} from 'aframe-react';
import React from 'react';

export default props => {
  let material = {
    shader: 'flat'
  };
  if (props.src) {
    material.src = props.src;
  } else {
    material.color = '#73CFF0';
  }

  return (
    <Entity geometry={{primitive: 'sphere', radius: 5000}}
            material={material} scale="1 1 -1"/>
  );
};
