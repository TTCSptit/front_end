import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const InterviewRoomPage = () => {
  const { roomId } = useParams();
  const meetingContainerRef = useRef(null);
  const isJoinedRef = useRef(false);
  const zpInstanceRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initMeeting = async () => {
      if (isJoinedRef.current) return;
      isJoinedRef.current = true;

      // Credentials from ZegoCloud Console
      const appID = 1406254714;
      const serverSecret = "e0f2476f985f86d15c755618139eea3e";
      
      // Get user from sessionStorage
      const sessionUserId = sessionStorage.getItem('userId');
      const sessionUserFullName = sessionStorage.getItem('userFullName');
      
      const userID = sessionUserId ? sessionUserId.toString().replace(/[^a-zA-Z0-9]/g, '') : "Guest" + Math.floor(Math.random() * 1000);
      const userName = sessionUserFullName || "User_" + Math.floor(Math.random() * 1000);

      // Generate kit token for test
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID, 
        serverSecret, 
        roomId, 
        userID, 
        userName
      );

      // Create instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zpInstanceRef.current = zp;

      // Join the room
      zp.joinRoom({
        container: meetingContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // 1-on-1 interview
        },
        showPreJoinView: true,
        showScreenSharingButton: true,
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        showUserList: true,
        layout: "Auto",
        onLeaveRoom: () => {
          // After interview ends, redirect based on role from sessionStorage
          const role = sessionStorage.getItem('userRole');
          if (role === 'recruiter') {
            navigate('/recruiter/dashboard');
          } else {
            navigate('/applied-jobs');
          }
        }
      });
    };

    if (meetingContainerRef.current) {
      initMeeting();
    }
    
    return () => {
      if (zpInstanceRef.current) {
        try {
          zpInstanceRef.current.destroy();
        } catch (e) {
          // Zego instances might not have destroy, or handles it internally
        }
      }
    };
  }, [roomId, navigate]);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1b1e', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
      <div ref={meetingContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default InterviewRoomPage;
