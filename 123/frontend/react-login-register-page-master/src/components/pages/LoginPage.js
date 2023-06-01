import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../App.css'

// export default function SignInPage() {
//     return (
//         <div className="text-center m-5-auto">
//             <h2>Sign in to us</h2>
//             <form action="/home">
//                 <p>
//                     <label>Username or email address</label><br/>
//                     <input type="text" name="first_name" required />
//                 </p>
//                 <p>
//                     <label>Password</label>
//                     <br/>
//                     <input type="password" name="password" required />
//                 </p>
//                 <p>
//                     <button id="sub_btn" type="submit">Login</button>
//                 </p>
//             </form>
//             <footer>
//                 <p>First time? <Link to="/register">Create an account</Link>.</p>
//                 <p><Link to="/">Back to Homepage</Link>.</p>
//             </footer>
//         </div>
//     )
// }

export default class UserLogin extends Component {
    constructor(props) {
        super(props);

    
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          email: '',
          password: '',
        };
      }
  
    onChangeEmail(e) {
        this.setState({
        email: e.target.value
      })
    }

    onChangePassword(e) {
        this.setState({
        password: e.target.value
        })
    }

    
    onSubmit(e) {
      e.preventDefault();
    console.log(`Form submitted:`);
      const user = {
        email: this.state.email,
        password: this.state.password,
      }
  
      console.log(user);
  
      axios.post('http://localhost:5000/users/login', user)
        .then(res => {
            
            // res.json(res.data).then(data => {const errorMessage = data.error;
            //     console.log(errorMessage);
            // });
            console.log(res.data.status);
            if(res.data.status === "login_success")
            {
                alert("login success!");
                window.location = `http://localhost:3456/?user_id=${res.data.user_id}`;
            }
            else if (res.data.status === "Incorrect_email"){
                alert("login failed! Incorrect email");
            }
            else if (res.data.status === "Incorrect_password"){
                alert("login failed! Incorrect password");
            }
        });
  
    //   this.setState({
    //     username: ''
    //   })
    }

    render() {
    
        return (
        <div className="text-center m-5-auto">
                    <h2>Sign in to us</h2>
                    <form onSubmit={this.onSubmit}>
                        <p>
                           <label>Email address</label><br/>
                           <input type="text" name="email" required value={this.state.email} onChange={this.onChangeEmail}/>
                        </p>
                        <p>
                          <label>Password</label>
                          <br/>
                          <input type="password" name="password" required value={this.state.password} onChange={this.onChangePassword}/>
                        </p>
                        <p>
                          <input type="submit" value="Login" className="btn btn-primary" />
                        </p>
                    </form>
                    <footer>
                        <p>First time? <Link to="/register">Create an account</Link>.</p>
                        <p><Link to="/">Back to Homepage</Link>.</p>
                     </footer>
                </div>)}
}
