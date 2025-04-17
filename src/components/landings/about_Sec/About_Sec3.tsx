import { CheckCheck } from "lucide-react";


function AboutSec3() {
  const contentList = [
    {
      id: 1,
      title: "Revolutionize B2B e-commerce",
      content: "Transforming the B2B experience with a dedicated platform.",
    },
    {
      id: 2,
      title: "Exclusive premium products",
      content: "Access to a unique range of branded products.",
    },
    {
      id: 3,
      title: "Exceptional service",
      content:
        "User-friendly interface, personalized support, and reliable solutions.",
    },
    {
      id: 4,
      title: "Customer satisfaction",
      content: "Prompt and efficient response to business needs",
    },
    {
      id: 5,
      title: "Mutual growth and success",
      content: "Driving success for both Ayaboo and its clients.",
    },
  ];
  return (
    <div className="bg-combined-gradients3">
      <div className="section_container flex md:flex-row flex-col p-10 gap-5">
        <div className="text-white md:w-1/2 w-full space-y-3">
          <div className="">
            <p className="">Mission</p>
            <small className="">
              At Ayaboo, our mission is to revolutionize the B2B e-commerce
              experience by offering a dedicated platform that provides
              businesses with easy access to our exclusive range of premium
              branded products. We are committed to delivering exceptional
              service through a user-friendly interface, personalized support,
              and reliable solutions that cater to the unique needs of each
              business. Our focus is on ensuring customer satisfaction by
              addressing their requirements promptly and efficiently, fostering
              strong and lasting partnerships. By continually innovating and
              refining our platform, we aim to drive mutual growth and success,
              making Ayaboo the go-to destination for businesses seeking quality
              products and outstanding service.
            </small>
          </div>
          {/* --- */}
          <div className="">
            <p className="">Vision</p>
            <small className="">
              Our vision at Ayaboo is to be the leading B2B e-commerce platform,
              renowned for connecting businesses with top-tier branded products
              through innovative technology and exceptional service. We aspire
              to set the standard for excellence in the industry by continually
              enhancing our platform, fostering strong business relationships,
              and driving sustainable growth for our clients and our company.
              Our goal is to create a seamless and impactful e-commerce
              experience that empowers businesses to thrive in a competitive
              marketplace.
            </small>
          </div>
        </div>
        {/* ======= */}
        <div className="grid grid-cols-1 gap-3 grid-rows-5 md:w-1/2 w-full">
          {contentList.map((items, index) => (
            <div key={items.id} className={`row-${index + 1} bg-white flex  gap-3 rounded-xl p-2 col-span-1`}>
              <CheckCheck className=" text-textSec my-auto" size={20}/>
              <div className="">
              <h5>{items.title}</h5>
              <p>{items.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutSec3;
