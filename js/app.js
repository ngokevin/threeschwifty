import '../css/index.styl';

import {registerComponent} from 'aframe-core';
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import {component as aframeTextComponent} from 'aframe-text-component';
import key from 'keymaster';
import React from 'react';
import ReactDOM from 'react-dom';
import Url from 'urlgray';

import AssetDashboard from './components/AssetDashboard';
import AssetSphere from './components/AssetSphere';
import Camera from './components/Camera';
import Cursor from './components/Cursor';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/workers/cache.js');
}

registerComponent('text', aframeTextComponent);

class App extends React.Component {
  constructor(props) {
    super(props);

    /*
      let assets = ['img/360.jpg'];
      for (var i = 1 ; i <= 226; i++) {
        assets.push(`img/360%20(${i}).jpg`);
      }
    */

    this.state = {
      activeIndex: 0,
      assets: getInitialAssets(),
      input: ''
    };

    key('left', this.prev);
    key('up', this.prev);
    key('j', this.prev);
    key('right', this.next);
    key('down', this.next);
    key('k', this.prev);
    key('space', this.next);
  }

  /**
   * Add asset to list.
   */
  addAsset = asset => {
    return e => {
      e.preventDefault();

      const assets = this.state.assets.slice();
      assets.push(asset);
      this.setState({
        assets: assets,
        input: ''
      });
      localStorage.setItem('v1:assets', JSON.stringify(assets));
    };
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

        <AssetDashboard addAsset={this.addAsset} assets={this.state.assets}
                        removeAsset={this.removeAsset} setActiveIndex={this.setActiveIndex}/>
      </div>
    );
  }
}

function getInitialAssets () {
   if (window.location.search) {
    // Check for assets in the URL.
    var query = Url(window.location.search).query;
    if (query.share) {
      return JSON.parse(query.share);
    }
  } else {
    // Check for assets in localStorage.
    const storedAssets = localStorage.getItem('v1:assets');
    if (storedAssets) {
      return JSON.parse(storedAssets);
    }
  }
  return [];
}

ReactDOM.render(<App/>, document.querySelector('.scene-container'));
