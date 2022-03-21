import React, { useEffect, useState } from "react";
import { Container, Alert, Spinner, Row, Col, Form } from "react-bootstrap";
import EventList from "./EventList";

export default function Home() {


  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [year, setYear] = useState("2020-2021");
  const [team, setTeam] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([])
  const filteredArray = []
const yearArray = []

//here I dinamically build the array of seasons so I don't have to manually write every option later

for (let i=2000; i<2022; i++) {

    let seasons = `${i}-${i+1}`
    yearArray.push(seasons)
    

}
 
//here I fetch the events from the API but I can change the key for the season in the URL in order to fetch different data

  const fetchEvents = async (season) => {
      
    let URL = `https://www.thesportsdb.com/api/v1/json/2/eventsseason.php?id=4328&s=${season}`;

    try {
      let response = await fetch(URL);
      if (response.ok) {
        let data = await response.json();
        console.log(URL);
        console.log(data);
        setEvents(data);
        setIsLoading(false);
        setIsError(false);
        
      } else {
        // we'll fall here if the URL is mispelled or if the server has a problem
        console.log("an error happened in the fetch!");
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      // this is for a more generic error
      console.log("inside the catch block", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const filteredByTeam = (events) => {

    console.log("filtering function", events.events)
    events.events?.map((e)=> {

        if (team === e.strAwayTeam.toLowerCase()||team === e.strHomeTeam.toLowerCase()) {
           
            filteredArray.push(e)
            console.log("I'll show you this team last events", filteredArray)
 
      }else {
 
          console.log("I don't have this team in my records")
      }

    })

    //For further implementation I could filter the events by team

    /* events.events.events.map((e)=> {

     if (team === e.strAwayTeam.toLowerCase()||team === e.strHomeTeam.toLowerCase()) {
           
           filteredArray.push(e)
           console.log("I'll show you this team last events", filteredArray)

     }else {

         console.log("I don't have this team in my records")
     }
    }) */

}

//the app will fetch the 2020-2021 season events when mounting

  useEffect(() => {
    fetchEvents("2020-2021");
   
  }, []);
//if I change the year (season) the function fetchEvents is called again in order to fetch data from the targeted season

  useEffect(()=> {
      fetchEvents(year);
  }, [year])

  /* useEffect(()=> {
      filteredByTeam(events)
  }, [team]) */

  

  return (
    <>
      <Container fluid>
        <Row>
          <h3>PAST EVENTS</h3>
        {/*  if there is an error I will see an alert or a spinner if the loading isn't finished and I don't still have fetched the data*/} 
          {isError && (
            <Alert variant="danger">We got an error! </Alert>
          )}
          {isLoading && <Spinner animation="border" variant="success" />}
        </Row>

        <Row>
          <Col xs={6}>

            {/*   here I want to dinamically display the events fetched by passing them as props to EventList component */}
        <EventList events={events.events} />
        
          </Col>
          <Col xs={6}>
            <Form >
             
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Filter by season</Form.Label>
                <Form.Control as="select" value={year} onChange={(e)=>{
                   
                    setYear(e.target.value)
                    console.log(year)}}>
                  {yearArray.map((y)=> (
                      <option>{y}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
