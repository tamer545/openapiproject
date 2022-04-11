import {Button, Card, Container, Form, Image, ListGroup, ListGroupItem, Navbar, Row} from "react-bootstrap";
import logo from './logo.jpg'
import {useEffect, useState} from "react";
import {addDog, changeOwner, getDogs} from "./Api";

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
                        <Card style={{width: '18rem', marginTop: '10px', marginRight: '60px'}} key={dogDto.id}>
                            <Card.Body>
                                <Card.Title><h4>{dogDto.name}</h4></Card.Title>
                                <Card.Text>
                                    {dogDto.name} hat die Rasse {dogDto.breed}. Er isst gerne {dogDto.food} und geht in
                                    die Schule {dogDto.dogschool}. {dogDto.name} gehört {dogDto.owner.name}.
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem><b>ID: </b>{dogDto.id}</ListGroupItem>
                                <ListGroupItem><b>Rasse: </b>{dogDto.breed}</ListGroupItem>
                                <ListGroupItem><b>Besitzer: </b>{dogDto.owner.name}</ListGroupItem>
                                <ListGroupItem><b>Hauptnahrung: </b>{dogDto.food}</ListGroupItem>
                                <ListGroupItem><b>Schule: </b>{dogDto.dogschool}</ListGroupItem>
                            </ListGroup>
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
    const [newFood, setNewFood] = useState("")
    const [newDogSchool, setNewDogSchool] = useState("")
    const [newOwnerName, setNewOwnerName] = useState("")
    const [newOwnerAge, setNewOwnerAge] = useState('')
    const [changedOwnerAge, setChangedOwnerAge] = useState('')
    const [changedOwnerName, setChangedOwnerName] = useState('')
    const [dogToChangeOwnerId, setDogToChangeOwnerId] = useState("")
    const handleAddDog = event => {
        event.preventDefault();
        addDog(newName, newBreed, {name: newOwnerName, age: parseInt(newOwnerAge)}, newFood, newDogSchool)
            .then(() => onUpdate())
            .catch(error => console.error(error));
    }
    const handleChangeOwner = event => {
        event.preventDefault();
        changeOwner(changedOwnerName, parseInt(changedOwnerAge), parseInt(dogToChangeOwnerId)).then(() => onUpdate())
            .catch(error => console.error(error));
    }
    return (
        <Row>
            <Card style={{width: '18rem', marginTop: '20px', marginRight: '80px'}}>
                <Card.Body>
                    <Card.Title><h4>Add a new Dog</h4></Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><Form.Label className="visually-hidden" htmlFor="inputDogName">Dogname</Form.Label>
                        <Form.Control id="inputDogName" placeholder="Name Dog" value={newName}
                                      onChange={e => setNewName(e.target.value)}/></ListGroupItem>
                    <ListGroupItem><Form.Label className="visually-hidden" htmlFor="inputDogBreed">Breed</Form.Label>
                        <Form.Control id="inputDogBreed" placeholder="Breed" value={newBreed}
                                      onChange={e => setNewBreed(e.target.value)}/></ListGroupItem>
                    <ListGroupItem><Form.Label className="visually-hidden" htmlFor="inputDogFood">Breed</Form.Label>
                        <Form.Control id="inputDogFood" placeholder="Food" value={newFood}
                                      onChange={e => setNewFood(e.target.value)}/>
                    </ListGroupItem>
                    <ListGroupItem><Form.Label className="visually-hidden"
                                               htmlFor="inputDogSchool">DogSchool</Form.Label>
                        <Form.Control id="inputDogSchool" placeholder="Hunde Schule Name" value={newDogSchool}
                                      onChange={e => setNewDogSchool(e.target.value)}/></ListGroupItem>
                    <br/>
                    Owner
                    <ListGroupItem><Form.Label className="visually-hidden" htmlFor="inputDogOwner">Owner</Form.Label>
                        <Form.Control id="inputDogOwner" placeholder="Name Owner" value={newOwnerName}
                                      onChange={e => setNewOwnerName(e.target.value)}/></ListGroupItem>
                    <ListGroupItem><Form.Label className="visually-hidden" htmlFor="inputDogOwner">Owner</Form.Label>
                        <Form.Control id="inputDogOwner" placeholder="Name Owner" value={newOwnerAge}
                                      onChange={e => setNewOwnerAge(e.target.value)}/></ListGroupItem>
                </ListGroup>
                <Button type="submit" variant="secondary" onClick={handleAddDog} style={{height: "40px"}}>Add
                    Dog</Button>
            </Card>
            <Card style={{width: '18rem', marginTop: '20px', marginRight: '80px'}}>
                <Card.Body>
                    <Card.Title><h4>Edit Dog Owner</h4></Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><Form.Label className="visually-hidden" htmlFor="inputDogName">Dog ID</Form.Label>
                        <Form.Control id="inputDogName" placeholder="Dog ID" value={dogToChangeOwnerId}
                                      onChange={e => setDogToChangeOwnerId(e.target.value)}/></ListGroupItem>
                    <ListGroupItem><Form.Label className="visually-hidden" htmlFor="inputDogBreed">New Owner Name</Form.Label>
                        <Form.Control id="inputDogBreed" placeholder="New Owner Name" value={changedOwnerName}
                                      onChange={e => setChangedOwnerName(e.target.value)}/></ListGroupItem>
                    <ListGroupItem><Form.Label className="visually-hidden" htmlFor="inputDogFood">New Owner Age</Form.Label>
                        <Form.Control id="inputDogFood" placeholder="New Owner Age" value={changedOwnerAge}
                                      onChange={e => setChangedOwnerAge(e.target.value)}/>
                    </ListGroupItem>
                </ListGroup>
                <Button type="submit" variant="secondary" onClick={handleChangeOwner} style={{height: "40px"}}>Change
                    Owner</Button>
            </Card>
        </Row>
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
                        Hunde Schule, yolo dude whats poppin? this is our cool puppy school. Come jump in if you want
                        dude! ;)
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