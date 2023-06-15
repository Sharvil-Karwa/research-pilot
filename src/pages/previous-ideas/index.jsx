import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IdeaLink } from "../prompt";
import PageWrapper from "@/components/PageWrapper";

const PreviousIdeas = () => {
  const [prevIdeas, setPrevIdeas] = useState([]);
  const fetchIdeas = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const ideasRef = doc(db, "ideas", user?.uid);
    const ideasSnap = await getDoc(ideasRef);
    if (ideasSnap.exists()) {
      setPrevIdeas(ideasSnap.data().ideas);
      console.log(ideasSnap.data().ideas);
    }
  };
  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <PageWrapper>
      <div>
        {prevIdeas.map((idea, idx) => {
          return <IdeaLink key={idx} idx={idx} idea={idea.idea} id={idea.id} />;
        })}
      </div>
    </PageWrapper>
  );
};

export default PreviousIdeas;
