// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract VotingApp {
    // List of candidates
    string[] public candidates;

    // Mapping to store votes for each candidate
    mapping(string => uint256) public votes;

    // Constructor to add candidates to the list
    constructor(string[] memory _candidates) {
        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(_candidates[i]);
            votes[_candidates[i]] = 0;
        }
    }

    // Function to cast a vote for a candidate
    function vote(string memory candidate) public {
        require(validCandidate(candidate), "Invalid candidate");
        votes[candidate]++;
    }

    // Function to check if a candidate is valid
    function validCandidate(
        string memory candidate
    ) public view returns (bool) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                keccak256(bytes(candidates[i])) == keccak256(bytes(candidate))
            ) {
                return true;
            }
        }
        return false;
    }

    // Function to get the total number of votes for a candidate
    function totalVotesFor(
        string memory candidate
    ) public view returns (uint256) {
        require(validCandidate(candidate), "Invalid candidate");
        return votes[candidate];
    }
}
