// 'use client' should be 'use client' or 'useEffect' should be removed
'use client'

import Image from "next/image";
import Navbar from "../components/Navbar";
import HomePage from "@/components/HomePage";
import { client } from '../lib/client';
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import OurInsightCard from "@/components/OurInsight";

export default function Home() {

  const [blogs, setBlogs] = useState([]);
  const [insights, setInsights] = useState([]);
  const [featured, setFeatured] = useState([]);

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

        const insightQuery = `*[_type=='insight'] | order(_createdAt asc) {
          title,
          image,
          featured,
          summary,
          "slug": slug.current,
          body
        }`;

        const posts = await client.fetch(query);
        const insights = await client.fetch(insightQuery);
        const featuredFromInsights = insights.filter(insight => insight.featured);
        setBlogs(posts);
        setInsights(featuredFromInsights);
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
        <section className="m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {
            blogs.map((blog,index)=>(
              <BlogCard blog={blog} key={index} />
            ))
          }

        </section>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-center mt-28 mb-8 text-primary">Featured Insights</h1>
        <section className="m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {
            insights.map((insight,index)=>(
              <OurInsightCard blog={insight} key={index} />
            ))
          }

        </section>
      </div>

      <Footer />
    </div>
  );
}
