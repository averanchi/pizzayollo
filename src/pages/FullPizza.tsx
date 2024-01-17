import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type PizzaType = {
  imageUrl: string;
  title: string;
  price: number;
};

const FullPizza: React.FC = () => {
  const [pizza, SetPizza] = React.useState<PizzaType>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://65038458a0f2c1f3faec027e.mockapi.io/pizzas/" + id
        );
        SetPizza(data);
      } catch (error) {
        alert("Ошибка при получении пицц");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>"Loading..."</>;
  }

  return (
    <div className="pizza_page">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} p.</h4>
      <Link to="/">
        <button className="button button--outline">To the main page</button>
      </Link>
    </div>
  );
};

export default FullPizza;
