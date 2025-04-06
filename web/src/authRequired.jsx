import { Navigate } from "react-router";
import { Component } from "react";

//checks authentication before redirecting to homepage  
const authRequired = (Component) => {

    const AuthenticatedComponent = (props) => {

        const token = localStorage.getItem("jwt-token");

        if(!token) {
            return <Navigate to="/sign-up" />
        }

        return <Component {...props} />;

    }

    return AuthenticatedComponent;

}

export default authRequired;