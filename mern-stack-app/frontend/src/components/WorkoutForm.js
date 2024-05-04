import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "../api/axios";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, reps };

    await axios
      .post(
        "/api/workouts",
        workout,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setTitle("");
          setReps("");
          setLoad("");
          setError(null);

          console.log("New workout added", res.data);

          dispatch({ type: "CREATE_WORKOUT", payload: res.data });
        }
      }).catch((err) => {
        setError(err.response.data.error);
      })

  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />
      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        required
      />
      <label>Reps:</label>
      <input
        type="Number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        required
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
