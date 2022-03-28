import {Button, Card, Col, Container, Form, Image, Navbar, Row, Table} from "react-bootstrap";
import logo from './logo.jpg'
import {useEffect, useState} from "react";
import {addDog, getDogs} from "./Api";

function DogTBody({versionId}) {
    const [dogs, setDogs] = useState([])
    useEffect(() => {
        getDogs()
            .then(data => setDogs(data))
            .catch(error => console.error(error));
    }, [versionId])
    return (
        <tbody>
        <Container>
            <Row>
        {dogs.map(dogDto => {
            return (
                <Card key={dogDto.id} style={{background: "#876942", width: '14rem' , margin: '20px'}}>
                    <Card.Title><h4>{dogDto.name}</h4></Card.Title>
                    <Card.Body>
                        <h6>Rasse:</h6>
                        {dogDto.breed}
                        <br/>
                        <h6>Besitzer:</h6>
                        {dogDto.owner}
                        <br/>
                        <h6>Hauptnahrung:</h6>
                        {dogDto.food}
                        <br/>
                        <h6>Schule:</h6>
                        {dogDto.dogschool}
                    </Card.Body>
                    <Card.Footer>
                        {dogDto.id}
                    </Card.Footer>
                </Card>

            )
        })}
            </Row>
        </Container>
        </tbody>
    )
}

function NewDogTFoot({onUpdate}) {
    const [newName, setNewName] = useState("")
    const [newBreed, setNewBreed] = useState("")
    const [newOwner, setNewOwner] = useState("")
    const [newFood, setNewFood] = useState("")
    const [newDogSchool, setNewDogSchool] = useState("")
    const handleAddDog = event => {
        event.preventDefault();
        addDog(newName, newBreed, newOwner, newFood, newDogSchool)
            .then(() => onUpdate())
            .catch(error => console.error(error));
    }
    return (
        <tfoot>
        <tr>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputDogName">Dogname</Form.Label>
                <Form.Control id="inputDogName" placeholder="Kira" value={newName}
                              onChange={e => setNewName(e.target.value)}/>
            </td>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputDogBreed">Breed</Form.Label>
                <Form.Control id="inputDogBreed" placeholder="Golden Retriever" value={newBreed}
                              onChange={e => setNewBreed(e.target.value)}/>
            </td>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputDogOwner">Owner</Form.Label>
                <Form.Control id="inputDogOwner" placeholder="Kai Bria" value={newOwner}
                              onChange={e => setNewOwner(e.target.value)}/>
            </td>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputDogFood">Breed</Form.Label>
                <Form.Control id="inputDogFood" placeholder="Meat" value={newFood}
                              onChange={e => setNewFood(e.target.value)}/>
            </td>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputDogSchool">DogSchool</Form.Label>
                <Form.Control id="inputDogSchool" placeholder="Hunde Schule Neuhausen" value={newDogSchool}
                              onChange={e => setNewDogSchool(e.target.value)}/>
            </td>
            <td>
                <Button type="submit" variant="secondary" onClick={handleAddDog}>Add Dog</Button>
            </td>
        </tr>
        </tfoot>
    )
}

function DogTable() {
    const [id, setId] = useState(0)
    const onUpdate = () => {
        setId(id + 1);
    }
    return (
        <>
            <NewDogTFoot onUpdate={onUpdate}/>
            <Row>
            <DogTBody versionId={id}/>
            </Row>
        </>
    )
}

function App() {
    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand>
                        <Image src={logo} alt="" width={60} height={60}/>{' '}
                        Hunde Schule, yolo dude whats poppin? this is our cool puppy school. Come jump in if you want dude! ;) 
                    </Navbar.Brand>
                    <Navbar.Text>
                        <a href="http://localhost:8080/api/swagger-ui/index.html">API {">>"}</a>
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Container>
                <DogTable/>
            </Container>
        </>
    );
}

export default App;
