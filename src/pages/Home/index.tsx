import { useSelector } from "react-redux"
import type { RootState } from "../../store";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);

    return(
        <>
            <div>
                Home
            </div>
            <div>
                {user.user?.email}
            </div>
        </>
    )
}

export default Home