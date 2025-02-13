import axios from "axios";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import Card from "../../Components/Card/Card";

export default function Home() {
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return await axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnMount: false,
    staleTime: 6 * 60 * 60 * 1000,
  });
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <section className="grid grid-cols-12 mb-8">
        <HomeSlider />
      </section>
      <CategorySlider />
      <h2 className="text-slate-900 mb-5 text-lg text-center font-semibold">
        Products
      </h2>
      <div className=" grid sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.data.data.map((product) => (
          <Card key={product.id} productInfo={product} />
        ))}
      </div>
    </>
  );
}
