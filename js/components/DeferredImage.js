import React from "react";

export default class DeferredImage extends React.Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired
  }

  renderImg = img => {
    if (img) {
      img.setAttribute('src', this.props.src);
    }
  }

  render() {
    return (
      <img className={this.props.className} onClick={this.props.onClick}
           ref={this.renderImg}/>
    );
  }
}
