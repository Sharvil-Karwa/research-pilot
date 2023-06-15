import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GoClock, GoHome } from "react-icons/go";
const Sidebar = () => {
  const [activePage, setActivePage] = useState("/prompt");
  const router = useRouter();

  useEffect(() => {
    setActivePage(router.pathname);
  }, [router]);
  const paths = [
    {
      name: "Home",
      link: "/prompt",
      icon: <GoHome size={20} />,
    },
    {
      name: "Previous Ideas",
      link: "/previous-ideas",
      icon: <GoClock size={20} />,
    },
    // {
    //     name:"Home",
    //     link: "/prompt"
    // }
  ];
  return (
    <div className="sticky top-0 z-50 mt-10 flex w-full flex-col gap-y-4">
      {paths.map((path, idx) => {
        return (
          <Link
            key={idx}
            href={path.link}
            className={`flex gap-x-3 item-center text-lg pl-4 py-4 rounded-r-lg ${
              activePage === path.link && "bg-[#461d6c]"
            }`}
          >
            <p className="font-extralight self-center">{path.icon}</p>
            <h1 className="">{path.name}</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
