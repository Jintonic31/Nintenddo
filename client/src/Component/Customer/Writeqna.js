import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { addNewQna } from '../../store/userslice';

function Writeqna() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const loginUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmit() {
    axios.post('/api/customer/writeqna', { title, content, email: loginUser.email, reply: 'N' })
      .then(() => {

        //dispatch(addNewQna({ title, content }));
        navigate('/customers');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="container">
      <div className="subPage">
        <article>
          <div className="qnawriteform">
            <h2>Write QnA</h2>
            <div className="field">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.currentTarget.value); }}
              />
            </div>
            <div className="btns">
              <button onClick={onSubmit}>글쓰기</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Writeqna;