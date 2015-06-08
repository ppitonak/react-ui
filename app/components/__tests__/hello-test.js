jest.dontMock('../hello.jsx');

describe('Hello', function() {

  var React = require('react/addons');
  var Hello = require('../hello.jsx');
  var TestUtils = React.addons.TestUtils;

  it('greets the world when no name is provided', function() {
    var hello = TestUtils.renderIntoDocument(
      <Hello />
    );

    var h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
    expect(h1.getDOMNode().textContent).toEqual('Hello World!');
  });

  it('greets a person whose name is provided', function() {
    var hello = TestUtils.renderIntoDocument(
      <Hello name='John'/>
    );

    var h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
    expect(h1.getDOMNode().textContent).toEqual('Hello John!');
  });
});
