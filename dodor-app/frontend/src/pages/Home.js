import { HomeIcon } from "@heroicons/react/24/solid";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-[90vh] flex justify-center items-center">
      <HomeIcon className="size-12 text-black" />
      <span className="text-black text-5xl">Hello World!</span>
    </div>
  );
};

export default Home;
