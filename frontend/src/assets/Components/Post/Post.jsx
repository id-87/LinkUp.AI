import React, { useState } from 'react';
import './Post.css';
import {db} from '../../../firebase'
import { collection, addDoc, serverTimestamp }  from 'firebase/firestore';



const Post = ({ profileData, onBack }) => {
  const [postData, setPostData] = useState({
    content: '',
    image: null,
    imagePreview: null,
    hashtags: [],
    visibility: 'public',
    location: ''
  });

  const handleCreatePost = async (postContent, postImage, hashtags) => {
  try {
    await addDoc(collection(db, "posts"), {
      author: {
        name: profileData.name || "Anonymous",
        title: profileData.title || "",
        profileImage: profileData.profileImage || null,
        uid: profileData.uid || null, // if you have user id
      },
      content: postContent,
      image: postImage || null,
      hashtags: hashtags || [],
      createdAt: serverTimestamp(),
      likes: 0,
      comments: [],
      shares: 0,
      location: profileData.location || "",
    });
    alert("Post created!");
  } catch (e) {
    alert("Error adding post: " + e.message);
  }
};

  const [newHashtag, setNewHashtag] = useState('');
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        title: 'Senior Product Manager at TechCorp',
        profileImage: null,
        verified: true
      },
      content: 'Excited to announce that our team just launched a groundbreaking AI-powered analytics dashboard! 🚀 After months of hard work, we\'ve created something that will revolutionize how businesses understand their data.\n\nKey features:\n✅ Real-time data visualization\n✅ Predictive analytics\n✅ Custom reporting tools\n✅ Mobile-first design\n\nHuge thanks to my incredible team for making this possible! #ProductManagement #AI #DataAnalytics #TeamWork',
      image: null,
      hashtags: ['ProductManagement', 'AI', 'DataAnalytics', 'TeamWork'],
      timestamp: '2h',
      likes: 127,
      comments: [
        {
          id: 1,
          author: {
            name: 'Alex Rodriguez',
            title: 'Data Scientist at InnovateTech',
            profileImage: null
          },
          content: 'This looks amazing! The predictive analytics feature is exactly what we\'ve been looking for. Can\'t wait to try it out! 🔥',
          timestamp: '1h',
          likes: 12,
          liked: false,
          replies: [
            {
              id: 1,
              author: {
                name: 'Sarah Johnson',
                title: 'Senior Product Manager at TechCorp',
                profileImage: null
              },
              content: 'Thanks Alex! I\'d love to show you a demo. Feel free to reach out!',
              timestamp: '45m',
              likes: 3,
              liked: false
            }
          ]
        },
        {
          id: 2,
          author: {
            name: 'Maria Garcia',
            title: 'UX Designer',
            profileImage: null
          },
          content: 'Congratulations on the launch! The mobile-first approach is brilliant. How did you handle the data visualization on smaller screens?',
          timestamp: '30m',
          likes: 8,
          liked: true,
          replies: []
        }
      ],
      shares: 18,
      liked: false,
      bookmarked: false,
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      author: {
        name: 'Michael Chen',
        title: 'Full Stack Developer | React Enthusiast',
        profileImage: null,
        verified: false
      },
      content: 'Just completed a 30-day coding challenge! 💪 Built 30 different projects using React, Node.js, and MongoDB. Here are my key takeaways:\n\n🎯 Consistency beats perfection\n🎯 Learning by building is the most effective approach\n🎯 Community support makes all the difference\n\nTo everyone starting their coding journey - you\'ve got this! Drop a comment if you want to see any of the projects. #100DaysOfCode #WebDevelopment #React #JavaScript',
      image: null,
      hashtags: ['100DaysOfCode', 'WebDevelopment', 'React', 'JavaScript'],
      timestamp: '5h',
      likes: 89,
      comments: [
        {
          id: 3,
          author: {
            name: 'Jennifer Lee',
            title: 'Frontend Developer',
            profileImage: null
          },
          content: 'Inspiring! I\'m on day 15 of my own challenge. Would love to see some of your React projects for inspiration!',
          timestamp: '3h',
          likes: 5,
          liked: false,
          replies: []
        }
      ],
      shares: 12,
      liked: true,
      bookmarked: true,
      location: 'Remote'
    },
    {
      id: 3,
      author: {
        name: 'Emma Wilson',
        title: 'UX Designer at Creative Studios',
        profileImage: null,
        verified: false
      },
      content: 'Design tip of the day: White space is not empty space - it\'s a powerful design element! 🎨\n\nWhite space (or negative space) helps:\n• Improve readability\n• Create visual hierarchy\n• Reduce cognitive load\n• Make your design feel premium\n\nLess is often more in design. What\'s your favorite use of white space? #UXDesign #DesignTips #UserExperience',
      image: null,
      hashtags: ['UXDesign', 'DesignTips', 'UserExperience'],
      timestamp: '1d',
      likes: 56,
      comments: [],
      shares: 7,
      liked: false,
      bookmarked: false,
      location: 'New York, NY'
    }
  ]);

  const emojis = ['😊', '👍', '🚀', '💡', '🎉', '❤️', '🔥', '💪', '🌟', '✨', '👏', '🎯'];

  const handleInputChange = (field, value) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPostData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addHashtag = () => {
    if (newHashtag.trim() && !postData.hashtags.includes(newHashtag.trim().toLowerCase())) {
      setPostData(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, newHashtag.trim().toLowerCase()]
      }));
      setNewHashtag('');
    }
  };

  const removeHashtag = (hashtagToRemove) => {
    setPostData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(tag => tag !== hashtagToRemove)
    }));
  };

  const removeImage = () => {
    setPostData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  const addEmoji = (emoji) => {
    setPostData(prev => ({
      ...prev,
      content: prev.content + emoji
    }));
    setShowEmojiPanel(false);
  };

  const handlePost = () => {
    if (postData.content.trim()) {
      const newPost = {
        id: Date.now(),
        author: {
          name: profileData?.name || 'You',
          title: profileData?.bio || 'LinkUp.AI User',
          profileImage: profileData?.profilePhotoPreview || null,
          verified: false
        },
        content: postData.content,
        image: postData.imagePreview,
        hashtags: postData.hashtags,
        timestamp: 'now',
        likes: 0,
        comments: [],
        shares: 0,
        liked: false,
        bookmarked: false,
        location: postData.location
      };

      setPosts(prev => [newPost, ...prev]);

      handleCreatePost(
        postData.content,
        postData.imagePreview,
        postData.hashtags
      );
      
      // Reset form
      setPostData({
        content: '',
        image: null,
        imagePreview: null,
        hashtags: [],
        visibility: 'public',
        location: ''
      });

      // Show success notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentChange = (postId, value) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const addComment = (postId) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;

    const newComment = {
      id: Date.now(),
      author: {
        name: profileData?.name || 'You',
        title: profileData?.bio || 'LinkUp.AI User',
        profileImage: profileData?.profilePhotoPreview || null
      },
      content: commentText,
      timestamp: 'now',
      likes: 0,
      liked: false,
      replies: []
    };

    setPosts(prev => prev.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [...post.comments, newComment]
          }
        : post
    ));

    // Clear the comment input
    setNewComments(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const handleCommentLike = (postId, commentId) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? {
                    ...comment,
                    liked: !comment.liked,
                    likes: comment.liked ? comment.likes - 1 : comment.likes + 1
                  }
                : comment
            )
          }
        : post
    ));
  };

  const formatHashtags = (content) => {
    return content.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return <span key={index} className="hashtag-text">{word} </span>;
      }
      return word + ' ';
    });
  };

  const formatPostContent = (content) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {formatHashtags(line)}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="post-container">
      {/* Success Notification */}
      {showNotification && (
        <div className="post-success-notification">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          Post published successfully!
        </div>
      )}

      {/* Header */}
      <div className="post-header">
        <button onClick={onBack} className="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <div className="post-header-content">
          <h1>Create Post</h1>
          <p>Share your professional story with your network</p>
        </div>
      </div>

      {/* Create Post Section */}
      <div className="create-post-section">
        <div className="create-post-card">
          {/* Author Info */}
          <div className="post-author-info">
            <div className="author-avatar">
              {profileData?.profilePhotoPreview ? (
                <img src={profileData.profilePhotoPreview} alt="Profile" />
              ) : (
                <div className="avatar-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="author-details">
              <h3>{profileData?.name || 'Your Name'}</h3>
              <p>{profileData?.bio || 'Add your professional headline'}</p>
              <div className="post-visibility">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <select 
                  value={postData.visibility}
                  onChange={(e) => handleInputChange('visibility', e.target.value)}
                  className="visibility-select"
                >
                  <option value="public">Anyone</option>
                  <option value="connections">Connections only</option>
                  <option value="private">Only me</option>
                </select>
              </div>
            </div>
          </div>

          {/* Post Content Area */}
          <div className="post-content-area">
            <textarea
              value={postData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="What do you want to talk about?"
              className="post-textarea"
            />

            {/* Character Counter */}
            <div className="character-counter">
              <span className={postData.content.length > 3000 ? 'over-limit' : ''}>
                {postData.content.length}/3000
              </span>
            </div>

            {/* Image Preview */}
            {postData.imagePreview && (
              <div className="image-preview">
                <img src={postData.imagePreview} alt="Post preview" />
                <button onClick={removeImage} className="remove-image-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Location Display */}
            {postData.location && (
              <div className="location-display">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{postData.location}</span>
                <button onClick={() => handleInputChange('location', '')} className="remove-location-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Hashtags */}
            {postData.hashtags.length > 0 && (
              <div className="hashtags-display">
                {postData.hashtags.map((tag, index) => (
                  <div key={index} className="hashtag-tag">
                    <span>#{tag}</span>
                    <button 
                      type="button" 
                      onClick={() => removeHashtag(tag)}
                      className="remove-hashtag-btn"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Emoji Panel */}
            {showEmojiPanel && (
              <div className="emoji-panel">
                <div className="emoji-grid">
                  {emojis.map((emoji, index) => (
                    <button 
                      key={index} 
                      onClick={() => addEmoji(emoji)}
                      className="emoji-btn"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="post-actions">
            <div className="post-media-actions">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                id="post-image-upload"
                style={{ display: 'none' }}
              />
              <label htmlFor="post-image-upload" className="media-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                Photo
              </label>
              
              <button 
                type="button" 
                onClick={() => setShowEmojiPanel(!showEmojiPanel)}
                className="media-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 9C9.33 9 10 8.33 10 7.5S9.33 6 8.5 6 7 6.67 7 7.5 7.67 9 8.5 9zM12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4zm3.5-9c-.83 0-1.5-.67-1.5-1.5S14.67 6 15.5 6s1.5.67 1.5 1.5S16.33 9 15.5 9z"/>
                </svg>
                Emoji
              </button>

              <button 
                type="button" 
                onClick={() => {
                  const location = prompt('Add location:');
                  if (location) handleInputChange('location', location);
                }}
                className="media-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Location
              </button>

              <div className="hashtag-input-container">
                <input
                  type="text"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  placeholder="Add hashtag"
                  className="hashtag-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addHashtag();
                    }
                  }}
                />
                <button type="button" onClick={addHashtag} className="add-hashtag-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </button>
              </div>
            </div>

            <button 
              onClick={handlePost} 
              className={`post-btn ${!postData.content.trim() ? 'disabled' : ''}`}
              disabled={!postData.content.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="posts-feed">
        <div className="feed-header">
          <h2>Recent Posts</h2>
          <div className="feed-filters">
            <button className="filter-btn active">Recent</button>
            <button className="filter-btn">Top</button>
          </div>
        </div>

        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {/* Post Header */}
            <div className="post-header-info">
              <div className="post-author">
                <div className="author-avatar">
                  {post.author.profileImage ? (
                    <img src={post.author.profileImage} alt={post.author.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="author-info">
                  <div className="author-name-container">
                    <h4>{post.author.name}</h4>
                    {post.author.verified && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#0073b1" className="verified-badge">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>
                  <p className="author-title">{post.author.title}</p>
                  <div className="post-meta">
                    <span className="post-time">{post.timestamp}</span>
                    {post.location && (
                      <>
                        <span className="meta-separator">•</span>
                        <span className="post-location">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          {post.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="post-menu-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </button>
            </div>

            {/* Post Content */}
            <div className="post-content">
              <p>{formatPostContent(post.content)}</p>
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="Post content" />
                </div>
              )}
            </div>

            {/* Post Stats */}
            <div className="post-stats">
              <div className="stats-left">
                <div className="reaction-icons">
                  <span className="reaction-icon like">👍</span>
                  <span className="reaction-icon love">❤️</span>
                  <span className="reaction-icon celebrate">🎉</span>
                </div>
                <span className="stats-count">{post.likes}</span>
              </div>
              <div className="stats-right">
                <span className="stats-item" onClick={() => toggleComments(post.id)}>
                  {post.comments.length} comments
                </span>
                <span className="stats-separator">•</span>
                <span className="stats-item">{post.shares} reposts</span>
              </div>
            </div>

            {/* Post Interactions */}
            <div className="post-interactions">
              <button 
                className={`interaction-btn ${post.liked ? 'liked' : ''}`}
                onClick={() => handleLike(post.id)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.5 2.5C10.5 2.5 12 4.5 12 4.5s1.5-2 4.5-2C19.54 2.5 22 4.96 22 8c0 4.5-8 11-10 11S2 12.5 2 8c0-3.04 2.46-5.5 5.5-5.5z"/>
                </svg>
                Like
              </button>
              <button 
                className="interaction-btn"
                onClick={() => toggleComments(post.id)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
                </svg>
                Comment
              </button>
              <button className="interaction-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                Repost
              </button>
              <button className="interaction-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/>
                </svg>
                Send
              </button>
              <button 
                className={`interaction-btn bookmark ${post.bookmarked ? 'bookmarked' : ''}`}
                onClick={() => handleBookmark(post.id)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                </svg>
              </button>
            </div>

            {/* Comments Section */}
            {expandedComments[post.id] && (
              <div className="comments-section">
                {/* Add Comment */}
                <div className="add-comment">
                  <div className="comment-author-avatar">
                    {profileData?.profilePhotoPreview ? (
                      <img src={profileData.profilePhotoPreview} alt="Your profile" />
                    ) : (
                      <div className="avatar-placeholder">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="comment-input-container">
                    <textarea
                      value={newComments[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      placeholder="Add a comment..."
                      className="comment-input"
                      rows="2"
                    />
                    <button 
                      onClick={() => addComment(post.id)}
                      className={`comment-submit-btn ${!newComments[post.id]?.trim() ? 'disabled' : ''}`}
                      disabled={!newComments[post.id]?.trim()}
                    >
                      Post
                    </button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="comments-list">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-author-avatar">
                        {comment.author.profileImage ? (
                          <img src={comment.author.profileImage} alt={comment.author.name} />
                        ) : (
                          <div className="avatar-placeholder">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="comment-content">
                        <div className="comment-bubble">
                          <div className="comment-header">
                            <h5 className="comment-author-name">{comment.author.name}</h5>
                            <span className="comment-author-title">{comment.author.title}</span>
                          </div>
                          <p className="comment-text">{comment.content}</p>
                        </div>
                        <div className="comment-actions">
                          <button 
                            className={`comment-like-btn ${comment.liked ? 'liked' : ''}`}
                            onClick={() => handleCommentLike(post.id, comment.id)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.5 2.5C10.5 2.5 12 4.5 12 4.5s1.5-2 4.5-2C19.54 2.5 22 4.96 22 8c0 4.5-8 11-10 11S2 12.5 2 8c0-3.04 2.46-5.5 5.5-5.5z"/>
                            </svg>
                            Like
                          </button>
                          <button className="comment-reply-btn">Reply</button>
                          <span className="comment-time">{comment.timestamp}</span>
                          {comment.likes > 0 && (
                            <span className="comment-likes">{comment.likes} likes</span>
                          )}
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="comment-replies">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="comment reply">
                                <div className="comment-author-avatar">
                                  {reply.author.profileImage ? (
                                    <img src={reply.author.profileImage} alt={reply.author.name} />
                                  ) : (
                                    <div className="avatar-placeholder">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <div className="comment-content">
                                  <div className="comment-bubble">
                                    <div className="comment-header">
                                      <h5 className="comment-author-name">{reply.author.name}</h5>
                                      <span className="comment-author-title">{reply.author.title}</span>
                                    </div>
                                    <p className="comment-text">{reply.content}</p>
                                  </div>
                                  <div className="comment-actions">
                                    <button className="comment-like-btn">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7.5 2.5C10.5 2.5 12 4.5 12 4.5s1.5-2 4.5-2C19.54 2.5 22 4.96 22 8c0 4.5-8 11-10 11S2 12.5 2 8c0-3.04 2.46-5.5 5.5-5.5z"/>
                                      </svg>
                                      Like
                                    </button>
                                    <span className="comment-time">{reply.timestamp}</span>
                                    {reply.likes > 0 && (
                                      <span className="comment-likes">{reply.likes} likes</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;