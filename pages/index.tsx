import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { NextPage } from "next";
import { setCookie, getCookie } from "cookies-next";
import ToDoView from "components/pages/ToDoView";

export type Todo = {
  todo: string;
  completed: boolean;
  createdAt: number;
};

export interface FormValues {
  todo: string;
}

const Home: NextPage = () => {
  const { register, handleSubmit: onSubmit, reset } = useForm<FormValues>();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const _todos = getCookie("todos") as string;
    setTodos(_todos ? JSON.parse(_todos) : []);
  }, []);

  const updateTodos = (todo: Todo[]) => setCookie("todos", JSON.stringify(todo));

  const handleSubmit = onSubmit((todo) => {
    setTodos((prev) => {
      const newTodo = [
        ...prev,
        {
          todo: todo.todo,
          completed: false,
          createdAt: +new Date(),
        },
      ];
      updateTodos(newTodo);
      return newTodo;
    });
    reset();
  });

  const handleCheck = (index: number) => {
    setTodos((prev) => {
      const newTodo = [
        ...prev.slice(0, index),
        { ...prev[index], completed: !prev[index].completed },
        ...prev.slice(index + 1),
      ];
      updateTodos(newTodo);
      return newTodo;
    });
  };

  const handleDelete = (index: number) => {
    setTodos((prev) => {
      const newTodo = [...prev.slice(0, index), ...prev.slice(index + 1)];
      updateTodos(newTodo);
      return newTodo;
    });
  };

  const props = {
    todos,
    register,
    handleSubmit,
    handleCheck,
    handleDelete,
  };

  return <ToDoView {...props} />;
};

export default Home;
