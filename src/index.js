// @flow
import React, { createRef } from 'react';
import { IntersectionElement } from 'react-intersection';

type Props = {
  src?: string,
  style: Object
};

type State = {
  isLoaded: boolean
};

export default class IntersectionImage extends React.PureComponent<
  Props,
  State
> {
  static defaultProps = {
    role: 'presentation',
    alt: ''
  };

  state = {
    isLoaded: false
  };

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.src !== this.props.src) {
      this.setState({ isLoaded: false }, this.loadImage);
    }
  }

  componentWillUnmount(): void {
    this.unloadImage();
  }

  image: ?Image;
  imgRef = createRef<HTMLImageElement>();

  checkIsIntersecting = ({ isIntersecting }: IntersectionObserverEntry) => {
    if (isIntersecting) {
      this.loadImage();
    }
  };

  onLoad = () => {
    if (this.imgRef.current && this.props.src) {
      this.imgRef.current.src = this.props.src;
      this.setState({ isLoaded: true });
    }
  };

  onError = () => {
    if (this.imgRef.current) {
      this.setState({ isLoaded: false });
    }
  };

  loadImage = () => {
    this.image = new Image();
    this.image.src = this.props.src ? this.props.src : '';

    if (this.image.decode) {
      this.image
        .decode()
        .then(this.onLoad)
        .catch(this.onError);
    } else {
      this.onLoad();
    }
  };

  unloadImage = () => {
    if (this.image) {
      this.image.onerror = null;
      this.image.onload = null;
      this.image.src = '';
      delete this.image;
    }
  };

  render() {
    const { isLoaded } = this.state;
    const { style, ...props } = this.props;
    const opacity = isLoaded ? 1 : 0;

    return (
      <IntersectionElement onChange={this.checkIsIntersecting} once>
        <img
          {...props}
          ref={this.imgRef}
          src={null}
          style={{ ...style, opacity }}
        />
      </IntersectionElement>
    );
  }
}
