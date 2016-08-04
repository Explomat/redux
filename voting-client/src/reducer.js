import {List, Map} from 'immutable';

function setState(state, newState) {
	return state.merge(newState);
}

function vote(state, entry) {
	const currentPair = state.getIn(['vote', 'pair']);
	if (currentPair && currentPair.includes(entry)){
		return state.set('hasVoted', entry);
	} 
	return state;
}

function resetVote(state, prevRound) {
  //const hasVoted = state.get('hasVoted');

  const currentRound = state.get('round');
  //const currentPair = state.getIn(['vote', 'pair'], List());
  if (currentRound !== prevRound) {
	return state.remove('hasVoted');
  }
  return state;
}

export default function(state = Map(), action) {
	switch (action.type) {
		case 'SET_STATE':
			return resetVote(setState(state, action.state), state.get('round'));
		case 'VOTE':
    		return vote(state, action.entry);
    	case 'SET_CLIENT_ID':
    		return state.set('clientId', action.clientId);
    	case 'CONNECTION_STATUS':
    		return state.set('connectionStatus', action.status);
	}
	return state;
}