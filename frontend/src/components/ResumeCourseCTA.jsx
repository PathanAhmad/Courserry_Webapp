import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const ResumeCourseCTA = ({ courses = [], progressData = {} }) => {
  const navigate = useNavigate();

  // Reads from localStorage
  const lastCourseId = localStorage.getItem('lastCourseId');
  const lastCourseTitle = localStorage.getItem('lastCourseTitle') || 'Your Last Course';
  const progress = parseFloat(localStorage.getItem('lastCourseProgress')) || 0;

  // Has any courses?
  const userHasCourses = courses.length > 0;
  const lastCourseExists = courses.some(course => course._id === lastCourseId);


  // Animation variants for fade+slide
  const fadeVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Shared container style for all states
  const containerStyle = {
    flex: 4,
    height: '100%',
    position: 'relative',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    padding: '40px 20px',  // ⬅️ Consistent padding for fallback
    justifyContent: 'center',
    cursor: 'pointer',
    background: `
      linear-gradient(135deg, rgba(30,42,56, 0.85), rgba(50,74,94, 0.85)),
      url('/assets/subtle-pattern.jpg')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay',
  };

  // ======= Fallback States =======
  if (!lastCourseId || !lastCourseExists) {
    const fallbackHeading = userHasCourses
      ? "Your courses are left wondering where you left off to."
      : "Haven't enlisted yet?";
  
    const fallbackSubtext = userHasCourses
      ? "Click here to unsadden them. Click : ( -> : ) ."
      : "No problem. Here's the magic button!";
  
    const fallbackButton = userHasCourses ? 'Check My Courses' : 'Browse Courses';
  
    const handleFallbackClick = () => {
      if (userHasCourses) {
        navigate('/student-portal/my-courses');
      } else {
        navigate('/student-portal/browse-courses');
      }
    };
  
    return (
      <motion.div
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.01, boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}
        style={{
          ...containerStyle,  // Consistent sizing
        }}
        onClick={handleFallbackClick}
      >
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            color: '#FFFFFF',
            textAlign: 'center',
            maxWidth: '450px',
            display: 'flex',
            padding: '40px 20px',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              margin: 0,
              fontSize: '1.75rem',
              fontWeight: 600,
              textShadow: '0 3px 6px rgba(0,0,0,0.5)',
            }}
          >
            {fallbackHeading}
          </motion.h2>
  
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              margin: 0,
              fontSize: '1rem',
              color: '#D0D3D4',
            }}
          >
            {fallbackSubtext}
          </motion.p>
  
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                marginTop: '10px',
                padding: '10px 24px',
                backgroundColor: '#1E2A38',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 5px 12px rgba(0,0,0,0.4)',
              }}
            >
              {fallbackButton}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ======= Main CTA (User has visited a course) =======
  const handleResumeCourse = () => {
    if (lastCourseId) {
      navigate(`/my-courses/${lastCourseId}`);
    }
  };

  const getProgressMessage = () => {
    if (progress === 0) return 'Ready to start?';
    if (progress < 30) return 'Off to a great start 🚀';
    if (progress >= 30 && progress < 70) return "You're Halfway There! ⏳";
    if (progress === 100) return "Congratulations! Course complete!";
    return "You're Over Halfway There! 🏁";
};

  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.01, boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}
      style={{
        ...containerStyle,
        flexDirection: 'column',
      }}
      onClick={handleResumeCourse}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          color: '#ECF0F1',
          textAlign: 'center',
          maxWidth: '450px',
          padding: '40px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        {/* Animated heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            margin: 0,
            marginTop: '25px',
            fontSize: '2rem',
            textShadow: '0 3px 6px rgba(0, 0, 0, 0.5)',
            fontWeight: 600,
          }}
        >
          Continue where you left off!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            margin: 0,
            fontSize: '1.15rem',
            color: '#F0F3F4',
          }}
        >
          {getProgressMessage()}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            margin: 0,
            fontSize: '1.3rem',
            color: '#FFD700',
            fontWeight: 500,
          }}
        >
          {lastCourseTitle}
        </motion.h3>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '5px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
            style={{
              height: '100%',
              background: '#FFD700',
            }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            fontSize: '1rem',
            color: '#FFD700',
            fontWeight: '500',
          }}
        >
          {progress.toFixed(2)}% Complete
        </motion.span>

        {/* Resume Button - Hides if progress is 100% */}
        {progress < 100 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.07 }}
            style={{
              marginBottom: '30px',
              padding: '10px 24px',
              backgroundColor: '#324A5E',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
            }}
            onClick={handleResumeCourse}
          >
            <FaPlay size={16} />
            Resume Course
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeCourseCTA;
