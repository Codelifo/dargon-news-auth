import { Link, useLoaderData } from "react-router-dom";
import RightNav from "../components/layout-component/RightNav";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const NewsDetails = () => {
  const data = useLoaderData();
  const news = data.data[0];

  return (
    <div>
      <Header></Header>
      <main className="w-11/12 mx-auto grid grid-cols-12 py-4">
        <div className=" col-span-9">
          <h2 className="font-semibold mb-3">Dragon News</h2>
          <div className="card bg-base-100 shadow-xl m-4">
            <figure className="px-10 pt-10">
              <img
                src={news.image_url}
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-start  text-start">
              <h2 className="card-title">{news.title}</h2>
              <p>{news.details}</p>
              <div className="card-actions">
                <Link to={`/category/${news?.category_id}`} className="btn btn-primary">Back To Category</Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-3">
          <RightNav></RightNav>
        </div>
      </main>
    </div>
  );
};

export default NewsDetails;
