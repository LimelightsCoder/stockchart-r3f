'use client'
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
} from 'react-icons/fa';
// Reusable SocialIcon component with hover effect
const SocialIcon = ({ icon: Icon }) => (
    // eslint-disable-next-line tailwindcss/no-custom-classname
  <Icon className="social-icon hover:cursor-pointer z-10" size={30} />
);
// Footer component
const Footer = () => {
    const [notification, setNotification] = useState(''); // Add state for notification

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setNotification('Copied to clipboard!'); // Set notification message
        setTimeout(() => setNotification(''), 2000); // Clear notification after 2 seconds
    };

  // Array defining the content and structure of the footer
  const items = [
    // Social media icons
    // { type: 'icon', icon: FaFacebookSquare },
    { type: 'icon', icon: FaInstagram },
    // { type: 'icon', icon: FaTwitterSquare },
    { type: 'icon', icon: FaGithubSquare },
    { type: 'icon', icon: FaLinkedin },
    // Footer sections
    { type: 'section', title: 'Follow Me', items: [
        { name: 'Github', href: 'https://github.com/LimelightsCoder' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/cory-parrish-103b76201/' },
        { name: 'Instagram', href: 'https://www.instagram.com/coryparrish.dev?igsh=MXJxaHN3YWZvaGFzag%3D%3D&utm_source=qr' }
      ]
    },
    // { type: 'section', title: 'Support', items: ['Pricing', 'Documentation', 'Guides', 'API Status'] },
    // { type: 'section', title: 'Company', items: ['About', 'Blog', 'Jobs', 'Press', 'Careers'] },
    // { type: 'section', title: 'Legal', items: ['Claim', 'Policy', 'Terms'] },
  ];
  // JSX structure of the footer
  return (
    <div className='relative mx-auto py-16 px-4 grid  gap-8 text-gray-300 border-t select-none'>
            <div className='absolute flex  top-[80vh] right-4'>
            <svg width="5vw" height="5vh" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_116_153)"> <path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z" fill="url(#paint0_linear_116_153)"/> </g> <defs> <linearGradient id="paint0_linear_116_153" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse"> <stop stop-color="#ffffff"/> <stop offset="1" stop-color="#ffffff"/> </linearGradient> <clipPath id="clip0_116_153"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg>
            </div>
      <div className='flex justify-start items-start mt-6'>
        {/* Mapping over sections and rendering content */}
        {items.map((item, index) => (
          item.type === 'section' ? (
            <div key={index}>
              <h6 className="font-medium text-gray-100 text-xl pointer-events-none select-none">{item.title}</h6>
              <ul>
                {/* Mapping over items in each section */}
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex} className='py-2 text-sm '>
                    <Link href={subItem.href} target="_blank" rel="noopener noreferrer" className="flex relative z-10 hover:underline select-none">
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        ))}
      </div>
      
      {/* Grouping "Message me" and email */}
      <div className="lg:col-span-3 mt-8 flex flex-col items-start justify-start space-y-2">
        <p className='text-base sm:text-lg lg:text-xl pointer-events-none select-none'>Message Me</p>
        <Link 
          href="mailto:cory.komaguchi@gmail.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className='flex relative text-white hover:underline text-base sm:text-lg lg:text-xl z-10 '
        >
          cory.komaguchi@gmail.com
        </Link>
       <p onClick={() => copyToClipboard("cory.komaguchi@gmail.com")}
        className='flex relative text-[#777777] hover:underline text-base cursor-pointer z-10'
        >
       click here to copy
       </p>
       {notification && <div className={`notification`}>{notification}</div>} 
      </div>
        {/* <Avatar /> */}
        <Image
  src="/img/Avatar.png"
  width={0}
  height={0}
  sizes="(max-width: 150px) 100vw, (max-width: 300px) 50vw, 33vw"
  style={{ 
    width: '100%', 
    maxWidth: '150px',   // Adjust the max size
    height: 'auto',      // Keep the height proportional
    objectFit: 'cover'   // Maintain the cover behavior
  }} 
  alt="Picture of the author"
/>

      <h1 className='w-full text-3xl lg:text-4xl xl:text-5xl font-bold text-white uppercase mt-8 text-start pointer-events-none select-none'>
        &copy; Cory Parrish
        {/* {new Date().getFullYear()} */}
      </h1>
    </div>
  );
};

export default Footer;