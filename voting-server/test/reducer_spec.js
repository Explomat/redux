import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

	it('может использоваться с reduce', () => {
	  const actions = [
	    {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
	    {type: 'NEXT'},
	    {type: 'VOTE', entry: 'Trainspotting'},
	    {type: 'VOTE', entry: '28 Days Later'},
	    {type: 'VOTE', entry: 'Trainspotting'},
	    {type: 'NEXT'}
	  ];
	  const finalState = actions.reduce(reducer, Map());

	  expect(finalState).to.equal(fromJS({
	    winner: 'Trainspotting'
	  }));
	});
});