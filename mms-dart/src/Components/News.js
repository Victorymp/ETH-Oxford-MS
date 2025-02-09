import React, { Component } from 'react';
import { getEncoding} from "js-tiktoken";
import Ai_Agent from './AI_Agent';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY);
const cheerio = require('cheerio');
const tiktoken = require('tiktoken');
const enc = getEncoding("cl100k_base");


class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      sources: {},
      sourcesText: '',
      showNews: false
    };
  }

  componentDidMount() {
    const { _cities } = this.props;
    const apiKey = process.env.REACT_APP_PERIGON_API_KEY;
    const Cities = _cities.join(' OR ');

    const fetchNews = async () => {
      // const response = await fetch(`https://newsapi.org/v2/everything?q=uk AND (houses OR housing) AND (${Cities})&from=2025-01-08&to=2025-02-07&sortBy=popularity&searchIn=content&apiKey=${apiKey}`);
      const response = await fetch(`https://api.goperigon.com/v1/all?content=uk AND (houses OR housing) AND (${Cities})&from=2025-01-08&to=2025-02-07&apiKey=${apiKey}`);
      const data = await response.json();
      const articles = data.articles;
      var sourcesUsed= {};
      var contentPromises = [];
      const filteredArticles = articles.filter(article => article.source.domain !== null);
      // console.log(filteredArticles);
      let count = 0;
      let topcount = 10;
      for (const currentArticle of filteredArticles) {
        if (count === topcount) {
          break;
        }
        count++;
        console.log('URL:', currentArticle.url);
        const content = this.getContent(currentArticle.url);
        if (!content) {
          continue;
        }
        contentPromises.push(content);
        // get the source name
        const name = currentArticle.source.domain;
        if (name in sourcesUsed) {
          continue; 
        }
        if (sourcesUsed[name]) {
          sourcesUsed[name]++;
        } else {
          sourcesUsed[name] = 1;
        }
      }
      // get the content of the articles
      const contentUsed = await Promise.all(contentPromises);
      // turn into a array 
      // Create a text representation of the sources
      const _sourcesText = Object.entries(sourcesUsed).map(([source, count]) => `${source}: ${count}`).join(', ');
      // return content used and sourcesUsed
      this.setState({ news: contentUsed, sources: sourcesUsed, sourcesText: _sourcesText });      
    };
    fetchNews();
  }

  // get content from a given url
  async getContent(url) {
    const proxyurl = "http://localhost:8080/";
    const response = await fetch(`${proxyurl}${url}`);
    const data = await response.text();
    const $ = cheerio.load(data);  // Load the HTML into cheerio
  
    // Extract the title of the article
    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content');
    const content = $('article').text();
  
    const numberOfTokens = enc.encode(content).length;
    // Get the first amount of token until the max token limit of 2048
    const tokens = enc.encode(content).slice(0, 2048);
    const text = enc.decode(tokens);
    return text;
  }

  toggleNewsVisibility = () => {
    this.setState(prevState => ({ showNews: !prevState.showNews }));
  }


  render() {
    const { sources, news, sourcesText } = this.state;
    const { showNews } = this.props; // Accept showNews as a prop

    return (
      <div>
        <h2>Sources Used</h2>
        <ul>
          {Object.entries(sources).map(([source, count]) => (
            <li key={source}>{source}: {count}</li>
          ))}
        </ul>

        {showNews && (
          <div>
            <h3>News Articles</h3>
            <div>
              {news.length > 0 ? (
                news.map((content, index) => (
                  <div key={index} className="news-article">
                    <p>{content}</p>
                  </div>
                ))
              ) : (
                <p>Loading news articles...</p>
              )}
            </div>
          </div>
        )}
        <div id="text-data" text-data={news}></div>
      </div>
    );
  }
}

export default News;