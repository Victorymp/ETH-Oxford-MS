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
      isLoaded: false,
      scores: {
        political: [],
        impact: [],
        development: [],
        total: []
      },
      sum: 0
    };
  }

  async componentDidMount(){
    const {_politicalSacle, _ArticalArray} = this.props;
    // console.log(_ArticalArray.length);
    if (_ArticalArray.length < 3){
      console.log("Not enough articles");
      return;
    }
    let prompt = "";
    const political = "if the articale is "
    if (_politicalSacle === "left"){
      prompt = political + "left leaning give it a score of 1, if it is right leaning give it a score of -1, if it is neutral give it a score of 0. ";
    } else if (_politicalSacle === "right"){
      prompt = political + "right leaning give it a score of -1, if it is left leaning give it a score of 1, if it is neutral give it a score of 0. ";
    }
    const impact = "if the articale is good give it a score of 5, if it is bad give it a score of -5, if it is neutral give it a score of 0. ";
    const development = "if the articale contains information about local developement give it a score of 5. if it does not give it a score of 0. Anything inbetween use the scale of 1-4. ";
    const total = "give a total score from -6 to 11 of the article. in the format of Location: Total Score: 1 + 5 + 5 = 11";
    prompt = prompt + impact + development+total;
    let sum = 0;
    const totalScores = [];
    for (let i = 0; i < _ArticalArray.length; i++){
      const message = await this.getAiResponse(prompt+ _ArticalArray[i]);
      const score = this.extractTotalScore(message);
      totalScores.push(score);  
      sum += score;
    }
    console.log(totalScores);
    this.setState({
      totalScores: totalScores,
      isLoaded: true,
      sum: sum
    });
  }

  async getAiResponse(prompt) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        { "role": "system", "content": prompt },
      ],
      max_tokens: 2000,
    });

    // const message = completion.choices[0].message;
    // const totalScore = this.extractTotalScore(message);
    // Log and ensure the message is a string
    const message = completion.choices[0].message.content;
    console.log("AI response:", message);

    this.setState((prevState) => ({
      ai_response: [...prevState.ai_response, completion.choices[0].message],
      isLoaded: true
    }));
    return message;
  }

  extractTotalScore(text) {
    // Regular expression to find the total score calculation lines
    const regex = /Total Score:\s*(\d+)\s*\+?\s*(\d+)?\s*\+?\s*(\d+)?\s*=\s*(\d+)/;
    const match = text.match(regex);
    
    if (match) {
        // Return the total score from the last capturing group
        return parseInt(match[4]);
    } else {
        return 0;
    }
  }

  render(){
    const {ai_response,isLoaded} = this.state;
    return(
      <div>
        {/* <h1>AI Agent</h1>
        {isLoaded ? (
          <div>
            {ai_response.map((response, index) => (
              <p key={index}>{response.content}</p>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )} */}
        <h2>Totals</h2>
        {isLoaded ? (
          <div>
            <p>Total Score for your portfolio: {this.state.sum}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default Ai_Agent;
