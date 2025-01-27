import UBreadcrumb from "@/components/ui/UBreadcrumb";
import { itemHome } from "@/types/data";

const Home = () => {
  return (
    <div className="soh">
      <UBreadcrumb items={itemHome} />
      <h1 className="text-xl font-bold mt-8">Savollar Statistikasi</h1>
      <div className="flex flex-col xl:flex-row xl:justify-between gap-6">
        <div className="w-full xl:w-1/3">
        </div>
        <div className="w-full xl:w-1/3"> 
        </div>
        <div className="w-full xl:w-1/3">
        </div>
      </div>
    </div>
  );
};

export default Home;
