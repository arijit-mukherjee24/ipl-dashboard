import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { MatchDetailCard } from './../components/MatchDetailCard';
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

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
            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>
            <div className="win-loss-section">
                Wins/ Losses
                <PieChart
                    data={[
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },
                        { title: 'Win', value: team.totalWins, color: '#4da375' }
                    ]}
                />
            </div>
            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailCard match={team.matches[0]} teamName={team.teamName} />
            </div>

            {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} match={match} teamName={team.teamName} />)}
            <div className="more-link">
                <a href="#">More</a>
            </div>
        </div>
    );
}


// url - http://localhost:3000/team/Mumbai Indians


