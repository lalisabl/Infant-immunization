import data from "./data";
import Card from "../../card/card";
import "./news.css";
const news = () => {
  return (
    <section id="news">
      <h3>News</h3>
      <div className="container news__container">
        {data.map((news) => (
          <Card key={news.id} className="news light">
            <div className="news__details">
              <h4>{news.title}</h4>
              <p>{news.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default news;
