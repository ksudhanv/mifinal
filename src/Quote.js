import React, {useState} from 'react';
import axios from 'axios'
import './style.css';

export default function Quote(){
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const quote = () => {
        axios.get('https://api.quotable.io/random').then(response => {
          setContent(response.data.content)
          setAuthor(response.data.author)
        })
      }
      return (
        <div>
            <h2 className='quote'>{content}</h2>
            <p className='quote-author'>{author}</p>
            <button className='qupte-button' onClick={quote}>Generate a quote to brighten your day</button>
        </div>
      );
}