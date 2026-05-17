import CustomButton from "../../Shared/CustomButton/CustomButton";

export default function Tasks() {
  return (<>
  <div className="flex justify-between items-center mt-2 mb-10 py-4 px-2 md:px-9.5 bg-white dark:bg-gray-950 ">
    <h1>Tasks</h1>
    <div className="shrink mt-[-1rem]">

    <CustomButton text="+ add task" />
    </div>
  </div>


    <div className="overflow-x-auto px-2 md:px-9.5 scrollbar-none">
  <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
    <thead className="ltr:text-left rtl:text-right">
      <tr className="*:font-medium *:text-white  bg-ternary py-20">
        {['title','status','user','project','creation Date',' '].map(h=><th className="px-3 py-3 whitespace-nowrap">{h}</th>)}
        
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {[1,2,3,4].map(i=>(

      <tr className="*:text-gray-900 *:first:font-medium dark:*:text-white odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
        <td className="px-3 py-2 whitespace-nowrap">{i}</td>
        <td className="px-3 py-2 whitespace-nowrap">Nandor the Relentless</td>
        <td className="px-3 py-2 whitespace-nowrap">04/06/1262</td>
        <td className="px-3 py-2 whitespace-nowrap">Vampire Warrior</td>
        <td className="px-3 py-2 whitespace-nowrap">$0</td>
        <td className="px-3 py-2 whitespace-nowrap"><span className='rotate-90 inline-block font-extrabold text-main text-3xl hover:scale-125 transition cursor-pointer'>...</span></td>
      </tr>
      ))}

      
    </tbody>
  </table>
</div>
</>
  )
}
