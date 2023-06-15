import PageWrapper from "@/components/PageWrapper";
import { generateData } from "@/helpers/generateData";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "../../../firebase";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";
import { toast } from "react-toastify";

export const QuestionSection = ({ data }) => {
  const router = useRouter();
  const [createLinkTrue, setCreateLinkTrue] = useState(false);
  const [tempLink, setTempLink] = useState("");
  const radioRef = useRef(null);
  console.log(data);
  useEffect(() => {
    setTempLink(uuidv4());
  }, []);
  const createFormLink = async () => {
    setCreateLinkTrue(true);
    navigator.clipboard.writeText(liveLink);
    toast.success("Link copied to clipboard");
    // const user = JSON.parse(localStorage.getItem("user")).uid;
    try {
      await setDoc(doc(db, "forms", tempLink), {
        data,
        responses: [],
      });
    } catch (err) {
      console.log(err);
    }
    // console.log(response);
  };

  // const test = `
  // {"question": "What is the purpose of an e-commerce website for custom cricket merchandise?",
  // "options": ["To sell cricket merchandise online", "To provide custom cricket merchandise", "To provide information about cricket merchandise", "To provide reviews about cricket merchandise"]}<<<->>>

  // {"question": "Which of the following is a feature of an e-commerce website for custom cricket merchandise?",
  // "options": ["Secure payment gateway", "Live chat support", "In-store pickup", "Free shipping"]}<<<->>>

  // {"question": "Which of the following is a benefit of using an e-commerce website for custom cricket merchandise?",
  // "options": ["Convenience", "Lower prices", "Faster delivery", "More selection"]}<<<->>>

  // {"question": "What type of products can be found on an e-commerce website for custom cricket merchandise?",
  // "options": ["Clothing", "Equipment", "Accessories", "All of the above"]}<<<->>>
  //   {"question": "What type of payment methods are accepted on an e-commerce website for custom cricket merchandise?",
  // "options": ["Credit cards", "Debit cards", "PayPal", "All of the above"]}`;

  const updateResponses = async () => {};
  const liveLink = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://ignitia-23.vercel.app"
  }/form/${tempLink}`;
  // const liveLink = `https://ignitia-23.vercel.app/form/${formLink}`
  ('\n\n1. What type of platform is this? \n{"question": "What type of platform is this?", "options": ["Online Shopping Platform", "Online Wedding Planning Platform", "Online Event Planning Platform", "Online Travel Planning Platform"]}<<<->>>\n2. What type of tools does this platform provide? \n{"question": "What type of tools does this platform provide?", "options": ["Budgeting", "Guest List Management", "Vendor Selection", "All of the Above"]}<<<->>>\n3. What is the main purpose of this platform? \n{"question": "What is the main purpose of this platform?", "options": ["To help plan weddings", "To help plan events", "To help plan trips", "To help plan budgets"]}<<<->>>\n4. What type of users does this platform cater to? \n{"question": "What type of users does this platform cater to?", "options": ["Wedding Planners", "Event Planners", "Travelers", "Wedding Couples"]}<<<->>>\n5. What is the primary benefit of using this platform? \n{"question": "What is the primary benefit of using this platform?", "options": ["Saving Time", "Saving Money", "Organizing Events", "Finding Vendors"]}<<<->>>\n6. What type of information can be found on this platform');

  return (
    <>
      {data?.split("<<<->>>").map((quest, idx) => {
        const temp = JSON.parse(quest);
        return (
          <div key={idx}>
            <h1 className="font-bold text-lg">{temp.question}</h1>
            {temp.options.map((opt, idx) => {
              return (
                <>
                  <input
                    key={idx}
                    type="radio"
                    name={temp.question}
                    id={opt}
                    value={opt}
                    className="mr-2 hover:cursor-pointer"
                    ref={radioRef}
                  />
                  <label htmlFor={opt}>{opt}</label>
                  <br />
                </>
              );
            })}
          </div>
        );
      })}
      {router.asPath.includes("idea") && (
        <button
          className="rounded-md p-2 bg-green-800 w-fit"
          disabled={createLinkTrue}
          onClick={createFormLink}
        >
          Create Link
        </button>
      )}
      {router.asPath.includes("form") && (
        <button
          className="rounded-md p-2 bg-[#5E2A8E] w-fit"
          onClick={updateResponses}
        >
          Submit
        </button>
      )}
      {createLinkTrue && (
        <p onClick={() => navigator.clipboard.write(liveLink)}>{liveLink}</p>
      )}
    </>
  );
};

const IdeaSection = ({ title, desc, type }) => {
  const [data, setData] = useState(null);
  const [showDesc, setShowDesc] = useState(true);
  const [isTicked, setIsTicked] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const { ideaId } = useRouter().query;
  const [phrase, setPhrase] = useState("");
  console.log(ideaId);

  const fetchIdeas = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")).uid;
      const docRef = doc(db, "ideas", user);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const arr = docSnap.data().ideas;
        arr?.forEach((element) => {
          if (element.id === ideaId) {
            setPhrase(element.idea);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);
  return (
    <div className="innerCard">
      <div>
        {" "}
        <h1 className="font-semibold text-2xl">{title}</h1>
        {showDesc && <p className="text-gray-400 mt-4">{desc}</p>}
      </div>{" "}
      {type != "PR" && data && <p>{data}</p>}
      {type == "PR" && data && (
        <>
          <QuestionSection data={data} />
        </>
      )}
      <div className="w-full flex justify-between">
        <button
          className="bg-[#5E2A8E] rounded-md py-2 px-6 "
          onClick={() => {
            generateData(phrase, setData, type),
              setShowDesc(false),
              setIsGenerated(true);
            setIsTicked(true);
          }}
        >
          {isGenerated ? "Regenerate" : "Generate"}
        </button>

        <button
          disabled={!isGenerated}
          onClick={() => setIsTicked(!isTicked)}
          className="text-2xl disabled:text-gray-700 disabled:cursor-not-allowed"
        >
          {!isTicked ? <BsSquare /> : <BsCheckSquareFill />}
        </button>
      </div>
    </div>
  );
};

const Idea = () => {
  const router = useRouter();
  const { ideaId } = router.query;
  const pdfRef = useRef();
  useEffect(() => {
    console.log(pdfRef.current);
  }, [pdfRef]);
  const sections = [
    {
      title: "Problem Statement",
      type: "PS",
      desc: "Problem statement is a concise description of an issue to be addressed or a condition to be improved upon. It identifies the gap between the current (problem) state and desired (goal) state of a process or product.",
    },
    {
      title: "Market Research",
      type: "MR",
      desc: "Market research is the process of gathering information about your business's buyers personas, target audience, and customers to determine how viable and successful your product or service would be, and/or is, among these people.",
    },
    {
      title: "Competitors",
      type: "CP",
      desc: "A competitor is a person, business, team, or organization that competes against you or your company. If you sell sporting goods, for example, you compete with large sporting goods retailers, but you also compete with department stores, local markets, and other businesses that provide similar products.",
    },
    {
      title: "USP (Unique Selling Point)",
      type: "USP",
      desc: "A unique selling proposition (USP) refers to the unique benefit exhibited by a company, service, product or brand that enables it to stand out from competitors. The unique selling proposition must be a feature that highlights product benefits that are meaningful to consumers.",
    },
    {
      title: "Scalability",
      type: "SC",
      desc: "Scalability is the measure of a system's ability to increase or decrease in performance and cost in response to changes in application and system processing demands. ... Scalability is essential in that it contributes to competitiveness, efficiency, reputation and quality.",
    },
    {
      title: "Target Audience",
      type: "TA",
      desc: "A target audience is a group of people defined by certain demographics and behavior. Often, businesses use what they know about their target audience to create user personas. ... Finding a target audience means discovering what kind of people are most likely to be interested in your service or product.",
    },
    {
      title: "Primary Research",
      type: "PR",
      desc: "Primary research is research you conduct yourself (or hire someone to do for you.) It involves going directly to a source —usually customers and prospective customers in your target market — to ask questions and gather information.",
    },
    {
      title: "Secondary Research",
      type: "SR",
      desc: "Secondary research is a research method that involves using already existing data. Existing data is summarized and collated to increase the overall effectiveness of research.",
    },
    {
      title: "User Persona",
      type: "UP",
      desc: "A user persona is a fictional representation of your ideal customer. It is based on market research and real data about your existing customers.",
    },
    {
      title: "Implementation",
      type: "IM",
      desc: "Implementation is the carrying out, execution, or practice of a plan, a method, or any design, idea, model, specification, standard or policy for doing something. As such, implementation is the action that must follow any preliminary thinking in order for something to actually happen.",
    },
    {
      title: "Tech Stack",
      type: "TS",
      desc: "A tech stack is defined as the set of technologies an organization uses to build a web or mobile application. It is a combination of programming languages, frameworks, libraries, patterns, servers, UI/UX solutions, software, and tools used by its developers.",
    },
  ];
  return (
    <PageWrapper>
      <div
        className="flex flex-col w-full gap-y-6 p-6 bg-[#1F1926] rounded-md"
        ref={pdfRef}
      >
        {sections.map((section, idx) => {
          return <IdeaSection key={idx} {...section} />;
        })}
      </div>
    </PageWrapper>
  );
};

export default Idea;
