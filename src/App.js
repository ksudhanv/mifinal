import React, {useState} from 'react';
import './App.css';
import './style.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const quote = () => {
    axios.get('https://api.quotable.io/random').then(response => {
      setContent(response.data.content)
      setAuthor(response.data.author)
    })
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=913dcd58d39bbeeea953ff89ac4e4e7d`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="App">
      <div className='search'>
        <input type='text' value={location} placeholder='Search a City' onChange={event => setLocation(event.target.value)} onKeyPress={searchLocation}></input>
      </div>
      <Card style={{ width: '18rem' }} className='card'>
        <Card.Body className='card-body'>
          <div className='weather-text'>
            <Card.Title className='city'><p>{data.name}</p></Card.Title>
            <Card.Subtitle className="mb-2 text-muted forecast">{data.weather ? <h1>{data.weather[0].main}</h1> : null}</Card.Subtitle>
          </div>
            <Card.Text className='weather'>
              {data.main ? <h1>{data.main.temp}°F</h1> : null}
            </Card.Text>
        </Card.Body>
      </Card>
        <h2 className='quote'>{content}</h2>
        <p className='quote-author'>{author}</p>
        <Button className='quote-button' variant="primary" onClick={quote}>Generate a quote to brighten your day</Button>
    </div>
  );
}

export default App;
