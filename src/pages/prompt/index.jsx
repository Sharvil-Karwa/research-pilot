import PageWrapper from "@/components/PageWrapper";
import { generateData } from "@/helpers/generateData";
import { db } from "@/../firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import PromptIll from "@/../public/Assets/promptIll.svg";
import Image from "next/image";
export const IdeaLink = ({ idea, idx, id }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const createIdea = async () => {
    try {
      await setDoc(
        doc(db, "ideas", user?.uid),
        {
          ideas: arrayUnion({
            id,
            idea,
          }),
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(idea);
    createIdea();
  });
  return (
    <Link
      key={idx}
      className={`flex flex-col w-full gap-y-2 p-4 bg-[#1F1926] rounded-md mt-4`}
      href={`/idea/${id}`}
    >
      <div className="innerCard group ">
        <p className="rounded-md p-2 px-5 bg-[#666666] group-hover:bg-white group-hover:text-black w-fit">
          Idea {idx + 1}
        </p>
        {/* <h1 className="font-semibold text-2xl">Idea {idx + 1}</h1> */}
        <p>{idea}</p>
      </div>
    </Link>
  );
};

const Prompt = () => {
  const [ideas, setIdeas] = useState("");
  const [prompt, setPrompt] = useState("");
  let myuuid = uuidv4();
  const generateUUID = () => {
    myuuid = uuidv4();
    return myuuid;
  };
  return (
    <PageWrapper>
      <div>
        <div className="flex w-full gap-x-4">
          <input
            className="innerCard w-full"
            type="text"
            placeholder="Enter keywords or phrase about your idea here"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button onClick={() => generateData(prompt, setIdeas, "ideas")}>
            <AiOutlineSend fontSize={32} />
          </button>
        </div>
        {ideas.length === 0 && (
          <div className="flex w-full items-center justify-center pt-[20vh]">
            <Image src={PromptIll} alt="Prompt Illustration" />
          </div>
        )}
        {ideas.length > 0 && (
          <div className="flex flex-col w-full gap-y-4 p-4 bg-[#1F1926] rounded-md mt-4">
            {ideas.split("<<<->>>").map((idea, idx) => {
              return (
                <IdeaLink key={idx} idea={idea} idx={idx} id={generateUUID()} />
              );
            })}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Prompt;
