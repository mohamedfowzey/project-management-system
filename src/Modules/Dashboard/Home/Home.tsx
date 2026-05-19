import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { CalendarCheck2, CalendarClock, ListTodo, ShieldCheck, ShieldOff } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getTasksCount as getTasksCountApi, type ITasksCountResponse } from "../../../api/modules/tasks";
import { getUserCount as getUserCountApi, type UserCountresponse } from "../../../api/modules/user";
import { AuthContext } from '../../../Contexts/AuthContext';
import NoData from '../../Shared/NoData/NoData';


ChartJS.register(ArcElement, Tooltip, Legend);


const StatCard = ({ icon: Icon, title, count, bgColor, iconBgColor, isLoading }: any) => {
  if (isLoading) {
    return (
      <div className="bg-gray-100 rounded-xl shadow-sm p-4 flex flex-col justify-between animate-pulse ">
        <div className="bg-gray-200 h-10 w-10 rounded-2xl mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className={`${bgColor} rounded-xl shadow-sm p-4 flex flex-col justify-between `}>
      <div className={`${iconBgColor} inline-block p-3 rounded-2xl w-fit`}>
        <Icon className="text-black" strokeWidth={2} />
      </div>
      <h3 className="text-base font-bold my-1.5 text-gray-600">{title}</h3>
      <p className="text-lg text-black font-medium">{count}</p>
    </div>
  );
};
export default function Home() {


  const { userData ,mood} = useContext(AuthContext) || {};
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

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
      setLoadingTasks(true);
      const response = await getTasksCountApi();
      setTasksCount(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks count:", error);
    } finally {
      setLoadingTasks(false);
    }
  }
  const getUserCount = async () => {
    try {
      setLoadingUsers(true);
      const response = await getUserCountApi();
      setUsersCount(response.data);
    } catch (error) {
      console.error("Failed to fetch users count:", error);
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    getTasksCount();
    getUserCount();
  }, []);

  const chartTasksData = {
    labels: ['To Do', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [tasksCount.toDo, tasksCount.inProgress, tasksCount.done],
        backgroundColor: [
          '#DDD6FF',
          '#FEFCE8',
          '#FAE8FF',
        ],
        borderWidth: 2,
        borderColor: [
          '#C4B4FF',
          '#FFF085',
          '#F6CFFF',
        ],
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: mood === 'light' ? '#4B5563' : '#ffffff',
          font: {
            size: 14,
          },
          cursor: 'pointer',
        }
      },
    },
  };

  const chartUsersData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [usersCount.activatedEmployeeCount, usersCount.deactivatedEmployeeCount],
        backgroundColor: [
          '#FAE8FF',
          '#FEFCE8',
        ],
        borderWidth: 2,
        borderColor: [
          '#F6CFFF',
          '#FFF085',

        ],
      },
    ],
  };

  const hasData = chartTasksData?.datasets[0]?.data?.some(val => val > 0);

  return (
    <>
    
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

        <div className={` ${mood === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-md overflow-hidden p-6 flex flex-col justify-between`}>
          <div className="mb-6 ps-4 border-s-4 border-solid border-amber-500">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <p className={` ${mood === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>Lorem ipsum dolor sit amet, consecteture</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* <div className="bg-violet-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
              <div className="bg-violet-300 inline-block p-3 rounded-2xl w-fit">
                <ListTodo strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold my-1.5 text-gray-600">To Do</h3>
              <p className="text-lg font-medium">{tasksCount.toDo} </p>
            </div> */}
            <StatCard
              isLoading={loadingTasks}
              icon={ListTodo} title="To Do" count={tasksCount.toDo}
              bgColor="bg-violet-200" iconBgColor="bg-violet-300"
            />

            <StatCard
              isLoading={loadingTasks}
              icon={CalendarClock} title="In Progress" count={tasksCount.inProgress}
              bgColor="bg-yellow-50" iconBgColor="bg-yellow-200"
            />

            <StatCard
              isLoading={loadingTasks}
              icon={CalendarCheck2} title="Completed" count={tasksCount.done}
              bgColor="bg-fuchsia-100" iconBgColor="bg-fuchsia-200"
            />

          </div>
          <div className="h-48 mt-5 relative flex justify-center items-center px-10">
            {loadingTasks ? (
              <div className="h-48 w-48 rounded-full border-\[20px\] border-gray-300 border-t-gray-200 animate-spin"></div>
            ) :hasData? (
              <Doughnut data={chartTasksData} options={chartOptions} />
            ) : (
              <NoData />
            )}
          </div>
        </div>
        {/* users counts */}
        <div className={`${mood === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-md overflow-hidden p-6 flex flex-col justify-between`}>
          <div className="mb-6 ps-4 border-s-4 border-solid border-amber-500">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className={` ${mood === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>Lorem ipsum dolor sit amet, consecteture</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* <div className="bg-violet-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
              <div className="bg-violet-300 inline-block p-3 rounded-2xl w-fit">
                <ShieldCheck />
              </div>
              <h3 className="text-base font-bold my-1.5 text-gray-600">Active</h3>
              <p className="text-lg font-medium">{usersCount.activatedEmployeeCount} </p>
            </div> */}
            <StatCard
              isLoading={loadingUsers}
              icon={ShieldCheck} title="Active" count={usersCount.activatedEmployeeCount}
              bgColor="bg-fuchsia-100" iconBgColor="bg-fuchsia-200"
            />

            <StatCard
              isLoading={loadingUsers}
              icon={ShieldOff} title="Inactive" count={usersCount.deactivatedEmployeeCount}
              bgColor="bg-yellow-50" iconBgColor="bg-yellow-200"
            />

          </div>
          <div className="h-48 mt-5 relative flex justify-center items-start px-10">
            {loadingUsers ? (
              <div className="h-48 w-48  rounded-full border-\[20px\] border-gray-300 border-t-gray-200 animate-spin"></div>
            ) : (

              <Doughnut data={chartUsersData} options={chartOptions} />

            )}
          </div>
        </div>
      </div>
      

      

    </div>

    
    </>
    



  )


}

