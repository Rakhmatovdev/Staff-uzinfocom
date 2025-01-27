import UBreadcrumb from "@/components/ui/UBreadcrumb";
import userService from "@/services/user-service";
import {  itemStatistic } from "@/types/data";
import {  useQuery } from "@tanstack/react-query";
import { Tabs } from "antd";
import { format } from "date-fns";

const { TabPane } = Tabs;
const Statistic = () => {
    // const { data:user} = useQuery({
    //     queryKey: ["users"],
    //     queryFn: userService.users,
    // });
        // console.log(user);

        const { data:user} = useQuery({
            queryKey: ["users1"],
            queryFn: userService.loc,
        });

// console.log(user1);

    return (
        <div className="soh">
            <UBreadcrumb items={itemStatistic} />
            <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <div >
      <div className="p-2 shadow-md rounded-lg w-full ">
        <Tabs
          defaultActiveKey="1"
          className="custom-tabs"
          tabBarStyle={{
            borderBottom: "2px solid #e5e7eb",
          }}
        >
          <TabPane
            tab={<span className="text-gray-700 font-medium">Personal information</span>}
            key="1"
          >
            <section className="text-gray-600">
            <table className=" table-auto   w-full">
         {user && (
             <thead className=" text-gray-700">
             <tr className="mt-10">
               <th className="px-6 py-3 text-left text-sm font-medium">Ism</th><th>{user.first_name}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Familiya</th><th>{user.last_name}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Email</th><th>{user.email==null?"-":user.email}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Username</th><th>{user.username}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Telefon</th><th>{user.phone==null?"-":user.phone}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Tug'ilgan kun</th><th>{user.birth_date==null?"-":user.birth_date}</th>

             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Address</th><th>{user.address==""?"-":user.address}</th>
             </tr>
            
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Lavozim</th><th>{user.position==""?"-":user.position}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Daraja</th><th>{user.level==null?"-":user.level}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Ishga olingan sana</th><th>{user.hired_date==null?"-":user.hired_date}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Tuzilma</th><th>{user.organization.name==null?"-":user.organization.name}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Mutaxassislik</th><th>{user.specialty==null?"-":user.specialty}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Qobiliyat</th><th>{!user.skills.length?"-":user.skills.map((item:any)=><span key={item.skill}>{item.skill}</span>,)}</th>
             </tr>
             <tr>
               <th className="px-6 py-3 text-left text-sm font-medium">Boshqa dasturlash tillari</th><th>{!user.additional_languages.length?"-":user.additional_languages.map((item:any,index:number)=>item.language+`${user.additional_languages.length-1>index?", ":""}`)}</th>
             </tr>
           </thead>
         )}
        </table>
            </section>
          </TabPane>
          <TabPane
            tab={<span className="text-gray-700 font-medium">Ish tajriba</span>}
            key="2"
          >
            <section className="text-gray-600">
 <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 sm:mt-7">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                           
                            <th scope="col" className="tp">
                         <p className="pl-5"> Ish turi</p>
                            </th>
                            <th scope="col" className="tp ">
                            Ish joyi
                            </th>
                            <th scope="col" className="tp">
                            Boshlagan sanasi
                            </th>
                            <th scope="col" className="tp ">
                           Tugatgan sanasi
                            </th>

                            <th scope="col" className="tp ">
                             Address
                            </th>
                            <th scope="col" className="tp ">
                            Mahorat
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {user?.experiences.map((task:any,index:number) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                
                                    <td
                          
                                        className="tp "
                                    >
                                        <p className="tp">{task.position}</p>
                                    </td>
                                    <td className="tp">
                                      <p>{task.company}</p>
                                    </td>
                                    <td className="tp">
                                    <p >{task.start_date?format(task.start_date, "dd MMMM yyyy"):"-"}</p>
                                    </td>
                                    <td className="tp">
                                    <li>{task.end_date?format(task.end_date, "dd MMMM yyyy"):"-"}</li>
                                    </td>
                                    <td className="tp">{task?.address==""?"-":task?.address}</td>
                                    <td className="tp">{task?.skills.length>0?task?.skills?.map((item:any)=><p key={item.id}>{item.skill}</p>):"-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </section>
          </TabPane>
          <TabPane
            tab={<span className="text-gray-700 font-medium">Ijtimoiy tarmoqlar</span>}
            key="3"
          >
            <div className="flex flex-col">
              {user?.social_media_accounts.map((item:any,index:number)=>(<a target="_blank" href={item.url} key={index}>
             {item.social_media}
              </a>))}
            </div>
          </TabPane>
          <TabPane
            tab={<span className="text-gray-700 font-medium">Topshiriqlar</span>}
            key="4"
          >
           <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 sm:mt-7">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                           
                            <th scope="col" className="tp">
                               <p className="pl-5"> Nomi</p>
                            </th>
                            <th scope="col" className="tp ">
                            Boshlangan sanasi
                            </th>
                            <th scope="col" className="tp">
                            Tugash sanasi
                            </th>
                            <th scope="col" className="tp ">
                            Topshirish sanasi
                            </th>

                            <th scope="col" className="tp ">
                             Topshiriq turi
                            </th>
                            <th scope="col" className="tp ">
                             Topshiriq ishi
                            </th>
                            <th scope="col" className="tp ">
                             Holati
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {user?.tasks.map((task:any,index:number) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                
                                    <td
                                      
                                        className="tp "
                                    >
                                        <p className="tp">{task.name}</p>
                                    </td>
                                    <td className="tp">
                                      <p>{task.start_date?format(task.start_date, "dd MMMM yyyy"):"-"}</p>
                                    </td>
                                    <td className="tp">
                                    <p >{task.end_date?format(task.end_date, "dd MMMM yyyy"):"-"}</p>
                                    </td>
                                    <td className="tp">
                                    <li>{task.deadline?format(task.deadline, "dd MMMM yyyy"):"-"}</li>
                                    </td>
                                    <td className="tp">{task.task_type}</td>
                                    <td className="tp">{task.role_in_project.role_in_project}</td>
                                    <td className="tp">{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
          </TabPane>
          <TabPane
            tab={<span className="text-gray-700 font-medium">Mentorlik qilish</span>}
            key="5"
          >
             <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 sm:mt-7">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                           
                            <th scope="col" className="tp">
                     <p className="pl-5">Id</p>
                            </th>
                            <th scope="col" className="tp ">
                            Ismi
                            </th>
                            <th scope="col" className="tp">
                           Familyasi
                            </th>
                            <th scope="col" className="tp ">
                           Boshlanish sanasi
                            </th>
                            <th scope="col" className="tp ">
                           Tugatgan sanasi
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {user?.mentorship.map((student:any,index:number) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                
                                    <td
                                       
                                        className="tp font-medium text-gray-900  dark:text-white"
                                    >
                                        <p className="tp">{student.student.id}</p>
                                    </td>
                                    <td className="tp">
                                      <p>{student.student.first_name}</p>
                                    </td>
                                    <td className="tp">{student.student.last_name==""?"-":student.student.last_name}</td>
                                    <td className="tp">
                                    <p >{student.start_date?format(student.start_date, "dd MMMM yyyy"):"-"}</p>
                                    </td>
                                    <td className="tp">
                                    <li>{student.end_date?format(student.end_date, "dd MMMM yyyy"):"-"}</li>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
          </TabPane>
          <TabPane
            tab={<span className="text-gray-700 font-medium">Meetup maruza</span>}
            key="6"
          >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 sm:mt-7">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                           
                            <th scope="col" className="tp">
                     <p className="pl-5">Nomi</p>
                            </th>
                            <th scope="col" className="tp ">
                            Sana
                            </th>
                            <th scope="col" className="tp">
                           Hujjat
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {user?.lecture.map((metup:any,index:number) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                
                                    <td
                                       
                                        className="tp font-medium text-gray-900  dark:text-white"
                                    >
                                        <p className="tp">{metup.title}</p>
                                    </td>
                                    <td className="tp">
                                    <p >{metup.date?format(metup.date, "dd MMMM yyyy"):"-"}</p>
                                    </td>
                                    <td className="tp">
                                      {metup.files.length ?metup.files.map((item:any)=><p key={item.title}>{item.title}</p>):"-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
          </TabPane>
          <TabPane
            tab={<span className="text-gray-700 font-medium">Masala yechish</span>}
            key="7"
          >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 sm:mt-7">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                           
                            <th scope="col" className="tp">
                     <p className="pl-5">Platforma</p>
                            </th>
                            <th scope="col" className="tp ">
                            Oson daraja
                            </th>
                            <th scope="col" className="tp">
                           O'rta daraja
                            </th>
                            <th scope="col" className="tp">
                           Yuqori daraja
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {user?.problem_solving.map((problem:any,index:number) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                
                                    <td
                                       
                                        className="tp font-medium text-gray-900  dark:text-white"
                                    >
                                        <p className="tp">{problem.platform}</p>
                                    </td>
                                    <td className="tp">
                                    <p >{problem.easy?problem.easy:"-"}</p>
                                    </td>
                                    <td className="tp">
                                    <p >{problem.medium?problem.medium:"-"}</p>
                                    </td>
                                    <td className="tp">
                                    <p >{problem.hard?problem.hard:"-"}</p>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
          </TabPane>
          <TabPane
            tab={<span className="text-gray-700 font-medium">Xodimning daraja baholanishi</span>}
            key="8"
          >
            {user?.employee_level_evaluation && (<div>

              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Masala yechish darajasi: Oddiy</p>
                <p>{user.employee_level_evaluation.problem_solving_easy}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Masala yechish darajasi: O'rta</p>
                <p>{user.employee_level_evaluation.problem_solving_medium}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Masala yechish darajasi: Yuqori</p>
                <p>{user.employee_level_evaluation.problem_solving_hard}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Mentorlik qilish (dasturchi soni)</p>
                <p>{user.employee_level_evaluation.mentorship_count}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Loyihani testlashda ishtirok etish (soni)</p>
                <p>{user.employee_level_evaluation.project_test_count}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Loyiha arxitekturasida ishtirok etish (soni)</p>
                <p>{user.employee_level_evaluation.project_architecture_count}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Database arxitekturasini tuzishda qatnashish (soni)</p>
                <p>{user.employee_level_evaluation.database_architecture_count}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Orttirib bajarilgan topshiriqlar</p>
                <p>{user.employee_level_evaluation.additional_tasks_count}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Dasturlash sohasida ish tajribasi (yil)</p>
                <p>{user.employee_level_evaluation.experience_years}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">MeetUp larda ma'ruza o'qish (soni)</p>
                <p>{user.employee_level_evaluation.meetup_lecture_count}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Boshqa dasturlash tillarida tajribasi (soni)</p>
                <p>{user.employee_level_evaluation.other_programming_languages_count}</p>
              </div>
              <div className="flex p-4">
                <p className="w-[400px] font-semibold">Level</p>
                <p>{user.employee_level_evaluation.level}</p>
              </div>
              <hr />
              <div className="flex p-4 items-center">
                <p className="w-[400px] font-semibold">Keyingi daraja</p>
                <div>
                <div className="flex gap-4 py-2">
                  <p className="w-[300px]">Level:</p>
                     <p>{user?.employee_level_evaluation?.next_level_gaps.next_level}</p>
                     </div>
               {user?.employee_level_evaluation?.experience_years<5 && ( <div className="flex gap-4">
                  <p className="w-[300px]">Dasturlash sohasida ish tajribasi kerak (yil):</p>
                     <p>{5-user?.employee_level_evaluation.experience_years}</p>
                     </div>)}
                     <div className="flex gap-4 py-2">
                     <p className="w-[300px]">Masala yechish: Oddiy</p>
                     <p>{user?.employee_level_evaluation?.next_level_gaps?.gaps.problem_solving_easy}</p>
                     </div>
                     <div className="flex gap-4 py-2">
                <p className="w-[300px]">Mentorlik qilish (dasturchi soni)</p>
                <p>{user.employee_level_evaluation?.next_level_gaps?.gaps.mentorship_count}</p>
              </div>
                     <div className="flex gap-4 py-2">
                <p className="w-[300px]">Loyihani testlashda ishtirok etish (soni)</p>
                <p>{user.employee_level_evaluation?.next_level_gaps?.gaps.project_test_count}</p>
              </div>
                     <div className="flex gap-4 py-2">
                <p className="w-[300px]">Loyiha arxitekturasida ishtirok etish (soni)</p>
                <p>{user.employee_level_evaluation?.next_level_gaps?.gaps.additional_tasks_count}</p>
              </div>
                     <div className="flex gap-4 py-2">
                <p className="w-[300px]">MeetUp larda ma'ruza o'qish (soni)</p>
                <p>{user.employee_level_evaluation?.next_level_gaps?.gaps.meetup_lecture_count}</p>
              </div>
                </div>
              </div>
              <hr />
              <div className="flex p-4 items-center">
                <p className="w-[400px] font-semibold">Keyingi daraja talablari</p>
                <div>                
                  {user?.employee_level_evaluation?.next_level_requirements.map((item:any)=>(<>
                 <div key={item.language} className="flex gap-4 py-2">
                  <p className="w-[300px]">Dasturlash tili:</p>
                  <p>{item.language}</p>
                 </div>
                 <div className="flex gap-4 py-2">
                  <p className="w-[300px]">Dasturlash tili darajasi:</p>
                  <p>{item.level}</p>
                 </div>
                 <div className="flex gap-4 py-2">
                  <p className="w-[300px]">Dasturlash tili asoslari:</p>
                  <p className="w-[300px]">{(item.requirements.replaceAll(/\r/g, "'"))}</p>
                 </div>
                  </>))}


                </div>
              </div>

            </div>)}
          </TabPane>
        </Tabs>
      </div>
    </div>
                </div>
            </>
        </div>
    );
};

export default Statistic;
