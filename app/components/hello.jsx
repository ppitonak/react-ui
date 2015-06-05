'use strict';

import React from '../../dist/lib/react';

var Hello = React.createClass({
    render: function() {
      return (
        <h1>Hello { this.props.name || 'World'}!</h1>
      );
    }
  })

export default Hello;
