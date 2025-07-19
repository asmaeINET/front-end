import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Lyod Gomez",
      text: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face",
    },
    {
      name: "Lyod Gomez",
      text: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-16 xl:px-60 max-w-[1920px]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-gray-800 font-open-sans">
            Happy Customers Says
          </h2>
          <div className="flex items-center gap-5">
            <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center opacity-60">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-3xl p-8 flex flex-col items-center"
            >
              {/* Avatar and Name */}
              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-normal text-gray-800 font-open-sans">
                  {testimonial.name}
                </h4>
              </div>

              {/* Testimonial Content */}
              <div className="relative">
                {/* Quote marks */}
                <div className="absolute -top-4 -left-4 w-10 h-7 opacity-10">
                  <svg
                    viewBox="0 0 40 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M39.9965 9.99355C39.8575 18.5263 35.1781 25.1327 27.4483 27.6908C27.263 27.7479 27.0962 27.805 26.9183 27.8548C25.836 28.1642 24.9687 27.9082 24.4591 27.1328C23.9494 26.3574 24.0328 25.4476 24.7667 24.6041C26.1499 23.0323 27.3222 21.289 28.2545 19.4177C28.7734 18.3679 28.779 18.3698 27.6985 18.0383C23.7956 16.8375 21.1807 13.1061 21.2956 8.90139C21.405 4.89008 24.3368 1.28948 28.3027 0.28941C30.2621 -0.216161 32.3347 -0.0651436 34.199 0.719045C36.0633 1.50323 37.6152 2.87678 38.614 4.62671C39.5703 6.25218 40.0492 8.11138 39.9965 9.99355Z"
                      fill="#FA8B02"
                    />
                    <path
                      d="M18.7069 10.0321C18.5808 18.6423 13.7198 25.372 5.87883 27.7902C5.31174 27.9744 4.75392 28.1051 4.16089 27.8933C2.81174 27.4108 2.4448 25.8232 3.45852 24.65C4.91076 22.9795 6.14432 21.1328 7.12975 19.1543C7.43554 18.5373 7.37623 18.2979 6.65162 18.0879C4.6761 17.5196 2.94844 16.3113 1.74329 14.6551C0.538138 12.9989 -0.0753343 10.9898 0.000398229 8.94734C0.148656 4.78869 3.19165 1.13467 7.25207 0.237746C9.25443 -0.228007 11.3561 -0.0138399 13.2217 0.846075C15.0872 1.70599 16.6093 3.1621 17.5449 4.98207C18.3862 6.58807 18.7346 8.10383 18.7069 10.0321Z"
                      fill="#FA8B02"
                    />
                  </svg>
                </div>

                <div className="absolute -bottom-4 -right-4 w-10 h-7 opacity-10">
                  <svg
                    viewBox="0 0 40 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M39.9965 9.99355C39.8575 18.5263 35.1781 25.1327 27.4483 27.6908C27.263 27.7479 27.0962 27.805 26.9183 27.8548C25.836 28.1642 24.9687 27.9082 24.4591 27.1328C23.9494 26.3574 24.0328 25.4476 24.7667 24.6041C26.1499 23.0323 27.3222 21.289 28.2545 19.4177C28.7734 18.3679 28.779 18.3698 27.6985 18.0383C23.7956 16.8375 21.1807 13.1061 21.2956 8.90139C21.405 4.89008 24.3368 1.28948 28.3027 0.28941C30.2621 -0.216161 32.3347 -0.0651436 34.199 0.719045C36.0633 1.50323 37.6152 2.87678 38.614 4.62671C39.5703 6.25218 40.0492 8.11138 39.9965 9.99355Z"
                      fill="#FA8B02"
                    />
                    <path
                      d="M18.7069 10.0321C18.5808 18.6423 13.7198 25.372 5.87883 27.7902C5.31174 27.9744 4.75392 28.1051 4.16089 27.8933C2.81174 27.4108 2.4448 25.8232 3.45852 24.65C4.91076 22.9795 6.14432 21.1328 7.12975 19.1543C7.43554 18.5373 7.37623 18.2979 6.65162 18.0879C4.6761 17.5196 2.94844 16.3113 1.74329 14.6551C0.538138 12.9989 -0.0753343 10.9898 0.000398229 8.94734C0.148656 4.78869 3.19165 1.13467 7.25207 0.237746C9.25443 -0.228007 11.3561 -0.0138399 13.2217 0.846075C15.0872 1.70599 16.6093 3.1621 17.5449 4.98207C18.3862 6.58807 18.7346 8.10383 18.7069 10.0321Z"
                      fill="#FA8B02"
                    />
                  </svg>
                </div>

                <p className="text-lg font-normal text-gray-800 leading-8 text-center px-5 font-open-sans">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
