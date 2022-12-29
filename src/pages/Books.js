import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './books.scss';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5500/books');
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure that you wanted to delete this?')) {
      try {
        await axios.delete('http://localhost:5500/books/' + id);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContext;
  };

  return (
    <div className='container'>
      <div className='books-container'>
        <div className='title'>
          <h1>Memo</h1>
        </div>
        <div className='books-items'>
          {books.map((book) => (
            <div className='book' key={book.id}>
              <div className='book-contents'>
                {book.cover && <img src={book.cover} alt='' />}
                <h2>{book.title}</h2>
                <h3>BY {book.author}</h3>
                <p>{book.desc}</p>
                <small>{getText(book.link)}</small>
              </div>
              <div className='buttons'>
                <div className='delete' onClick={() => handleDelete(book.id)}>
                  <AiOutlineDelete />
                  Delete
                </div>
                <div className='update'>
                  <AiOutlineEdit />
                  <Link to={`/update/${book.id}`} state={book}>
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='button-items'>
          <div className='icon'>
            <AiOutlinePlus />
          </div>
          <div className='button'>
            <Link to='/add'>
              <button>Add a new book</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
