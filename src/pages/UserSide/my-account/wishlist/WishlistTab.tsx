import { dispatch, useAppSelector } from "@/redux/hook";
import { AddWishlistRedux } from "@/redux/userSide/product_Slice";
import { useState } from "react";
import { Link } from "react-router-dom";

function WishlistTab() {
  const { wishlist } = useAppSelector((state) => state.products);

  const [checkedItems, setCheckedItems] = useState<number | null>(null);
  // const [selectAll, setSelectAll] = useState<boolean>(false);

  // Handle checkbox change: allow only one item to be selected
  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => (prev === index ? null : index)); // Toggle the item selection
  };

  // Handle delete action
  const handleDelete = (productId:string) => {
    // if (checkedItems !== null) {
    //   const confirmDelete = window.confirm(
    //     "Are you sure you want to delete the selected item?"
    //   );
    //   if (confirmDelete) {
    //     // Proceed with the deletion logic
    //     // console.log("Item deleted.");
    //     setCheckedItems(null); // Reset selected item after deletion
    //   }
    // } else {
    //   makeToastError("No item selected.");
    // }
    dispatch(AddWishlistRedux(productId??""))
  };
  return (
    <div className="flex flex-col gap-3 h-full ">
      {/* header */}
      {/* <div className="flex justify-between items-center">
        <span className="sm:text-sm text-xs">Wishlist</span>
        {selectAll ? (
          <div className="space-x-3">
            <span
              className="sm:text-sm text-xs cursor-pointer"
              onClick={() => setSelectAll(false)}
            >
              Deselect all
            </span>
            <button className="sm:text-sm text-xs">Delete All</button>
          </div>
        ) : (
          <span
            className="sm:text-sm text-xs cursor-pointer"
            onClick={() => setSelectAll(true)}
          >
            Select all
          </span>
        )}
      </div> */}

      {/* body starts */}
      {
        wishlist.length > 0 ? (
<div className="flex flex-col gap-3">
        {wishlist.map((items, i) => (
          <div
         
            key={i}
            // className={`flex gap-3 justify-between w-full border ${checkedItems === i || selectAll ? "border-textMain" : ""}  sm:p-4 p-2 rounded-md`}
            className={`flex gap-3 justify-between w-full border  sm:p-4 p-2 rounded-md`}

          >
            <Link className="flex gap-3 cr"
             to={`/product/${items.product.slug}`}
            >
              <img
                src="/img/products/image 79.png"
                alt="wishlist img"
                className="text-xs w-14"
              />
              <label
                htmlFor={`wishlist-${i}`}
                className="flex flex-col cursor-pointer"
              >
                <div className="sm:w-10/12">
                  <span className="sm:text-lg text-sm text-black">
                    {items.product.product_name}
                  </span>
                </div>

                <div className="flex sm:gap-3 gap-1 sm:flex-row flex-col">
                  <span className="sm:text-sm text-xs">
                    ₹
                    {items.product.price_per_pieces[0]?.purchase_Amount?.toFixed(
                      2
                    )}{" "}
                    - ₹
                    {items.product.price_per_pieces[1]?.purchase_Amount?.toFixed(
                      2
                    )}
                  </span>
                  <span className="sm:text-sm text-xs">
                    Min. order: {items.product.price_per_pieces[0].minPiece}
                  </span>
                </div>
              </label>
            </Link>
            {/* =====  */}
            <div className="flex flex-col justify-between items-end">
              <input
                type="checkbox"
                id={`wishlist-${i}`}
                checked={checkedItems === i}
                onChange={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(i)
                }}
                className="hidden" // Hide checkbox
              />
              <button
                className="sm:text-sm text-xs text-gray-400"
                onClick={(e)=>{
                  e.stopPropagation();
                  handleDelete(items._id)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
        ):(
          <div className="h-full  flex flex-col items-center justify-center">
              No Items In Wishlist.
          </div>
        )
      }
      
    </div>
  );
}

export default WishlistTab;
