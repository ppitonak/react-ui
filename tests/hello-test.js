'use strict';

require('./util/testdom')('<html><body></body></html>');
var React = require('react/addons');
var Hello = require('../app/components/hello.jsx');
var TestUtils = React.addons.TestUtils;
var expect = require('chai').expect;

describe('Hello', function() {

  it('greets the world when no name is provided', function() {
    var hello = TestUtils.renderIntoDocument(
      <Hello />
    );

    var h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
    expect(h1.getDOMNode().textContent).to.equal('Hello World!');
  });

  it('greets a person whose name is provided', function() {
    var hello = TestUtils.renderIntoDocument(
      <Hello name='John'/>
    );

    var h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
    expect(h1.getDOMNode().textContent).to.equal('Hello John!');
  });
});
