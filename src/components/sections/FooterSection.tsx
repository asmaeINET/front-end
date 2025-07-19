import { MapPin, Phone, Mail } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f894bde0a5e8dfba3915fa1c2f6ca8470110316?width=266"
            alt="Tuscany Logo"
            className="w-32 h-32"
          />
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-white opacity-10 mb-8"></div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
          {/* Services */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xl font-bold leading-7">Services</h4>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                Bike and Rickshaw rental
              </a>
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                Guided Tours of Lucca
              </a>
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                Guided Bike Tour of Lucca
              </a>
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                Trip In The Tuscan Hills
              </a>
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                Transportation With Luxury Cars
              </a>
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                Wine Tours By Bus With Guide
              </a>
            </div>
          </div>

          {/* Home */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xl font-bold leading-7">Home</h4>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                Tour Packages
              </a>
            </div>
          </div>

          {/* Help */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xl font-bold leading-7">Help</h4>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                Terms of Use
              </a>
              <a
                href="#"
                className="text-lg font-semibold leading-7 hover:text-orange-500 transition-colors"
              >
                Provicy Policy
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xl font-bold leading-7">Contacts</h4>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <span className="text-lg font-semibold leading-7 break-words">
                  Piazza Napoleone, Lucca, Tuscany
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-lg font-semibold leading-7">
                  +39 346 368 5708
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <span className="text-lg font-semibold leading-7 break-words">
                  italiainlimo@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-start sm:items-center lg:items-center gap-5 sm:col-span-2 lg:col-span-1">
            <h4 className="text-xl font-bold leading-7">Social Media</h4>
            <div className="flex gap-5">
              {/* Twitter */}
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </div>

              {/* Facebook */}
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>

              {/* Instagram */}
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-6 mb-8">
          <h4 className="font-bold text-blue-200 mb-4 text-center">
            🔑 Identifiants de démonstration
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="text-center">
              <span className="font-semibold text-blue-300 block mb-2">
                👤 Utilisateur normal
              </span>
              <div className="text-blue-100">
                <div>📧 user@tuscany.com</div>
                <div>🔐 user123</div>
              </div>
            </div>
            <div className="text-center">
              <span className="font-semibold text-blue-300 block mb-2">
                ⚙️ Administrateur
              </span>
              <div className="text-blue-100">
                <div>📧 admin@tuscany.com</div>
                <div>🔐 admin123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Separator */}
        <div className="w-full h-px bg-white opacity-10 mb-8"></div>

        {/* Copyright */}
        <div className="text-center font-normal leading-7">
          Copyright © 2022. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
