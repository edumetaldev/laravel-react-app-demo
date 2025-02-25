import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContexProvider";

export default function Signup() {

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    axiosClient.post('/signup', payload)
      .then(({ data }) => {

        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;

        if (response && response.status === 422)
          setErrors(response.data.errors);
      })
      ;
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className='title'>
            signup for free
          </h1>
          {errors && <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
          }
          <input ref={nameRef} type="name" placeholder="Name" />
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already Registered? <Link to='/login'>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}