import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// wrapper for current route
export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      // pass in all props
      {...rest}
      // define our own render
      render={(props) => {
        // check if user exists (logged in)
        // only render private component if user is logged in, otherwise redirect to login component
        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}

// export default function ProtectedRoute(props){

//     const authValue=useContext(auth)
//     if (authValue.userDataPresent){
//         if(authValue.user==null){
//             return(<Redirect to={props.redirectTo}></Redirect>)
//         }
//         else{
//             return(

//             <Route exact path={props.path}>
//                 {props.children}

//             </Route>)
//         }
//     }
//     else{

//         return null
//     }
// }
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
