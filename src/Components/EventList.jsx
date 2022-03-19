import React from "react";
import {Table} from "react-bootstrap"
import SingleEvent from "./SingleEvent";

export default function EventList (events) {

   /*  console.log("props", events.events.events) */

    return(
<>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>Data</th>
      <th>Home Team</th>
      <th>Home Score</th>
      <th>Away Score</th>
      <th>Away Team</th>
    
    </tr>
  </thead>
  <tbody>
      <>
    {
        events.events?.map((e)=> (

           
             <>
          
        
            <SingleEvent key={e.idEvent} event={e} />
            </> 
        ))
    }
  </>
  </tbody>
</Table>
</>
    )
}

