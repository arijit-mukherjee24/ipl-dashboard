import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';

export const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();

    useEffect(
        () => {

            const fetchMathesByYear = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await response.json();
                setMatches(data);
            };
            fetchMathesByYear();


        }, [teamName, year]
    );


    return (
        <div className="MatchPage">
            <h1>Match Page</h1>
            { matches.map(match => <MatchDetailCard key={match.id} match={match} teamName={teamName} />)}
        </div>
    );
}

// url - http://localhost:8080/team/Sunrisers%20Hyderabad/matches?year=2019
//     - http://localhost:3000/team/Mumbai%20Indians/matches?year=2019