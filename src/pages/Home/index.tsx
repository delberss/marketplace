import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store";
import Button from "../../components/Button";
import { logout } from "../../store/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if (user.user === null) {
            navigate('/login');
        }
    }, [user.user, navigate])

    return (
        <>
            <div>
                Home
            </div>
            <div>
                {user.user?.email}
            </div>

            <Button onClick={handleLogout}>
                Logout
            </Button>
        </>
    )
}

export default Home