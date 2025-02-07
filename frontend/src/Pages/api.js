import { API_URL } from "../Utils";

export const CreateTask = async (taskObj) => {
  const url = `${API_URL}/tasks`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  };
  try {
    const result = await fetch(url, options);
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const GetAllTasks = async () => {
    const url = `${API_URL}/tasks`;

    const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const result = await fetch(url, options);
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data = await result.json();
        return data;
      } catch (error) {
        console.error("Error creating task:", error);
        throw error;
      }
};

export const deleteTasksById = async (id) => {
    const url = `${API_URL}/tasks/${id}`;
    const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const result = await fetch(url, options);
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data = await result.json();
        return data;
      } catch (error) {
        console.error("Error creating task:", error);
        throw error;
      }
};

export const updateTasksById = async (id, reqBody) => {
    const url = `${API_URL}/tasks/${id}`;
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      };
      try {
        const result = await fetch(url, options);
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data = await result.json();
        return data;
      } catch (error) {
        console.error("Error creating task:", error);
        throw error;
      }
};