import Head from 'next/head'
import { useState, useEffect } from 'react'
import Student from './../models/students';
import connectDb from './../middleware/mongoose';
import { toast } from 'react-toastify';

export default function Home({allStudents}) {

  const [data, setData] = useState([])
  const [classNameData, setclassNameData] = useState(allStudents)

  let classNm = classNameData.map((cl) => { return cl.className })
  let uniqueclassNm = [...new Set(classNm)].sort(function (a, b) { return a - b; });

  const [selectClass, setSelectClass] = useState();
  const[searchTerm,setSearchTerm]=useState("")

useEffect(()=>{

  if (searchTerm === "") {
    setData([])

  }

  else {

    const filterData = classNameData.filter(function (val) {
      if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) ) {
        return val
      }
      // you have to add else statement else it will give warning in console that filter is not returning anything.
      else {
        return null
      }
    })
    setData(filterData)
    setSelectClass("default")
  }
},[searchTerm])


  const handleSearch=(event)=>{
    setSearchTerm(()=>event.target.value)
  }


  const handleSelectBasedSearch = async () => {


    let data = { className: selectClass}
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getstudents`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let foundStudents = await response.json()
    setData(foundStudents.students)



  }

  const handleClick=async(studentInfo)=>{
    let data={name:studentInfo.name,email:studentInfo.email,totalFee:studentInfo.totalFee,totalAmountPaid:studentInfo.totalAmountPaid}
    let res=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendmail`, { 
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

   let rec=await res.json()
  if(rec.success){
    
      toast.success('Email sent successfully!', {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  }

}

  return (
    <>
<div >
          
          <Head>
            <title>ज्ञानपीठ- Student Details</title>
            <meta name="description" content="Student attendance" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          
          <main className=' flex items-center  flex-col  bg-[#f9fafb] z-10 h-screen'>
            <h1 className="w-full  text-center py-1 text-white font-bold text-lg bg-violet-900">Student list </h1>
         <div className="mt-4">
            <input type="text" placeholder="Enter the student name " className="border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2
       bg-white rounded-xl sm:p-6 sm:w-80 p-[0.5rem] lg:p-[0.5rem] w-64 sm:pl-[3rem] lg:pl-6 pl-4 md:p-[0.5rem]
       outline-none  shadow-neutral-300" onChange={handleSearch}  value={searchTerm}/></div>
    
       
    
            <div className='flex flex-row gap-2 items-center justify-center px-1 mb-4'>
    
              <div className='mt-6'>
            
                <div className='mt-2'>
                  <select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    value={selectClass}
                    defaultValue={"default"}
                    onChange={(e) => setSelectClass(e.target.value)}
                  >
                    <option value={"default"} className="text-center" disabled>
                      Select the class
    
                    </option>
                    {uniqueclassNm.map((cls) => { return <option key={cls} className="text-center" value={cls}>{cls}</option> })}
    
                  </select>
                </div>
    
              </div>
    
    
    
    
              <div className=" flex mt-6 gap-2 ">
    
                <button onClick={handleSelectBasedSearch} className="bg-violet-900 hover:bg-violet-800 p-1.5 rounded text-white mt-2"  >
                  Get students info
                </button>
    
                {/* <button onClick={handleViewAll} className="hidden md:block bg-violet-900 hover:bg-violet-800 p-1.5 rounded text-white mt-2"  >
                  View All
                </button> */}
    
              </div>
    
    
            </div>
    
    
    
    
    
            {data.length > 0 ? <div className="overflow-x-auto relative  w-full mt-4 no-scrollbar px-2 ">
              
              <table className="w-full text-sm text-left text-gray-500  ">
                <thead className="text-xs text-gray-700 uppercase border-b border-r-0 border-collapse bg-gray-50 sticky top-0">
                  <tr >
                    <th scope="col" className="py-3 px-2 md:px-2  text-center  whitespace-nowrap ">
                      Sr No.
                    </th>
                    <th scope="col" className="py-3 px-2 md:px-2  text-center whitespace-nowrap ">
                     Name
                    </th>
                    <th scope="col" className="py-3 px-2 md:px-2  text-center whitespace-nowrap ">
                     Class Name
                    </th>
                
                    <th scope="col" className="py-3 px-1 md:px-2 text-center whitespace-nowrap">
                      Total Fee
                    </th>
                    <th scope="col" className="py-3 px-1 md:px-2 text-center whitespace-nowrap">
                      Total Paid
                    </th>
                    <th scope="col" className="py-3 px-1 md:px-2 text-center whitespace-nowrap">
                      Outstanding Amount
                    </th>
                    <th scope="col" className="py-3 px-1 md:px-2 text-center whitespace-nowrap">
                      Last payment Date
                    </th>
                    
                    <th scope="col" className="py-3 px-1 md:px-2  text-center whitespace-nowrap">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-1 md:px-2 text-center whitespace-nowrap ">
                      Phone
                    </th>
                    <th scope="col" className="py-3 px-1 md:px-2 text-center whitespace-nowrap ">
                      Send mail
                    </th>
    
    
                  </tr>
                </thead>
                <tbody>
                  {data.sort((a,b) => {return a.name.localeCompare(b.name) }).map((item, index) => {
                    return <tr key={index} className="bg-white border-border-collapse   ">
    
    <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
                        {index+1}
                      </td>
    
                      <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap capitalize ">
                        {item.name}
                      </td>
    
                      <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
                        {item.className}
                      </td>
    
            
                      <td className="py-4 px-1 md:px-2 text-center  whitespace-nowrap">
                        {item.totalFee}
                      </td>
    
                      <td className="py-4 px-1 md:px-2 text-center  whitespace-nowrap">
                        {item.totalAmountPaid}
                      </td>
    
                      <td className="py-4 px-1 md:px-2 text-center font-semibold text-red-500 whitespace-nowrap">
                        {item.totalFee-item.totalAmountPaid}
                      </td>
    
                      <td className="py-4 px-1 md:px-2 text-center whitespace-nowrap">
                        {new Date(item.lastPaymentDate).toLocaleDateString('en-GB')}
                      </td>
    
                    
                      <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
                        {item.email}
                      </td>
    
                      <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
                        {item.phone}
                      </td>
                     
                      <td className="py-4 px-2 md:px-2 text-center whitespace-nowrap">
                <button onClick={(e)=>{handleClick(item)} }className=" bg-emerald-600 hover:bg-emerald-700 text-white rounded p-1 px-2 hover:shadow" value="P" >Send Mail</button>
                </td>
                      
                      
                    </tr>
                  })}
    
                </tbody>
              </table>
            </div> : <div className="flex justify-center items-center font-semibold my-20 md:p-10 p-8 text-violet-900">
              {selectClass && searchTerm ?<p>No Student records found!</p>:<p className="text-center">For student details, select the class name or use the search bar.</p> }</div>}
    
    
    
    
            
    
    
    
          </main>
    
    
        </div>



</>
    
  )
}



export async function getServerSideProps(context) {
  // Fetch data from external API
  connectDb()
  // let className = (context.query.className);
  // let division = (context.query.division);

  let students = await Student.find({})

  return { props: { allStudents: JSON.parse(JSON.stringify(students)) } }
}
