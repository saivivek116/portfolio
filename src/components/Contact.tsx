'use client';
import React, { useState } from 'react';
import { sendEmail } from '../actions/sendEmail';
import AppointmentButton from './Appointment';

//todo: inspire from gokul
const Contact = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const handleSubmit = async (event: React.FormEvent) => {

  //   event.preventDefault();

  //   const data = {
  //     name,
  //     email,
  //     message,
  //   };

  //   try {
  //     const response = await fetch('https://script.google.com/macros/s/AKfycbxLFeHGty8h9nKQ2xhEEBU_HZgEwmZJVl76X7FQWilCStAkYev_Rm-9iyrV7vv4MPA2/exec', { // Replace with your Apps Script URL
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       if (result.success) {
  //         alert('submitted successfully');
  //         setUsername('');
  //         setEmail('');
  //         setMessage('');
  //       } else {
  //         // alert(result.error);
  //       }
  //     } else {
  //       alert('Failed to send message.');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     // alert('An error occurred. Please try again later.');
  //   }
  // }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { error } = await sendEmail({ name, email, message });
      if (error) {
        throw new Error(error);
      }
      alert('Email sent successfully');
    } catch (e) {
      alert('Failed to send email');
      console.log(e);
    } finally {
      // console.log(name, email, message);
      setLoading(false);
      setUsername('');
      setEmail('');
      setMessage('');
    }

  }
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => { setUsername(e.target.value) }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  maxLength={500}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value) }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
              >
                Send Message
              </button>
            </form>
            <div className="flex flex-col items-center">
              <span className="mx-4 text-gray-500">or</span>
              <AppointmentButton />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;