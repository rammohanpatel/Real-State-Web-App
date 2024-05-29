import Image from "next/image";
import { urlForImage } from '../../../lib/image';
import { client } from '../../../lib/client';
import { PortableText } from "@portabletext/react";

// To create static pages for dynamic routes
export default async function page({ params: { slug } }) {

  const query = `*[_type=='insight' && slug.current==$slug]{
    title,body,image,summary,
    "documentURL":document.asset->url     
  }[0]`;
  const blog = await client.fetch(query, { slug });
  console.log("Fetched blog data:", blog);
  
  const myPortableTextComponents = {
    types: {
        image: ({ value }) => <Image height={500} width={500} src={value.imageUrl} alt="Blog Image" />,
        callToAction: ({ value, isInline }) =>
          isInline ? (
            <a href={value.url}>{value.text}</a>
          ) : (
            <div className="callToAction">{value.text}</div>
          ),
      },
  }

  return (
    <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">
      {/* Blog Title */}
      <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-dark dark:text-light">
        {blog.title}
      </h1>

      {/* Featured Image */}
      <Image
        src={urlForImage(blog.image)}
        width={500}
        height={500}
        alt="AI for everyone"
        className="rounded"
      />

      {/* Blog Summary Section */}
      <section>
      <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-accentDarkPrimary">
        Summary
      </h2>
      <div className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
        <PortableText value={blog.summary} />
      </div>
      </section>

      {/* Main Body of Blog */}
      <section className="text-lg leading-normal text-dark/80 dark:text-light/80
      prose-h4:text-accentDarkPrimary prose-h4:text-3xl prose-h4:font-bold
      prose-li:list-disc prose-li:list-inside prose-li:marker:text-accentDarkSecondary
      prose-strong:text-dark dark:prose-strong:text-white
      ">
        <PortableText 
        value={blog.body} 
        components={myPortableTextComponents} 
        />
      </section>

      <div>
        <a href={blog.documentURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Document
        </a>
      </div>
    </article>
  );
}
