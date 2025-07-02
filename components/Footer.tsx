import React from "react";
import Link from "next/link";
import Image from "next/image";

// import Logo from "@/assets/images/logo.png"
import LinkedInIcon from "@/../public/icons/linkedInIcon.svg";
import GitHubIcon from "@/../public/icons/githubIcon.svg";
import GmailIcon from "@/../public/icons/gmailIcon.svg";

const Footer = () => {
  const SocialLinks = [
    {
      id: 1,
      icon: LinkedInIcon,
      url: "https://www.linkedin.com/in/mubassim",
      alt: "LinkedIn",
    },
    {
      id: 2,
      icon: GitHubIcon,
      url: "https://www.github.com/Mubassim-Khan",
      alt: "GitHub",
    },
    {
      id: 4,
      icon: GmailIcon,
      url: "mailto:mubassimkhan@gmail.com",
      alt: "Gmail",
    },
  ];

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800 py-6 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        {/* Logo or left content (optional) */}
        <div className="flex-1 flex justify-center md:justify-start">
          {/* <Image src={Logo} alt="Logo" className="w-24" /> */}
          <span className="text-medium text-gray-200 font-normal">Reimagining the Movie Streaming Experience</span>
        </div>
        {/* Social icons and copyright */}
        <div className="flex-1 flex flex-col items-center md:items-end">
          <div className="flex gap-4 mb-2">
            {SocialLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Image src={link.icon} alt={link.alt} width={25} height={25} />
              </Link>
            ))}
          </div>
          <p className="text-zinc-400 text-sm">
            &copy; 2025. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
