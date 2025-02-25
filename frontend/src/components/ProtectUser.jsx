import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedUser = ({ children }) => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/login');
        }
    }, [user, navigate]); // Include `user` and `navigate` in the dependency array

    // Render nothing if the user is not authenticated yet to avoid flashing content
    if (user === null) {
        return null; 
    }

    return <>{children}</>;
};

export default ProtectedUser;
