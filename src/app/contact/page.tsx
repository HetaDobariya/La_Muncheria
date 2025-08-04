import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 p-8 md:p-16">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Contact Us</h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Phone</h2>
            <p>+91 98253 57226</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Working Hours</h2>
            <p>Monday - Friday: 9:00 AM to 6:00 PM</p>
            <p>Saturday: 9:00 AM to 10:00 PM</p>
            <p>Sunday: Closed</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p>support@lamuncheria.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Address</h2>
            <p>LA MUNCHERIA, Opp. ABC Complex, Main Street, Surat, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
