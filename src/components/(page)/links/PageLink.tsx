import backgroundgradient from "@/../public/links/gradientbackground.png";
import ablogo from "@/../public/links/aswinibajajlogo.png";
import Image from "next/image";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { RiFacebookFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import avatar from "@/../public/links/Avatar.png";
import Link from "next/link";
function PageLink() {
  const content = [
    {
      logo: ablogo,
      title: "Aswini Bajaj Classes",
      desciption: "Finance Education",
      information:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,",
      socialInformation: [
        { icon: <FaYoutube />, link: "#" },
        { icon: <IoLogoInstagram />, link: "#" },
        { icon: <RiFacebookFill />, link: "#" },
        { icon: <FaXTwitter />, link: "#" },
      ],
    },
    {
      logo: ablogo,
      title: "Leveraged Growth",
      desciption: "Advisory, Consulting, Training, Learning & Development",
      information:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,",
      socialInformation: [
        { icon: <FaLinkedin />, link: "#" },
        { icon: <IoLogoInstagram />, link: "#" },
      ],
    },
    {
      logo: ablogo,
      title: "Invest In Yourself",
      desciption: "Personal Development & Growth",
      information:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,",
    },
  ];

  return (
    <div className="relative w-screen min-h-screen flex justify-center items-center">
      <div className="z-10 bg-opacity-80 p-8 text-white w-full max-w-6xl bg-[#44657996]">
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <Image
            src={avatar}
            alt="Founder Avatar"
            width={100}
            height={100}
            quality={99}
            className="rounded-full"
          />
          <p className="text-[32px] leading-[24px] font-bold tracking-normal font-inter">
            Aswini Bajaj
          </p>
          <p className="text-lg font-semibold text-[#FFFFFF80]">
            Founder || Mentor || Educator
          </p>
          <p className="text-md font-semibold">
            CA, CS, CFA, FRM, CAIA, CIPM, CFP, RV, CCRA, CIIB, CIRA, AIM
          </p>
          <div className="flex gap-6 mt-2 text-2xl">
            <FaYoutube className="text-white cursor-pointer" />
            <IoLogoInstagram className="text-white cursor-pointer" />
            <RiFacebookFill className="text-white cursor-pointer" />
            <FaXTwitter className="text-white cursor-pointer" />
            <FaLinkedin className="text-white cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:grid-cols-2">
          {content.map((item, index) => (
            <div
              key={index}
              className="bg-[#ffffff13] p-6 rounded-xl min-h-[380px] flex flex-col justify-between items-center text-center backdrop-blur-md"
            >
              <Image
                src={item.logo}
                alt={`${item.title} Logo`}
                width={50}
                height={50}
              />

              <div className="mt-4">
                <p className="text-[16px] font-semibold text-white">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#FFFFFF80] mt-1 md:whitespace-nowrap lg:whitespace-nowrap 2xl:whitespace-nowrap">
                  {item.desciption}
                </p>
              </div>

              <p className="text-[13px] text-[#ffffffda] font-semibold text-center my-auto">
                {item.information}
              </p>

              {item.socialInformation ? (
                <div className="flex gap-4 text-xl text-white mt-6">
                  {item.socialInformation.map((s, i) => (
                    <Link
                      key={i}
                      href={s.link || "#"}
                      className="hover:opacity-70 transition"
                    >
                      {s.icon}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="h-[40px] mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageLink;
