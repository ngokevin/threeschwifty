import {Entity} from 'aframe-react';
import React from 'react';

export default class AssetSphere extends React.Component {
  static propTypes = {
    onNext: React.PropTypes.func,
    onPrev: React.PropTypes.func,
    src: React.PropTypes.string
  };

  render() {
    const props = this.props;

    let material = {
      shader: 'flat'
    };
    if (props.src) {
      material.src = props.src;
    } else {
      material.color = '#73CFF0';
    }

    return (
      <Entity>
        <Entity id="sphere"
                geometry={{primitive: 'sphere', radius: 5000}}
                material={material} scale="1 1 -1"/>
        <Entity id="menu" position="0 -1.8 0" rotation="90 0 0">
          <Entity id="prev"
                  geometry={{primitive: 'torus', segmentsTubular: 60, radius: 1,
                             radiusTubular: 0.05, arc: 180}}
                  material={{color: '#FFF', opacity: 0.8, shader: 'flat',
                             transparent: true}}/>
          <Entity id="next"
                  geometry={{primitive: 'torus', segmentsTubular: 60, radius: 1,
                             radiusTubular: 0.05, arc: 180}}
                  material={{color: '#CCC', opacity: 0.8, shader: 'flat',
                             transparent: true}}
                  rotation="0 0 180"/>
        </Entity>
      </Entity>
    );
  }
};
