import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/sections/Header";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section with Mountain Background */}
      <section
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/7859218934924cb0d4cca3b350f17a526ca9a8e1?width=3840')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1
            className="mb-6 leading-tight text-3xl sm:text-4xl lg:text-5xl font-normal"
            style={{ fontFamily: "Parisienne, sans-serif" }}
          >
            Our team cares about your full relax
          </h1>
          <p
            className="mb-8 max-w-3xl mx-auto leading-normal text-lg sm:text-xl lg:text-2xl font-bold"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness.
          </p>
          <Button
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg rounded-full"
          >
            View our Tour Packages
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="w-full h-[559px] relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/da59105fe50a32a0197c09d021dbfb1fc87f1586?width=1200"
                  alt="Lucca cityscape"
                  className="w-full h-[516px] object-cover rounded-3xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-gray-600 font-open-sans text-base font-semibold opacity-60 uppercase tracking-wide">
                  WELCOME TO OUR SITE!
                </p>
                <h2 className="font-open-sans text-4xl font-bold text-gray-800 leading-tight">
                  We Are The Center Of Lucca To Offer You The Best
                </h2>
              </div>

              <p className="font-open-sans text-lg text-gray-800 leading-8">
                We are right in the center of Lucca to offer you the real city
                life! With years of experience in practically every tourism
                sector, with us you can find complete packages at the lowest
                price, to travel and learn and have fun all without worries and
                without stress. What are you waiting for, book a bright evening,
                a trip to beautiful Tuscany or a personal tour for you!
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    20+
                  </div>
                  <p className="text-gray-600 opacity-60 text-sm">
                    Years Experience
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    100+
                  </div>
                  <p className="text-gray-600 opacity-60 text-sm">
                    Happy Customer
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    15+
                  </div>
                  <p className="text-gray-600 opacity-60 text-sm">
                    Choice of Services
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    10+
                  </div>
                  <p className="text-gray-600 opacity-60 text-sm">
                    Professional Guides
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/d2b135b766bf1f48b9da8c3708efa0592048afe0?width=3840')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Complete Packages */}
            <Card className="bg-white bg-opacity-30 backdrop-blur-sm border-none p-8 text-center rounded-3xl">
              <div className="w-16 h-16 mx-auto mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/86f4f5222d20c5cf4fe21333189823135521dfc2?width=120"
                  alt="Map icon"
                  className="w-full h-full"
                />
              </div>
              <h3 className="font-open-sans text-xl font-semibold text-black">
                Complete Packages For All Your Wishes
              </h3>
            </Card>

            {/* Experience */}
            <Card className="bg-white bg-opacity-30 backdrop-blur-sm border-none p-8 text-center rounded-3xl">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <g clipPath="url(#clip0_201_7012)">
                    <path
                      d="M40.8299 58.0564C41.6673 56.8381 42.4369 55.7999 43.1151 54.7042C43.3429 54.2826 43.6897 53.9374 44.1123 53.7115C44.5349 53.4856 45.0146 53.389 45.4917 53.4338C46.4464 53.4729 47.4064 53.3608 48.3612 53.4155C49.5273 53.4808 49.4595 53.0425 48.9769 52.2468C48.4369 51.3573 47.9751 50.4208 47.4769 49.5025C47.169 48.939 47.1038 48.3834 47.756 48.0547C48.3586 47.7495 48.7395 48.1616 49.0082 48.6521C49.736 49.9877 50.4899 51.3103 51.1604 52.6747C51.7604 53.8929 51.1264 54.9338 49.736 55.0486C48.6556 55.174 47.5669 55.2124 46.4804 55.1634C45.2725 55.0668 44.5421 55.5625 43.9786 56.5616C43.5534 57.3155 43.029 58.0173 42.5308 58.7268C41.3177 60.4512 40.0891 60.399 39.0821 58.5573C37.1856 55.0877 35.2864 51.6181 33.4421 48.1225C32.9856 47.2538 32.5917 46.706 31.5064 47.246C31.1875 47.3966 30.8387 47.4734 30.486 47.4707C30.1332 47.468 29.7857 47.3858 29.469 47.2303C28.4464 46.7295 28.0656 47.2068 27.6221 48.0521C25.796 51.5138 23.9177 54.9416 22.0525 58.3773C20.9256 60.4642 19.509 60.6312 18.4499 58.5468C17.0412 55.7764 15.0273 54.8242 12.0169 55.0355C9.63774 55.2025 9.09253 54.0573 10.2456 51.9338C11.9847 48.7251 13.7238 45.5164 15.463 42.3077C16.2586 40.8364 16.0317 39.7851 14.6151 38.799C13.8842 38.3284 13.1185 37.9142 12.3247 37.5599C10.2743 36.5608 9.12383 34.9721 9.41861 32.6634C9.72122 30.2738 9.12644 28.2468 7.68905 26.3321C6.40035 24.6181 6.41601 22.7164 7.70992 21.0051C8.40986 20.1197 8.92231 19.101 9.21606 18.0112C9.50981 16.9214 9.57873 15.7833 9.41861 14.666C9.14209 12.4225 10.2012 10.7712 12.2621 9.88684C14.276 9.02337 15.7499 7.72945 16.5899 5.65032C17.5421 3.3025 19.4125 2.27467 21.9064 2.62163C22.8721 2.77076 23.8582 2.71645 24.8016 2.46218C25.745 2.20792 26.6248 1.7593 27.3847 1.1451C29.4325 -0.420113 31.5847 -0.420113 33.6273 1.1451C34.4083 1.76733 35.3105 2.21979 36.2762 2.47358C37.242 2.72737 38.25 2.7769 39.236 2.61902C41.6177 2.30597 43.436 3.28423 44.3595 5.53815C45.2204 7.64076 46.6786 9.01293 48.7499 9.88945C50.8212 10.766 51.8804 12.4251 51.596 14.666C51.4376 15.7826 51.5071 16.9198 51.8003 18.0089C52.0935 19.098 52.6044 20.1163 53.3021 21.0025C54.6299 22.7712 54.5804 24.6912 53.2604 26.4442C51.8777 28.2703 51.296 30.2321 51.596 32.5329C51.9143 34.9486 50.7351 36.5921 48.5777 37.6277C47.3777 38.2042 46.0969 38.6712 45.356 39.9468C44.9673 40.6173 44.8604 41.1651 45.2934 41.8564C45.8464 42.7381 46.303 43.6825 46.7934 44.6008C47.0934 45.1616 47.1534 45.7329 46.4934 46.046C45.896 46.3303 45.523 45.9208 45.249 45.4251C45.1656 45.2738 45.0873 45.1173 44.9882 44.966C44.6412 44.366 44.4273 43.5103 43.9056 43.2364C43.3056 42.9234 42.9899 43.9225 42.4447 44.2173C41.1404 44.9268 39.7525 44.8225 38.3673 44.739C37.1334 44.666 35.9334 44.6764 34.856 45.4147C34.4673 45.6755 34.1569 45.8842 34.4621 46.4373C36.5699 50.2408 38.6438 54.0521 40.8299 58.0564Z"
                      fill="#FA8B02"
                    />
                    <path
                      d="M30.6743 5.5015C35.4483 5.56868 40.0048 7.50902 43.3615 10.9043C46.7182 14.2996 48.6064 18.8779 48.6191 23.6523C48.6317 28.4267 46.7678 33.015 43.4292 36.428C40.0905 39.841 35.5444 41.8055 30.7709 41.898C17.4665 42.1302 8.33608 28.0041 14.023 15.9937C14.1717 15.678 14.3283 15.3676 14.503 15.0676C14.8474 14.4728 15.1683 13.6537 16.0474 14.1624C16.8456 14.6241 16.3448 15.2893 16.0474 15.8632C13.7517 20.3658 13.4074 24.9937 15.2439 29.7232C17.8526 36.4798 24.8961 40.7763 32.1404 40.0485C39.3848 39.3206 45.4448 33.7093 46.6735 26.5902C47.9074 19.4293 44.55 12.5998 38.0648 9.11193C32.1013 5.8902 24.4239 6.94933 19.2822 11.6945C19.0672 11.9097 18.838 12.1102 18.5961 12.2945C18.4284 12.4176 18.2212 12.4744 18.0142 12.4543C17.8072 12.4341 17.6149 12.3383 17.4741 12.1852C17.3333 12.0322 17.2539 11.8325 17.251 11.6246C17.2482 11.4166 17.3221 11.2149 17.4587 11.058C17.9641 10.5203 18.5054 10.0175 19.0787 9.5528C22.47 6.80324 26.3439 5.49367 30.6743 5.5015Z"
                      fill="#FA8B02"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_201_7012">
                      <rect width="60" height="60" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="font-open-sans text-xl font-semibold text-black">
                Over 30 Years Of Experience
              </h3>
            </Card>

            {/* Expert Guides */}
            <Card className="bg-white bg-opacity-30 backdrop-blur-sm border-none p-8 text-center rounded-3xl">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <g clipPath="url(#clip0_201_7020)">
                    <path
                      d="M17.962 32.1498C18.6692 30.5217 18.5205 29.7729 17.2808 28.6354C15.7395 27.2688 14.6318 25.4812 14.0944 23.4929C13.9356 22.7408 13.4948 22.078 12.8626 21.6405C10.5556 19.9968 10.0414 17.1503 11.5238 14.7109C11.7613 14.3169 11.9152 13.9908 11.7847 13.5133C10.5712 9.1927 13.0139 4.16766 18.236 2.10651C21.2513 0.937974 24.4983 0.491216 27.7172 0.801982C29.6405 0.968961 31.2325 1.7282 31.9867 3.71108C32.3395 4.55796 32.9576 5.26751 33.7483 5.73309C36.8643 7.77077 37.4384 9.47709 36.3136 13.0384C36.1858 13.4429 36.037 13.7638 36.3737 14.2282C38.2005 16.7485 37.6655 20.0333 35.1105 21.8675C34.6861 22.1603 34.3821 22.5968 34.2546 23.0964C33.6118 25.418 32.2851 27.4926 30.447 29.0502C29.664 29.726 29.6066 32.0585 30.3034 32.789C30.6557 33.1569 30.8932 32.8333 31.0394 32.6324C32.493 30.647 34.5103 30.9131 36.4885 31.3279C41.9689 32.5124 45.8574 35.612 47.5303 41.0727C49.2162 46.5805 49.3571 52.2917 49.4015 57.9898C49.4015 59.1639 48.689 59.2944 47.7573 59.2944C39.0165 59.2805 30.2747 59.2805 21.5321 59.2944C14.966 59.2944 8.39904 59.2944 1.83121 59.2944C0.114002 59.2944 -0.0138747 59.1691 0.00439343 57.4159C0.0487589 52.5343 0.309732 47.6763 1.35624 42.8939C2.87249 35.9538 8.14155 31.414 14.9269 31.0905C16.2526 31.0279 16.2526 31.0279 17.962 32.1498Z"
                      fill="#FA8B02"
                      stroke="#FA8B02"
                      strokeWidth="0.2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_201_7020">
                      <rect width="60" height="60" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="font-open-sans text-xl font-semibold text-black">
                Expert Guides For You
              </h3>
            </Card>

            {/* Best Price */}
            <Card className="bg-white bg-opacity-30 backdrop-blur-sm border-none p-8 text-center rounded-3xl">
              <div className="w-16 h-16 mx-auto mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/22158c16eff4b931e694af9c5ee039268684bd53?width=120"
                  alt="Best price icon"
                  className="w-full h-full"
                />
              </div>
              <h3 className="font-open-sans text-xl font-semibold text-black">
                Guaranteed fun at the best price!
              </h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-16">
            <h2 className="font-open-sans text-4xl font-bold text-gray-800">
              Happy Customers Says
            </h2>

            {/* Navigation Arrows */}
            <div className="flex gap-5">
              <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Review 1 */}
            <Card className="p-8 border border-gray-200 rounded-3xl bg-white">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-open-sans text-lg text-gray-800">
                  Lyod Gomez
                </h3>
              </div>

              <div className="relative">
                {/* Quote marks */}
                <div className="absolute -top-4 left-0 text-orange-500 opacity-10">
                  <svg width="40" height="28" viewBox="0 0 41 28" fill="none">
                    <g opacity="0.1">
                      <path
                        d="M40.749 9.99306C40.61 18.5258 35.9306 25.1322 28.2008 27.6904C28.0155 27.7474 27.8487 27.8045 27.6708 27.8543C26.5885 28.1637 25.7212 27.9077 25.2115 27.1323C24.7019 26.3569 24.7853 25.4471 25.5192 24.6036C26.9023 23.0318 28.0747 21.2885 29.0069 19.4172C29.5258 18.3675 29.5314 18.3693 28.451 18.0378C24.5481 16.837 21.9332 13.1056 22.0481 8.90091C22.1574 4.88959 25.0892 1.28899 29.0551 0.288921C31.0146 -0.216649 33.0871 -0.0656319 34.9514 0.718556C36.8157 1.50274 38.3676 2.87629 39.3665 4.62622C40.3227 6.25169 40.8017 8.11089 40.749 9.99306Z"
                        fill="#FA8B02"
                      />
                      <path
                        d="M19.4593 10.0316C19.3333 18.6418 14.4723 25.3715 6.63127 27.7897C6.06418 27.9739 5.50636 28.1047 4.91333 27.8929C3.56418 27.4103 3.19724 25.8227 4.21096 24.6495C5.66321 22.979 6.89676 21.1324 7.8822 19.1538C8.18798 18.5368 8.12867 18.2974 7.40406 18.0874C5.42854 17.5191 3.70088 16.3108 2.49573 14.6546C1.29058 12.9984 0.677107 10.9894 0.75284 8.94686C0.901098 4.7882 3.94409 1.13419 8.00451 0.237257C10.0069 -0.228495 12.1085 -0.0143282 13.9741 0.845587C15.8397 1.7055 17.3617 3.16161 18.2973 4.98158C19.1387 6.58758 19.4871 8.10334 19.4593 10.0316Z"
                        fill="#FA8B02"
                      />
                    </g>
                  </svg>
                </div>

                <p className="font-open-sans text-lg text-gray-800 leading-8 mb-4">
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure
                </p>

                <div className="absolute -bottom-4 right-0 text-orange-500 opacity-10">
                  <svg width="40" height="28" viewBox="0 0 41 28" fill="none">
                    <g opacity="0.1" transform="rotate(180 20.5 14)">
                      <path
                        d="M40.749 9.99306C40.61 18.5258 35.9306 25.1322 28.2008 27.6904C28.0155 27.7474 27.8487 27.8045 27.6708 27.8543C26.5885 28.1637 25.7212 27.9077 25.2115 27.1323C24.7019 26.3569 24.7853 25.4471 25.5192 24.6036C26.9023 23.0318 28.0747 21.2885 29.0069 19.4172C29.5258 18.3675 29.5314 18.3693 28.451 18.0378C24.5481 16.837 21.9332 13.1056 22.0481 8.90091C22.1574 4.88959 25.0892 1.28899 29.0551 0.288921C31.0146 -0.216649 33.0871 -0.0656319 34.9514 0.718556C36.8157 1.50274 38.3676 2.87629 39.3665 4.62622C40.3227 6.25169 40.8017 8.11089 40.749 9.99306Z"
                        fill="#FA8B02"
                      />
                      <path
                        d="M19.4593 10.0316C19.3333 18.6418 14.4723 25.3715 6.63127 27.7897C6.06418 27.9739 5.50636 28.1047 4.91333 27.8929C3.56418 27.4103 3.19724 25.8227 4.21096 24.6495C5.66321 22.979 6.89676 21.1324 7.8822 19.1538C8.18798 18.5368 8.12867 18.2974 7.40406 18.0874C5.42854 17.5191 3.70088 16.3108 2.49573 14.6546C1.29058 12.9984 0.677107 10.9894 0.75284 8.94686C0.901098 4.7882 3.94409 1.13419 8.00451 0.237257C10.0069 -0.228495 12.1085 -0.0143282 13.9741 0.845587C15.8397 1.7055 17.3617 3.16161 18.2973 4.98158C19.1387 6.58758 19.4871 8.10334 19.4593 10.0316Z"
                        fill="#FA8B02"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </Card>

            {/* Review 2 */}
            <Card className="p-8 border border-gray-200 rounded-3xl bg-white">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-open-sans text-lg text-gray-800">
                  Lyod Gomez
                </h3>
              </div>

              <div className="relative">
                {/* Quote marks */}
                <div className="absolute -top-4 left-0 text-orange-500 opacity-10">
                  <svg width="40" height="28" viewBox="0 0 41 28" fill="none">
                    <g opacity="0.1">
                      <path
                        d="M40.749 9.99306C40.61 18.5258 35.9306 25.1322 28.2008 27.6904C28.0155 27.7474 27.8487 27.8045 27.6708 27.8543C26.5885 28.1637 25.7212 27.9077 25.2115 27.1323C24.7019 26.3569 24.7853 25.4471 25.5192 24.6036C26.9023 23.0318 28.0747 21.2885 29.0069 19.4172C29.5258 18.3675 29.5314 18.3693 28.451 18.0378C24.5481 16.837 21.9332 13.1056 22.0481 8.90091C22.1574 4.88959 25.0892 1.28899 29.0551 0.288921C31.0146 -0.216649 33.0871 -0.0656319 34.9514 0.718556C36.8157 1.50274 38.3676 2.87629 39.3665 4.62622C40.3227 6.25169 40.8017 8.11089 40.749 9.99306Z"
                        fill="#FA8B02"
                      />
                      <path
                        d="M19.4593 10.0316C19.3333 18.6418 14.4723 25.3715 6.63127 27.7897C6.06418 27.9739 5.50636 28.1047 4.91333 27.8929C3.56418 27.4103 3.19724 25.8227 4.21096 24.6495C5.66321 22.979 6.89676 21.1324 7.8822 19.1538C8.18798 18.5368 8.12867 18.2974 7.40406 18.0874C5.42854 17.5191 3.70088 16.3108 2.49573 14.6546C1.29058 12.9984 0.677107 10.9894 0.75284 8.94686C0.901098 4.7882 3.94409 1.13419 8.00451 0.237257C10.0069 -0.228495 12.1085 -0.0143282 13.9741 0.845587C15.8397 1.7055 17.3617 3.16161 18.2973 4.98158C19.1387 6.58758 19.4871 8.10334 19.4593 10.0316Z"
                        fill="#FA8B02"
                      />
                    </g>
                  </svg>
                </div>

                <p className="font-open-sans text-lg text-gray-800 leading-8 mb-4">
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure
                </p>

                <div className="absolute -bottom-4 right-0 text-orange-500 opacity-10">
                  <svg width="40" height="28" viewBox="0 0 41 28" fill="none">
                    <g opacity="0.1" transform="rotate(180 20.5 14)">
                      <path
                        d="M40.749 9.99306C40.61 18.5258 35.9306 25.1322 28.2008 27.6904C28.0155 27.7474 27.8487 27.8045 27.6708 27.8543C26.5885 28.1637 25.7212 27.9077 25.2115 27.1323C24.7019 26.3569 24.7853 25.4471 25.5192 24.6036C26.9023 23.0318 28.0747 21.2885 29.0069 19.4172C29.5258 18.3675 29.5314 18.3693 28.451 18.0378C24.5481 16.837 21.9332 13.1056 22.0481 8.90091C22.1574 4.88959 25.0892 1.28899 29.0551 0.288921C31.0146 -0.216649 33.0871 -0.0656319 34.9514 0.718556C36.8157 1.50274 38.3676 2.87629 39.3665 4.62622C40.3227 6.25169 40.8017 8.11089 40.749 9.99306Z"
                        fill="#FA8B02"
                      />
                      <path
                        d="M19.4593 10.0316C19.3333 18.6418 14.4723 25.3715 6.63127 27.7897C6.06418 27.9739 5.50636 28.1047 4.91333 27.8929C3.56418 27.4103 3.19724 25.8227 4.21096 24.6495C5.66321 22.979 6.89676 21.1324 7.8822 19.1538C8.18798 18.5368 8.12867 18.2974 7.40406 18.0874C5.42854 17.5191 3.70088 16.3108 2.49573 14.6546C1.29058 12.9984 0.677107 10.9894 0.75284 8.94686C0.901098 4.7882 3.94409 1.13419 8.00451 0.237257C10.0069 -0.228495 12.1085 -0.0143282 13.9741 0.845587C15.8397 1.7055 17.3617 3.16161 18.2973 4.98158C19.1387 6.58758 19.4871 8.10334 19.4593 10.0316Z"
                        fill="#FA8B02"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 lg:px-20">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/34a7692eeaa81f9a42225dbe9ca7077bc3bd83d8?width=266"
              alt="Tuscany Logo"
              className="w-32 h-32"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-white border-opacity-10 mb-8"></div>

          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* Services */}
            <div>
              <h4 className="font-open-sans text-xl font-bold mb-5">
                Services
              </h4>
              <ul className="space-y-2 text-lg">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Bike and Rickshaw rental
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Guided Tours of Lucca
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Guided Bike Tour of Lucca
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Trip In The Tuscan Hills
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Transportation With Luxury Cars
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Wine Tours By Bus With Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* Home */}
            <div>
              <h4 className="font-open-sans text-xl font-bold mb-5">Home</h4>
              <ul className="space-y-2 text-lg">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Tour Packages
                  </a>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-open-sans text-xl font-bold mb-5">Help</h4>
              <ul className="space-y-2 text-lg">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-open-sans text-xl font-bold mb-5">
                Contacts
              </h4>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 25 24" fill="none">
                    <path
                      d="M12.3532 23C10.8098 21.6835 9.37913 20.2402 8.07626 18.6852C6.12109 16.35 3.79932 12.8722 3.79932 9.55818C3.79847 7.86568 4.29973 6.21097 5.23966 4.80347C6.17959 3.39596 7.51595 2.29893 9.07959 1.6512C10.6432 1.00348 12.3639 0.834177 14.0238 1.16473C15.6837 1.49527 17.2082 2.31081 18.4045 3.50813C19.2009 4.30103 19.8322 5.24401 20.2617 6.28249C20.6913 7.32098 20.9107 8.43435 20.9071 9.55818C20.9071 12.8722 18.5853 16.35 16.6301 18.6852C15.3273 20.2402 13.8966 21.6835 12.3532 23ZM12.3532 5.89222C11.3809 5.89222 10.4485 6.27846 9.76099 6.96596C9.07349 7.65346 8.68725 8.58591 8.68725 9.55818C8.68725 10.5304 9.07349 11.4629 9.76099 12.1504C10.4485 12.8379 11.3809 13.2241 12.3532 13.2241C13.3255 13.2241 14.2579 12.8379 14.9454 12.1504C15.6329 11.4629 16.0192 10.5304 16.0192 9.55818C16.0192 8.58591 15.6329 7.65346 14.9454 6.96596C14.2579 6.27846 13.3255 5.89222 12.3532 5.89222Z"
                      fill="#FA8B02"
                    />
                  </svg>
                  <span className="text-lg">
                    Piazza Napoleone, Lucca, Tuscany
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 25 24" fill="none">
                    <path
                      d="M10.9997 13.7598C12.3913 15.1716 14.0752 16.2616 15.933 16.9532L18.4464 14.9532C18.5209 14.9018 18.6092 14.8744 18.6997 14.8744C18.7902 14.8744 18.8785 14.9018 18.953 14.9532L23.6197 17.9598C23.7969 18.0663 23.9468 18.2126 24.0578 18.387C24.1687 18.5615 24.2376 18.7593 24.2589 18.9649C24.2802 19.1705 24.2535 19.3783 24.1807 19.5718C24.108 19.7653 23.9912 19.9392 23.8397 20.0798L21.653 22.2398C21.3399 22.5492 20.955 22.7763 20.5327 22.9008C20.1105 23.0253 19.6639 23.0433 19.233 22.9532C14.9345 22.0654 10.9724 19.9862 7.79969 16.9532C4.69735 13.89 2.55054 9.99239 1.61969 5.73316C1.52773 5.30892 1.54693 4.86812 1.67541 4.45348C1.80389 4.03883 2.0373 3.66441 2.35302 3.36649L4.61969 1.17983C4.75996 1.03568 4.93101 0.925143 5.12006 0.856478C5.3091 0.787813 5.51122 0.762805 5.7113 0.783325C5.91137 0.803846 6.10421 0.869364 6.27538 0.974973C6.44655 1.08058 6.59161 1.22355 6.69969 1.39316L9.80636 5.99983C9.85994 6.07216 9.88887 6.1598 9.88887 6.24983C9.88887 6.33985 9.85994 6.42749 9.80636 6.49983L7.75969 8.95983C8.47008 10.7805 9.57685 12.4201 10.9997 13.7598Z"
                      fill="#FA8B02"
                    />
                  </svg>
                  <span className="text-lg">+39 346 368 5708</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 25 24" fill="none">
                    <path
                      d="M5.51969 2.83301C4.54723 2.83301 3.6146 3.21932 2.92697 3.90695C2.23934 4.59458 1.85303 5.52721 1.85303 6.49967V6.86818L12.853 12.7917L23.853 6.87001V6.49967C23.853 5.52721 23.4667 4.59458 22.7791 3.90695C22.0915 3.21932 21.1588 2.83301 20.1864 2.83301H5.51969ZM23.853 8.95084L13.2875 14.6397C13.154 14.7116 13.0047 14.7492 12.853 14.7492C12.7014 14.7492 12.5521 14.7116 12.4185 14.6397L1.85303 8.95084V17.4997C1.85303 18.4721 2.23934 19.4048 2.92697 20.0924C3.6146 20.78 4.54723 21.1663 5.51969 21.1663H20.1864C21.1588 21.1663 22.0915 20.78 22.7791 20.0924C23.4667 19.4048 23.853 18.4721 23.853 17.4997V8.95084Z"
                      fill="#FA8B02"
                    />
                  </svg>
                  <span className="text-lg">italiainlimo@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-open-sans text-xl font-bold mb-5">
                Social Media
              </h4>
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white border-opacity-10 mb-8"></div>

          {/* Copyright */}
          <div className="text-center text-white font-open-sans">
            Copyright © 2022. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
