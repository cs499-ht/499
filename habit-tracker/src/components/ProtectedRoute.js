import React, { useContext } from 'react';
import { auth } from "../firebase";
import {Route,Redirect} from 'react-router-dom';

export default function ProtectedRoute(props){
   
    const authValue=useContext(auth)
    if (authValue.userDataPresent){
        if(authValue.user==null){
            return(<Redirect to={props.redirectTo}></Redirect>)
        }
        else{
            return(
            
            <Route exact path={props.path}>
                {props.children}

            </Route>)
        }
    }
    else{
        
        return null
    }
}
// const ProtectedRoute = ({ component: Component, user, ...rest }) => {
//   return (
//     <Route {...rest} render={
//       props => {
//         if (user) {
//           return <Component {...rest} {...props} />
//         } else {
//           return <Redirect to={
//             {
//               pathname: '/unauthorized',
//               state: {
//                 from: props.location
//               }
//             }
//           } />
//         }
//       }
//     } />
//   )
// }