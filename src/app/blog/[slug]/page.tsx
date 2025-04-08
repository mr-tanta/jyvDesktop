'use client';

import React, { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Tag, 
  ChevronLeft, 
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  Send,
  ThumbsUp,
  Reply
} from 'lucide-react';
import { blogPosts, type Comment as CommentType, type BlogPost } from '@/data/blogData';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Find the blog post with the matching slug
  const post = blogPosts.find(post => post.slug === slug);
  
  // If post not found, display error message
  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-all">
            <ChevronLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <BlogPostContent post={post} />
  );
}

interface BlogPostContentProps {
  post: BlogPost;
}

function BlogPostContent({ post }: BlogPostContentProps) {
  const [comment, setComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyToComment, setReplyToComment] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const commentRef = useRef<HTMLTextAreaElement>(null);
  
  // Find related posts
  const relatedPosts = post.relatedPosts
    ? blogPosts.filter(p => post.relatedPosts?.includes(p.slug))
    : [];
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the comment to your backend
    alert('Comment submitted! In a real app, this would be saved to a database.');
    setComment('');
    setShowCommentForm(false);
  };
  
  const handleReplySubmit = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    // In a real app, this would send the reply to your backend
    alert('Reply submitted! In a real app, this would be saved to a database.');
    setReplyContent('');
    setReplyToComment(null);
  };
  
  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          {/* Back to blog link */}
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
              <ChevronLeft size={16} />
              <span>Back to Blog</span>
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Post metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-gray-400 flex items-center gap-1">
                <Calendar size={16} /> {post.date}
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <Clock size={16} /> {post.readTime} min read
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <MessageCircle size={16} /> {post.commentCount} comments
              </span>
            </div>
            
            {/* Post title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              {post.title}
            </motion.h1>
            
            {/* Author info */}
            <div className="flex items-center gap-4 mb-10">
              <Image 
                src={post.author.avatar} 
                alt={post.author.name} 
                width={48} 
                height={48} 
                className="rounded-full"
              />
              <div>
                <span className="block text-white font-medium">{post.author.name}</span>
                <span className="text-sm text-gray-400">Author</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto fill-black">
            <path d="M0,100 L1440,100 L1440,0 C1380,30 1320,50 1260,60 C1180,75 1100,80 1020,70 C940,60 860,30 780,20 C700,10 620,20 540,35 C460,50 380,70 300,75 C220,80 140,70 60,50 C30,40 0,30 0,20 L0,100 Z" opacity="0.2" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content - Article */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cover image */}
            <div className="w-full h-[400px] relative rounded-xl overflow-hidden">
              <Image 
                src={post.coverImage} 
                alt={post.title} 
                fill 
                className="object-cover" 
              />
            </div>
            
            {/* Article content */}
            <article className="prose prose-invert prose-green prose-lg max-w-none 
              prose-headings:font-bold prose-headings:text-white 
              prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-10
              prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6
              prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-4
              prose-p:mb-5 prose-p:leading-relaxed
              prose-a:text-green-400 prose-a:no-underline hover:prose-a:text-green-300 hover:prose-a:underline
              prose-strong:text-green-300 prose-strong:font-bold
              prose-em:text-gray-300 prose-em:italic
              prose-ul:my-6 prose-ul:list-disc
              prose-ol:my-6 prose-ol:list-decimal
              prose-li:my-2
              prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:my-8 prose-blockquote:bg-gray-900/30 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-300 prose-blockquote:text-xl 
              prose-hr:border-gray-700 prose-hr:my-12
              prose-table:border-collapse prose-table:w-full
              prose-th:border prose-th:border-gray-700 prose-th:bg-gray-900 prose-th:p-3 prose-th:text-left
              prose-td:border prose-td:border-gray-700 prose-td:p-3">
              <ReactMarkdown 
                components={{
                  // Custom renderers for each element type
                  h1: ({children, ...props}: React.ComponentPropsWithoutRef<'h1'>) => 
                    <h1 className="text-gradient bg-gradient-to-r from-green-400 to-emerald-600" {...props}>{children}</h1>,
                  
                  blockquote: ({children, ...props}: React.ComponentPropsWithoutRef<'blockquote'>) => 
                    <blockquote className="relative px-8 py-4" {...props}>{children}</blockquote>,
                  
                  table: ({children, ...props}: React.ComponentPropsWithoutRef<'table'>) => 
                    <div className="overflow-x-auto my-8"><table {...props}>{children}</table></div>,
                  
                  img: ({src, alt, ...props}: React.ComponentPropsWithoutRef<'img'>) => 
                    <div className="my-8">
                      <img src={src} alt={alt} className="rounded-lg shadow-lg w-full" {...props} />
                      {alt && <p className="text-sm text-center text-gray-400 mt-2">{alt}</p>}
                    </div>,
                  
                  a: ({children, ...props}: React.ComponentPropsWithoutRef<'a'>) => 
                    <a className="text-green-400 hover:text-green-300 transition-colors" {...props}>{children}</a>,
                  
                  ol: ({children, ...props}: React.ComponentPropsWithoutRef<'ol'>) => 
                    <ol className="pl-6 my-6 list-decimal" {...props}>{children}</ol>,
                  
                  ul: ({children, ...props}: React.ComponentPropsWithoutRef<'ul'>) => 
                    <ul className="pl-6 my-6 list-disc" {...props}>{children}</ul>,
                  
                  li: ({children, ...props}: React.ComponentPropsWithoutRef<'li'>) => 
                    <li className="my-2" {...props}>{children}</li>,
                  
                  hr: ({...props}: React.ComponentPropsWithoutRef<'hr'>) => 
                    <hr className="my-12 border-gray-700" {...props} />
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-800">
              {post.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-gray-900 text-gray-300 text-sm rounded-full hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* Social sharing */}
            <div className="flex items-center justify-between py-6 border-y border-gray-800">
              <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
                  <Heart size={20} />
                  <span>Like</span>
                </button>
                <button className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
                <button className="text-gray-400 hover:text-yellow-500 transition-colors flex items-center gap-2">
                  <Bookmark size={20} />
                  <span>Save</span>
                </button>
              </div>
              
              <div className="text-gray-400">
                <span>{post.commentCount} comments</span>
              </div>
            </div>
            
            {/* Comments section */}
            <div className="pt-8 border-t border-gray-800">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Comments ({post.commentCount})</h3>
                <button 
                  onClick={() => setShowCommentForm(!showCommentForm)}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all text-sm font-medium"
                >
                  Leave a comment
                </button>
              </div>
              
              {/* Comment form */}
              <AnimatePresence>
                {showCommentForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 overflow-hidden"
                  >
                    <form onSubmit={handleCommentSubmit} className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                      <h4 className="text-lg font-medium mb-4">Add Your Comment</h4>
                      <textarea
                        ref={commentRef}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full bg-black/40 border border-gray-800 rounded-lg p-4 text-white mb-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                        required
                      />
                      <div className="flex justify-end gap-3">
                        <button 
                          type="button" 
                          onClick={() => setShowCommentForm(false)}
                          className="px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all flex items-center gap-2"
                        >
                          <Send size={16} />
                          Post Comment
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Comments list */}
              <div className="space-y-6">
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map(comment => (
                    <CommentItem 
                      key={comment.id} 
                      comment={comment} 
                      replyToComment={replyToComment}
                      setReplyToComment={setReplyToComment}
                      replyContent={replyContent}
                      setReplyContent={setReplyContent}
                      handleReplySubmit={handleReplySubmit}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-900/30 border border-gray-800 rounded-xl">
                    <MessageCircle size={32} className="mx-auto text-gray-500 mb-2" />
                    <h4 className="text-lg font-medium text-gray-400">No comments yet</h4>
                    <p className="text-gray-500 mt-1">Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-24">
              {/* Author bio */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">About the Author</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Image 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    width={64} 
                    height={64} 
                    className="rounded-full"
                  />
                  <div>
                    <span className="block text-white font-medium">{post.author.name}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{post.author.bio}</p>
              </div>
              
              {/* Table of Contents - Would be dynamically generated in a real app */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="hover:text-green-400 transition-colors">
                    <a href="#introduction">Introduction</a>
                  </li>
                  <li className="hover:text-green-400 transition-colors">
                    <a href="#main-section">Main Points</a>
                  </li>
                  <li className="hover:text-green-400 transition-colors">
                    <a href="#benefits">Key Benefits</a>
                  </li>
                  <li className="hover:text-green-400 transition-colors">
                    <a href="#implementation">Implementation</a>
                  </li>
                  <li className="hover:text-green-400 transition-colors">
                    <a href="#conclusion">Conclusion</a>
                  </li>
                </ul>
              </div>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                        <div className="group flex gap-3">
                          <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                            <Image 
                              src={relatedPost.coverImage} 
                              alt={relatedPost.title} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white group-hover:text-green-400 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <span className="text-xs text-gray-500">{relatedPost.date}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Comment component
interface CommentItemProps {
  comment: CommentType;
  replyToComment: string | null;
  setReplyToComment: (id: string | null) => void;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleReplySubmit: (e: React.FormEvent, commentId: string) => void;
}

function CommentItem({ 
  comment, 
  replyToComment, 
  setReplyToComment, 
  replyContent, 
  setReplyContent, 
  handleReplySubmit 
}: CommentItemProps) {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <Image 
          src={comment.author.avatar} 
          alt={comment.author.name} 
          width={40} 
          height={40} 
          className="rounded-full mt-1"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-medium text-white">{comment.author.name}</span>
              <span className="text-xs text-gray-500 ml-2">{comment.date}</span>
            </div>
            <button className="text-gray-500 hover:text-white transition-colors">
              •••
            </button>
          </div>
          
          <p className="text-gray-300 mb-4">{comment.content}</p>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1">
              <ThumbsUp size={16} />
              <span>{comment.likes}</span>
            </button>
            <button 
              onClick={() => setReplyToComment(replyToComment === comment.id ? null : comment.id)}
              className="text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1"
            >
              <Reply size={16} />
              <span>Reply</span>
            </button>
          </div>
          
          {/* Reply form */}
          <AnimatePresence>
            {replyToComment === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="border border-gray-800 rounded-lg p-4 bg-black/20">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full bg-black/40 border border-gray-800 rounded-lg p-3 text-white mb-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button" 
                      onClick={() => setReplyToComment(null)}
                      className="px-3 py-1 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all text-sm flex items-center gap-1"
                    >
                      <Send size={14} />
                      Reply
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Nested replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 pl-4 border-l-2 border-gray-800 space-y-4">
              {comment.replies.map(reply => (
                <div key={reply.id} className="pt-4">
                  <div className="flex items-start gap-3">
                    <Image 
                      src={reply.author.avatar} 
                      alt={reply.author.name} 
                      width={32} 
                      height={32} 
                      className="rounded-full mt-1"
                    />
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-white text-sm">{reply.author.name}</span>
                        <span className="text-xs text-gray-500 ml-2">{reply.date}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{reply.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1 text-xs">
                          <ThumbsUp size={14} />
                          <span>{reply.likes}</span>
                        </button>
                        <button className="text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1 text-xs">
                          <Reply size={14} />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 