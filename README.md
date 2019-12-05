# <img alt="React Intersection Image" src="https://user-images.githubusercontent.com/7850794/36429384-7954d29c-164a-11e8-8956-957c4766a04d.png" width="500">

[![npm](https://img.shields.io/npm/v/react-intersection-image.svg?style=flat-square)](https://www.npmjs.com/package/react-intersection) [![npm](https://img.shields.io/npm/dm/react-intersection-image.svg?style=flat-square)](https://www.npmjs.com/package/react-intersection) 

**React Intersection Image** is a tiny lazy-loaded image component, built with [React Intersection](https://github.com/drivetribe/react-intersection).

It uses the Intersection Observer API, so it's performant. It uses React Intersection, so it's tiny too!

By default, `react-intersection-image` uses `HTMLImageElement.decode()` to decode the image first before being rendered.

## Contents

- [Install](#install)
- [Usage](#usage)
- [Social](#social)

## Install

```bash
npm install react-intersection-image --save
```

## Usage

### Lazy load images

Simply swap an `img` component for `IntersectionImage` to load images when they enter the viewport:

```javascript
import IntersectionImage from 'react-intersection-image';

export default () => (
  <IntersectionImage src="path/to/image" />
);
```

### Add a fade transition

`IntersectionImage` switches `opacity` from `0` to `1` when the image has loaded.

You can add a fade in animation by adding a CSS `transition` rule via the method of your choosing. For instance:

```javascript
// `style` prop
<IntersectionImage src="path/to/image" style={{ transition: 'opacity 500ms linear' }} />

// `className` prop
<IntersectionImage src="path/to/image" className="with-transition" />

// Styled Components
const Image = styled(IntersectionImage)`
  transition: opacity 500ms linear;
`;
```

### Define a new `IntersectionRoot`

Because `IntersectionImage` is built on [React Intersection](https://github.com/drivetribe/react-intersection), it will subscribe to the nearest parent `IntersectionRoot` (or the viewport if none exists).

We can create a new `IntersectionRoot` on a different parent element or with a different `margin`, and share that with other `IntersectionElement`s:

```javascript
import { IntersectionRoot, IntersectionElement } from 'react-intersection';
import IntersectionImage from 'react-intersection-image';

const LoadMore = ({ onChange }) => (
  <IntersectionElement onChange={onChange}>
    <li>{`Loading...`}</li>
  </IntersectionElement>
);

export default ({ images, loadMoreImages }) => (
  <IntersectionRoot margin="0px 200px 0px 0px">
    <ul>
      {images.forEach(({ src }) => (
        <li>
          <IntersectionImage src={src} />
        </li>
      ))}
      <LoadMore onChange={loadMoreImages} />
    </ul>
  </IntersectionRoot>
);
```
