
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from './Footer';
import { client } from '../lib/client';
import { urlForImage } from '@/lib/image';
import Link from 'next/link';

const OurPeople = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const query = `*[_type == "person"]{
        _id,
        name,
        role,
        "slug": slug.current,
        description,
        "imageUrl": image.asset->url
      }`;

      const peopleData = await client.fetch(query);
      setPeople(peopleData);
    };

    fetchPeople();
  }, []);

  return (
    <>
      <section id="our-team" className="bg-gray-100 py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Meet Our Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {people.map(person => (
             <Link href={`/our-people/${person.slug}`} >
              <div key={person._id} className="bg-white rounded-lg shadow-md p-6 my-6 text-center hover:scale-105">
                <Image
                  width={500}
                  height={500}
                  src={urlForImage(person.imageUrl)}
                  alt={person.name}
                  className="w-full rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{person.name}</h3>
                <p className="text-gray-700 font-semibold ">{person.role}</p>
                <hr className="w-1/2 mx-auto my-4 border-t-2 border-gray-300"/>
                <p className="text-gray-700">{person.description}</p>
              </div>
                </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OurPeople;
