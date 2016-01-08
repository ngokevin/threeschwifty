import {Entity} from 'aframe-react';
import extend from 'deep-assign'
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
        <Nav {...this.props}/>
      </Entity>
    );
  }
};


class Nav extends React.Component {
  static propTypes = {
    onNext: React.PropTypes.func,
    onPrev: React.PropTypes.func
  };

  render() {
    return (
      <Entity id="nav" position="0 -1.8 0" rotation="90 -90 0">
        <NavLink id="prev" onClick={this.props.onPrev}
                 opacity={0.3} rotation="0 0 0"
                 text="prev" textPosition="0 0.53 -0.1" textRotation="0 180 -90"/>
        <NavLink id="next" onClick={this.props.onNext}
                 opacity={0.5} rotation="0 0 180"
                 text="next" textPosition="0 0.40 -0.1" textRotation="0 180 90"/>
      </Entity>
    );
  }
}

function NavLink (props) {
  const components = {
    geometry: {arc: 180, primitive: 'torus', radius: 0.5, radiusTubular: 0.05,
               segmentsTubular: 60},
    material: {color: '#FFF', opacity: props.opacity, shader: 'flat', transparent: true},
    rotation: props.rotation,
  };

  const textComponents = {
    text: {text: props.text, height: 0.01, size: 0.05},
    material: {color: '#333', shader: 'flat'},
    position: props.textPosition,
    rotation: props.textRotation
  }

  return (
    <Entity id={props.id} onClick={props.onClick} {...components}>
      <Entity {...textComponents}/>
    </Entity>
  );
}
