'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Tag, 
  ChevronRight, 
  Search, 
  TrendingUp, 
  MessageCircle,
  Filter
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

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract unique categories from blog posts
  const categories = ['all', ...Array.from(new Set(blogPosts.flatMap(post => post.categories)))];
  
  // Filter posts based on search query and active category
  useEffect(() => {
    let result = blogPosts;
    
    if (searchQuery) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeCategory !== 'all') {
      result = result.filter(post => 
        post.categories.includes(activeCategory)
      );
    }
    
    setFilteredPosts(result);
  }, [searchQuery, activeCategory]);

  // Get featured post (most recent)
  const featuredPost = blogPosts[0];
  
  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600"
            >
              JyvStream Blog
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400 text-lg mb-8"
            >
              Expert insights, tips, and news on audio enhancement technology and digital sound experiences
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-xl mx-auto"
            >
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..." 
                  className="w-full bg-gray-900/80 border border-gray-800 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto fill-black">
            <path d="M0,100 L1440,100 L1440,0 C1380,30 1320,50 1260,60 C1180,75 1100,80 1020,70 C940,60 860,30 780,20 C700,10 620,20 540,35 C460,50 380,70 300,75 C220,80 140,70 60,50 C30,40 0,30 0,20 L0,100 Z" opacity="0.2" />
          </svg>
        </div>
      </div>
      
      {/* Featured Post */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Article</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-800 transition-colors md:hidden"
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content - Featured Post and Post List */}
          <div className="md:col-span-2 space-y-12">
            <Link href={`/blog/${featuredPost.slug}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-emerald-900/20 transition-all group"
              >
                <div className="relative h-80 w-full">
                  <Image 
                    src={featuredPost.coverImage} 
                    alt={featuredPost.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                      <span className="text-gray-400 text-sm flex items-center">
                        <Calendar size={14} className="mr-1" /> {featuredPost.date}
                      </span>
                      <span className="text-gray-400 text-sm flex items-center">
                        <Clock size={14} className="mr-1" /> {featuredPost.readTime} min read
                      </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-400 line-clamp-2 mb-4">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image 
                          src={featuredPost.author.avatar} 
                          alt={featuredPost.author.name} 
                          width={32} 
                          height={32} 
                          className="rounded-full"
                        />
                        <span className="text-gray-300">{featuredPost.author.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm flex items-center">
                          <MessageCircle size={14} className="mr-1" /> {featuredPost.commentCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
            
            {/* Article List */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
              
              {filteredPosts.length === 0 ? (
                <div className="bg-gray-900/50 rounded-xl p-12 text-center border border-gray-800">
                  <h3 className="text-xl font-medium text-gray-400 mb-4">No articles found</h3>
                  <p className="text-gray-500">Try a different search term or category</p>
                </div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  {filteredPosts.slice(1).map((post, index) => (
                    <motion.div 
                      key={post.slug}
                      variants={itemVariants}
                      className="group"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-900/30 hover:bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden p-4 md:p-0 transition-all">
                          <div className="md:col-span-1 relative h-48 md:h-full rounded-lg md:rounded-none overflow-hidden">
                            <Image 
                              src={post.coverImage} 
                              alt={post.title} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          
                          <div className="md:col-span-2 p-0 md:p-6 flex flex-col">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className="text-gray-400 text-sm flex items-center">
                                <Calendar size={14} className="mr-1" /> {post.date}
                              </span>
                              <span className="text-gray-400 text-sm flex items-center">
                                <Clock size={14} className="mr-1" /> {post.readTime} min read
                              </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-400 line-clamp-2 mb-4 flex-grow">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-2">
                                <Image 
                                  src={post.author.avatar} 
                                  alt={post.author.name} 
                                  width={28} 
                                  height={28} 
                                  className="rounded-full"
                                />
                                <span className="text-gray-300 text-sm">{post.author.name}</span>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {post.categories.slice(0, 2).map(category => (
                                  <span 
                                    key={category} 
                                    className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                                  >
                                    {category}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {/* Pagination (simplified) */}
              {filteredPosts.length > 10 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 text-white">
                      1
                    </button>
                    <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-800 text-gray-400 hover:bg-gray-800 transition-colors">
                      2
                    </button>
                    <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-800 text-gray-400 hover:bg-gray-800 transition-colors">
                      3
                    </button>
                    <span className="text-gray-500">...</span>
                    <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-800 text-gray-400 hover:bg-gray-800 transition-colors">
                      8
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeCategory === category 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      {category === 'all' ? 'All Posts' : category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Popular Posts */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <TrendingUp size={18} className="mr-2 text-green-500" />
                  Popular Posts
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 4).map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <div className="flex gap-3 group">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                          <Image 
                            src={post.coverImage} 
                            alt={post.title} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white group-hover:text-green-400 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <span className="text-xs text-gray-500">{post.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-900/30 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Subscribe to our newsletter</h3>
                <p className="text-gray-400 text-sm mb-4">Get the latest articles and news delivered to your inbox</p>
                
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-black/40 border border-green-900/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                  />
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2 rounded-lg transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 