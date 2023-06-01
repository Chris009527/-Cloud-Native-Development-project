import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../App.css'


export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeOld = this.onChangeOld.bind(this);
        this.onChangeIntro = this.onChangeIntro.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          username: '',
          email: '',
          password: '',
          phone: '',
          gender: true,
          old: 0,
          intro: '',
          score: 0,
        };
      }
  
    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      })
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

    onChangePhone(e) {
        this.setState({
        phone: e.target.value
        })
    }

    onChangeGender(e) {
        const selectedGender = e.target.value === 'man';
        this.setState({
        gender: selectedGender,
        })
    }


    onChangeOld(e) {
        this.setState({
        old: e.target.value        
            })
    }

    onChangeIntro(e) {
        this.setState({
            intro: e.target.value
        })
    }
    
    onSubmit(e) {
      e.preventDefault();
    console.log(`Form submitted:`);
      const user = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        gender: this.state.gender,
        old: Number(this.state.old),
        intro: this.state.intro,
        score: this.state.score,
      }
  
      console.log(user);
  
      axios.post('http://localhost:5000/users/add', user)
        .then(res => {
            console.log(res.data);
            if(res.data === "200")
            {
                alert("Register success!");
                window.location = '/login';
            }
            else if (res.data === "400"){
                alert("Register failed! Email already exists");
            }
        });
  
    //   this.setState({
    //     username: ''
    //   })
    }

    
    render() {
        return (
            <div className="text-center m-5-auto">
                <h2>Join us</h2>
                <h5>Create your personal account</h5>
                <form onSubmit={this.onSubmit}>
                    <p>
                        <label>Username</label><br/>
                        <input type="text" name="username" required value={this.state.username} onChange={this.onChangeUsername}/>
                    </p>
                    <p>
                        <label>Email address</label><br/>
                        <input type="email" name="email" required value={this.state.email} onChange={this.onChangeEmail}/>
                    </p>
                    <p>
                        <label>Password</label><br/>
                        <input type="password" name="password" required value={this.state.password} onChange={this.onChangePassword}/>
                    </p>
                    <p>
                        <label>Phone</label><br/>
                        <input type="text" name="phone" required value={this.state.phone} onChange={this.onChangePhone}/>
                    </p>
                    <p>Gender:
                        <input id="man" type="radio" checked={this.state.gender} name="gender"  value='man' onChange={this.onChangeGender}/>man
                        <input type="radio" id="woman" name="gender" checked={!this.state.gender} value='woman' onChange={this.onChangeGender}/>woman
                    </p>
                    <p>
                        <label>Old</label><br/>
                        <input type="number" name="old" required value={this.state.old} onChange={this.onChangeOld}/>
                    </p>
                    <p>
                        <label>Introduction</label><br/>
                        <input type="text" name="intro" required value={this.state.intro} onChange={this.onChangeIntro}/>
                    </p>
                    <p>
                        {/* <input type="submit">Register</input> */}
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </p>
                </form>
                <footer>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>
        )
    }

}


// export default function SignUpPage() {
    
    // const [username, setUsername] = React.useState('');
    // const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');
    // const [phone, setPhone] = React.useState('');
    // const [gender, setGender] = React.useState('');
    // const [old, setOld] = React.useState('');
    // const [intro, setIntro] = React.useState('');
    // const [score, setScore] = React.useState('');


    
    // const handleSubmit = async (e) => {
    //     const res = await creatUser({username, gender, phone, email, password, old, intro, score});
    //     console.log(res);
    //     alert('Register successfully!');
    //     setUsername('');
    //     setGender('');
    //     setPhone('');
    //     setEmail('');
    //     setPassword('');
    //     setOld('');
    //     setIntro('');
    //     setScore('');
    // };
// }