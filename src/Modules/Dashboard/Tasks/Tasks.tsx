import CustomButton from "../../Shared/CustomButton/CustomButton";

export default function Tasks() {
  return (<>
  <div className="flex justify-between items-center mt-2 mb-10 py-4 px-2 md:px-9.5 bg-white dark:bg-black ">
    <h1>Tasks</h1>
    <div className="shrink mt-[-1rem]">

    <CustomButton text="+ add task" />
    </div>
  </div>
    <div className="overflow-x-auto px-2 md:px-9.5 scrollbar-none">
  <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
    <thead className="ltr:text-left rtl:text-right">
      <tr className="*:font-medium *:text-gray-900 dark:*:text-white">
        <th className="px-3 py-2 whitespace-nowrap">Name</th>
        <th className="px-3 py-2 whitespace-nowrap">DoB</th>
        <th className="px-3 py-2 whitespace-nowrap">Role</th>
        <th className="px-3 py-2 whitespace-nowrap">Salary</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      <tr className="*:text-gray-900 *:first:font-medium dark:*:text-white">
        <td className="px-3 py-2 whitespace-nowrap">Nandor the Relentless</td>
        <td className="px-3 py-2 whitespace-nowrap">04/06/1262</td>
        <td className="px-3 py-2 whitespace-nowrap">Vampire Warrior</td>
        <td className="px-3 py-2 whitespace-nowrap">$0</td>
      </tr>

      <tr className="*:text-gray-900 *:first:font-medium dark:*:text-white">
        <td className="px-3 py-2 whitespace-nowrap">Laszlo Cravensworth</td>
        <td className="px-3 py-2 whitespace-nowrap">19/10/1678</td>
        <td className="px-3 py-2 whitespace-nowrap">Vampire Gentleman</td>
        <td className="px-3 py-2 whitespace-nowrap">$0</td>
      </tr>

      <tr className="*:text-gray-900 *:first:font-medium dark:*:text-white">
        <td className="px-3 py-2 whitespace-nowrap">Nadja</td>
        <td className="px-3 py-2 whitespace-nowrap">15/03/1593</td>
        <td className="px-3 py-2 whitespace-nowrap">Vampire Seductress</td>
        <td className="px-3 py-2 whitespace-nowrap">$0</td>
      </tr>

      <tr className="*:text-gray-900 *:first:font-medium dark:*:text-white">
        <td className="px-3 py-2 whitespace-nowrap">Colin Robinson</td>
        <td className="px-3 py-2 whitespace-nowrap">01/09/1971</td>
        <td className="px-3 py-2 whitespace-nowrap">Energy Vampire</td>
        <td className="px-3 py-2 whitespace-nowrap">$53,000</td>
      </tr>

      <tr className="*:text-gray-900 *:first:font-medium dark:*:text-white">
        <td className="px-3 py-2 whitespace-nowrap">Guillermo de la Cruz</td>
        <td className="px-3 py-2 whitespace-nowrap">18/11/1991</td>
        <td className="px-3 py-2 whitespace-nowrap">Familiar/Vampire Hunter</td>
        <td className="px-3 py-2 whitespace-nowrap">$0</td>
      </tr>
    </tbody>
  </table>
</div>
</>
  )
}
