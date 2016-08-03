import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes) return [a];
  else if (aVotes < bVotes)	return [b];
  else return [a, b];
}

export function next(state){
	const entries = state.get('entries').concat(getWinners(state.get('vote')));
	if (entries.size === 1){
		return state.remove('vote')
					.remove('entries')
					.set('winner', entries.first());
	}
	else {
    const newState = state.merge({
      round: state.get('round', 0) + 1,
			vote: Map({pair: entries.take(2)}),
			entries: entries.skip(2)
		});
    console.log(newState);
    return newState;
	}
}

function removePreviosVote(voteState, clientId){
  const previousVote = voteState.getIn(['votes', clientId]);
  if (previousVote){
    return voteState.updateIn(['tally', previousVote], t => t - 1)
                    .removeIn(['votes', clientId]);
  }
  return voteState;
}

export function vote(voteState, entry, clientId) {
  const newState = removePreviosVote(voteState, clientId);
  if (newState.get('pair').includes(entry)){
    return newState.updateIn(
      ['tally', entry],
      0,
      tally => tally + 1
    ).setIn(['votes', clientId], entry);
  }
  return newState;
}