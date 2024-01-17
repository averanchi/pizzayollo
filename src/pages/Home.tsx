import React from "react";

import QueryString from "qs";
import { useNavigate } from "react-router-dom";

import {
  Skeleton,
  PizzaBlock,
  Categories,
  Sort,
  Pagination,
} from "../components";

import { useSelector } from "react-redux";
import { sortList } from "../components/Sort";
import { fetchPizzas } from "../redux/pizzas/slice";
import { useAppDispatch } from "../redux/store";
import { filterSelector } from "../redux/filter/selectors";
import { setFilters } from "../redux/filter/slice";
import { pizzasSelector } from "../redux/pizzas/selectors";


const CatVariants = [
  "All",
  "Meats",
  "Vegetarian",
  "Grill",
  "Spicy",
  "Closed",
];

const Home: React.FC = () => {
  import("../utils/math").then((math) => {
    console.log(math.add(777, 888));
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(pizzasSelector);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(filterSelector);

  const sortType = sort.sortProperty;

  let itemsQty;

  const getPizzas = async () => {
    const categories = categoryId > 0 ? `category=${categoryId}` : "";
    const sorts = sortType.replace("-", "");
    const order = sortType.includes("-") ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
        categories,
        sorts,
        order,
        search,
      })
    );
  };

  //На всех рендерах, кроме первого вшиваем в строку браузера наши данные, полученные в следующем юзеффекте. Работает датчик изМаунтед.
  // Другими словами, если был первый рендер и после него произвели какие-то изменения.
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`); ///////////   ВШИВАНИЕ ДАННЫХ В СТРОКУ не на первом рендере ///////////
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // После первого рендера проверяем, было ли что-то в УРЛ-параметрах, и если да, то передаём их в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          searchValue: "",
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort ? sort : sortList[0], /////////////ПЕРЕДАЧА ПАРАМЕТРОВ В РЕДАКС (если они были) при первом рендере //////////////
        })
      );
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер ( в конце первого рендера в предыдущем юзЭффекте изСёрч изменится на тру, и здесь условие сработает), то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      ////////// ТОЛЬКО ЕСЛИ ДАННЫЕ ПОМЕНЯЛИСЬ (в конце предыдущего юзЭффекта датчик вкл), делаем запрос новых пицц /////////////////
    }
    getPizzas(); //ПЕРЕНЁС СЮДА, ИНАЧЕ ВООБЩЕ ЗАПРОС НЕ ОТПРАВЛЯЛСЯ
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(itemsQty)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{CatVariants[categoryId]}</h2>
      {status === "error" ? (
        <div className="content_error_info">
          <h2>There was a problem by loading</h2>
          <p>
           Try again later or go back to the main page
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination />
    </>
  );
};

export default Home;
