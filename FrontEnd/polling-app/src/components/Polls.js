import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Polls = () => {
    const [polls, setPolls] = useState([]);
    const [votedPolls, setVotedPolls] = useState({});

    useEffect(() => {
        fetchPolls();
        loadVotedPollsFromStorage(); // Load voted polls from localStorage on component mount
    }, []);

    const fetchPolls = async () => {
        try {
            const response = await axios.get('https://livepoll.pythonanywhere.com/polls/');
            setPolls(response.data);
        } catch (error) {
            console.error('Error fetching polls:', error);
        }
    };

    const handleVote = async (pollId, choiceId) => {
        try {
            await axios.post(`https://livepoll.pythonanywhere.com/polls/${pollId}/vote/`, { choice_id: choiceId });
            const updatedVotedPolls = { ...votedPolls, [pollId]: choiceId };
            setVotedPolls(updatedVotedPolls);
            saveVotedPollsToStorage(updatedVotedPolls); // Save updated voted polls to localStorage
        } catch (error) {
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                console.error('Error submitting vote:', error);
            }
        }
    };

    const calculatePercentage = (choiceVotes, totalVotes) => {
        return totalVotes === 0 ? 0 : ((choiceVotes / totalVotes) * 100).toFixed(1);
    };

    const loadVotedPollsFromStorage = () => {
        const storedVotedPolls = localStorage.getItem('votedPolls');
        if (storedVotedPolls) {
            setVotedPolls(JSON.parse(storedVotedPolls));
        }
    };

    const saveVotedPollsToStorage = (updatedVotedPolls) => {
        localStorage.setItem('votedPolls', JSON.stringify(updatedVotedPolls));
    };

    return (
        <div className="poll-container">
            <h1 className="title">Vote on Polls</h1>
            {polls.length > 0 && (
                <div className={`poll-section latest ${votedPolls[polls[0].id] ? 'voted' : ''}`}>
                    <h3 className="section-title">Latest Poll</h3>
                    <div key={polls[0].id} className="poll">
                        <div className="poll-header">
                            <h3 className="poll-question">{polls[0].question}</h3>
                        </div>
                        <ul className="choices-list">
                            {polls[0].choices.map((choice) => {
                                const totalVotes = polls[0].choices.reduce((acc, c) => acc + c.votes, 0);
                                const percentage = calculatePercentage(choice.votes, totalVotes);
                                const isVoted = votedPolls[polls[0].id] === choice.id;
                                return (
                                    <li key={choice.id} className="choice-item" onClick={() => handleVote(polls[0].id, choice.id)}>
                                        <span>{choice.choice_text}</span>
                                        <div className="vote-result" style={{ width: `${percentage}%`, backgroundColor: isVoted ? 'green' : ' #1877f2' }}>
                                            {percentage}%
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
            <div className="poll-section history">
                <h3 className="section-title">Poll History</h3>
                {polls.map((poll) => (
                    <div key={poll.id} className="poll">
                        <div className="poll-header">
                            <h3 className="poll-question">{poll.question}</h3>
                        </div>
                        <ul className="choices-list">
                            {poll.choices.map((choice) => {
                                const totalVotes = poll.choices.reduce((acc, c) => acc + c.votes, 0);
                                const percentage = calculatePercentage(choice.votes, totalVotes);
                                const isVoted = votedPolls[poll.id] === choice.id;
                                return (
                                    <li key={choice.id} className="choice-item">
                                        <span>{choice.choice_text}</span>
                                        <div className="vote-result" style={{ width: `${percentage}%`, backgroundColor: isVoted ? 'green' : ' #1877f2' }}>
                                            {percentage}%
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Polls;

