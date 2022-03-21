import {Button, Container, Form, Image, Navbar, Table} from "react-bootstrap";
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
        {dogs.map(dogDto => {
            return <tr key={dogDto.id}>
                <td>{dogDto.name}</td>
                <td>{dogDto.breed}</td>
                <td>{dogDto.owner}</td>
                <td>{dogDto.food}</td>
                <td>{dogDto.dogschool}</td>
                <td>{dogDto.id}</td>
            </tr>
        })}
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
        addDog(newName, newBreed, newFood, newOwner, newDogSchool)
            .then(() => onUpdate())
            .catch(error => console.error(error));
    }
    return (
        <tfoot>
        <tr>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputDogName">Dogname</Form.Label>
                <Form.Control id="inputDogName" placeholder="Kira" value={newName} onChange={e => setNewName(e.target.value)} />
            </td>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputDogBreed">Breed</Form.Label>
                <Form.Control id="inputDogBreed" placeholder="Golden Retriever" value={newBreed}
                              onChange={e => setNewBreed(e.target.value)} />
            </td>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputDogOwner">Owner</Form.Label>
                <Form.Control id="inputDogOwner" placeholder="Kai Bria" value={newOwner} onChange={e => setNewOwner(e.target.value)} />
            </td>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputDogFood">Futter</Form.Label>
                <Form.Control id="inputDogFood" placeholder="Meat" value={newFood}
                              onChange={e => setNewFood(e.target.value)} />
            </td>
            <td>
                <Form.Label className="visually-hidden" htmlFor="inputDogSchool">DogSchool</Form.Label>
                <Form.Control id="inputDogSchool" placeholder="Hunde Schule Neuhausen" value={newDogSchool}
                              onChange={e => setNewDogSchool(e.target.value)} />
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
        <Table striped hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Breed</th>
                <th>Food</th>
                <th>Owner</th>
                <th>DogSchool</th>
                <th>ID</th>
            </tr>
            </thead>
            <DogTBody versionId={id} />
            <NewDogTFoot onUpdate={onUpdate} />
        </Table>
    )
}

function App() {
    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand>
                        <Image src={logo} alt="" width={60} height={60} />{' '}
                        Hunde Schule
                    </Navbar.Brand>
                    <Navbar.Text>
                        <a href="http://localhost:8080/api/swagger-ui/index.html">API {">>"}</a>
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Container>
                <DogTable />
            </Container>
        </>
    );
}

export default App;
