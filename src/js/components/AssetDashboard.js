import React from 'react';
import LazyLoad from 'react-lazyload';
import Url from 'urlgray';

export default class AssetDashboard extends React.Component {
  static propTypes = {
    addAsset: React.PropTypes.func,
    asset: React.PropTypes.array,
    removeAsset: React.PropTypes.func,
    setActiveIndex: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      assetInput: '',
      showShare: false
    };
  }

  render() {
    return (
      <div className="asset-dashboard">
        <div className="asset-dashboard-header">
          <h1 className="asset-dashboard-title">three schwifty</h1>
          <a className="asset-dashboard-share-link" href="#share"
             onClick={() => {this.setState({showShare: !this.state.showShare});}}>share</a>
        </div>

        <Share assets={this.props.assets} visible={this.state.showShare}/>

        <form onSubmit={this.props.addAsset}>
          <input className="asset-input"
                 onChange={e => {this.setState({assetInput: e.target.value});}}
                 placeholder="Import image or video from URL..." type="text"
                 value={this.state.assetInput}/>
        </form>

        <ul className="assets">
          {this.props.assets.map((asset, i) =>
            <LazyLoad key={i} offset={4 * window.innerHeight} scroll={false} wheel={true}>
              <Asset onClick={this.props.setActiveIndex(i)}
                     onDelete={this.props.removeAsset(i)} src={asset}/>
            </LazyLoad>
          )}
        </ul>
      </div>
    );
  }
}

function Asset (props) {
  const isImage = props.src.endsWith('.jpg') || props.src.endsWith('.png') ||
                  props.src.endsWith('.gif');
  const isVideo = !isImage;

  function showVideoThumbnail (video) {
    if (!video) { return; }
    video.play();
    setTimeout(() => {
      video.pause();
    }, 100);
  }

  return (
    <li className="asset-item" data-type={isImage && 'image' || 'video'} key={props.key}>
      {!props.visible &&
        <p>Loading...</p>
      }
      {props.visible && isImage &&
        <img className="asset" onClick={props.onClick} src={props.src}/>
      }
      {props.visible && isVideo &&
        <video autoPlay="false" className="asset" onClick={props.onClick} preload="none"
               ref={showVideoThumbnail} src={props.src}/>
      }
      {props.visible &&
        <div className="asset-delete" onClick={props.onDelete}>x</div>
      }
    </li>
  );
}

function Share (props) {
  const link = Url(window.location.origin).q({share: JSON.stringify(props.assets)});

  return (
    <div className="share" data-visible={props.visible}>
      <label for="share-link">Share this link!</label>
      <input id="share-link" value={link}/>
    </div>
  );
}
