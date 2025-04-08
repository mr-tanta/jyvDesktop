'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  MessageCircle
} from 'lucide-react';
import { blogPosts } from '@/data/blogData';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function FeaturedBlogPosts() {
  // Get the 3 most recent blog posts
  const featuredPosts = blogPosts.slice(0, 3);
  
  return (
    <section className="bg-gradient-to-b from-black to-gray-900 py-20 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Latest From Our Blog
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Expert insights, tips, and news on audio enhancement technology and digital sound experiences
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredPosts.map((post, index) => (
            <motion.div 
              key={post.slug}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-emerald-900/10 transition-all h-full flex flex-col">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-3">
                        {index === 0 && (
                          <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                        <span className="text-gray-400 text-xs flex items-center">
                          <Calendar size={12} className="mr-1" /> {post.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image 
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-gray-400 text-sm">{post.author.name}</span>
                      </div>
                      
                      <span className="text-gray-500 text-sm flex items-center">
                        <Clock size={14} className="mr-1" /> {post.readTime} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Link href="/blog">
            <div className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-medium transition-colors group">
              <span>View all articles</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
} 