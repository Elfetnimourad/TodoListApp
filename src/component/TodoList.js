import React, { useState, useEffect } from "react";
import "./todoList.css";
import BedtimeOffIcon from "@mui/icons-material/BedtimeOff";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Grid } from "@mui/material";
export const TodoList = () => {
  const [todos, setTodos] = useState("");
  // const [todoList, setTodoList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [darklight, setDarklight] = useState(false);
  const [todoList, setTodoList] = useState(() => {
    // Initialize the state with data from localStorage or an empty array
    const storedTodos = localStorage.getItem("todoList");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  // Use the useEffect hook to save data to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (todo) => {
    // Toggle the checked state of the clicked item
    const updatedCheckedItems = checkedItems.includes(todo)
      ? checkedItems.filter((item) => item !== todo)
      : [...checkedItems, todo];
    setCheckedItems(updatedCheckedItems);
  };
  const addItem = () => {
    setTodoList([todos, ...todoList]);

    if (todos === "") {
      setTodoList([...todoList]);
    } else {
      setTodos("");
    }
  };
  const deleteItem = (deleted) => {
    const newArray = todoList.filter((e) => e !== deleted);
    setTodoList(newArray);
  };

  const handelMode = () => {
    setDarklight(!darklight);
  };
  return (
    <div className="container d-flex justify-content-center">
      <div className="card w-50">
        <div className={darklight ? "darkMode" : ""}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="todoList">
              <div>
                <Grid container>
                  <Grid item xs={11}>
                    <h1 className="text-center">Todo List App</h1>
                  </Grid>
                  <Grid item xs={1}>
                    {darklight ? (
                      <BedtimeIcon
                        onClick={handelMode}
                        className="BedTimeStyling"
                      />
                    ) : (
                      <BedtimeOffIcon
                        onClick={handelMode}
                        className="BedTimeOffStyling"
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid container className="mm">
                  <Grid item xs={11}>
                    <input
                      id="inputSize"
                      class="form-control form-control-lg d-inline inputGrid"
                      type="text"
                      value={todos}
                      onChange={(e) => setTodos(e.target.value)}
                      aria-label=".form-control-lg example"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <button
                      onClick={addItem}
                      type="button"
                      className="btn btn-info add"
                    >
                      +
                    </button>
                  </Grid>
                </Grid>
                {todoList.map((item) => (
                  <>
                    <div className="item">
                      <span
                        id="itemCheckedId"
                        className={
                          checkedItems.includes(item) ? "itemChecked" : ""
                        }
                      >
                        {item}
                      </span>
                      <div className="center-element">
                        <input
                          onChange={() => handleChange(item)}
                          class="form-check-input float-end me-1"
                          type="checkbox"
                          id="checkboxNoLabel"
                          value=""
                          checked={checkedItems.includes(item)}
                        />
                        <DeleteIcon
                          className="cc"
                          onClick={() => deleteItem(item)}
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
