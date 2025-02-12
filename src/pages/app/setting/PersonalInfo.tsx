import UInput from "@/components/ui/UInput"
import { TDeleted } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";

const PersonalInfo = () => {
 const userProfile = JSON.parse(localStorage.getItem('role')||"")
     const {
             control,
             handleSubmit
           } = useForm({defaultValues:{
             is_deleted:'',
             delete_id:null
           }})
       
            const onSubmit: SubmitHandler<TDeleted> = (data) => console.log(data)
    
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" w-full rounded space-y-2">
    <div className="fff  sm:gap-32">
      <p className=" sm:text-lg font-semibold sm:pr-[22px]">
        Full Name <span className="text-rose-500">*</span>
      </p>
      {/* @ts-ignore */}
      <UInput name="name" control={control} className="sm:w-[495px] sm:h-9" value={userProfile?.first_name+" "+userProfile?.last_name} />
    </div>

  
    <div className="fff  sm:gap-44">
      <p className="sm:text-lg font-semibold pr-[12px]">
        Email <span className="text-rose-500">*</span>
      </p>
      <UInput
        name="email"
        control={control}
        className="sm:w-[495px] sm:h-9"
        // @ts-ignore
        value={userProfile?.email}
      />
    </div>
    <div className="fff  sm:gap-32">
      <p className="sm:text-lg font-semibold sm:pr-[37px]">
       Position <span className="text-rose-500">*</span>
      </p>
      {/* @ts-ignore */}
      <UInput name="position" control={control} className="sm:w-[495px] sm:h-9" value={userProfile?.position}/>
    </div>
  </form>
  )
}

export default PersonalInfo