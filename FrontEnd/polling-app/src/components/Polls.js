
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Polls = () => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const response = await axios.get('http://localhost:8000/polls/');
            setPolls(response.data);
        } catch (error) {
            console.error('Error fetching polls:', error);
        }
    };

    const handleVote = async (pollId, choiceId) => {
        try {
            await axios.post(`http://localhost:8000/polls/${pollId}/vote/`, { choice_id: choiceId });
            fetchPolls(); // Refresh the poll data after voting
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    return (
        <div>
            <h1>Vote on Polls</h1>
            {polls.map((poll) => (
                <div key={poll.id}>
                    <h3>{poll.question}</h3>
                    <ul>
                        {poll.choices.map((choice) => (
                            <li key={choice.id}>
                                {choice.choice_text} - {choice.votes} votes
                                <button onClick={() => handleVote(poll.id, choice.id)}>Vote</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Polls;
