'use strict';

var React = require('../../dist/lib/react');

module.exports = React.createClass({
    render: function() {
      return (
        <h1>Hello { this.props.name || 'World'}!</h1>
      );
    }
  })
