import React, { Component } from 'react';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ae926e3c2a764a1792bd7a50f3729742');
const cheerio = require('cheerio');

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentDidMount() {
    const { _sources, _q, _category } = this.props;
    const apiKey = 'ae926e3c2a764a1792bd7a50f3729742';
    // Fetching top headlines from the newsapi    
    // let newsSources = _sources.join(',');
    // console.log(newsSources);
    // newsapi.v2.topHeadlines({
    //   sources: 'bbc-news,the-verge',
    //   q: 'bitcoin',
    //   category: 'business',
    //   language: 'en',         
    //   country: 'uk',          
    // }).then(response => {
    //   console.log(response);
    //   this.setState({ articles: response.articles });
    // }).catch(error => {
    //   console.error('Error fetching the news:', error);
    // });
    const fetchNews = async () => {
      const response = await fetch(`https://newsapi.org/v2/everything?q=apple&from=2025-02-07&to=2025-02-07&sortBy=popularity&apiKey=${apiKey}`);
      const data = await response.json();
      // console.log(data);
      const articles = data.articles;
      // console.log(articles);
      const filteredArticles = articles.filter(article => _sources.includes(article.source.id));
      console.log(filteredArticles);
      this.getContent("https://www.bbc.co.uk/news/articles/c20g288yldko");
      
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
    const article = $('article').text();
  
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Article:', article);
    return { title, description };
  }
  render() {
    return (
      <div>
        <h1>News</h1>
      </div>
    );
  }
}

export default News;