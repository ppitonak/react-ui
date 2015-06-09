'use strict';

var React = require('../../node_modules/react/react');

module.exports = React.createClass({
    render: function() {
      return (
        <h1>Hello { this.props.name || 'World'}!</h1>
      );
    }
  })
