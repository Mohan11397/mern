import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error: "",
};

const BASE_URL = "http://localhost:8080/api/tasks";

// GET
export const getTasksFromServer = createAsyncThunk(
  "tasks/getTasksFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        throw new Error("No Tasks found");
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// POST
export const addTaskToServer = createAsyncThunk(
  "tasks/addTaskToServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(BASE_URL, options);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        throw new Error("Tasks not added");
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// PATCH
export const updateTaskInServer = createAsyncThunk(
  "tasks/updateTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(BASE_URL + "/" + task.id, options);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        throw new Error("Tasks not updated");
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);
// DELETE
export const deleteTaskFromServer = createAsyncThunk(
  "tasks/deleteTaskFromServer",
  async (taskId, { rejectWithValue }) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(`${BASE_URL}/${taskId}`, options);
      if (response.ok) {
        return taskId; // Return the ID of the deleted task
      } else {
        throw new Error("Task not deleted");
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    addTaskToList: (state, action) => {
      const id = Math.random() * 100;
      let task = { ...action.payload, id };
      state.tasksList.push(task);
    },
    removeFromList: (state, action) => {
      const index = state.tasksList.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasksList.splice(index, 1);
      }
    },
    updateTaskInList: (state, action) => {
      state.tasksList = state.tasksList.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = action.payload;
      })
      .addCase(getTasksFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.tasksList = [];
      })
      .addCase(addTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList.push(action.payload);
      })
      .addCase(addTaskToServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addCase(updateTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = state.tasksList.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTaskInServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });
  },
});

export const {
  addTaskToList,
  removeFromList,
  updateTaskInList,
  setSelectedTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
