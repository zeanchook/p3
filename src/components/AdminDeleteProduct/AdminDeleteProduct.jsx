import { useEffect, useState } from "react";
import { getListofProducts } from "../../utilities/getListofProducts";

export default function AdminDeleteProduct()
{
    const [productList, setProductList] = useState("")

    useEffect(() => {
        async function getDetails() {
          let results = await getListofProducts();
         
          setProductList(results)
        }
        getDetails();
      }, []);

      
      const ProductList = () => (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productList?.map((product, index) => (
            <div
              key={index}
            //   onClick={() => handleClick(product._id)}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.picture}
                  alt={product.title}
                  style={{ maxWidth: "100%" }}
                  className="h-full w-full object-cover object-center group-hover:bg-violet-600	"
                />
                
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
    
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
              <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
            Delete
            </button>
            </div>
          ))}
        </div>
      );

    return(<>
    {productList && <ProductList/>}
    </>)
}