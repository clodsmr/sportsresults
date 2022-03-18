import React, { useEffect, useState } from "react";
import { Container, Alert, Spinner, Row, Col } from "react-bootstrap";
import EventList from "./EventList";

export default function Home () {

    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    

    
  
    const fetchEvents = async (season) => {

        
        let URL = `https://www.thesportsdb.com/api/v1/json/2/eventsseason.php?id=4328&s=${season}`

        try {
            let response = await fetch(URL)
            if (response.ok) {
                let data = await response.json()
                console.log(URL)
                console.log(data)
                setEvents(data)
                setIsLoading(false)
                setIsError(false)
            } else {
                // we'll fall here if the URL is mispelled or if the server has a problem
                console.log('an error happened in the fetch!')
                setIsLoading(false)
                setIsError(true)
            }
        } catch (error) {
            // this is for a more generic error
            console.log(error)
            setIsLoading(false)
            setIsError(true)
        }
    }

    useEffect (()=> {
        fetchEvents("2020-2021")
    }, [])


    return (


        <>
         <Container fluid>
             <Row>
             <h3>PAST EVENTS</h3>
            {
                isError && (
                    <Alert variant="danger">
                        Aww snap, we got an error! :(
                    </Alert>
                )
            }
            {
                isLoading && <Spinner animation="border" variant="success" />
            }
             </Row>

             <Row>
                 <Col>
                 <EventList events={events}/>
                 </Col>
                 <Col>

                 </Col>
                
             </Row>

         </Container>

        </>
    )
}