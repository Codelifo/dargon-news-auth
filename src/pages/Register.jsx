import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createNewUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // get from data
    const from = new FormData(e.target);
    const name = from.get("name");
    const photo = from.get("photo");
    const email = from.get("email");
    const password = from.get("password");


    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(()=>{
            navigate('/')
          })
          .catch((err)=>{
              // console.log(err)
          })


      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        // ..
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="card bg-base-100 w-full max-w-lg rounded-lg p-10 shrink-0 shadow-2xl">
        <h2 className="text-2xl font-semibold text-center">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            {error.login && (
              <label className="label text-sm text-red-600">
                {error.login}
              </label>
            )}
            <div className="form-control pt-4">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-md"
                />
                <span className="label-text font-bold text-gray-500 text-base ">
                  <span className="font-normal">Accept </span>Term & Conditions
                </span>
              </label>
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-none">Register</button>
          </div>
        </form>
        <h2 className="font-normal text-center">
          Already Have an account ?
          <Link className="text-sky-500" to={"/auth/login"}>
            {" "}
            Login
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Register;
