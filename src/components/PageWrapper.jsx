import Sidebar from "./SIdebar";

const PageWrapper = ({ children }) => {
  return (
    <div>
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold">ResearchPilot</h1>
      </div>
      <div className="md:grid grid-cols-12">
        <div className="hidden md:block col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10 p-4 md:p-10">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
