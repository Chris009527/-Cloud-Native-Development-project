import Create_activity from '../Create_activity';
import { Show_activity } from '../Activity_block/Show_activity';
import Nav_bar from '../Nav_bar/Nav_bar';

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../Profile/Profile';
import Joined_event_block from '../Joined/Joined';




function Travels() {
  return (
    <div classNameName="App">
        <Nav_bar />

        <div className="container">
            <div className="row">
                {/* <div className="col-12 col-lg-3">
                    <div className="left-column">
                    </div>
                </div> */}
            
                <div className="col-12 col-lg-8" >
                    <div className="middle-column">
                        <div className="card" >
                            <div className="card-header bg-transparent">
                                <Create_activity />
                            </div>
 
                            <Show_activity type="travels"/>

                        </div>
                    </div>
                </div>

                <br /> <br /> <br /><br /> <br /> <br />


                    
                <div className="col-12 col-lg-4">
                    <div className="right-column">
                        <Joined_event_block />
                        
                    </div>

                </div>

            </div>
        </div>
    </div>
  );
}

export default Travels;