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
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";

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
        setTasks(snapshot.docs.map((doc) => doc.data().task));
      });
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();

  return (
    <div className="tasks-tab">
      <FormControl>
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

      <ul>
        {tasks.map((task, key) => (
          <List className={classes.root}>
            <ListItem key={key}>
              <ListItemText primary={task} secondary="Deadline: " />
            </ListItem>
          </List>
        ))}
      </ul>
    </div>
  );
}
