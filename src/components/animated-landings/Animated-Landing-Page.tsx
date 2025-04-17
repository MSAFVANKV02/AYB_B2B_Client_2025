// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Calendar, Clock, User, Scissors, ShoppingBag, Menu, X } from 'lucide-react';

// const SaloonLandingPage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeTime, setActiveTime] = useState(null);

//   // Example salon data
//   const stylists = [
//     { id: 1, name: 'Alex', specialty: 'Hair Styling', image: '/api/placeholder/200/200', rating: 4.8 },
//     { id: 2, name: 'Jordan', specialty: 'Color Specialist', image: '/api/placeholder/200/200', rating: 4.9 },
//     { id: 3, name: 'Taylor', specialty: 'Barber', image: '/api/placeholder/200/200', rating: 4.7 },
//   ];

//   const timeSlots = [
//     '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', 
//     '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.1,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { type: 'spring', stiffness: 100 }
//     }
//   };

//   const headerVariants = {
//     hidden: { y: -50, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { type: 'spring', stiffness: 100, delay: 0.2 }
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <motion.header 
//         className="bg-white shadow-md z-10"
//         initial="hidden"
//         animate="visible"
//         variants={headerVariants}
//       >
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <Scissors className="text-purple-600" size={24} />
//             <h1 className="text-xl font-bold text-purple-800">StyleSalon</h1>
//           </div>
          
//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button 
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
          
//           {/* Desktop navigation */}
//           <nav className="hidden md:flex space-x-8">
//             <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Services</a>
//             <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Stylists</a>
//             <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Shop</a>
//             <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Gallery</a>
//             <a href="#" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Book Now</a>
//           </nav>
//         </div>
        
//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <motion.div 
//             className="md:hidden bg-white"
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//           >
//             <div className="px-4 py-2 space-y-2">
//               <a href="#" className="block py-2 text-gray-700 hover:text-purple-600">Services</a>
//               <a href="#" className="block py-2 text-gray-700 hover:text-purple-600">Stylists</a>
//               <a href="#" className="block py-2 text-gray-700 hover:text-purple-600">Shop</a>
//               <a href="#" className="block py-2 text-gray-700 hover:text-purple-600">Gallery</a>
//               <a href="#" className="block py-2 bg-purple-600 text-white px-4 rounded-md hover:bg-purple-700 text-center">Book Now</a>
//             </div>
//           </motion.div>
//         )}
//       </motion.header>

//       {/* Hero Section */}
//       <motion.section
//         className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white pt-16 pb-24 md:pt-24 md:pb-32"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 mb-8 md:mb-0">
//             <motion.h2 
//               className="text-4xl md:text-5xl font-bold mb-4"
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//             >
//               Book Your Style Transformation
//             </motion.h2>
//             <motion.p 
//               className="text-xl mb-6 text-purple-100"
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.5, duration: 0.8 }}
//             >
//               Experience premium salon services with our expert stylists.
//             </motion.p>
//             <motion.button 
//               className="bg-white text-purple-700 px-6 py-3 rounded-md font-medium text-lg hover:bg-purple-100 transition-colors"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.7, duration: 0.5 }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Book Appointment
//             </motion.button>
//           </div>
//           <div className="md:w-1/2 relative">
//             <motion.img 
//               src="/api/placeholder/600/400" 
//               alt="Salon interior" 
//               className="rounded-lg shadow-xl"
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.6, duration: 0.8 }}
//             />
//             <motion.div 
//               className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg"
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 1, duration: 0.5, type: "spring" }}
//             >
//               <div className="flex items-center gap-2">
//                 <div className="bg-green-100 p-2 rounded-full">
//                   <Clock className="text-green-600" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-gray-800 font-medium">Open Today</p>
//                   <p className="text-gray-600 text-sm">9:00 AM - 7:00 PM</p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Booking Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <motion.div 
//             className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//           >
//             <div className="p-6 md:p-8">
//               <h3 className="text-2xl font-bold text-gray-800 mb-6">Book Your Appointment</h3>
              
//               <div className="grid md:grid-cols-3 gap-6 mb-8">
//                 <div className="space-y-2">
//                   <label className="block text-gray-700 font-medium">Select Service</label>
//                   <select className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
//                     <option>Haircut</option>
//                     <option>Hair Coloring</option>
//                     <option>Styling</option>
//                     <option>Treatment</option>
//                   </select>
//                 </div>
                
//                 <div className="space-y-2">
//                   <label className="block text-gray-700 font-medium">Select Stylist</label>
//                   <select className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
//                     {stylists.map(stylist => (
//                       <option key={stylist.id}>{stylist.name}</option>
//                     ))}
//                   </select>
//                 </div>
                
//                 <div className="space-y-2">
//                   <label className="block text-gray-700 font-medium">Select Date</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Calendar className="text-gray-400" size={20} />
//                     </div>
//                     <input
//                       type="date"
//                       className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mb-8">
//                 <h4 className="text-lg font-medium text-gray-800 mb-4">Available Time Slots</h4>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   {timeSlots.map((time, index) => (
//                     <motion.button
//                       key={time}
//                       className={`py-2 px-4 rounded-md border ${
//                         activeTime === time 
//                           ? 'bg-purple-600 text-white border-purple-600' 
//                           : 'border-gray-300 hover:border-purple-400'
//                       }`}
//                       onClick={() => setActiveTime(time)}
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.5 + (index * 0.05) }}
//                     >
//                       {time}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
              
//               <motion.button 
//                 className="w-full bg-purple-600 text-white py-3 rounded-md font-medium text-lg hover:bg-purple-700 transition-colors"
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.99 }}
//               >
//                 Confirm Booking
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Stylists Section */}
//       <motion.section 
//         className="py-16 bg-gray-50"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//       >
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <motion.h2 
//               className="text-3xl font-bold text-gray-800"
//               variants={itemVariants}
//             >
//               Meet Our Expert Stylists
//             </motion.h2>
//             <motion.p 
//               className="text-gray-600 mt-2"
//               variants={itemVariants}
//             >
//               Experienced professionals dedicated to your style
//             </motion.p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             {stylists.map((stylist, index) => (
//               <motion.div 
//                 key={stylist.id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
//                 variants={itemVariants}
//               >
//                 <img 
//                   src={stylist.image} 
//                   alt={stylist.name} 
//                   className="w-full h-64 object-cover object-center"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-800">{stylist.name}</h3>
//                   <p className="text-purple-600 font-medium">{stylist.specialty}</p>
//                   <div className="flex items-center mt-2">
//                     <div className="text-yellow-500 flex">
//                       {'★'.repeat(Math.floor(stylist.rating))}
//                       {stylist.rating % 1 !== 0 && '☆'}
//                       {'☆'.repeat(5 - Math.ceil(stylist.rating))}
//                     </div>
//                     <span className="ml-2 text-gray-600">{stylist.rating}</span>
//                   </div>
//                   <button className="mt-4 w-full py-2 px-4 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 font-medium">
//                     Book with {stylist.name}
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Shop Section */}
//       <motion.section 
//         className="py-16 bg-white"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//       >
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <motion.h2 
//               className="text-3xl font-bold text-gray-800"
//               variants={itemVariants}
//             >
//               Shop Premium Products
//             </motion.h2>
//             <motion.p 
//               className="text-gray-600 mt-2"
//               variants={itemVariants}
//             >
//               Professional hair care products used by our stylists
//             </motion.p>
//           </div>
          
//           <motion.div 
//             className="grid grid-cols-2 md:grid-cols-4 gap-6"
//             variants={containerVariants}
//           >
//             {[1, 2, 3, 4].map(item => (
//               <motion.div 
//                 key={item}
//                 className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
//                 variants={itemVariants}
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="aspect-square bg-gray-100 rounded-md mb-4 relative">
//                   <img src="/api/placeholder/200/200" alt="Product" className="w-full h-full object-cover rounded-md" />
//                   <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                     -15%
//                   </div>
//                 </div>
//                 <h4 className="font-medium text-gray-800">Premium Styling Serum</h4>
//                 <div className="flex justify-between items-center mt-2">
//                   <div>
//                     <span className="text-gray-400 line-through text-sm">$28.99</span>
//                     <span className="text-purple-700 font-bold ml-2">$24.99</span>
//                   </div>
//                   <button className="p-2 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200">
//                     <ShoppingBag size={18} />
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
          
//           <motion.div 
//             className="text-center mt-10"
//             variants={itemVariants}
//           >
//             <button className="px-6 py-3 bg-purple-100 text-purple-700 rounded-md font-medium hover:bg-purple-200 transition-colors">
//               View All Products
//             </button>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Testimonials */}
//       <motion.section 
//         className="py-16 bg-gray-50"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-800">What Our Clients Say</h2>
//             <p className="text-gray-600 mt-2">Real feedback from satisfied customers</p>
//           </div>
          
//           <div className="max-w-5xl mx-auto">
//             <motion.div 
//               className="bg-white p-8 rounded-xl shadow-md"
//               initial={{ y: 30, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-xl">
//                   J
//                 </div>
//                 <div className="ml-4">
//                   <h4 className="font-bold text-gray-800">Jamie T.</h4>
//                   <div className="text-yellow-500">★★★★★</div>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">
//                 "The online booking system made scheduling my appointment so easy! I could see all available times and choose the stylist I wanted. My haircut was exactly what I hoped for, and I've already booked my next appointment!"
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <Scissors className="text-purple-400" size={24} />
//                 <h3 className="text-xl font-bold">StyleSalon</h3>
//               </div>
//               <p className="text-gray-400 mb-4">Premium hair styling and beauty services for everyone.</p>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-300 hover:text-white">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-gray-300 hover:text-white">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-bold text-lg mb-4">Quick Links</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Book Appointment</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Our Stylists</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Shop Products</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold text-lg mb-4">Hours</h4>
//               <ul className="space-y-2">
//                 <li className="text-gray-400">Monday - Friday: 9AM - 7PM</li>
//                 <li className="text-gray-400">Saturday: 10AM - 6PM</li>
//                 <li className="text-gray-400">Sunday: 11AM - 5PM</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold text-lg mb-4">Contact Us</h4>
//               <address className="not-italic text-gray-400">
//                 123 Style Street<br />
//                 Fashion District<br />
//                 New York, NY 10001
//               </address>
//               <p className="text-gray-400 mt-4">
//                 <a href="tel:+12125551234" className="hover:text-white">(212) 555-1234</a><br />
//                 <a href="mailto:info@stylesalon.com" className="hover:text-white">info@stylesalon.com</a>
//               </p>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
//             <p>&copy; 2025 StyleSalon. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SaloonLandingPage;