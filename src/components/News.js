import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            page: 1,
            totalNews: 0,
            pageSize: 10,
        };
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews = () => {
        const { country, category } = this.props;
        const { page, pageSize } = this.state;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=2c42512a4b924a72b68832ab1efd049d&page=${page}&pageSize=${pageSize}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState(prevState => ({
                    articles: prevState.articles.concat(data.articles),
                    totalNews: data.totalResults,
                    page: prevState.page + 1,
                }));
            })
            .catch((error) => {
                console.error("Error in fetching data", error);
            });
    }

    render() {
        const { articles, totalNews } = this.state;

        return (
            <>
                <h1 className="text-center">Top News</h1>
    
                <InfiniteScroll
                    dataLength={articles.length}
                    next={this.fetchNews}
                    hasMore={articles.length < totalNews}
                    loader={<Spinner />}
                    style={{overflow:"hidden"}}
                    
                >
                   
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {articles.map((element, index) => (
                                <div className="col" key={index}>
                                    <NewsItems
                                        title={element.title ? element.title.slice(0, 40) : "No title"}
                                        description={element.description ? element.description.slice(0, 50) : 'No description'}
                                        imgUrl={element.urlToImage ? element.urlToImage : "https://via.placeholder.com/300x200.png?text=News"}
                                        readMoreUrl={element.url}
                                        author={element.author ? element.author.slice(0, 20) : "Unknown"}
                                        date={new Date(element.publishedAt).toUTCString()}
                                    />
                                </div>
                              
                            ))}
                        
                        </div>
                
                </InfiniteScroll>
            </>
        );
    }
}
