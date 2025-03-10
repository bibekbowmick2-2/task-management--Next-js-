'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from 'sweetalert2';
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



    const deleteTask = async (id) => {
      try{
        const response = await axios.delete(`/api/manipulate/${id}`);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) =>{
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success"
            });
          
            refetch();
            console.log(response);
          }
        });
     
      }
      catch(err){
        console.error("Error deleting task:", err);
      }
    }


    const editTask = async (id, task) => {
      const { value: newTask } = await Swal.fire({
          input: "text",
          inputLabel: "Edit Your Task",
          inputPlaceholder: "Edit task...",
          inputValue: task || "Enter task here...",
          showCancelButton: true,
          confirmButtonText: "Done",
          color: "#ff0000",
          
          
      });
  
      if (!newTask) return; 
      if (newTask) {
        Swal.fire(newTask);
      }
  
      try {
          const result = await axios.patch(`/api/manipulate/${id}`, { task: newTask });
          console.log(result.data);
          refetch(); 
      } catch (err) {
          console.error("Error editing task:", err);
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
      <button className="btn btn-success" onClick={() => editTask(task._id,task.task)}>Edit</button>
      <button className="btn btn-error" onClick={() => deleteTask(task._id)}>Delete</button>
    </div>
    <ul className="mt-6 flex flex-col gap-2 text-xs">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>High-resolution image generation</span>
      </li>
      
    </ul>
    
  </div>
  </div>
)) : <div>
<span className="loading loading-bars loading-xl"></span>
<span className="loading loading-bars loading-xl"></span>
<span className="loading loading-bars loading-xl"></span>
<span className="loading loading-bars loading-xl"></span>
<span className="loading loading-bars loading-xl"></span>
</div>}
</div>




        </div>
    );
}
