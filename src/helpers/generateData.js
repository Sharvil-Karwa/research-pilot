import testData from "@/../testData.json";
export const generateData = async (phrase, setData, type) => {
  let toGenerate = "";
  const setType = (type) => {
    switch (type) {
      case "ideas":
        toGenerate = `Generate 3 product or platform ideas for the phrase '${phrase}' separate the ideas with string <<<->>>`;
        break;
      case "PS":
        toGenerate = `Generate a problem statement for the phrase '${phrase}'`;
        break;
      case "MR":
        toGenerate = `Generate a market research for the product according to phrase '${phrase}'`;
        break;
      case "USP":
        toGenerate = `Generate 1 to 3 unique selling proposition(s) (USP) for the product according to phrase '${phrase}'`;
        break;
      case "SC":
        toGenerate = `Tell me how can I scale the product made according to phrase '${phrase}'`;
        break;
      case "TA":
        toGenerate = `Generate a target audience for the product according to phrase '${phrase}'`;
        break;
      case "CP":
        toGenerate = `Generate a competitive analysis & name the competitors for the product according to phrase '${phrase}'`;
        break;
      case "PR":
        toGenerate = `Generate a questionnaire of 4 MCQ questions intended for the users to get their opinions about the features they want, the problems they face, etc. with options for the phrase '${phrase}' and the output should be in the form of json parsible string with the following format: {"question": "question", "options": ["option1", "option2", "option3", "option4"]} and seperate each object with string <<<->>> and not with comma make sure to terminate the objects properly and dont use fractions`;
        break;
      case "SR":
        toGenerate = `Give research article links about the phrase ${phrase}`;
        break;
      case "UP":
        toGenerate = `Generate a user persona for the phrase '${phrase}'`;
        break;
      case "IM":
        toGenerate = `Generate an implementation for the product according to phrase '${phrase}'`;
        break;
      case "TS":
        toGenerate = `Generate a Tech stack for the product according to phrase '${phrase}'`;
        break;
    }
  };
  setType(type);
  // setData(testData[type].choices[0].text);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + String(process.env.NEXT_PUBLIC_OPEN_AI_API_KEY),
    },
    body: JSON.stringify({
      prompt: toGenerate,
      temperature: 0.1,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.5,
      stop: ['"""'],
    }),
  };

  fetch(
    "https://api.openai.com/v1/engines/text-davinci-003/completions",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      // # Do something with data
      console.log(data);
      setData(data.choices[0].text);
    })
    .catch((err) => {
      console.log("Ran out of tokens for today! Try tomorrow!");
    });
};
