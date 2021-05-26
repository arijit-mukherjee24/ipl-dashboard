import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { MatchDetailCard } from './../components/MatchDetailCard';

export const TeamPage = () => {

    const [team, setTeam] = useState({ matches: [] });
    const { teamName } = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                console.log(data);
                setTeam(data);

            };
            fetchMatches();
        }, [teamName]

    );

    if (!team || !team.teamName) {
        return <h1> Team not found </h1>
    }

    return (
        <div className="TeamPage">
            <h1>{team.teamName}</h1>
            <MatchDetailCard match={team.matches[0]} teamName={team.teamName} />
            {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} match={match} teamName={team.teamName} />)}
        </div>
    );
}


// localhost:3000/teams/Rajasthan


