import { useState } from "react";

export default function Register(){

    const [userData, setUserData] = useState({
        name:"",
        email:"",
        username:"",
        password:"",
        confirmpass:""
    });
    const [errors, setErrors] = useState({
        nameErr:"",
        emailErr:"",
        usernameErr:"",
        passErr:"",
        confirmpassErr:""
    });
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const usernameRegex = /^\S*$/;
    const [passwordShown, setPasswordShown] = useState(false);

    const changeData = (e) =>{
        if(e.target.name === "name"){
            setUserData({
                ...userData,
                name: e.target.value
            })
            setErrors({
                ...errors,
                nameErr:
                    e.target.value.length === 0 ? "Name is required"
                    :e.target.value.length < 3 ? "Name must be more than 3 characters"
                    :null
            })
        }else if(e.target.name === "email"){
            setUserData({
                ...userData,
                email: e.target.value
            })
            setErrors({
                ...errors,
                emailErr:
                    e.target.value.length === 0 ? "Email is required"
                    :emailRegex.test(e.target.value) === false ? "Email must be in this format xxx@xxx.xx"
                    :null
            })
        }else if(e.target.name === "username"){
            setUserData({
                ...userData,
                username: e.target.value
            })
            setErrors({
                ...errors,
                usernameErr:
                    e.target.value.length === 0 ? "User Name is required"
                    :usernameRegex.test(e.target.value) === false ? "User Name must contains no spaces"
                    :null
            })
        }else if(e.target.name === "password"){
            setUserData({
                ...userData,
                password: e.target.value
            })
            setErrors({
                ...errors,
                passErr:
                    e.target.value.length === 0 ? "Password is required"
                    :passRegex.test(e.target.value) === false ? "Password must be more than 8 characters and contains at least one lowercase, one uppercase, at least one digit, and special character."
                    :null
            })
        }else if(e.target.name === "confirmpass"){
            setUserData({
                ...userData,
                confirmpass: e.target.value
            })
            setErrors({
                ...errors,
                confirmpassErr:
                    e.target.value.length === 0 ? "Confirm Password is required"
                    :e.target.value !== userData.password ? "Confirm Password must matches password"
                    :null
            })
        }
    };
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return <>
    <div className="m-5 pt-4" style={{height:"85vh"}}>
    <div className="container m-5 p-4 border bg-white">
        <form>
            <div className="form-group m-2">
                <label>Name</label>
                <input type="text" className="form-control" name="name" value={userData.name} onChange={(e)=>changeData(e)}/>
                <div className="text-danger">{errors.nameErr}</div>
            </div>
            <div className="form-group m-2">
                <label>Email</label>
                <input type="email" className="form-control" name="email" value={userData.email} onChange={(e)=>changeData(e)}/>
                <div className="text-danger">{errors.emailErr}</div>
            </div>
            <div className="form-group m-2">
                <label>User Name</label>
                <input type="text" className="form-control" name="username" value={userData.username} onChange={(e)=>changeData(e)}/>
                <div className="text-danger">{errors.usernameErr}</div>
            </div>
            <div className="form-group m-2">
                <label>Password</label>
                <input type={passwordShown ? "text" : "password"} className="form-control" name="password" value={userData.password} onChange={(e)=>changeData(e)}/>
                <div className="text-danger">{errors.passErr}</div>
            </div>
            <div className="form-group m-2">
                <label>Confirm Password</label>
                <input type={passwordShown ? "text" : "password"} className="form-control" name="confirmpass" value={userData.confirmpass} onChange={(e)=>changeData(e)}/>
                <div className="text-danger">{errors.confirmpassErr}</div>
            </div>
            <div class="form-check m-2">
                <input type="checkbox" class="form-check-input" onClick={togglePassword}/>
                <label class="form-check-label">Show Password</label>
            </div>
            <div className="m-2"><button type="submit" className="btn btn-success">Register</button></div>
        </form>
    </div>
    </div>
    </>
}
