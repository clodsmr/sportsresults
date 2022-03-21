import React from "react";
import { Table } from "react-bootstrap";
import SingleEvent from "./SingleEvent";

export default function EventList(events) {
  /*  console.log("props", events.events.events) */

  return (
    <>
      {/*  here I structure the table that I will then fill with the data from the API,
       it allows me to reuse it with another data such as events of one single team */}

      <Table className="d-flex flex-column">
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
            {/*  I map the array of results that I've before passed as props in order to display in the table each event */}
            {events.events?.map((e) => (
              <>
                {/*   single event gets the data array and display it in the proper columns of the table */}

                <SingleEvent key={e.idEvent} event={e} />
              </>
            ))}
          </>
        </tbody>
      </Table>
    </>
  );
}
