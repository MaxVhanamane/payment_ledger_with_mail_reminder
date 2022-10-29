import Head from "next/head";
import { useState, useEffect } from "react";
import Student from "./../models/students";
import connectDb from "./../middleware/mongoose";
export default function ViewAllStudents({ allStudents }) {
  const [data, setData] = useState(allStudents);
  const [classNameData, setclassNameData] = useState(allStudents);

  let classNm = classNameData.map((cl) => {
    return cl.className;
  });
  let uniqueclassNm = [...new Set(classNm)].sort(function (a, b) {
    return a - b;
  });

  const [selectClass, setSelectClass] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      setData(allStudents);
    } else {
      const filterData = classNameData.filter(function (val) {
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
    setData(foundStudents.students);
  };

  const handleViewAll = async () => {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getstudents`,
      {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let foundStudents = await response.json();
    setData(foundStudents.students);
  };

  return (
    <>
      <div>
        <Head>
          <title>Student Details</title>
          <meta name="description" content="Student attendance" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className=" flex items-center justify-center flex-col  sticky top-0 bg-[#f9fafb] z-10">
          <h1 className="w-full  text-center p-3 text-white font-bold text-lg bg-violet-900">
            Student list{" "}
          </h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter student name "
              className="border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2
   bg-white rounded-xl sm:p-6 sm:w-80 p-[0.5rem] lg:p-[0.5rem] w-64 sm:pl-[3rem] lg:pl-6 pl-4 md:p-[0.5rem]
   outline-none  shadow-neutral-300"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>

          <div className="flex flex-row gap-2 items-center justify-center px-1">
            <div className="mt-6">
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
                Get students info
              </button>

              <button
                onClick={handleViewAll}
                className="hidden md:block bg-violet-900 outline-none hover:bg-violet-800 p-1.5 rounded text-white mt-2"
              >
                View All
              </button>
            </div>
          </div>

          {data.length > 0 ? (
            <div className="overflow-x-auto relative  w-full p-1 lg:p-4">
              <p
                onClick={handleViewAll}
                className="md:hidden text-right pr-2 text-blue-700 mt-2 hover:text-blue-600"
              >
                View All students
              </p>
              <table className="w-full text-sm text-left text-gray-500  mt-4">
                <thead className="text-xs text-gray-700 uppercase border-b border-r-0 border-collapse bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-2 md:px-2  text-center  whitespace-nowrap "
                    >
                      Sr No.
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-2 md:px-2  text-center whitespace-nowrap "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-2 md:px-2  text-center whitespace-nowrap "
                    >
                      Class Name
                    </th>

                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap"
                    >
                      Total Fee
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap"
                    >
                      Total Paid
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap"
                    >
                      Remaining
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap"
                    >
                      Last payment Date
                    </th>

                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2  text-center whitespace-nowrap"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 md:px-2 text-center whitespace-nowrap "
                    >
                      Phone
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
                          <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
                            {index + 1}
                          </td>

                          <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
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

                          <td className="py-4 px-1 md:px-2 text-center whitespace-nowrap">
                            {item.totalFee - item.totalAmountPaid}
                          </td>

                          <td className="py-4 px-1 md:px-2 text-center whitespace-nowrap">
                            {new Date(item.lastPaymentDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>

                          <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
                            {item.email}
                          </td>

                          <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
                            {item.phone}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center shadow-sm my-20 p-10 text-red-500">
              No Student records found! Please add Students.{" "}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  connectDb();
  // let className = (context.query.className);
  // let division = (context.query.division);

  let students = await Student.find({});

  return { props: { allStudents: JSON.parse(JSON.stringify(students)) } };
}
