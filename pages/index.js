/** @format */

import Header from "../Components/Header";
import TopContainer from "../Components/Head";
import About from "../Components/About";
import Experience from "../Components/Experience";
import Projects from "../Components/Projects";
import Blog from "../Components/Blog";
import Contact from "../Components/Contact";
import Head from "next/head";

// meta charset
// title
// meta viewport
// meta description
// meta og:title
// meta og:description
// meta og:type
// meta og:image
// meta og:site_name

export default function Home() {
  return (
    <div className='bg-black overflow-x-hidden'>
      <Head>
        <title>Shamin Chokshi</title>
        <meta charset='UTF-8' />
        <meta
          name='description'
          content='This is an example of a meta description. This will often show up in search results.'
        />
        <meta
          name='og:description'
          content='This is an example of a meta description. This will often show up in search results.'
        />
        <meta property="og:url" content=""/>
        <meta property='og:title' content='Toshita Sharma' key='title' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Header />
      <TopContainer />
      <About />
      <Experience />
      <Projects />
      {/* <Blog /> */}
      <Contact />
    </div>
  );
}
