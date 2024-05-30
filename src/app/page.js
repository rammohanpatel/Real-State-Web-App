
'use client'

import Image from "next/image";
import Navbar from "../components/Navbar";
import HomePage from "@/components/HomePage";
import { client } from '../lib/client';
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import OurInsightCard from "@/components/OurInsight";
import Link from "next/link";
import OurPeopleCard from "@/components/OurPeopleCard";

export default function Home() {

  const [blogs, setBlogs] = useState([]);
  const [insights, setInsights] = useState([]);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type=='post'] | order(_createdAt asc) {
          title,
          image,
          featured,
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

        const personQuery = `*[_type == 'person' && featured == true] | order(_createdAt asc) {
          name,
          "imageUrl": image.asset->url,
          role,
          description,
          "slug": slug.current
        }`;

        const posts = await client.fetch(query);
        const insights = await client.fetch(insightQuery);
        const people = await client.fetch(personQuery);

        const featuredPosts = posts.filter(post => post.featured);
        const featuredFromInsights = insights.filter(insight => insight.featured);

        setBlogs(featuredPosts);
        setInsights(featuredFromInsights);
        setPerson(people);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

 

  return (
    <div>
      <Navbar />
      {/* Render fetched data */}
      <HomePage />
      <div>
        <section className="m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {
            blogs.map((blog, index) => (
              <BlogCard blog={blog} key={index} />
            ))
          }

        </section>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-center mt-28 mb-8 text-primary">Featured Insights</h1>
        <section className="m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {
            insights.map((insight, index) => (
              <OurInsightCard blog={insight} key={index} />
            ))
          }

        </section>
      </div>
      <div className="flex justify-center">
        <Link href="/our-insights">
          <button class="bg-transparent hover:bg-blue-800 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            View All Insights
          </button>        
          </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-center mt-28 mb-8 text-primary">Our People</h1>
        <section className="m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {
            person.map((people, index) => (
              <OurPeopleCard person={people} key={index} />
            ))
          }

        </section>
      </div>
      <div className="flex justify-center">
        <Link href="/our-people">
          <button class="bg-transparent hover:bg-blue-800 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            View All People
          </button>        
          </Link>
      </div>




      <Footer />
    </div>
  );
}
