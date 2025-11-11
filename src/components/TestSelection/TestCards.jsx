"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaShieldAlt,
  FaShoppingBag,
  FaShieldVirus,
  FaDownload,
} from "react-icons/fa";
import { AlertTriangle, Clock, X, CheckCircle } from "lucide-react";
import { LuBookText } from "react-icons/lu";
import { MdQuiz } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
const OMRDownloadButton = () => {
  const logoUrl =
    "https://examportal-diagrams-new.s3.eu-north-1.amazonaws.com/1749384337445-nexcore-logo-pc.png";

  const handleDownloadOMR = async () => {
    try {
      const allQuestions = Array.from({ length: 180 }, (_, i) => ({
        number: i + 1,
      }));
      
      const renderOMRColumn = (columnQuestions) =>
        columnQuestions
          .map(
            (q) => `
            <div class="question-row">
              <div class="question-number">${q.number}.</div>
              <div class="options-bubbles">
                ${["A", "B", "C", "D"]
                  .map((opt) => `<div class="bubble-option">${opt}</div>`)
                  .join("")}
              </div>
            </div>`
          )
          .join("");

      const col1 = allQuestions.slice(0, 45);
      const col2 = allQuestions.slice(45, 90);
      const col3 = allQuestions.slice(90, 135);
      const col4 = allQuestions.slice(135, 180);

      const html = `
        <div class="omr-page">
          <div class="omr-flex-header">
            <div class="omr-left-info">
              <div>Name: <span class="info-line">&nbsp;</span></div>
              <div>Roll No: <span class="info-line">&nbsp;</span></div>
              <div>Date: <span class="info-line">&nbsp;</span></div>
            </div>
            <div class="omr-center-title">
              <div class="omr-title">OMR QUESTION SHEET</div>
              <div class="omr-subtitle">**Do not write anything on the OMR bubbles**</div>
            </div>
            <div style="min-width:80px">
              <img src="${logoUrl}" class="logo-omr" crossorigin="anonymous" />
            </div>
          </div>
          <div class="omr-table">
            <div class="column">${renderOMRColumn(col1)}</div>
            <div class="column">${renderOMRColumn(col2)}</div>
            <div class="column">${renderOMRColumn(col3)}</div>
            <div class="column">${renderOMRColumn(col4)}</div>
          </div>
        </div>
      `;

      const css = `
        .omr-page { 
          padding: 20px; 
          background: white; 
          width: 794px; 
          min-height: 1123px; 
          font-family: Arial, sans-serif; 
          font-size: 12px; 
          color: #000; 
        }
        .omr-flex-header {
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          margin-bottom: 20px; 
          padding: 10px 15px; 
          border: 2px solid black;
        }
        .omr-left-info { 
          display: flex; 
          flex-direction: column; 
          align-items: flex-start; 
          min-width: 180px; 
          gap: 8px; 
        }
        .logo-omr { 
          max-width: 100px; 
          max-height: 80px; 
          margin-bottom: 6px; 
          border-radius: 5px; 
          border: 1px solid #ddd; 
          background: #fff; 
        }
        .omr-center-title { 
          text-align: center; 
          flex: 1; 
        }
        .omr-title { 
          font-size: 18px; 
          font-weight: bold; 
          margin-bottom: 6px; 
        }
        .omr-subtitle { 
          font-size: 13px; 
          color: #444; 
          margin-bottom: 0; 
        }
        .omr-table { 
          display: flex; 
          justify-content: space-between; 
          gap: 15px; 
        }
        .column { 
          flex: 1; 
          border: 2px solid black; 
          padding: 12px; 
        }
        .question-row { 
          display: flex; 
          align-items: center; 
          margin-bottom: 4px; 
          font-size: 10px; 
        }
        .question-number { 
          min-width: 25px; 
          font-weight: bold; 
        }
        .options-bubbles { 
          display: flex; 
          gap: 12px; 
          margin-left: 12px; 
        }
        .bubble-option { 
          width: 16px; 
          height: 16px; 
          border: 2px solid #000; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 8px; 
          font-weight: bold; 
        }
        .info-line { 
          display: inline-block; 
          width: 100px; 
          margin-left: 5px; 
          border-bottom: 1px dotted #aaa; 
          min-height: 14px; 
        }
      `;

      // Create a temporary div to render HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      tempDiv.setAttribute('style', `
        position: absolute;
        top: -9999px;
        left: -9999px;
        width: 794px;
        background: white;
        padding: 20px;
      `);

      // Apply CSS styles
      const styleSheet = document.createElement('style');
      styleSheet.textContent = css;
      document.head.appendChild(styleSheet);
      document.body.appendChild(tempDiv);

      // Wait for images to load
      const images = tempDiv.getElementsByTagName('img');
      const imageLoadPromises = Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if image fails to load
          }
        });
      });

      await Promise.all(imageLoadPromises);

      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size (A4 dimensions at 150 DPI)
      canvas.width = 1240;
      canvas.height = 1754;
      
      // Fill white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Convert HTML to canvas using html2canvas alternative approach
      // Since we can't use external libraries, we'll use a different approach
      
      // For now, let's create the OMR sheet programmatically on canvas
      await drawOMROnCanvas(ctx, canvas.width, canvas.height, logoUrl);

      // Convert canvas to JPG and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'OMR-sheet.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('OMR Sheet downloaded successfully!');
      }, 'image/jpeg', 0.95);

      // Cleanup
      document.body.removeChild(tempDiv);
      document.head.removeChild(styleSheet);
      
    } catch (error) {
      console.error('Error generating OMR sheet:', error);
      toast.error('Failed to generate OMR sheet. Please try again.');
    }
  };

  // Function to draw OMR sheet directly on canvas
  const drawOMROnCanvas = async (ctx, width, height, logoUrl) => {
    const padding = 40;
    const headerHeight = 120;
    
    // Set font
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    
    // Draw header border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(padding, padding, width - 2 * padding, headerHeight);
    
    // Draw header content
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('OMR QUESTION SHEET', width / 2, padding + 40);
    
    ctx.font = '14px Arial';
    ctx.fillText('**Do not write anything on the OMR bubbles**', width / 2, padding + 65);
    
    // Draw name, roll no, date fields
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    const leftX = padding + 20;
    ctx.fillText('Name: ________________________', leftX, padding + 90);
    ctx.fillText('Roll No: ______________________', leftX, padding + 110);
    ctx.fillText('Date: _________________________', leftX, padding + 130);
    
    // Try to load and draw logo
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, width - padding - 100, padding + 20, 80, 60);
      };
      img.src = logoUrl;
    } catch (e) {
      console.log('Could not load logo');
    }
    
    // Draw question columns
    const startY = padding + headerHeight + 30;
    const columnWidth = (width - 2 * padding - 60) / 4; // 4 columns with gaps
    const questionHeight = 25;
    
    for (let col = 0; col < 4; col++) {
      const startX = padding + col * (columnWidth + 15);
      const startQ = col * 45 + 1;
      const endQ = Math.min((col + 1) * 45, 180);
      
      // Draw column border
      ctx.strokeRect(startX, startY, columnWidth, (endQ - startQ + 1) * questionHeight + 20);
      
      // Draw questions in this column
      for (let q = startQ; q <= endQ; q++) {
        const y = startY + 10 + (q - startQ) * questionHeight;
        
        // Question number
        ctx.font = 'bold 12px Arial';
        ctx.fillText(`${q}.`, startX + 10, y + 15);
        
        // Option bubbles
        const options = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < options.length; i++) {
          const bubbleX = startX + 50 + i * 30;
          const bubbleY = y + 5;
          
          // Draw circle
          ctx.beginPath();
          ctx.arc(bubbleX, bubbleY + 8, 8, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Draw option letter
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(options[i], bubbleX, bubbleY + 12);
          ctx.textAlign = 'left';
        }
      }
    }
  };

  return (
    <button
      onClick={handleDownloadOMR}
      title="Download OMR Sheet"
      className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow font-semibold transition"
    >
      <FaDownload className="w-5 h-5" />
    </button>
  );
};

const TestCards = () => {
  const router = useRouter();
  const [showInstructions, setShowInstructions] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (showInstructions && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleStartTest();
    }
  }, [showInstructions, timer]);

  const handleCancel = () => {
    setShowInstructions(false);
    router.push("/testselection");
  };

  const handleStartTest = () => {
    router.push("/testinterface");
  };

  const enterFullscreen = async () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      await elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      await elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      await elem.msRequestFullscreen();
    }
  };

  const handleClick = async (route) => {
    await enterFullscreen();

    if (route === "/testinterface") {
      setShowInstructions(true);
      setTimer(60);
    } else {
      toast.error(
  "⚠️ Warning: Exiting fullscreen will return you to the selection page.",
  {
    id: "fullscreen-warning", // 👈 unique ID
    duration: 1500,
  }
);

      router.push(route);
    }
  };

  const cards = [
    {
      title: "FAST QUIZ",
      icon: <MdQuiz className="w-5 h-5" />,
      route: "/fastquiz",
    },
    {
      title: "FULL TEST",
      icon: <LuBookText className="w-5 h-5" />,
      route: "/testinterface",
    },
    {
      title: "CREATE TEST",
      icon: <IoCreate className="w-5 h-5" />,
      route: "/createtest",
    },
  ];

  return (
    <div className="px-4 py-1">
      {/* Instruction Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full transition-all scale-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-7 h-7" />
                  <h2 className="text-xl font-bold">Test Instructions</h2>
                </div>
                <button
                  onClick={handleCancel}
                  className="hover:bg-white/10 p-1 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <ul className="mb-6 space-y-3 text-sm text-gray-700">
                {[
                  "Once the test starts, do not exit full screen mode",
                  "Do not switch tabs or windows — this may disqualify you",
                  "Use only the on-screen options to navigate questions",
                  "Answer all questions carefully; there's no going back",
                ].map((text, index) => (
                  <li key={index} className="flex gap-2">
                    <div className="text-blue-600 font-bold">{index + 1}.</div>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-100 border border-red-300 rounded-lg">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700 font-medium">
                    Test will begin in
                  </span>
                  <div className="text-xl font-bold text-white bg-red-500 px-3 py-1 rounded-lg">
                    {timer}
                  </div>
                  <span className="text-gray-700 font-medium">seconds</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCancel}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartTest}
                  disabled={timer > 0}
                  className={`w-1/2 px-4 py-2 rounded-lg text-white font-semibold transition ${
                    timer > 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  Start Test
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-4 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                  style={{ width: `${((60 - timer) / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Button Row */}
      <div className="flex justify-start mb-2 items-center">
        <OMRDownloadButton />
        <span className="ml-2 text-gray-600 flex items-center">
          Download OMR Sheet
        </span>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleClick(card.route)}
            className="md:h-[100px] flex items-center justify-center gap-4 p-4 rounded-lg text-white font-medium shadow hover:scale-105 cursor-pointer transition bg-blue-500"
          >
            {card.icon}
            <span>{card.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCards;