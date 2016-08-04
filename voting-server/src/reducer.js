import {setEntries, next, vote, restart, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action){
	console.log('action: ' + JSON.stringify(action) + '\r\n\r\n');
	switch(action.type){
		case 'SET_ENTRIES':
			return setEntries(state, action.entries);
		case 'NEXT':
			return next(state);
		case 'VOTE':
			return state.update('vote', voteState => vote(voteState, action.entry, action.clientId));
		case 'RESTART': 
			return restart(state);
	}
	return state;
}