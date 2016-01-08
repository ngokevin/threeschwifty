import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity position="0 0 0">
    <Entity camera look-controls {...props}/>
  </Entity>
);
