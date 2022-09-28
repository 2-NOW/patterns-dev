import { FormValues, Todo } from "pages";
import { BaseSyntheticEvent } from "react";
import { UseFormRegister } from "react-hook-form/dist/types/form";

interface Props {
  todoList: Todo[];
  register: UseFormRegister<FormValues>;
  handleSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  handleCheck: (index: number) => void;
  handleDelete: (index: number) => void;
}

export default function ToDoView({ todoList, register, handleSubmit, handleCheck, handleDelete }: Props) {
  return (
    <div className={"container mx-auto px-4 py-8"}>
      <h1 className={"text-4xl font-bold mb-4"}>Todo App</h1>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          {...register("todo")}
          type="text"
          className="input input-bordered w-full"
          placeholder="Add Some Todo..."
        />
        <button className="btn btn-primary">추가하기</button>
      </form>
      <div className="flex flex-col gap-4 mt-8">
        {todoList.map((todo, index) => (
          <div key={+todo.createdAt} className="flex items-center gap-4">
            <input type="checkbox" checked={todo.completed} onChange={() => handleCheck(index)} className="checkbox" />
            <span onClick={() => handleCheck(index)} className="flex-1 cursor-pointer">
              {todo.completed ? <s>{todo.todo}</s> : todo.todo}
            </span>
            <button onClick={() => handleDelete(index)} className="btn btn-square btn-error btn-xs">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
