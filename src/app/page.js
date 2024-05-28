// 'use client' should be 'use client' or 'useEffect' should be removed
'use client'

import Image from "next/image";
import Navbar from "../components/Navbar";
import HomePage from "@/components/HomePage";
import { client } from '../lib/client';
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";

export default function Home() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type=='post'] | order(_createdAt asc) {
          title,
          image,
          summary,
          "slug": slug.current,
          body
        }`;

        const posts = await client.fetch(query);
        setBlogs(posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log('Blogs : ',blogs)

  return (
    <div>
      <Navbar />
      {/* Render fetched data */}
      <HomePage />
      <div>
        <section className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {
            blogs.map((blog,index)=>(
              <BlogCard blog={blog} key={index} />
            ))
          }

        </section>
      </div>

      <Footer />
    </div>
  );
}
