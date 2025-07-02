"use client";
import { useEffect, useRef, useState } from 'react';
import Back from '@/components/Back';

export default function NarutoRun() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileUA || (isTouchDevice && isSmallScreen));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.key === ' ') {
        event.preventDefault();
        simulateJump();
      }
    };

    const handleTouch = (event: TouchEvent) => {
      event.preventDefault();
      simulateJump();
    };

    const simulateJump = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          const keyDownEvent = new KeyboardEvent('keydown', {
            key: ' ',
            code: 'Space',
            keyCode: 32,
            which: 32,
            bubbles: true,
            cancelable: true
          });
          iframeRef.current.contentWindow.document.dispatchEvent(keyDownEvent);
          iframeRef.current.contentWindow.document.body?.dispatchEvent(keyDownEvent);
          setTimeout(() => {
            if (iframeRef.current && iframeRef.current.contentWindow) {
              const keyUpEvent = new KeyboardEvent('keyup', {
                key: ' ',
                code: 'Space',
                keyCode: 32,
                which: 32,
                bubbles: true,
                cancelable: true
              });
              iframeRef.current.contentWindow.document.dispatchEvent(keyUpEvent);
              iframeRef.current.contentWindow.document.body?.dispatchEvent(keyUpEvent);
            }
          }, 100);
        } catch (error) {
          console.log('Could not simulate jump due to cross-origin restrictions');
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('touchstart', handleTouch, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return (
    <>
    <div className=" min-h-screen bg-gray-900 text-white p-4">
    <Back />
      <div className="flex flex-col items-center justify-center mb-4 text-xl text-center">Loading questions...</div>
      <div className="mb-2 text-sm text-gray-400 text-center">Play while you wait!</div>
      
      <div className="w-full max-w-4xl mx-auto">
        <div className="border-2 border-gray-600 rounded-lg overflow-hidden bg-white shadow-lg">
          {isMobile ? (
            <div className="w-full flex justify-center items-center p-2">
              <iframe
                ref={iframeRef}
                src="/t-rex-runner/index.html"
                width="600"
                height="300"
                className="block"
                title="T-Rex Runner Game"
                style={{ 
                  border: 'none',
                  background: 'white',
                  maxWidth: '100%',
                  transform: 'scale(0.9)',
                  transformOrigin: 'center'
                }}
                scrolling="no"
              />
            </div>
          ) : (
            <div className="relative w-full" style={{ paddingBottom: '50%' }}>
              <iframe
                ref={iframeRef}
                src="/t-rex-runner/index.html"
                className="absolute top-0 left-0 w-full h-full"
                title="T-Rex Runner Game"
                style={{ 
                  border: 'none',
                  background: 'white'
                }}
                scrolling="no"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center px-4">
        {isMobile ? (
          "Tap anywhere on the screen to jump!"
        ) : (
          "Press SPACE anywhere on the page to jump!"
        )}
      </div>
      <div className="mt-2 text-xs text-gray-600 text-center px-4">
        I'll protect you with my life. I will not allow my comrades to die. Trust me.
      </div>
    </div>
    </>
  );
}