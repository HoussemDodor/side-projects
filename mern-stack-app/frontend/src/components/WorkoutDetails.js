import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "../api/axios";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) return;

    await axios
      .delete(`/api/workouts/${workout._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        if (res.status === 200) dispatch({ type: "DELETE_WORKOUT", payload: workout._id })
      }).catch((err) => {
        console.log(err)
      })    
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong> {workout.load}
      </p>
      <p>
        <strong>reps:</strong> {workout.reps}
      </p>
      <p>{formatDistanceToNow(workout.createdAt)} ago</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;
