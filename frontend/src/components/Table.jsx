import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  MdOutlineDeleteOutline,
  MdOutlineEditNote,
  MdOutlineCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";

const Table = ({ todos, setTodos, isLoading, fetchData }) => {
  const [editText, setEditText] = useState({
    body: '',
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/todo/${id}/`,
        value
      );
      // const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
      // setTodos(newTodos)
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckBox = (id, value) => {
    handleEdit(id, {
      compleated: !value,
    });
  };

  const handleChange = (e) => {
    setEditText(prev =>({
      ...prev,
      'body':e.target.value
    }))
    console.log(editText)
  };

  const handleclickupdate =(id,value)=>{
    handleEdit(editText.id,editText)
    setEditText({
      body: ''
    })
  }

  return (
    <div className="py-2">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Checkbox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              To Do
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Data Create
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div>Is Loading ...</div>
          ) : (
            <>
              {todos.map((todoItem, index) => {
                return (
                  <tr key={todoItem.id} className="border-b border-black">
                    <td className="p-3 text-sm" title={todoItem.id}>
                      <span
                        onClick={() =>
                          handleCheckBox(todoItem.id, todoItem.compleated)
                        }
                        className="inline-block cursor-pointer text-xl"
                      >
                        {todoItem.compleated ? (
                          <MdOutlineCheckBox />
                        ) : (
                          <MdCheckBoxOutlineBlank />
                        )}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{todoItem.body}</td>

                    {/* <td className="p-3 text-sm text-center">
                      {todoItem.compleated ? <span className="p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300">Done</span>:<span className="p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300">Incomplete</span>}
                    </td> */}
                    <td className="p-3 text-sm text-center">
                      <span
                        className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
                          todoItem.compleated ? "bg-green-300" : "bg-red-300"
                        }`}
                      >
                        {todoItem.compleated ? "Done" : "Incomplete"}
                      </span>
                    </td>

                    <td className="p-3 text-sm">
                      {new Date(todoItem.created).toLocaleString()}
                    </td>
                    <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
                      <span className="text-xl cursor-pointer">
                        <label htmlFor="my_modal_6" className="btn">
                          <MdOutlineEditNote onClick={
                            ()=> setEditText(todoItem)
                          }/>
                        </label>
                      </span>
                      <span className="text-xl cursor-pointer">
                        <MdOutlineDeleteOutline
                          onClick={() => handleDelete(todoItem.id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Todo</h3>
          <input
            type="text"
            placeholder="Type here"
            value={editText.body}
            onChange={handleChange}
            className="input input-bordered w-full mt-8 max-w-xs"
          />
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-primary" onClick={handleclickupdate}>
              Edit
            </label>
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
