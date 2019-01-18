export function createVote(vote) {
    return {type: 'CREATE_VOTE', vote};
}

export function createVotes(votes){
    return {type: 'CREATE_VOTES', votes}
}