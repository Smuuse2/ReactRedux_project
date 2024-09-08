import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { newTodo, updateTodo } from '../Redux/slices/Todoslice'; // Make sure the path and name are correct

const AddTodo = () => {
  const [modal, setModal] = useState(false);
  const [todo, setTodo] = useState('');
  const [desc, setDesc] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editId, setEditId] = useState(null); // Track which todo is being edited

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.mama.todos);

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo || !desc) {
      toast.error('Please Enter Title and Description');
      return;
    }

    const data = {
      id: isEditing ? editId : new Date().getTime(), // Use id if editing
      todo,
      desc,
    };

    if (isEditing) {
      dispatch(updateTodo({ id: editId, newTodo: data }));
      toast.success('Todo Updated!');
    } else {
      dispatch(newTodo(data));
      toast.success('Todo Created!');
    }

    // Reset the form and modal state
    setTodo('');
    setDesc('');
    setModal(false);
    setIsEditing(false);
    setEditId(null);
  };

  // Open the modal and set the current todo for editing
  const editTodo = (todo) => {
    setModal(true);
    setTodo(todo.todo);
    setDesc(todo.desc);
    setIsEditing(true);
    setEditId(todo.id);
  };

  const toggleModal = () => setModal(!modal);

  const closeModel = () => {
    setModal(false);
    setIsEditing(false);
    setEditId(null);
    setTodo('');
    setDesc('');
  };

  return (
    <div>
      <header className="bg-white">
        <Toaster />
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">All Todos</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleModal}
                className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="font-sans overflow-x-auto mt-10">
            <table className="min-w-full divide-gray-200">
              <thead className="bg-indigo-50 whitespace-nowrap">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Todo Title
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Todo Description
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                {todos.map((todo) => (
                  <tr key={todo.id}>
                    <td className="px-4 py-4 text-sm font-bold text-gray-800">{todo.todo}</td>
                    <td className="px-4 py-4 text-sm text-gray-800">{todo.desc}</td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      <button
                        className="text-blue-600 mr-4"
                        onClick={() => editTodo(todo)}
                      >
                        Edit
                      </button>
                      <button className="text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </header>

      {modal && (
        <div className="bg-black h-screen inset-0 bg-opacity-35 w-full fixed">
          <div className="flex justify-around">
            <div className="w-full max-w-xl mt-20">
              <div className="justify-between flex relative left-72 bottom-8">
                <div></div>
                <div onClick={closeModel} className="mr-5 absolute rounded-full bg-red-50 text-white p-1">
                  <h2 className="bg-red-500 p-1 rounded-full text-white">
                    <IoCloseSharp />
                  </h2>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="bg-white p-8 m-5">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Title Todo</label>
                  <input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Type task name.."
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Description Todo</label>
                  <textarea
                    placeholder="Write task description here..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="appearance-none border w-full py-4 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button className=" inline-block bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 w-full focus:ring focus:outline-none focus:shadow-outline">
                    {isEditing ? 'Update Todo' : 'Create Todo'}
                  </button>
                </div>
              </form>
              <p className="text-center text-gray-100 text-xs">
                &copy;2024 Sm technology. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTodo;
