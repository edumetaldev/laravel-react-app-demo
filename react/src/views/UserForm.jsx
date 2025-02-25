import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContexProvider";

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const {setNotification} = useStateContext();

  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`/users/${ id }`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        })
    }, [id])
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if(user.id) {
      axiosClient.put(`/users/${user.id}`, user)
      .then( () => {
        //TODO show notification
        setNotification("User was successfully updated");
        navigate('/users');
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422)
          setErrors(response.data.errors);
      })
    }else{
      axiosClient.post(`/users/`, user)
      .then( () => {
        setNotification("User was successfully created");
        navigate('/users');
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422)
          setErrors(response.data.errors);
      })
    }
  }
  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">Loading..</div>
        )}
        {errors && <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
        }
        {!loading &&
          <div className="form">
          <form onSubmit={onSubmit}> 
            <input onChange={ev => setUser({...user, name: ev.target.value})} value={user.name}   type="name" placeholder="Name" />
            <input onChange={ev => setUser({...user, email: ev.target.value})} value={user.email} type="email" placeholder="Email" />
            <input onChange={ev => setUser({...user, password: ev.target.value})} type="password" placeholder="Password" />
            <input onChange={ev => setUser({...user, password_confirmation: ev.target.value})} type="password" placeholder="Password Confirmation" />
            <button className="btn">Save</button>
          </form>
        </div>
        }
      </div>
      {/* <div className="login-signup-form animated fadeInDown">
      
    </div> */}
    </>
  );
}

export default UserForm;