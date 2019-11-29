import React, { createRef } from "react";
import { IntersectionElement } from "react-intersection";

export default class IntersectionImage extends React.PureComponent {
  static defaultProps = {
    role: "presentation",
    alt: ""
  };

  state = {
    isLoaded: false
  };

  image;
  imgRef = createRef();

  checkIsIntersecting = ({ isIntersecting }) => {
    if (isIntersecting) {
      this.loadImage();
    }
  };

  imgOnLoad = () => this.setState({ isLoaded: true });

  onLoad = () => (this.imgRef.src = this.props.src);

  onError = () => (this.imgRef.src = null);

  loadImage = () => {
    this.image = new Image();
    this.image.src = this.props.src;

    if ("decode" in this.image) {
      this.image
        .decode()
        .then(this.onLoad)
        .catch(this.onError);
    } else {
      this.onLoad();
    }
  };

  render() {
    const { isLoaded } = this.state;
    const { onChange, src, style, ...props } = this.props;
    const opacity = isLoaded ? 1 : 0;

    return (
      <IntersectionElement onChange={this.checkIsIntersecting} once>
        <img
          {...props}
          onLoad={this.imgOnLoad}
          ref={this.imgRef}
          src={null}
          style={{ ...style, opacity }}
        />
      </IntersectionElement>
    );
  }
}
