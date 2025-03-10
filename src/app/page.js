//import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen mt-10 gap-8">


      <p>Task Management Application</p>


    <form className="flex gap-x-4 w-[400px]">
      <input type="text" placeholder="Add task" className="input input-primary " />
      <button type="submit" className="btn btn-primary">Add</button>
    </form>

      
    </div>
  );
}
