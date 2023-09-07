import axios from "axios";

let headerConfig = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
};

export const getAllNotes = async () => {
  let responseTwo = await axios.get(`http://localhost:3000/api/v1/notes`, headerConfig);
  return responseTwo;
};

export const createNote = async (obj) => {
  let responseTwo = await axios.post(`http://localhost:3000/api/v1/notes`, obj, headerConfig);
  return responseTwo;
};

export const updateNote = async (id, obj) => {
  let responseTwo = await axios.put(`http://localhost:3000/api/v1/notes/${id}`, obj, headerConfig);
  return responseTwo;
};

export const archiveNote = async (id, obj) => {
  let responseTwo = await axios.put(`http://localhost:3000/api/v1/notes/${id}/archive`, {}, headerConfig);
  return responseTwo;
};

export const trashNote = async (id) => {
  let responseTwo = await axios.put(`http://localhost:3000/api/v1/notes/${id}/trash`, {},  headerConfig);
  return responseTwo;
};

export const deleteNote = async (id) => {
  let responseTwo = await axios.delete(`http://localhost:3000/api/v1/notes/${id}`, headerConfig);
  return responseTwo;
};