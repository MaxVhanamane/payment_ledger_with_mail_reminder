import Head from "next/head";
import { useState, useEffect,useContext } from "react";
import { toast } from "react-toastify";
import DashboardSidebar from "../../components/DashboardSidebar";
import { AuthContext } from './../../context/AuthState';

export default function EditStudentDetails() {
  const [data, setData] = useState([]);
  const [serverSideData, setserverSideData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectClass, setSelectClass] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    authorised
  } = useContext(AuthContext);

  let classNm = serverSideData.map((cl) => {
    return cl.className;
  });
  let uniqueclassNm = [...new Set(classNm)].sort(function (a, b) {
    return a - b;
  });

  // Edit student details
  const [studentDetails, setStudentDetails] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    className: "",
    totalFee: "",
    totalAmountPaid: "",
    lastPaymentDate: "",
  });

  let getData = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getstudents`);
    let finalres = await res.json();
    setserverSideData(() => finalres.students);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setData([]);
    } else {
      const filterData = serverSideData.filter(function (val) {
        if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
        // you have to add else statement else it will give warning in console that filter is not returning anything.
        else {
          return null;
        }
      });
      setData(filterData);
      setSelectClass("default");
    }
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(() => event.target.value);
  };

  const handleSelectBasedSearch = async () => {
    let data = { className: selectClass };
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getstudents`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let foundStudents = await response.json();

    setData(() => foundStudents.students);

    getData();
  };

  const handleDeleteStudent = async (item) => {
    let data = item;
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/deletestudent`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let result = await response.json();
    if (result.success) {
      toast.success("Student details deleted successfully!", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      handleSelectBasedSearch();
    } else {
      toast.error("Student details not found!", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Edit student details

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
    } else if (e.target.name === "phone") {
      setStudentDetails({
        ...studentDetails,
        phone: e.target.value,
      });
    } else if (e.target.name === "lastPaymentDate") {
      setStudentDetails({
        ...studentDetails,
        lastPaymentDate: e.target.value,
      });
    }
  };
  const handleEdit = async () => {
    const data = {
      _id: studentDetails._id,
      name: studentDetails.name,
      email: studentDetails.email,
      className: studentDetails.className,
      totalFee: studentDetails.totalFee,
      totalAmountPaid: studentDetails.totalAmountPaid,
      phone: studentDetails.phone,
      lastPaymentDate: new Date(studentDetails.lastPaymentDate),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/editstudentdetails`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const response = await res.json();
    if (response.success) {
      toast.success("Student details updated successfully!", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      handleSelectBasedSearch();
    } else {
      toast.success("Some error occured, please try again later!", {
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
          nav {
            display: none;
          }
        `}</style>
      {authorised&&<div>
      
        <Head>
          <title>ज्ञानपीठ- Edit student details</title>
          <meta name="description" content="Student attendance" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <DashboardSidebar />

        <div className="lg:ml-60 sticky top-0 bg-violet-900 z-10">
          <div className="  p-2 font-bold md:text-3xl text-2xl  mx-auto text-center shadow  text-gray-50 bg-violet-900 drop-shadow mb-8 ">
            <h1 className="text-center mx-auto">Edit student details</h1>
          </div>
        </div>

        <main className=" flex items-center  flex-col lg:ml-60 sticky top-0 bg-[#f9fafb] h-screen">
          <div>
            <input
              type="text"
              placeholder="Enter the student name "
              className="border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2
       bg-white rounded-xl sm:p-6 sm:w-80 p-[0.5rem] lg:p-[0.5rem] w-64 sm:pl-[3rem] lg:pl-6 pl-4 md:p-[0.5rem]
       outline-none  shadow-neutral-300"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>

          <div className="flex flex-row gap-2 items-center justify-center px-1 mb-4">
            <div className="mt-6">
              {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 text-center">Select the Class</label> */}
              <div className="mt-2">
                <select
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  value={selectClass}
                  defaultValue={"default"}
                  onChange={(e) => setSelectClass(e.target.value)}
                >
                  <option value={"default"} className="text-center" disabled>
                    Select the class
                  </option>
                  {uniqueclassNm.map((cls) => {
                    return (
                      <option key={cls} className="text-center" value={cls}>
                        {cls}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className=" flex mt-6 gap-2 ">
              <button
                onClick={handleSelectBasedSearch}
                className="bg-violet-900 hover:bg-violet-800 outline-none p-1.5 rounded text-white mt-2"
              >
                Search
              </button>
            </div>
          </div>

          {data.length > 0 ? (
            <div className="overflow-x-auto relative  w-full mt-4 no-scrollbar px-2 mb-28">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase border-b border-r-0 border-collapse bg-gray-50 sticky top-0">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-2 md:px-2  text-center  whitespace-nowrap "
                    >
                      Sr No.
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-2 md:px-2  text-center  whitespace-nowrap"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2  text-center whitespace-nowrap"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap "
                    >
                      Total Fee
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap"
                    >
                      Amount Paid
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap"
                    >
                      Outstanding amount
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap"
                    >
                      Last payment date
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap"
                    >
                      phone
                    </th>

                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .sort((a, b) => {
                      return a.name.localeCompare(b.name);
                    })
                    .map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white border-border-collapse   "
                        >
                          <td className="py-4 px-2 md:px-2 text-center  whitespace-nowrap">
                            {index + 1}
                          </td>

                          <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap capitalize ">
                            {item.name}
                          </td>

                          <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
                            {item.className}
                          </td>

                          <td className="py-4 px-1 md:px-2 text-center whitespace-nowrap">
                            {item.totalFee}
                          </td>

                          <td className="py-4 px-1 md:px-2 text-center whitespace-nowrap">
                            {item.totalAmountPaid}
                          </td>
                          <td className="py-4 px-1 md:px-2 text-center whitespace-nowrap font-semibold text-red-500">
                            {item.totalFee - item.totalAmountPaid}
                          </td>

                          <td className="py-4 px-1 md:px-2 text-center whitespace-nowrap">
                            {new Date(item.lastPaymentDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>

                          <td className="py-4 px-1 md:px-2 text-center whitespace-nowrap">
                            {item.email}
                          </td>
                          <td className="py-4 px-1 md:px-2 text-center whitespace-nowrap">
                            {item.phone}
                          </td>

                          <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
                            <div className="flex space-x-2 items-center justify-center">
                              <button
                                onClick={(e) => {
                                  let DateVal = new Date(item.lastPaymentDate)
                                    .toISOString()
                                    .split("T")[0];
                                  setStudentDetails((prev) => {
                                    return {
                                      ...prev,
                                      _id: item._id,
                                      name: item.name,
                                      email: item.email,
                                      phone: item.phone,
                                      className: item.className,
                                      totalFee: item.totalFee,
                                      totalAmountPaid: item.totalAmountPaid,
                                      lastPaymentDate: DateVal,
                                    };
                                  });

                                  setShowModal(true);
                                }}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded py-0.5 px-1 outline-none md:px-2 md:py-1"
                              >
                                Edit
                              </button>

                              <button
                                onClick={(e) => {
                                  let confirmVal = confirm(
                                    "Do you really want to delete?"
                                  );
                                  if (confirmVal) {
                                    handleDeleteStudent(item);
                                  }
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white rounded py-0.5 px-1 outline-none  md:px-2 md:py-1"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center font-semibold my-20 md:p-10 p-8 text-violet-900">
              {selectClass && searchTerm ? (
                <p>No Student records found!</p>
              ) : (
                <p className="text-center">
                  For student details, select the class name or use the search
                  bar.
                </p>
              )}
            </div>
          )}
        </main>
      </div>}
      {showModal && (
        <div className="lg:ml-60 bg-gray-100 h-fit absolute inset-0 flex items-center justify-center z-[120] ">
          <div className="bg-violet-900 mt-12  rounded-lg mb-10">
            {/* heading */}
            <div className="text-center font-bold text-xl mt-4 border-b border-solid border-slate-200">
              <h2 className="mb-2 text-gray-100">Edit the student details</h2>
            </div>
            {/* body */}
            <div>
              <div className="p-6  pt-6 flex justify-center w-full">
                <div className="block p-6 rounded-lg shadow-lg bg-white lg:w-[50rem] w-80 md:w-[40rem]  mb-12">
                  <div className="form-group mb-6">
                    <label
                      htmlFor="name"
                      className="formLabel inline-block mb-2 text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      onChange={handleChange}
                      value={studentDetails.name}
                      name="name"
                      type="text"
                      className="form-control
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
                    <label
                      htmlFor="email"
                      className="formLabel inline-block mb-2 text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      value={studentDetails.email}
                      name="email"
                      type="email"
                      className="form-control
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
                      placeholder="Enter a parent's mail id"
                    />
                  </div>

                  <div className="form-group mb-6">
                    <label
                      htmlFor="phone"
                      className="formLabel inline-block mb-2 text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                    onWheel={ event => event.currentTarget.blur() }
                      onChange={handleChange}
                      value={studentDetails.phone}
                      name="phone"
                      type="number"
                      className="form-control
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
                      className="formLabel inline-block mb-2 text-gray-700"
                    >
                      Class Name
                    </label>
                    <input
                    onWheel={ event => event.currentTarget.blur() }
                      onChange={handleChange}
                      value={studentDetails.className}
                      name="className"
                      type="number"
                      className="form-control
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
                      className="formLabel inline-block mb-2 text-gray-700"
                    >
                      Total Fee
                    </label>
                    <input
                    onWheel={ event => event.currentTarget.blur() }
                      onChange={handleChange}
                      value={studentDetails.totalFee}
                      name="totalFee"
                      type="number"
                      className="form-control
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
                      className="formLabel inline-block mb-2 text-gray-700"
                    >
                      Total amount paid
                    </label>
                    <input
                    onWheel={ event => event.currentTarget.blur() }
                      onChange={handleChange}
                      value={studentDetails.totalAmountPaid}
                      name="totalAmountPaid"
                      type="number"
                      className="form-control
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
                      id="totalAmountPaid"
                      placeholder="Total amount paid"
                    />
                  </div>

                  <div className="form-group mb-6">
                    <label
                      htmlFor="lastPaymentDate"
                      className="formLabel inline-block mb-2 text-gray-700"
                    >
                      Payment Date (MM/DD/YYYY)
                    </label>
                    <input
                      onChange={handleChange}
                      value={studentDetails.lastPaymentDate}
                      name="lastPaymentDate"
                      type="date"
                      className="form-control
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
                </div>
              </div>
            </div>
            {/* footer */}

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-red-500 text-white hover:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  handleEdit();
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
