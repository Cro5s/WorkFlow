import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import db from "../firebase";
import firebase from "firebase";
// import { makeStyles } from "@material-ui/core/styles";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  // console.log("Field: ", input);

  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection("Tasks").add({
      task: input,
      // Allows adding a timestamp to each collection
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  useEffect(() => {
    db.collection("Tasks")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // setTasks variable will depend on the useState hook variable name
        setTasks(
          snapshot.docs.map((doc) => ({ id: doc.id, task: doc.data().task }))
        );
      });
  }, []);

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     width: "100%",
  //     maxWidth: 360,
  //     backgroundColor: theme.palette.background.paper,
  //   },
  // }));
  // const classes = useStyles();

  return (
    <div className="tasks-tab">
      <form>
        <FormControl onSubmit={handleSubmit}>
          <InputLabel>Create Task</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!input}
            variant="contained"
            color="primary"
          >
            Add Task
          </Button>
        </FormControl>
      </form>

      <ul>
        {tasks.map((task, key) => (
          <List key={key}>
            <ListItem>
              <ListItemText primary={task.task} secondary="Deadline: " />
            </ListItem>
            <Button
              onClick={(event) => db.collection("Tasks").doc(task.id).delete()}
            >
              Delete Task
            </Button>
          </List>
        ))}
      </ul>
    </div>
  );
}
