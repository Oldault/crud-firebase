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
    try {
      await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    } catch (e) {
      console.log(e);
    }
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
      console.log("useEffect")
    };

    getUsers();
  }, [usersCollectionRef]);

  return (
    <div className="App">
      <div className="form">
        <div className="group">
            <input
              type="text"
              required
              minlength="3"
              placeholder="Name..."
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>

          <div className="group">
            <input
              type="text"
              placeholder="Age..."
              required
              onChange={(event) => {
                setNewAge(event.target.value);
              }}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
          <button className="button" onClick={createUser}>Create User</button>
      </div>
      {users.map((user) => {
        return (
          <div className="info">
            {" "}
            <div className="pers">
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
            </div>
            <div className="buttons">
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
                className="x"
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                X
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
