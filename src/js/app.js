import '../css/index.styl';

import 'aframe-core';
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import key from 'keymaster';
import React from 'react';
import ReactDOM from 'react-dom';

import AssetSphere from './components/AssetSphere';

class App extends React.Component {
  constructor(props) {
    super(props);

    let assets = ['img/360.jpg'];
    for (var i = 1 ; i <= 226; i++) {
      assets.push(`img/360%20(${i}).jpg`);
    }

    this.state = {
      activeIndex: 0,
      assets: assets
    };

    key('left', () => {
      this.setState({
        activeIndex: this.state.activeIndex - 1
      });
    });

    key('right', () => {
      this.setState({
        activeIndex: this.state.activeIndex + 1
      });
    });
  }

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
        <a-assets>
          {this.state.assets.map((asset, i) =>
            <img id={`asset-${i}`} src={asset}/>
          )}
        </a-assets>

        <Scene>
          <AssetSphere src={`#asset-${this.state.activeIndex}`}/>
        </Scene>

        <div className="asset-dashboard">
          <input placeholder="Import image or video from URL..." type="text"/>
          <ul className="assets">
            {this.state.assets.map((asset, i) =>
              <li data-type="image" key={i}>
                <img onClick={this.setActiveIndex(i)} src={asset}/>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.scene-container'));
