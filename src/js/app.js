import '../css/index.styl';

import {registerComponent} from 'aframe-core';
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import {component as aframeTextComponent} from 'aframe-text-component';
import key from 'keymaster';
import React from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';

import AssetSphere from './components/AssetSphere';
import Camera from './components/Camera';
import Cursor from './components/Cursor';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/workers/cache.js');
}

registerComponent('text', aframeTextComponent);

const Image = props => (
  <li className="asset" data-type="image" key={props.key}>
    {!props.visible &&
      <p>Loading...</p>
    }
    {props.visible &&
      <img onClick={props.onClick} src={props.src}/>
    }
    {props.visible &&
      <div className="asset-delete" onClick={props.onDelete}>x</div>
    }
  </li>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    /*
      let assets = ['img/360.jpg'];
      for (var i = 1 ; i <= 226; i++) {
        assets.push(`img/360%20(${i}).jpg`);
      }
    */

    // Check for assets in localStorage.
    let assets = [];
    const storedAssets = localStorage.getItem('v1:assets');
    if (storedAssets) {
      assets = JSON.parse(storedAssets);
    }

    this.state = {
      activeIndex: 0,
      assets: assets,
      input: ''
    };

    key('left', this.prev);
    key('right', this.next);
    key('space', this.next);
  }

  /**
   * Add asset to list.
   */
  addAsset = e => {
    e.preventDefault();

    const assets = this.state.assets.slice();
    assets.push(this.state.input);
    this.setState({
      assets: assets,
      input: ''
    });
    localStorage.setItem('v1:assets', JSON.stringify(assets));
  }

  /**
   * Remove asset.
   */
  removeAsset = i => {
    return () => {
      const assets = this.state.assets.slice();
      assets.splice(i, 1);
      this.setState({
        assets: assets
      });
      localStorage.setItem('v1:assets', JSON.stringify(assets));
    }
  }

  /**
   * Go to previous asset.
   */
  prev = () => {
    let index = this.state.activeIndex - 1;
    if (index < 0) {
      index = this.state.assets.length - 1;
    }
    this.setState({
      activeIndex: index
    });
  }

  /**
   * Go to next asset.
   */
  next = () => {
    let index = this.state.activeIndex + 1;
    if (index === this.state.assets.length) {
      index = 0;
    }
    this.setState({
      activeIndex: index
    });
  }

  /**
   * Jump to asset.
   */
  setActiveIndex = i => {
    return () => {
      this.setState({
        activeIndex: i
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Scene>
          <Camera><Cursor/></Camera>
          <AssetSphere onNext={this.next} onPrev={this.prev}
                       src={this.state.assets.length &&
                            `url(${this.state.assets[this.state.activeIndex]})`}/>
        </Scene>

        <div className="asset-dashboard">
          <h1>three schwifty</h1>

          <form onSubmit={this.addAsset}>
            <input onChange={e => {this.setState({input: e.target.value});}}
                   placeholder="Import image or video from URL..." type="text"
                   value={this.state.input}/>
          </form>

          <ul className="assets">
            {this.state.assets.map((asset, i) =>
              <LazyLoad offset={4 * window.innerHeight} scroll={false} wheel={true}>
                <Image key={i} onClick={this.setActiveIndex(i)}
                       onDelete={this.removeAsset(i)} src={asset}/>
              </LazyLoad>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.scene-container'));
