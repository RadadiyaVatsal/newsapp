import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

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
            isLoading: false,
            page: 1,
            totalPage: 1, // Initialize totalPage to 1
            pageSize: 20,
        };
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews = () => {
        const { country, category } = this.props;
        const { page, pageSize } = this.state;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=2c42512a4b924a72b68832ab1efd049d&page=${page}&pageSize=${pageSize}`;
        
        this.setState({ isLoading: true });

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const totalNews = parseInt(data.totalResults, 10);
                const totalPage = Math.ceil(totalNews / pageSize);
                this.setState({
                    articles: data.articles,
                    totalPage, // Update totalPage
                    isLoading: false,
                });
            })
            .catch((error) => {
                console.error("Error in fetching data", error);
                this.setState({ isLoading: false });
            });
    }

    handleNext = () => {
        this.setState(
            (prevState) => ({ page: prevState.page+1 }), // Ensure page doesn't exceed totalPage
            this.fetchNews // Fetch news after updating page
        );
    }

    handlePrev = () => {
        this.setState(
            (prevState) => ({ page: prevState.page-1}), // Ensure page doesn't go below 1
            this.fetchNews // Fetch news after updating page
        );
    }

    render() {
        const { articles, isLoading, page, totalPage } = this.state;

        return (
            <>
                <h1 className="text-center">Top News</h1>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="card-container">
                        {articles.length > 0 ? (
                            <>
                                <div className="row row-cols-3 mt-0">
                                    {articles.map((element, index) => (
                                        <div className="col" key={index}>
                                            <NewsItems
                                                title={element.title.slice(0, 40)}
                                                description={element.description ? element.description.slice(0, 50) : ''}
                                                imgUrl={element.urlToImage ? element.urlToImage : "https://via.placeholder.com/300x200.png?text=News"}
                                                readMoreUrl={element.url}
                                                author={element.author ? element.author.slice(0, 20) : "Unknown"}
                                                date={new Date(element.publishedAt).toUTCString()}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-between m-3">
                                    <button
                                        onClick={this.handlePrev}
                                        disabled={page <= 1}
                                        type="button"
                                        className="btn btn-dark"
                                    >
                                        &larr; Previous
                                    </button>
                                    <button
                                        onClick={this.handleNext}
                                        disabled={page >= totalPage}
                                        type="button"
                                        className="btn btn-dark"
                                    >
                                        Next &rarr;
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p>No articles found.</p>
                        )}
                    </div>
                )}
            </>
        );
    }
}
