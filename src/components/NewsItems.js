import React, { Component } from "react";


export default class NewsItems extends Component {
  render() {
     let {title,description,imgUrl,readMoreUrl,author,date} = this.props;
    return (
      <div>
        <div className="card mt-5" style={{height:'470px'}}>
          <img src={imgUrl} className="card-img-top" alt="..."  style={{height: '300px'}} />
          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}.....</p>
            <p className="card-text"> <small className="text-muted">By {author} On {date}</small></p>
            <a href={readMoreUrl} className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>

    );
  }
}
