import { useState } from "react";

export default function Login(){

    const [userData, setUserData] = useState({
        email:"",
        password:""
    });
    const [errors, setErrors] = useState({
        emailErr:"",
        passErr:""
    });
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const [passwordShown, setPasswordShown] = useState(false);

    const changeData = (e) =>{
        if(e.target.name === "email"){
            setUserData({
                ...userData,
                email: e.target.value
            })
            setErrors({
                ...errors,
                emailErr:
                    e.target.value.length === 0 ? "Email is required"
                    :emailRegex.test(e.target.value) === false ? "Email must be in this format xxx@xxx.com"
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
                    :e.target.value.length < 8 ? "Password must be more than 8 characters"
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
                <label>Email Address</label>
                <input type="email" className="form-control" name="email" value={userData.email} onChange={(e)=>changeData(e)}/>
                <div className="text-danger">{errors.emailErr}</div>
            </div>
            <div className="form-group m-2">
                <label>Password</label>
                <input type={passwordShown ? "text" : "password"} className="form-control" name="password" value={userData.password} onChange={(e)=>changeData(e)}/>
                <div className="text-danger">{errors.passErr}</div>
            </div>
            <div class="form-check m-2">
                <input type="checkbox" class="form-check-input" onClick={togglePassword}/>
                <label class="form-check-label">Show Password</label>
            </div>
            <div className="m-2"><button type="submit" className="btn btn-primary form-control">Login</button></div>
        </form>
    </div>
    </div>
    </>
}
