import { useEffect, useState } from 'react';
import personService from './services/persons';
const Person = ({ name, number, remove }) => {
  const reallyRemove = () => {
    if (window.confirm(`Delete ${name}?`)) {
      remove();
    }
  };
  return (
    <div>
      {name} {number} <button onClick={reallyRemove}>delete</button>
    </div>
  );
};
const Title = ({ title }) => {
  return <h2>{title}</h2>;
};
const PhoneList = ({ persons, removeItem }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} remove={() => removeItem(person.id)} />
      ))}
    </>
  );
};

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
  const [personsFilter, setPersonsFilter] = useState([]);
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState(null);
  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="not">{message}</div>;
  };
  const Err = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="err">{message}</div>;
  };
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setPersonsFilter(initialPersons);
    });
  }, []);
  const handleNameFilter = (event) => {
    const value = event.target.value;

    setNameFilter(value);
    setPersonsFilter(persons.filter((c) => c.name.toLowerCase().startsWith(value.toLowerCase())));
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
      if (window.confirm(`${newName} is already added to PhoneBook, replace the old number with a new one?`)) {
        const person = persons.find((p) => p.name === newName);
        const id = person.id;
        const changePerson = { ...person, number: number };

        personService
          .update(id, changePerson)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== id ? person : returnedPerson)));
            setPersonsFilter(personsFilter.map((person) => (person.id !== id ? person : returnedPerson)));
            setMessage(`Updated ${returnedPerson.name}`);
          })
          .catch(() => {
            setErr(`Information of ${person.name} has already been removed from server`);
          });
      }
    } else {
      personService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setPersonsFilter(personsFilter.concat(returnedPerson));
        setMessage(`Added ${returnedPerson.name}`);
      });
    }
    setTimeout(() => {
      setMessage(null);
      setErr(null);
    }, 4000);
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
  //     alert(`${newName} is already added to PhoneBook`);
  //   }
  //   setNewName('');
  // };
  const removeItem = (id) => {
    personService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      setPersonsFilter(personsFilter.filter((person) => person.id !== id));
    });
  };
  return (
    <>
      <Title title={'PhoneBook'} />
      <Notification message={message} />
      <Err message={err} />
      filter shown with <input value={nameFilter} onChange={handleNameFilter} />
      <Title title={'Add a new'} />
      <Form addPerson={addPerson} newName={newName} number={number} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Title title={'Numbers'} />
      <PhoneList persons={personsFilter} removeItem={removeItem} />
    </>
  );
};

export default App;
