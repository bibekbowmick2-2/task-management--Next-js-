'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//import { useEffect, useState } from "react";

export default function Home() {
   


    const { data: items=[], isLoading, error,refetch } = useQuery({
      queryKey: ["items"],
      queryFn: async () => {
          const res = await axios.get('/api/addtask');
          return res.data.tasks;
      },
  });

  

    
    const addTask = async (e) => {
        e.preventDefault();
        const task = e.target.task.value;

        if (!task) {
            alert("Task cannot be empty!");
            return;
        }

        try {
            const result = await axios.post('/api/addtask', { task });
            console.log(result.status);
            refetch();
            alert(result.data.message);
            
            e.target.reset(); 
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen mt-10 gap-8">
            <p>Task Management Application</p>

            <form className="flex gap-x-4 w-[400px]" onSubmit={addTask}>
                <input type="text" placeholder="Add task" name="task" className="input input-primary " />
                <button type="submit" className="btn btn-primary">Add</button>
            </form>


            <div className="grid grid-cols-2 gap-4">
            {items.length > 0 ? items.map((task) => (
            <div key={task._id}  className="card w-96 bg-base-100 shadow-sm">
  <div className="card-body">
    <span className="badge badge-xs badge-warning">Most Popular</span>
    <div className="flex justify-between">
    <h2 className="text-3xl font-bold">{task.task}</h2>
      <button className="btn btn-success">Edit</button>
      <button className="btn btn-error">Delete</button>
    </div>
    <ul className="mt-6 flex flex-col gap-2 text-xs">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>High-resolution image generation</span>
      </li>
      
    </ul>
    
  </div>
  </div>
)) : <div>No tasks available</div>}
</div>




        </div>
    );
}
