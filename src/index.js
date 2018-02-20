import React from 'react';
import { IntersectionElement } from 'react-intersection';

export default class IntersectionImage extends React.PureComponent {
  static defaultProps = {
    role: 'presentation',
    alt: ''
  };

  state = {
    isIntersecting: false,
    isLoaded: false
  };
  
  checkIsIntersecting = ({ isIntersecting }) => isIntersecting && this.setState({ isIntersecting });

  onLoad = () => this.setState({ isLoaded: true });

  render() {
    const { isLoaded, isIntersecting } = this.state;
    const { onChange, src, style, ...props } = this.props;
    const opacity = isLoaded ? 1 : 0;

    return (
      <IntersectionElement onChange={this.checkIsIntersecting} once>
        <img
          {...props}
          src={isIntersecting ? src : null}
          onLoad={this.onLoad}
          style={{ ...style, opacity }}
        /> 
      </IntersectionElement>
    );
  }
}
