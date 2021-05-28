import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';

import './MatchPage.scss';

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
            <div className="year-selector">
                <h3>Select Year</h3>
                <YearSelector teamName = {teamName} />
            </div>
            
            <div className="page-heading">
                <h1>{teamName} matches in {year}</h1>
                { matches.map(match => <MatchDetailCard key={match.id} match={match} teamName={teamName} />)}
            </div>
        </div>
    );
}

// url - http://localhost:8080/team/Sunrisers%20Hyderabad/matches?year=2019
//     - http://localhost:3000/team/Mumbai%20Indians/matches/2019