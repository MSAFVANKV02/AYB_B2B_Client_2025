import React, {  useRef, useState } from "react";
import { Formik, Field, Form } from "formik";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
// import { MdOutlineAttachment } from "react-icons/md";
import StarRatings from "react-star-ratings";
import { Textarea } from "@/components/ui/textarea";
import Tooltip from "@mui/material/Tooltip"; // Using MUI Tooltip
// import axios, { AxiosError } from "axios";

import {  useParams } from "react-router-dom";

import { Link } from "react-router-dom"; // Use react-router's Link instead of Next.js's Link
// import { makeToastError, makeToastWarning } from "@/utils/toaster";
// import { encodeId } from "@/utils/Encoding";
// import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";

// interface InitialValues {
//   rating: number;
//   review: string;
//   title: string;
//   files: (File | string)[];
//   productSlug: string;
// }

const starTitles = [
  "Very Bad",
  "Bad",
  "Good",
  "Very Good",
  "Excellent Product",
];

const titleTextBasedOnRating = [
  "Very bad product",
  "Bad product",
  "Good product",
  "Best product",
  "It's an Excellent Product",
];

export default function AddReviews() {
  const { slug, orderId } = useParams();
  const [reviewId] = useState<string | null>(null);
  // const [product, setProduct] = useState(null);
  const [initialValues] = useState({
    rating: 3,
    review: "",
    title: "Good product",
    files: [] as (File | string)[],
    productSlug: slug,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  // const navigate = useNavigate();
  // const location = useLocation();
  // const productId = new URLSearchParams(location.search).get("productId") || "";
  //   const {  orderId } = location.state;
  // Assuming slug and orderId are passed in location.state

  console.log(slug, orderId, "slug, orderId");

  const chooseFiles = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  //   useEffect(() => {
  //     if (typeof orderId === "string") {
  //       const decodedOrderId = encodeId(orderId);

  //       const fetchOrderDetails = async () => {
  //         try {
  //           const res = await axios.get(
  //             `/order/getSingleOrder/${decodedOrderId}/${productId}`,
  //             { withCredentials: true }
  //           );

  //           if (res.data.success === false) {
  //             makeToastWarning("Order Not Found");
  //             navigate("/my-orders");
  //           }
  //         } catch (error: any) {
  //           if (
  //             (error.response && error.response.status === 404) ||
  //             error.response.success === false
  //           ) {
  //             makeToastError("Order not found. Please check your order ID.");
  //             navigate("/my-orders");
  //           } else {
  //             makeToastError("Error fetching order details. Please try again.");
  //           }
  //         }
  //       };

  //       fetchOrderDetails();
  //     }
  //   }, [orderId, productId]);

  //   useEffect(() => {
  //     if (!orderId || !slug) {
  //       makeToastError("Please Place An Order");
  //       return navigate("/my-orders");
  //     }
  //     getMyOrders();
  //   }, [slug, orderId]);

  // const getMyOrders = () => {
  //   axios
  //     .get(`/review/getMyReviews/${slug}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       if (res.data.reviews && res.data.reviews.length > 0) {
  //         const review = res.data.reviews[0];
  //         setReviewId(review._id);
  //         setInitialValues({
  //           rating: review.rating,
  //           review: review.review,
  //           title: review.title || "",
  //           files: [...(review.images || []), ...(review.videos || [])],
  //           productSlug: slug || "",
  //         });
  //       }
  //     })
  //     .catch((err) => console.log("err", err));
  // };

  const handleFilesChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    values: any
  ) => {
    const files = Array.from(e.target.files || []);

    const newErrors: string[] = [];

    if (values.files.length + files.length > 10) {
      newErrors.push("You can only upload a maximum of 10 files.");
    } else {
      const validatedFiles = await Promise.all(
        files.map(async (file) => {
          if (file.type.startsWith("video/")) {
            const videoElement = document.createElement("video");
            videoElement.src = URL.createObjectURL(file);

            return new Promise<File | null>((resolve) => {
              videoElement.onloadedmetadata = () => {
                if (videoElement.duration <= 30) {
                  resolve(file);
                } else {
                  newErrors.push(
                    `${file.name} is longer than 30 seconds and will not be uploaded.`
                  );
                  resolve(null);
                }
              };
            });
          } else if (file.type.startsWith("image/")) {
            return file;
          } else {
            newErrors.push(`${file.name} is not a supported format.`);
            return null;
          }
        })
      );

      const filteredFiles = validatedFiles.filter(
        (file) => file !== null
      ) as File[];

      setFieldValue("files", [...values.files, ...filteredFiles]);
      console.log(values);

      console.log(files, "files");
    }

    setErrors(newErrors);
    e.target.value = "";
  };

  // const handleSubmit = async (values: InitialValues) => {
  //   const formData = new FormData();

  //   formData.append("rating", values.rating.toString());
  //   formData.append("review", values.review);
  //   formData.append("productSlug", values.productSlug);
  //   formData.append("title", values.title || "");

  //   if (values.files) {
  //     values.files.forEach((file) => {
  //       formData.append("reviewFiles", file);
  //     });
  //   }

  //   try {
  //     const method = reviewId ? "put" : "post";
  //     const url = reviewId
  //       ? `/review/updateReview/${reviewId}`
  //       : `/review/addReview`;

  //     const res = await axios[method](url, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       withCredentials: true,
  //     });

  //     if (res.status === 200) {
  //       makeToastWarning(
  //         reviewId
  //           ? "Review updated... Waiting For Approval..."
  //           : "Review added... Waiting For Approval..."
  //       );
  //       getMyOrders();
  //     } else {
  //       makeToastError("Review Failed");
  //     }
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       // Check if the error is an instance of AxiosError
  //       if (error.response) {
  //         const errorMessage =
  //           error.response.data?.message || "Review submission failed";
  //         makeToastError(errorMessage);
  //       } else if (error.request) {
  //         makeToastError("No response received from server");
  //       } else {
  //         makeToastError("An unexpected error occurred");
  //       }
  //     } else {
  //       // If the error is not an AxiosError, handle it differently
  //       makeToastError("An unexpected error occurred");
  //     }
  //   }
  // };

  //   useEffect(() => {
  //     axios
  //       .get(`${getClientsProduct}/${slug}`)
  //       .then((res) => {
  //         setProduct(res.data);
  //       })
  //       .catch((err) => console.error("err"));
  //   }, [slug]);

  return (
    <div className="w-full h-full section-container_my_order">
      <div className="lg:max-w-screen-lg max-w-screen-sm xl:mx-0 mx-auto">
        <div className=" p-6">
          <h3 className="font-bold text-xl mb-4">Ratings & Reviews</h3>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              console.log(values, "values onsubmit");
              resetForm()
              // handleSubmit(values);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="mb-6">
                  <span className="font-bold block mb-2 text-sm">
                    Rate this product :{" "}
                    <Link to={`/products/${slug}`}>
                      {" "}
                      <span className="capitalize underline underline-offset-4">
                        {/* {product?.productName} */}
                      </span>
                    </Link>
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Tooltip
                        key={star}
                        title={starTitles[star - 1]}
                        placement="top"
                      >
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setFieldValue("rating", star);
                            setFieldValue(
                              "title",
                              titleTextBasedOnRating[star - 1]
                            );
                          }}
                        >
                          <StarRatings
                            rating={star <= values.rating ? star : 0}
                            starRatedColor="gold"
                            numberOfStars={1}
                            starDimension="30px"
                            starSpacing="5px"
                            name="rating"
                          />
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="review"
                    className="font-semibold block mb-2 text-sm"
                  >
                    Review this product
                  </label>
                  <Field
                    as={Textarea}
                    name="review"
                    id="review"
                    className="w-full border focus:outline-none rounded-xl bg-gray-50 focus:border-gray-500 resize-none"
                    placeholder="Description"
                    rows={4}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="font-semibold block mb-2 text-sm"
                  >
                    Title (Optional)
                  </label>
                  <Field
                    name="title"
                    id="title"
                    className="w-full border focus:outline-none rounded-xl bg-gray-50 focus:border-gray-500 p-2"
                    placeholder="Review title"
                  />
                </div>

                <div className="mb-6">
                  <span className="font-semibold block mb-2">
                    Add images or videos
                  </span>
                  <div className="flex flex-col items-start gap-3">
                    {values.files.length < 5 && (
                      <>
                        <Button
                          type="button"
                          variant={"outline"}
                          onClick={chooseFiles}
                          className="border-none bg-slate-50 shadow-lg"
                        >
                          <Icon
                            icon="material-symbols-light:download"
                            fontSize={25}
                          />
                          {/* <MdOutlineAttachment className="text-gray-600 text-2xl" /> */}
                        </Button>
                        <input
                          ref={inputRef}
                          type="file"
                          multiple
                          name="files"
                          className="hidden"
                          onChange={(e) =>
                            handleFilesChange(e, setFieldValue, values)
                          }
                        />
                      </>
                    )}
                    {/* show the files here video or image can come */}

                    <div className="flex flex-wrap mt-4 gap-3">
                      {values.files
                        .filter((file): file is File => file instanceof File)
                        .map((file: File, index: number) => (
                          <div key={index} className="relative w-32 h-32">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Uploaded img ${index}`}
                                className="object-cover w-24 h-24 rounded-lg"
                              />
                            ) : file.type.startsWith("video/") ? (
                              <video
                                src={URL.createObjectURL(file)}
                                controls
                                className="object-cover rounded-lg w-32 h-32"
                              />
                            ) : null}
                            <button
                              type="button"
                              className="absolute top-0 right-0 bg-red-600/40 backdrop-blur-sm filter text-white rounded-full h-6 w-6 flex items-center justify-center"
                              onClick={() => {
                                setFieldValue(
                                  "files",
                                  values.files.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              &times;
                            </button>
                          </div>
                        ))}

                      {/* Handle URLs */}
                      {initialValues.files
                        .filter(
                          (file): file is string => typeof file === "string"
                        )
                        .map((url, index) => (
                          <div key={index} className="relative w-32 h-32">
                            {url.endsWith(".mp4") ? (
                              <video
                                width="128"
                                height="128"
                                controls
                                muted
                                controlsList="nodownload"
                                className="w-32 h-32"
                              >
                                <source src={url} type="video/mp4" />
                                <track
                                  src={url}
                                  kind="subtitles"
                                  srcLang="en"
                                  label="English"
                                />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <img
                                src={url}
                                alt={`Fetched Image ${index}`}
                                className="object-cover rounded-lg"
                              />
                            )}
                          </div>
                        ))}
                    </div>

                    {errors.length > 0 && (
                      <div className="text-red-600 mt-2">
                        {errors.map((error, index) => (
                          <div key={index}>{error}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="default"
                  className="md:min-w-48 max-w-52 md:w-auto w-full py-3 bg-black text-white rounded-lg hover:bg-black/30"
                >
                  <IoIosSend className="inline-block mr-2" />{" "}
                  {reviewId ? "Edit Review" : " Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
