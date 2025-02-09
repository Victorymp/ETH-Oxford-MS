import OpenAI from "openai";
import { Component } from "react";

const openAIKey = process.env.REACT_APP_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: openAIKey,
  dangerouslyAllowBrowser: true
});

class Ai_Agent extends Component{
  constructor(props){
    super(props);
    this.state = {
      ai_response: [],
      isLoaded: false
    };
  }

  componentDidMount(){
    const {_politicalSacle, _ArticalArray} = this.props;
    let prompt = "";
    const political = "if the articale is"
    if (_politicalSacle === "left"){
      prompt = political + "left leaning give it a score of 1, if it is right leaning give it a score of -1, if it is neutral give it a score of 0. ";
    } else if (_politicalSacle === "right"){
      prompt = political + "right leaning give it a score of -1, if it is left leaning give it a score of 1, if it is neutral give it a score of 0. ";
    }
    const impact = "if the articale is good give it a score of 5, if it is bad give it a score of -5, if it is neutral give it a score of 0. ";
    const development = "if the articale contains information about local developement give it a score of 5. if it does not give it a score of 0. Anything inbetween use the scale of 1-4. ";
    prompt = prompt + impact + development;

    for (let i = 0; i < _ArticalArray.length; i++){
      this.getAiResponse(prompt+_ArticalArray[i]);
    }
  }

  async getAiResponse(prompt){
    const completion = openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {"role": "Rater", "content": prompt},
      ],
      max_tokens: 2000,
    });

    completion.then((result) => {
      this.setState((prevState) => ({
        ai_response: [...prevState.ai_response, result.choices[0].message],
        isLoaded: true
      }));
    });
  }

  render(){
    const {ai_response,isLoaded} = this.state;
    return(
      <div>
        <h1>AI Agent</h1>
        {isLoaded ? (
          <div>
            {ai_response.map((response, index) => (
              <p key={index}>{response.content}</p>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default Ai_Agent;
