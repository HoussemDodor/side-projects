import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "../api/axios";

// Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      await axios.get("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          dispatch({ type: "SET_WORKOUTS", payload: res.data });
        }
      }).catch((err) => console.log(err.res.data.error));

      
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
