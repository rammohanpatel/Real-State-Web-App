// components/OurPeopleCard.js

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/lib/image';

const OurPeopleCard = ({ person }) => {
  return (
    <Link href={`/our-people/${person.slug}`} key={person._id}>
      <div className="bg-white rounded-lg shadow-md p-6 my-6 text-center hover:scale-105">
        {person.imageUrl && (
          <Image
            width={500}
            height={500}
            src={urlForImage(person.imageUrl)}
            alt={person.name}
            className="w-full rounded-full mb-4"
          />
        )}
        <h3 className="text-xl font-semibold mb-2">{person.name}</h3>
        <p className="text-gray-700 font-semibold">{person.role}</p>
        <hr className="w-1/2 mx-auto my-4 border-t-2 border-gray-300" />
        <p className="text-gray-700">{person.description}</p>
      </div>
    </Link>
  );
};

export default OurPeopleCard;
