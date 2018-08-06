import React, { Component } from "react";
// import axios from "axios";
import Header from "../../components/MainPageContent/Header/Header";
import Gallery from "../../components/MainPageContent/Gallery/Gallery";
import News from "../../components/MainPageContent/News/News";
import classes from "./MainPage.css";
import Prize from "../../components/MainPageContent/Prize/Prize";

import headerImage from "../../assets/banner_image_v2.png";
import prizeImage from "../../assets/prize_bg_lg.png";
import OurMission from "../../components/MainPageContent/OurMission/OurMission";
import BestCar from "../../components/MainPageContent/BestCar/BestCar";
import ContactUs from "../../components/MainPageContent/ContactUs/ContactUs";
import Partners from "../../components/MainPageContent/Partners/Partnert";

// const API = "https://www.autocentre.ua/wp-json/wp/v2/posts";

class MainPage extends Component {
  // state = {
  //   posts: [],
  //   loading: true
  // };
  // componentDidMount() {
  //   axios.get(API , {params: { tags: 43929}}).then(response => {
  //     console.log(response)
  //     const posts = response.data.slice(0, 6);
  //     this.setState({ posts, loading: false });
  //   });
  // }

  render() {
    console.log(prizeImage);
    return (
      <React.Fragment>
        <section className={classes.Header} style={{backgroundImage: `url(${headerImage})`}}>
            <Header />
        </section>
        <section className={classes.Content}>
          <BestCar />
        </section>
        <section className={classes.Gallery}>
          <Gallery />
        </section>
        <section className={classes.Content}>
          <News />
        </section>
        <section className={classes.Prize} style={{backgroundImage: `url(${prizeImage})`}}>
          <Prize />
        </section>
        <section className={classes.OurMission}>
          <OurMission />
        </section>
        <section className={classes.Content}>
          <Partners />
        </section>
        <section className={classes.ContactUs}>
          <ContactUs />
        </section>
      </React.Fragment>
    );
  }
}

export default MainPage;
