import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import Nav from "./Nav"
import FindInstructorButton from "./findInstructorButton/FindInstructorButton"
import "./Profile.css"
import ReactDOM from "react-dom";
import StarRatingComponent from "react-star-rating-component";
import Moment from 'react-moment';
import 'moment-timezone';

class Profile extends Component {

  state = {
    reviewCards: [],
    picURL: "",
    firstName: "",
    middleInitial: "",
    lastName: "",
    email: "",
    location: "",
    board: "",
    exp: "",
    favBeaches: "",
    bio: "",
    ratingsAll: [],
    reviewsAll: [],
    reviewersFirstNameAll: [],
    reviewersPictureAll: [],
    reviewsDateAll: [],
    reviewsRatingAve: 0,
    reviewsRatingAveInt: 0,
    reviewsRatingTotNum: 0
  };

  componentDidMount() {
    
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        picURL: res.data.picURL,
        firstName: res.data.firstName,
        middleInitial: res.data.middleInitial,
        lastName: res.data.lastName,
        email: res.data.email,
        location: res.data.location,
        board: res.data.board,
        exp: res.data.exp,
        favBeaches: res.data.favBeaches,
        bio: res.data.bio,
        ratingsAll: res.data.ratingsAll,
        reviewsAll:  res.data.reviewsAll,
        reviewersFirstNameAll:  res.data.reviewersFirstNameAll,
        reviewersPictureAll: res.data.reviewersPictureAll,
        reviewsDateAll: res.data.reviewsDateAll,
      })
    });
  
    
     
    // The setTimeout is needed for ratingsAll to be defined
    setTimeout(function() {
      ratingsDelay();
    }, 3000);
    var ratingsDelay = () => {
        // Checking if th array is empty
        if (this.state.ratingsAll.length === 0) {
          console.log("ratingsAll array empty")
          this.setState({
            reviewsRatingAve: 0,
            reviewsRatingAveInt: 0,
            reviewsRatingTotNum: 0
          });
        } else {
          // Set the ratingsAll array to a new name
          const newRatingsAll = this.state.ratingsAll
          // Calculate the total number of reviews
          const totNumRatings = this.state.ratingsAll.length;
          // Calculate the average of the ratings array
          const arrAvg = arr =>
          arr.reduce((a, b) => a + b, 0) / arr.length;

          const ratingAve = arrAvg(newRatingsAll)

          // Calculate the average of the ratings to the nearest integer
          const arrAvgInt = roundInt(ratingAve);
          function roundInt(num) {
            return Math.round(num * 1) / 1;
          }
          console.log("ratingAve: " + ratingAve)
          console.log("arrAvgInt: " + arrAvgInt)
          this.setState({
            reviewsRatingAve: arrAvg,
            reviewsRatingAveInt: arrAvgInt,
            reviewsRatingTotNum: totNumRatings
          });
        }

        // Creating review card constructor function

        var ReviewCard = function(cardRating, cardReview, cardDate, cardPic, cardFName) {
          this.cardRating = cardRating;
          this.cardReview = cardReview;
          this.cardDate = cardDate;
          this.cardPic = cardPic;
          this.cardFName = cardFName;
        }
          
        // creating an array review card objects
        const newReviewCards = this.state.reviewCards
        for (var k = 0; k < this.state.ratingsAll.length; k++) {
           newReviewCards[this.state.ratingsAll.length -1 - k] = new ReviewCard(this.state.ratingsAll[k],this.state.reviewsAll[k],this.state.reviewsDateAll[k], this.state.reviewersPictureAll[k], this.state.reviewersFirstNameAll[k])
        }
      

        this.setState({
          reviewCards: newReviewCards,
        });
     
    }
  }

  render() {
    console.log(this.props)
    const { reviewsRatingAveInt } = this.state;
    return (
      <div>
        <Nav />
        <FindInstructorButton />&nbsp;<br />
        <div className="container Profile">
          
          <div id="bg">
          <div className="w3-content w3-margin-top" id="w3-content">
            <div className="w3-row-padding">
              <div className="w3-third">
                <div className="w3-white w3-text-grey w3-card-4">
                  <div className="w3-display-container">
                    <img id="userphoto" src={this.state.picURL} alt="Avatar" />
                    <div className="w3-display-top w3-container w3-text-black">
                      <h2 id="tag">
                        <b>
                          <span id="user-name">{this.state.firstName + " " + this.state.middleInitial + " " + this.state.lastName}</span>
                        </b>
                      </h2>
                    </div>
                  </div>

                  <div className="w3-container">
                    <p>
                      <i className="fa fa-envelope fa-fw w3-margin-right w3-large text-dark-blue"></i>
                      <span id="user-email">{this.state.email}</span>
                    </p>
                    <hr />
                  </div>
                    
                    <div className="w3-container">
                    <p>
                     
                    <div className="starsRating">
                    <b>Rating:</b>
                      <div styles={{ fontSize:50 }}>
                        <StarRatingComponent
                          name="rate2"
                          editing={false}
                          // did not work when using just renderStarIcon
                          renderStarIconHalf={() => <span></span>}
                          starCount={5}
                          value={reviewsRatingAveInt}
                        />
                        <p><b>Reviews:</b> <span styles="color:blue">{this.state.reviewsRatingTotNum}</span></p>
                      </div>
                    </div>
                    </p>
                    <hr />
                    </div>

                    <div className="w3-container">
                    <p>
                      <b>
                        <i className="fa fa-home fa-fw w3-margin-right w3-large text-dark-blue"></i>Location: </b>
                      <span id="user-location">{this.state.location}</span>
                    </p>
                    <hr />
                  </div>

                  <div className="w3-container">
                    <p>
                      <b>
                        <i className="fa fa-home fa-fw w3-margin-right w3-large text-dark-blue"></i>Board Type: </b>
                      <span id="board-type">{this.state.board}</span>
                    </p>
                    <hr />

                    <p>
                      <b>
                        <i className="fa fa-envelope fa-fw w3-margin-right w3-large text-dark-blue"></i>Experience: </b>
                      <span id="experience">{this.state.exp}</span>
                    </p>
                    <hr />
                  </div>

                  <div className="w3-container">
                  <p>
                    <b>
                      <i className="fa fa-envelope fa-fw w3-margin-right w3-large text-dark-blue"></i>Favorite Beach: </b>
                    <span id="favBeaches">{this.state.favBeaches}</span>
                  </p>
                </div>
                </div>
                <hr />
              </div>


              <div className="w3-twothird">
                <div className="w3-container w3-card w3-light-gray w3-margin-bottom">
                  <h2 className="w3-text-grey w3-padding-16">
                    <i className="fa fa-clipboard fa-fw w3-margin-right w3-xxlarge text-dark-blue"></i>About Me</h2>
                  <span id="myBio">{this.state.bio}</span>

                </div>
              </div>

              <div className="w3-twothird">
                <div className="w3-container w3-card w3-light-gray w3-margin-bottom">
                  <h2 className="w3-text-grey w3-padding-16">
                    <i className="fa fa-clipboard fa-fw w3-margin-right w3-xxlarge text-dark-blue"></i>My Reviews</h2>
                    
                    
                    {/* Start of Review Card Creation*/}
                    {this.state.reviewCards.map(reviewCard => (
                    <div className="w3-card-4" key={reviewCard.reviewDate}>
                      <div header className="w3-container">
                      <div className="row">
                      <div className="col-sm-3 w3-center ">

                       <img className="w3-circle w3-margin-top" src={reviewCard.cardPic} alt="Avatar" />
                       <br />
                       <b>
                       <i className="w3-large text-dark-blue"></i>
                       {reviewCard.cardFName}
                       </b>
                       </div>
                       <div className="col-sm-9">
                    
                      <div className="starsRating1Review">
                      <div styles={{ fontSize:50 }}>
                        <StarRatingComponent
                          name="rate3"
                          editing={false}
                          // did not work when using just renderStarIcon
                          renderStarIconHalf={() => <span></span>}
                          starCount={5}
                          value={reviewCard.cardRating}
                        />
                        <span id="date-right">  <Moment  format="MMMM Do YYYY">
                        {reviewCard.cardDate}
                        </Moment></span>
                        <br />
                        <p>{reviewCard.cardReview}</p>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>

                    
                    </div>

                    ))} {/* End of Review Card Creation*/}

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default withAuth(Profile);