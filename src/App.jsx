import React, { useState, useEffect } from "react";
import "./css/App.css";
import { db } from "./firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const addUserAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const subtractUserAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age - 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [usersCollectionRef]);

  return (
    <div className="App">
      <div className="form">
        <input
          type="text"
          placeholder="Name..."
          required
          minlength="3"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setNewAge(event.target.value);
          }}
        />
        <button onClick={createUser}>Create User</button>
      </div>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                addUserAge(user.id, user.age);
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                subtractUserAge(user.id, user.age);
              }}
            >
              -
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}
