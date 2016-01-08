import React from 'react';
import LazyLoad from 'react-lazyload';

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
      assetInput: ''
    };
  }

  render() {
    return (
      <div className="asset-dashboard">
        <div className="asset-dashboard-header">
          <h1 className="asset-dashboard-title">three schwifty</h1>
          <a className="asset-dashboard-share" href="#share" onClick={this.share}>share</a>
        </div>

        <form onSubmit={this.props.addAsset}>
          <input onChange={e => {this.setState({assetInput: e.target.value});}}
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
        <video autoplay="false" className="asset" onClick={props.onClick} preload="none"
               ref={showVideoThumbnail} src={props.src}/>
      }
      {props.visible &&
        <div className="asset-delete" onClick={props.onDelete}>x</div>
      }
    </li>
  );
}
