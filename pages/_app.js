import '../styles/globals.css'
import Navbar from './../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthState from "./../context/AuthState";
import Layout from "./../components/Layout";
import Head from "next/head"
function MyApp({ Component, pageProps }) {
  return<>
  <Head>
    <title>ज्ञानपीठ</title>
  </Head>
       <ToastContainer
    position="top-left"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
  <AuthState>
    <Layout>
   <Navbar/> <Component {...pageProps} />
   </Layout>
   </AuthState>
   </>
}

export default MyApp
