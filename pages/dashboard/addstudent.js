import React, { useState } from "react";
import Head from "next/head";
import DashboardSidebar from "../../components/DashboardSidebar";
import { toast } from "react-toastify";

export default function AddStudent() {
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    email: "",
    phone: "",
    className: "",
    totalFee: "",
    totalAmountPaid: "",
    lastPaymentDate: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setStudentDetails({
        ...studentDetails,
        name: e.target.value,
      });
    } else if (e.target.name === "email") {
      setStudentDetails({
        ...studentDetails,
        email: e.target.value,
      });
    } else if (e.target.name === "className") {
      setStudentDetails({
        ...studentDetails,
        className: e.target.value,
      });
    } else if (e.target.name === "phone") {
      setStudentDetails({
        ...studentDetails,
        phone: e.target.value,
      });
    } else if (e.target.name === "totalFee") {
      setStudentDetails({
        ...studentDetails,
        totalFee: e.target.value,
      });
    } else if (e.target.name === "totalAmountPaid") {
      setStudentDetails({
        ...studentDetails,
        totalAmountPaid: e.target.value,
      });
    } else if (e.target.name === "lastPaymentDate") {
      setStudentDetails({
        ...studentDetails,
        lastPaymentDate: e.target.value,
      });
    }
  };

  const handleAdd = async () => {
    const data = {
      name: studentDetails.name,
      email: studentDetails.email,
      className: studentDetails.className,
      phone: studentDetails.phone,
      lastPaymentDate: new Date(studentDetails.lastPaymentDate),
      totalFee: studentDetails.totalFee,
      totalAmountPaid: studentDetails.totalAmountPaid,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addstudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.success) {
      toast.success("Student added successfully!", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setStudentDetails({
        ...studentDetails,
        name: "",
        email: "",
        phone: "",
        className: "",
        totalFee: "",
        totalAmountPaid: "",
        lastPaymentDate: "",
      });
    } else {
      toast.error(`Please add ` + JSON.stringify(Object.keys(response.error)), {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <style jsx global>{`
        footer {
          display: none;
        }
        #nav {
          display: none;
        }
      `}</style>
      <Head>
        <title>Dashboard - Add Students</title>
        <meta name="description" content="Add a food item" />
      </Head>
      <DashboardSidebar />

      <div className="lg:ml-60 sticky top-0 bg-violet-900 z-10">
        <div className="  p-2 font-bold md:text-3xl text-2xl  mx-auto text-center shadow  text-gray-50 bg-violet-900 drop-shadow mb-8 ">
          <h1 className="text-center mx-auto">Add a student</h1>
        </div>
      </div>
      <div className="lg:ml-28 p-6  pt-6 flex justify-center w-full">
        <div className="block p-6 rounded-lg shadow-lg bg-white w-[50rem]  mb-28">
          <h1 className="text-center md:text-xl text-lg mb-3 text-gray-700 font-semibold">
            Student Information
          </h1>

          <div className="form-group mb-6">
            <label htmlFor="name" className=" inline-block mb-2 text-gray-700">
              * Name
            </label>
            <input
              onChange={handleChange}
              value={studentDetails.name}
              name="name"
              type="text"
              className="
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="name"
              placeholder="Enter a name"
            />
          </div>

          <div className="form-group mb-6">
            <label htmlFor="email" className=" inline-block mb-2 text-gray-700">
              * Email
            </label>
            <input
              onChange={handleChange}
              value={studentDetails.email}
              name="email"
              type="email"
              className="
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              placeholder="Enter the mail id"
            />
          </div>

          <div className="form-group mb-6">
            <label htmlFor="phone" className=" inline-block mb-2 text-gray-700">
              * Phone
            </label>
            <input
            onWheel={ event => event.currentTarget.blur() }
              onChange={handleChange}
              value={studentDetails.phone}
              name="phone"
              type="number"
              className="
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="phone"
              placeholder="Enter the phone number"
            />
          </div>

          <div className="form-group mb-6">
            <label
              htmlFor="classname"
              className=" inline-block mb-2 text-gray-700"
            >
              * Class Name
            </label>
            <input
            onWheel={ event => event.currentTarget.blur() }
              onChange={handleChange}
              value={studentDetails.className}
              name="className"
              type="number"
              className="
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="classname"
              placeholder="Enter a class name"
            />
          </div>

          <div className="form-group mb-6">
            <label
              htmlFor="totalFee"
              className=" inline-block mb-2 text-gray-700"
            >
              * Total Fee
            </label>
            <input
            onWheel={ event => event.currentTarget.blur() }
              onChange={handleChange}
              value={studentDetails.totalFee}
              name="totalFee"
              type="number"
              className="
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="totalFee"
              placeholder="Total Fee"
            />
          </div>

          <div className="form-group mb-6">
            <label
              htmlFor="totalAmountPaid"
              className=" inline-block mb-2 text-gray-700"
            >
              * Total amount paid
            </label>
            <input
            onWheel={ event => event.currentTarget.blur() }
              onChange={handleChange}
              value={studentDetails.totalAmountPaid}
              name="totalAmountPaid"
              type="number"
              className="
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
              id="totalAmountPaid"
              placeholder="Total amount paid"
            />
          </div>

          <div className="form-group mb-6">
            <label
              htmlFor="lastPaymentDate"
              className=" inline-block mb-2 text-gray-700"
            >
              * Payment Date{" "}
              <span className="text-xs text-gray-700">(MM/DD/YYYY)</span>
            </label>
            <input
              onChange={handleChange}
              value={studentDetails.lastPaymentDate}
              name="lastPaymentDate"
              type="date"
              className="
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="lastPaymentDate"
              placeholder="Enter payment date"
            />
          </div>

          <button
            onClick={handleAdd}
            type="submit"
            className="
      outline-none
        px-6
        py-2.5
        bg-violet-900
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-violet-800 hover:shadow-lg
        focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-violet-800 active:shadow-lg
        transition
        duration-150
        ease-in-out"
          >
            Add
          </button>

          <p className="mt-3 text-sm md:text-right text-gray-500">
            * indicates a required field
          </p>
        </div>
      </div>
    </>
  );
}


// onWheel={ event => event.currentTarget.blur() } To stop increasing or decreasing the number as you scroll the mouse wheel through the input field. where type="number".
