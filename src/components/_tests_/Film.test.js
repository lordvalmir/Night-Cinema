import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import Home   from '../Home/Home';
describe('ProductHeader', () => {
 
  it('passing test', () => {
    expect(true).toBeTruthy();
  })
 
  it('failing test', () => {
    expect(false).toBeFalsy();
  })
})

describe('Film has: ', () => {
  it('Film has container', () => {
    const component = ReactTestUtils.renderIntoDocument(<Home/>);    
    var node = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'Title');
  })
})