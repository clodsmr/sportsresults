import React, { useEffect, useState } from "react";
import { Container, Alert, Spinner, Row, Col, Form } from "react-bootstrap";
import EventList from "./EventList";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [year, setYear] = useState("");
  const [team, setTeam] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([])

const yearArray = []

for (let i=2000; i<2022; i++) {

    let seasons = `${i}-${i+1}`
    yearArray.push(seasons)
    

}


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
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

 const filteredByTeam = (events) => {
       
    console.log("inside filter function", events)
    events.events.map((e)=> {
        if (e.strAwayTeam.toLowerCase()===team) {
            console.log("we have a match")
           setFilteredEvents(e.strAwayTeam.toLowerCase())
        }else if (e.strHomeTeam.toLowerCase()=== team) {
            console.log("we have a match")
            setFilteredEvents(e.strHomeTeam.toLowerCase())
        }else {
            console.log("we don't have this team")
        setFilteredEvents(null)}
    })
   
 } 

  useEffect(() => {
    fetchEvents("2020-2021");
   
  }, []);

  useEffect(()=> {
      fetchEvents(year);
  }, [year])

  useEffect(()=> {
      console.log(events)
     filteredByTeam(events)
  }, [team])

  return (
    <>
      <Container fluid>
        <Row>
          <h3>PAST EVENTS</h3>
          {isError && (
            <Alert variant="danger">Aww snap, we got an error! :(</Alert>
          )}
          {isLoading && <Spinner animation="border" variant="success" />}
        </Row>

        <Row>
          <Col xs={6}>
              {team ? <EventList events={filteredEvents} /> : <EventList events={events} />}
            
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
             
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Filter by Team</Form.Label>
                <Form.Control as="textarea" rows={1} onChange={(e)=> {
                    setTeam(e.target.value.toLowerCase())
                    console.log(team)
                  
                }}/>
              </Form.Group>
              
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
