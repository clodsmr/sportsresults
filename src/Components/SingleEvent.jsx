import React from "react";


export default function SingleEvent (event) {

    return (

        

        <>
       
        <tr>
         <td>{event.event.dateEvent}</td>
         <td>{event.event.strHomeTeam}</td>
         <td>{event.event.intHomeScore}</td>
         <td>{event.event.intAwayScore}</td>
         <td>{event.event.strAwayTeam}</td>
        </tr>

        </>
    )
}