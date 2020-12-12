# Recoil Anywhere

This is a tiny little addition to Recoil.js. It allows you to use Recoil anyhwere in your code, not just inside React Components. It also includes a useReactRef to enable using Recoil without components re-render.

## Installation
The Recoil Anywhere package lives in npm. To install, run the following command:
```shell
npm install --save recoil-anywhere
```

## Set up
Add Recoil Anywhere custom hook inside your Recoil Root:
```javascript
import React from 'react';
import { RecoilRoot } from 'recoil';
import { RecoilAnywhere } from 'recoil-anywhere';

function App() {
  return (
    <RecoilRoot>
      <RecoilAnywhere />
      ...
    </RecoilRoot>
  );
}
```
Now you can use Recoil anywhere

## Examples
1. Using Recoil inside functions:
```typescript
// atom.js
const CounterState = atom({
    key: 'CounterState',
    default: 1
})

// math.js
const multiply = (a, b) => a * b

// component.tsx:
import { recoil } from 'recoil-anywhere'
import { CounterState } from './atom.js'
import { multiply } from './math.js'

function Component() {
    function multiplyCounter(multiplier: number) {
        const counter = recoil.get(CounterState)
        return multiply(counter, multiplier)
    }
}
```

2. In fact, now Recoil can be used in any file, even outside React Components:
```typescript
// computed.ts
import { recoil } from 'recoil-anywhere'
import { CounterState } from './atom.js'

const getMultipliedCounter = (multiplier: number) {
    const counter = recoil.get(CounterState)
    return counter * multiplier
}
```

## Recoil Ref Hook

This package also contains Recoil Ref hook. It prevents unwanted re-renders when Recoil value is updated:
```typescript
import { useRecoilRef } from 'recoil-anywhere'
import { CounterState } from './atom.js'

function Component() {
    const counter = useRecoilRef(CounterState)
    ...
}
```