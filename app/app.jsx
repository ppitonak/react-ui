'use strict';

import React from '../dist/lib/react';
import Hello from './components/hello';

React.render(
  <div>
    <Hello />
    <Hello name='Paul'/>
    <Hello name='John'/>
  </div>,
  document.getElementById('content')
);
