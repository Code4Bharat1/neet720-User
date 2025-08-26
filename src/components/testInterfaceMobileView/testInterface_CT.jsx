import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [testData, setTestData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchQuestionsFromBackend();
  }, []);

  const fetchQuestionsFromBackend = async () => {
    try {
      setLoading(true);
      
      // Get data from localStorage
      const selectedSubjects = JSON.parse(localStorage.getItem('selectedSubjects') || '[]');
      const chapterData = JSON.parse(localStorage.getItem('chapterData') || '{}');
      
      if (selectedSubjects.length === 0 || Object.keys(chapterData).length === 0) {
        throw new Error('No test data found in localStorage. Please configure your test first.');
      }

      // Transform localStorage data to match backend expectations
      const selectedChapters = {};
      let totalQuestions = 0;

      selectedSubjects.forEach(subject => {
        if (chapterData[subject]) {
          selectedChapters[subject] = [];
          Object.values(chapterData[subject]).forEach(chapter => {
            selectedChapters[subject].push({
              name: chapter.chapterName
            });
            totalQuestions += parseInt(chapter.numQuestions) || 0;
          });
        }
      });

      const requestData = {
        selectedSubjects,
        selectedChapters,
        numQuestions: Math.max(1, Math.floor(totalQuestions / Object.keys(selectedChapters).length)) // Average questions per chapter
      };

      console.log('Sending request:', requestData);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/createtest/fetch-questions`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      
      if (!data.questions || data.questions.length === 0) {
        throw new Error('No questions received from the server.');
      }

      setQuestions(data.questions);
      setTestData({ selectedSubjects, chapterData });
      setError(null);
    } catch (err) {
      console.error('Error fetching questions:', err);
      
      // Handle Axios errors specifically
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data?.error || `Server error: ${err.response.status}`;
        setError(errorMessage);
      } else if (err.request) {
        // Request was made but no response received
        setError('Network error: Unable to connect to server');
      } else {
        // Something else happened
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach(q => {
      const selectedOptionId = selectedAnswers[q.question.id];
      if (selectedOptionId === q.correctAnswer.id) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const handleSubmitTest = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setTestCompleted(true);
  };

  const handleRestartTest = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTestCompleted(false);
    setScore(0);
  };

  const handleGoBack = () => {
    router.push('/'); // or wherever your test configuration page is
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Error Loading Test</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={fetchQuestionsFromBackend}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleGoBack}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Test Completed!</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">{score}/{questions.length}</div>
          <div className="text-gray-600 mb-6">{percentage}% Score</div>
          <div className="space-y-3">
            <button
              onClick={handleRestartTest}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Retake Test
            </button>
            <button
              onClick={handleGoBack}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No questions available.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOptionId = selectedAnswers[currentQuestion.question.id];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {currentQuestion.question.subject} - {currentQuestion.question.chapter}
            </h1>
            <div className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {currentQuestion.question.question_text}
            </h2>
            
            {/* Diagram if present */}
            {currentQuestion.diagram && (
              <div className="mb-4">
                <img 
                  src={currentQuestion.diagram} 
                  alt="Question diagram" 
                  className="max-w-full h-auto rounded border"
                />
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={option.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedOptionId === option.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
                onClick={() => handleOptionSelect(currentQuestion.question.id, option.id)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedOptionId === option.id 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-400'
                  }`}>
                    {selectedOptionId === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-700 mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-gray-800">{option.option_text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentQuestionIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Previous
            </button>

            <div className="text-sm text-gray-600">
              {Object.keys(selectedAnswers).length} of {questions.length} answered
            </div>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmitTest}
                disabled={Object.keys(selectedAnswers).length !== questions.length}
                className={`px-6 py-2 rounded-md transition-colors ${
                  Object.keys(selectedAnswers).length === questions.length
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Question Navigation Grid */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Question Navigation</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[questions[index].question.id]
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-4 text-xs text-gray-600">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
              Current
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              Answered
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
              Not Answered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;