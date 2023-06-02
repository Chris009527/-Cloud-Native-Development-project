//import avatar_dng from '../public/img/avatar-dhg.png';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Car_pools from './pages/Car_pools';
import Travels from './pages/Travels';
import Shoppings from './pages/Shoppings';
import Sports from './pages/Sports';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/sports",
      element: <Sports />,
    },
    {
        path: "/shoppings",
        element: <Shoppings />,
    },
    {
        path: "/car_pools",
        element: <Car_pools />,
    },
    {
        path: "/travels",
        element: <Travels />,
    }
  ]);


// function App() {
//   return (
//     <div classNameName="App">
//         <Nav_bar />

//         <div className="container">
//             <div className="row">
//                 {/* <div className="col-12 col-lg-3">
//                     <div className="left-column">
//                     </div>
//                 </div> */}
            
//                 <div className="col-12 col-lg-8" >
//                     <div className="middle-column">
//                         <div className="card" >
//                             <div className="card-header bg-transparent">
//                                 <Create_activity />
//                             </div>
 
//                             <Show_activity />

//                         </div>
//                     </div>
//                 </div>

//                 <br /> <br /> <br /><br /> <br /> <br />


                    
//                 <div className="col-12 col-lg-4">
//                     <div className="right-column">
//                         <Joined_event_block />
                        
//                     </div>

//                 </div>

//             </div>
//         </div>
//     </div>
//   );
// }

function App() {
    return (
      <div className="w-screen h-screen bg-yellow-800/5 text-yellow-900">
        <RouterProvider router={router} />
      </div>
    );
  }
  


export default App;
