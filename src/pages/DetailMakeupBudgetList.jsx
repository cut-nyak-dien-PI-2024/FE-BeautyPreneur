import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDataProductFromDetailMakeupPackage,
  getDetailMakeupPackage,
} from "../components/services/makeupBudgetService";

export default function DetailMakeupBudgetList() {
  const { id } = useParams();
  const [makeupPackageDetail, setMakeupPackageDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const getMakeupPackageAndDetails = async (id) => {
    const makeupPackage = await getDetailMakeupPackage(id);
    setItems(makeupPackage.makeup_budgets);
    setMakeupPackageDetail(makeupPackage.makeup_package);
    setIsLoading(!isLoading);
  };

  useEffect(() => {
    getMakeupPackageAndDetails(id);
  }, [id]);

  return (
    <div className="flex flex-col h-fit w-full mx-auto md:my-40 mt-10 md:mt-20 md:text-[22px] text-[14px] px-2 md:px-0 gap-14 font-medium capitalize max-w-7xl">
      <div className="flex flex-col gap-5 mx-auto text-center">
        <h4 className="text-3xl text-[#d63583] font-bold mb-0">
          {makeupPackageDetail.name}
        </h4>
        <h5 className="text-base text-[#feacc4] mt-0">List Produk Sesuai Budget Kamu :</h5>
      </div>
      <div className="flex md:flex-row flex-col w-full justify-center">
        {isLoading && items.length === 0 ? (
          <h5 className="text-xl">Loading.....</h5>
        ) : (
          <div className="flex md:flex-row flex-col flex-wrap mx-auto items-center justify-center gap-10 w-full">
            {items?.length !== 0 &&
              items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg overflow-hidden md:w-1/2 lg:w-1/3 transition-transform transform hover:scale-105 border-none"
                >
                  <img
                    src={item.image_url}
                    alt="image"
                    className="w-full rounded-none"
                  />
                  <div className="p-4 flex flex-col mb-4">
                    <h5 className="text-[16px] text-[#d63583] font-bold mb-2">
                      {item.product_name}
                    </h5>
                    <div className="flex justify-between items-center text-[14px] text-[#ff779e]">
                      <span>{item.price}</span>
                      <a href={item.product_link} className="text-[#feacc4] hover:underline">
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}