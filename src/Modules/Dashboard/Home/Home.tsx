import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { CalendarCheck2, CalendarClock, ListTodo, ShieldCheck, ShieldOff } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { getTasksCount as getTasksCountApi, type ITasksCountResponse } from "../../../api/modules/tasks";
import { getUserCount as getUserCountApi, type UserCountresponse } from "../../../api/modules/user";
import { AuthContext } from '../../../Contexts/AuthContext';


export default function Home() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  

  const { userData } = useContext(AuthContext) || {};

  const [tasksCount, setTasksCount] = useState<ITasksCountResponse>({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });

  const [usersCount, setUsersCount] = useState<UserCountresponse>({
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0
  });



  const getTasksCount = async () => {
    try {
      const response = await getTasksCountApi();
      setTasksCount(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks count:", error);
    }
  }
  const getUserCount = async () => {
    try {
      const response = await getUserCountApi();
      setUsersCount(response.data);
    } catch (error) {
      console.error("Failed to fetch users count:", error);
    }
  }

  

  useEffect(() => {
    getTasksCount();
    getUserCount();
  }, []);

  return (
    <div className="p-6">
      {/* header */}
      <div className="p-6 py-16 bg-header rounded-xl shadow-md text-white overflow-hidden relative ">
        <div className="absolute inset-0 bg-layer-header "></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-light my-3.5">
            Welcome <span className="text-main-color">{userData?.userName || "Upskilling"}</span>
          </h1>
          <p className="text-2xl font-extralight my-4">
            You can add project and assign tasks to your team.
          </p>
        </div>
      </div>
      {/* counts of tasks and users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* tasks counts */}

        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 flex flex-col justify-between">
          <div className="mb-6 ps-4 border-s-4 border-solid border-amber-500">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consecteture</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-violet-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
              <div className="bg-violet-300 inline-block p-3 rounded-2xl w-fit">
                <ListTodo strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold my-1.5 text-gray-600">To Do</h3>
              <p className="text-lg font-medium">{tasksCount.toDo} </p>
            </div>

            <div className="bg-yellow-50 rounded-xl shadow-sm p-4 flex flex-col justify-between">
              <div className="bg-yellow-200 inline-block p-3 rounded-2xl w-fit">
                <CalendarClock strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold my-1.5 text-gray-600">In Progress</h3>
              <p className="text-lg font-medium">{tasksCount.inProgress} </p>
            </div>

            <div className="bg-fuchsia-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
              <div className="bg-fuchsia-200 inline-block p-3 rounded-2xl w-fit">
                <CalendarCheck2 strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold my-1.5 text-gray-600">Completed</h3>
              <p className="text-lg font-medium">{tasksCount.done} </p>
            </div>
          </div>
        </div>
        {/* users counts */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 flex flex-col justify-between">
          <div className="mb-6 ps-4 border-s-4 border-solid border-amber-500">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consecteture</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-violet-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
              <div className="bg-violet-300 inline-block p-3 rounded-2xl w-fit">
                <ShieldCheck />
              </div>
              <h3 className="text-base font-bold my-1.5 text-gray-600">Active</h3>
              <p className="text-lg font-medium">{usersCount.activatedEmployeeCount} </p>
            </div>

            <div className="bg-yellow-50 rounded-xl shadow-sm p-4 flex flex-col justify-between">
              <div className="bg-yellow-200 inline-block p-3 rounded-2xl w-fit">
                <ShieldOff strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold my-1.5 text-gray-600">Inactive</h3>
              <p className="text-lg font-medium">{usersCount.deactivatedEmployeeCount}  </p>
            </div>
          </div>
        </div>

      </div>



    </div>



  )


}

