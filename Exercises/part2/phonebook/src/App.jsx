import { useEffect, useState } from 'react';
import axios from 'axios';
const Person = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  );
};
const Title = ({ title }) => {
  return <h2>{title}</h2>;
};
const Phonelist = ({ personsToShow }) => personsToShow.map((person) => <Person key={person.id} name={person.name} number={person.number} />);

const Form = ({ addPerson, newName, handleNameChange, number, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameFilter = (event) => {
    setShowAll(false);
    setNameFilter(event.target.value);
    if (event.target.value === '') {
      setShowAll(true);
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: number,
    };
    if (persons.some((obj) => obj.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      axios.post('http://localhost:3001/persons', nameObject).then((response) => setPersons(persons.concat(response.data)));
    }
    setNewName('');
    setNumber('');
  };
  // let counter = =;
  //   for (let i = 0; i < persons.length; i++) {
  //     if (persons[i].name === newName) {
  //       counter = counter + 1;
  //     }
  //   }
  //   if (counter === 0) {
  //     setPersons(persons.concat(nameObject));
  //     alert(`${newName} has been created`);
  //   } else {
  //     alert(`${newName} is already added to phonebook`);
  //   }
  //   setNewName('');
  // };

  const personsToShow = showAll ? persons : persons.filter((person) => person.name === nameFilter);

  return (
    <>
      <Title title={'Phonebook'} />
      filter shown with <input onChange={handleNameFilter} />
      <Title title={'Add a new'} />
      <Form addPerson={addPerson} newName={newName} number={number} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Title title={'Numbers'} />
      <Phonelist personsToShow={personsToShow} />
    </>
  );
};

export default App;
